#!/usr/bin/env bash
set -euo pipefail
stage=$1
destination=$2
checksum=$3
service=$4
node_bin=$5
finish() {
  local result=$?
  if (( result == 0 )); then
    rm -r -- "$stage"
  else
    echo "Deployment failed. Uploaded files and previous dist are preserved in $stage." >&2
  fi
}
trap finish EXIT

printf '%s  %s\n' "$checksum" "$stage/ui-kit.tar.gz" | sha256sum --check
if [[ ! -x $node_bin ]]; then
  echo "Node.js executable not found at $node_bin. Check DEPLOY_NODE_BIN." >&2
  exit 1
fi
if [[ $("$node_bin" -p 'Number(process.versions.node.split(".")[0]) >= 24') != true ]]; then
  echo "Node.js 24 or newer required. $node_bin is $("$node_bin" -v). Check DEPLOY_NODE_BIN." >&2
  exit 1
fi
tar -xzf "$stage/ui-kit.tar.gz" -C "$stage"
test -f "$stage/dist/server.cjs"
test -f "$stage/dist/public/entrypoints.json"

# The unit runs as web. The deployment directory must be readable by that user.
chmod -R a+rX "$stage/dist"
if ! cmp -s "$stage/$service.service" "$destination/$service.service"; then
  install -m 0644 "$stage/$service.service" "$destination/$service.service"
  echo "Unit file updated. Run sudo systemctl daemon-reload before restarting if it is linked from /etc/systemd/system."
fi
if [[ -d $destination/dist ]]; then
  mv "$destination/dist" "$stage/previous-dist"
fi
mv "$stage/dist" "$destination/dist"
install -m 0755 "$stage/start.sh" "$destination/start.sh"
install -m 0644 "$stage/.env" "$destination/.env"
echo "Files published to $destination."
