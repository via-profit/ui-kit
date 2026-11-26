#!/usr/bin/env bash
set -euo pipefail

cd -- "$(dirname -- "${BASH_SOURCE[0]}")"
if [[ -f .env.deploy ]]; then
  source ./.env.deploy
fi

: "${DEPLOY_HOST:?Set DEPLOY_HOST in website/.env.deploy}"
: "${DEPLOY_USER:?Set DEPLOY_USER in website/.env.deploy}"
: "${DEPLOY_DESTINATION_DIR:?Set DEPLOY_DESTINATION_DIR in website/.env.deploy}"
: "${DEPLOY_SITE_URL:?Set DEPLOY_SITE_URL in website/.env.deploy}"
: "${DEPLOY_BIND_HOST:?Set DEPLOY_BIND_HOST in website/.env.deploy}"
: "${DEPLOY_PORT:?Set DEPLOY_PORT in website/.env.deploy}"
[[ $DEPLOY_BIND_HOST =~ ^[a-zA-Z0-9.:-]+$ ]]
[[ $DEPLOY_PORT =~ ^[0-9]{1,5}$ && 10#$DEPLOY_PORT -gt 0 && 10#$DEPLOY_PORT -le 65535 ]]
DEPLOY_PORT=$((10#$DEPLOY_PORT))
DEPLOY_SERVICE_NAME=${DEPLOY_SERVICE_NAME:-viaprofit.uikit}
DEPLOY_NODE_BIN=${DEPLOY_NODE_BIN:-/usr/bin/node}

# These values are also passed to the remote shell and written into the unit.
[[ $DEPLOY_HOST =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]]
[[ $DEPLOY_USER =~ ^[a-zA-Z_][a-zA-Z0-9_-]*$ ]]
[[ $DEPLOY_SERVICE_NAME =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]]
[[ $DEPLOY_NODE_BIN =~ ^/[a-zA-Z0-9/._-]+$ ]]
[[ $DEPLOY_DESTINATION_DIR =~ ^/[a-zA-Z0-9._-]+/[a-zA-Z0-9._-]+/[a-zA-Z0-9/._-]+$ ]]
[[ /$DEPLOY_DESTINATION_DIR/ != */../* && /$DEPLOY_DESTINATION_DIR/ != */./* ]]
[[ $DEPLOY_SITE_URL =~ ^https://[a-zA-Z0-9][a-zA-Z0-9.-]*(:[0-9]+)?/?$ ]]
DEPLOY_DESTINATION_DIR=${DEPLOY_DESTINATION_DIR%/}
site_url=$(node -e 'console.log(new URL(process.argv[1]).origin)' "$DEPLOY_SITE_URL")
health_url=$(node -e '
  const host = ["0.0.0.0", "::"].includes(process.argv[1]) ? "127.0.0.1" : process.argv[1];
  console.log(new URL("http://" + (host.includes(":") ? "[" + host + "]" : host) + ":" + process.argv[2] + "/ru/docs").href);
' "$DEPLOY_BIND_HOST" "$DEPLOY_PORT")
target="$DEPLOY_USER@$DEPLOY_HOST"
ssh_options=(-o BatchMode=yes -o PreferredAuthentications=publickey)
local_stage=$(mktemp -d)
trap 'rm -r -- "$local_stage"' EXIT

echo "Checking Node.js on $target..."
ssh "${ssh_options[@]}" "$target" "'$DEPLOY_NODE_BIN' -e 'if (parseInt(process.versions.node) < 24) { console.error(process.version); process.exit(1); } console.log(process.version);'"

echo 'Building locally...'

npm run build
cp deploy/start.sh "$local_stage/start.sh"
sed -e "s|DEPLOY_DESTINATION_DIR|$DEPLOY_DESTINATION_DIR|g" \
    -e "s|DEPLOY_NODE_BIN|$DEPLOY_NODE_BIN|g" \
    -e "s|DEPLOY_SERVICE_NAME|$DEPLOY_SERVICE_NAME|g" \
    deploy/viaprofit.uikit.service > "$local_stage/$DEPLOY_SERVICE_NAME.service"
printf 'SITE_URL=%s\nHOST=%s\nPORT=%s\n' "$site_url" "$DEPLOY_BIND_HOST" "$DEPLOY_PORT" > "$local_stage/.env"
tar -czf "$local_stage/ui-kit.tar.gz" dist
checksum=$(sha256sum "$local_stage/ui-kit.tar.gz")
checksum=${checksum%% *}

echo "Uploading to $target:$DEPLOY_DESTINATION_DIR..."
ssh "${ssh_options[@]}" "$target" "mkdir -p '$DEPLOY_DESTINATION_DIR'"
remote_stage=$(ssh "${ssh_options[@]}" "$target" "mktemp -d '$DEPLOY_DESTINATION_DIR/.deploy.XXXXXXXX'")
[[ $remote_stage == "$DEPLOY_DESTINATION_DIR"/.deploy.* ]]
[[ ${remote_stage##*/} =~ ^\.deploy\.[a-zA-Z0-9]{8}$ ]]
scp "${ssh_options[@]}" deploy/publish.sh "$local_stage/ui-kit.tar.gz" "$local_stage/start.sh" "$local_stage/.env" \
    "$local_stage/$DEPLOY_SERVICE_NAME.service" "$target:$remote_stage/"

ssh "${ssh_options[@]}" "$target" "bash '$remote_stage/publish.sh' '$remote_stage' '$DEPLOY_DESTINATION_DIR' '$checksum' '$DEPLOY_SERVICE_NAME' '$DEPLOY_NODE_BIN'"
printf 'Restart manually on %s: sudo systemctl restart %s\n' "$DEPLOY_HOST" "$DEPLOY_SERVICE_NAME"
printf 'After restarting, check on the server: curl --fail %s\n' "$health_url"
