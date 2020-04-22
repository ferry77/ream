/** 
 * Replaced by webpack at build time
 * THe absolute to .ream folder
 */
declare const __REAM_BUILD_DIR__: string

/**
 * Replaced by webpack at build time
 */
declare const __DEV__: string

declare const __non_webpack_require__: (mod: string) => any

declare const __REAM_SERVER_VERSION__: string

declare module 'sirv' {
  const sirv: (dir: string, opts?: {
    maxAge?: number
    dev?: boolean
    immutable?: boolean
    etag?: boolean
    extensions?: string[]
    onNoMatch?: () => void
  }) => any
  export default sirv
}