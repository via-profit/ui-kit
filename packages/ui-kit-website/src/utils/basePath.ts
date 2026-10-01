/**
 * The path the site is served from, with the trailing slash: `/` or `/ui-kit/` on GitHub Pages
 * (the `SITE_BASE_PATH` environment variable of the build, injected at build time)
 */
export const SITE_BASE_PATH: string = process.env.SITE_BASE_PATH || '/';

/**
 * The basename for the router: the base path without the trailing slash
 */
export const ROUTER_BASENAME = SITE_BASE_PATH.replace(/\/$/, '') || '/';

export default SITE_BASE_PATH;
