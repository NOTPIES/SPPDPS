export const PROJECT_NAME = process.env.PROJECT_NAME ?? "SPPDPS"; // Default prefix for the logger module.
export const BODY_SIZE_LIMIT = process.env.BODY_SIZE_LIMIT ?? "10mb"; // Doesn't accept requests with body sizes larger than this value.
export const SERVER_URL = process.env.SERVER_URL ?? "localhost"; // The server's URL. Not used for a lot by default.
export const IS_HTTPS = process.env.IS_HTTPS ?? SERVER_URL !== "localhost";
export const SHOW_PORT = (process.env.SHOW_PORT ?? "false") == "true"
export const PORT = process.env.PORT ?? 80; // Port for the server to run on.
export const ENDPOINT_AUTHENTICATION_ENABLED = !!process.env.ENDPOINT_AUTHENTICATION; // Whether the server is locked down behind a header.
export const _ENDPOINT_AUTHENTICATION_ENV = process.env.ENDPOINT_AUTHENTICATION;
export const ENDPOINT_AUTH_HEADER = _ENDPOINT_AUTHENTICATION_ENV?.split(":")[0]; // Header name for endpoint auth.
export const ENDPOINT_AUTH_VALUE = _ENDPOINT_AUTHENTICATION_ENV?.split(":")[1]; // Value of the header for endpoint auth.
export const FULL_SERVER_ROOT = `http${IS_HTTPS ? "s" : ""}://${SERVER_URL}${(SHOW_PORT ? `:${PORT}` : "")}`; // A shortcut so that you don't need to type this out every time you wanna display the server URL.

export const ENVIRONMENT = process.env.ENVIRONMENT ?? "develop";
export const IS_DEBUG = ENVIRONMENT.toLowerCase().includes("develop") || ENVIRONMENT.toLowerCase().includes("stage"); // IS_DEBUG can be used to enable test endpoints, unsafe code and more.