const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const path = require('node:path');

/**
 * Production smoke test: start the actual bundle on a free port, check every
 * published page and its Markdown, redirects, themes, discovery, 404 and assets.
 * No dependencies and no requests to deployment hosts.
 */
const main = async () => {
  const server = spawn(process.execPath, [path.resolve(__dirname, '../dist/server.cjs')], {
    env: { ...process.env, HOST: '127.0.0.1', PORT: '0', SITE_URL: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let stderr = '';
  server.stderr.on('data', chunk => {
    stderr += chunk;
  });
  const exit = once(server, 'exit');

  try {
    const base = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('SSR server startup timed out')), 10000);
      const done = () => clearTimeout(timeout);
      server.once('error', error => {
        done();
        reject(error);
      });
      server.once('exit', code => {
        done();
        reject(new Error(`SSR server exited: ${code}\n${stderr}`));
      });
      let output = '';
      server.stdout.on('data', chunk => {
        output += chunk;
        const port = output.match(/listening on 127\.0\.0\.1:(\d+)/)?.[1];
        if (port) {
          done();
          resolve(`http://127.0.0.1:${port}`);
        }
      });
    });
    const request = (url, options) =>
      fetch(`${base}${url}`, {
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
        ...options,
      });

    const sitemap = await (await request('/sitemap.xml')).text();
    const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
      match => new URL(match[1]).pathname,
    );
    assert(paths.length > 40, 'Sitemap should list the component pages');
    assert(
      paths.every(value => value.startsWith('/ru')),
      'Untranslated locale must not be indexed',
    );

    for (const page of paths) {
      const response = await request(page);
      assert.equal(response.status, 200, page);
      const html = await response.text();
      assert(html.includes('<html lang="ru">'), `${page}: Russian document`);
      assert(/<h1[ >]/.test(html), `${page}: server-rendered heading`);
      assert(html.includes('data-emotion='), `${page}: server-rendered CSS`);
      assert(!html.includes('Не удалось загрузить страницу'), `${page}: route loaded`);
      assert(!/<Example\w+/i.test(html), `${page}: examples must render, not remain raw tags`);
      if (page.includes('/docs')) {
        const markdown = await request(`${page}.md`);
        assert.equal(markdown.status, 200, `${page}.md`);
        assert(markdown.headers.get('content-type').startsWith('text/markdown'));
        assert((await markdown.text()).length > 100);
      }
    }

    for (const page of ['/', '/docs/button?check=1']) {
      const response = await request(page);
      assert.equal(response.status, 308);
      assert.equal(response.headers.get('location'), `/ru${page}`);
    }
    const en = await request('/en/docs/button');
    assert.equal(en.status, 200);
    assert((await en.text()).includes('<html lang="ru">'));
    assert.equal((await request('/ru/docs/missing')).status, 404);
    assert.equal((await request('/ru/missing')).status, 404);
    assert.equal((await request('/ru/docs/button', { method: 'POST' })).status, 405);
    assert.equal((await request('/public/missing.js')).status, 404);
    const head = await request('/ru/docs/button', { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
    const light = await (
      await request('/ru/docs/button', {
        headers: { Cookie: 'ui-kit-theme=light' },
      })
    ).text();
    assert(light.includes('data-theme="light"'));
    assert(light.includes('Нажато:'));
    assert(/disabled=""[^>]*|disabled/.test(light), 'EN switch is disabled');
    const scripts = [...light.matchAll(/<script[^>]+src="([^"]+)"/g)].map(match => match[1]);
    assert(scripts.length > 0);
    for (const script of scripts) {
      const asset = await request(script);
      assert.equal(asset.status, 200, script);
      assert(asset.headers.get('content-type').startsWith('text/javascript'));
    }
    for (const endpoint of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/favicon.svg']) {
      const response = await request(endpoint);
      assert.equal(response.status, 200, endpoint);
      assert((await response.text()).length > 50, endpoint);
    }
    assert.equal(stderr, '', 'SSR server must not emit warnings or errors');
    console.log(
      `SSR passed: ${paths.length} pages, Markdown, redirects, themes, 404, assets and discovery`,
    );
  } finally {
    server.kill('SIGTERM');
    await exit;
  }
};

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
