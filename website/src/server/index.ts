import { createReadStream, readFileSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { pipeline } from 'node:stream/promises';

import { themeCookie } from '~/providers/UiProvider';
import { defaultLocale, getPathLocale } from '~/utils/locale';
import {
  discoveryContentTypes,
  getSiteOrigin,
  isDiscoveryPath,
  loadMarkdownPage,
  renderDiscovery,
} from './discovery';
import { renderHtml } from './render-html';

const publicDir = join(__dirname, 'public');
const scripts: string[] = JSON.parse(readFileSync(join(publicDir, 'entrypoints.json'), 'utf8'));
const port = Number(process.env.PORT || 8080);
const host = process.env.HOST || '0.0.0.0';

const server = createServer(async (req, res) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  if (!req.url?.startsWith('/') || /^\/[\\/]/.test(req.url)) {
    res.writeHead(400).end();
    return;
  }

  const url = new URL(req.url, 'http://localhost');
  const { pathname, search } = url;

  try {
    if (isDiscoveryPath(pathname)) {
      const body = await renderDiscovery(pathname, getSiteOrigin(req.headers.host, port));
      res.writeHead(200, {
        'Content-Type': discoveryContentTypes[pathname],
        'Content-Length': Buffer.byteLength(body),
        'Cache-Control': 'no-cache',
      });
      res.end(req.method === 'HEAD' ? undefined : body);
      return;
    }

    if (pathname === '/favicon.svg' || pathname === '/public' || pathname.startsWith('/public/')) {
      const favicon = pathname === '/favicon.svg';
      const match = pathname.match(/^\/public\/js\/([\w.-]+\.js(?:\.LICENSE\.txt)?)$/);
      if (!favicon && !match) {
        res.writeHead(404).end();
        return;
      }

      const file = favicon ? join(publicDir, 'favicon.svg') : join(publicDir, 'js', match![1]);
      const info = await stat(file).catch(() => null);
      if (!info?.isFile()) {
        res.writeHead(404).end();
        return;
      }

      const contentType = favicon
        ? 'image/svg+xml'
        : file.endsWith('.js')
          ? 'text/javascript; charset=utf-8'
          : 'text/plain; charset=utf-8';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': info.size,
        'Cache-Control': favicon ? 'no-cache' : 'public, max-age=31536000, immutable',
      });

      if (req.method === 'HEAD') {
        res.end();
      } else {
        await pipeline(createReadStream(file), res);
      }
      return;
    }

    const markdown = loadMarkdownPage(pathname);
    if (markdown) {
      const body = await markdown;
      res.writeHead(200, {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Content-Length': Buffer.byteLength(body),
        'Cache-Control': 'no-cache',
      });
      res.end(req.method === 'HEAD' ? undefined : body);
      return;
    }

    const locale = getPathLocale(pathname);
    if (!locale) {
      res.writeHead(308, { Location: `/${defaultLocale}${pathname}${search}` }).end();
      return;
    }

    const theme = req.headers.cookie
      ?.split(';')
      .some(value => value.trim() === `${themeCookie}=light`)
      ? 'light'
      : 'dark';
    const page = await renderHtml(url, locale, theme, scripts);
    res.writeHead(page.status, Object.fromEntries(page.headers));
    res.end(req.method === 'HEAD' ? undefined : await page.text());
  } catch (error) {
    if (!res.headersSent) {
      console.error(error);
      res
        .writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
        .end('Internal Server Error');
    } else {
      res.destroy();
    }
  }
});

server.listen(port, host, () => {
  const address = server.address();
  if (address && typeof address !== 'string') {
    console.log(`UI Kit SSR listening on ${host}:${address.port}`);
  }
});
