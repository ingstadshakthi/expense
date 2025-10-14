declare module "next-pwa" {
  import type { NextConfig } from "next";

  /**
   * Options supported by next-pwa
   * (based on official next-pwa documentation)
   */
  interface PWAOptions {
    /**
     * The directory where the generated service worker and other files are stored.
     * Usually "public".
     */
    dest?: string;

    /**
     * Disable PWA in certain environments (e.g., development).
     */
    disable?: boolean;

    /**
     * Automatically register the service worker.
     */
    register?: boolean;

    /**
     * Activate the new service worker immediately after installation.
     */
    skipWaiting?: boolean;

    /**
     * Fallback for the app shell in offline mode.
     */
    fallbacks?: Record<string, string>;

    /**
     * Patterns to exclude from being precached.
     */
    buildExcludes?: RegExp[];

    /**
     * Define custom runtime caching strategies.
     */
    runtimeCaching?: Array<Record<string, unknown>>;

    /**
     * Enable/disable additional debugging information.
     */
    debug?: boolean;

    /**
     * Path to the service worker file.
     */
    sw?: string;

    /**
     * Path to custom workbox configuration file.
     */
    workboxOptions?: Record<string, unknown>;
  }

  /**
   * next-pwa plugin function
   */
  function withPWA(options?: PWAOptions): (config: NextConfig) => NextConfig;

  export default withPWA;
}
