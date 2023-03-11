module.exports = {
  compilerOptions: {
    plugins: [
      {
        transform: 'typescript-transform-paths',
        afterDeclarations: true,
      },
      // {
      //   "name": "typescript-plugin-css-modules"
      // }
    ],
    // "checkJs": false,
    /* Language and Environment */
    target: 'ES5',
    jsx: 'react',
    jsxFactory: 'CompileMaster.createElement',
    module: 'ES6' /* Specify the root folder within your source files. */,
    moduleResolution:
      'node' /* Specify how TypeScript looks up a file from a given module specifier. */,
    baseUrl: '.' /* Specify the base directory to resolve non-relative module names. */,
    paths: {
      '@/app/*': ['src/app/*'],
      '@/pages/*': ['src/pages/*'],
      '@/shared/*': ['src/shared/*'],
      '@/entities/*': ['src/entities/*'],
      '@/styles/*': ['src/styles/*'],
      '@/static/*': ['src/static/*'],
      '@/types/*': ['src/types/*'],
      '@/widgets/*': ['src/widgets/*'],
      '@/utils/*': ['src/utils/*'],
      '@/core/*': ['src/core/*'],
      '@/store/*': ['src/store/*'],
      '@/http/*': ['src/http/*'],
      '@/api/*': ['src/api/*'],
      '@/service/*': ['src/service/*'],
    } /* Specify a set of entries that re-map imports to additional lookup locations. */,
    /* Only output d.ts files and not JavaScript files. */
    sourceMap: true /* Create source map files for emitted JavaScript files. */,
    /* Allow 'import x from y' when a module doesn't have a default export. */
    esModuleInterop: true,
    forceConsistentCasingInFileNames: true /* Ensure that casing is correct in imports. */,
    /* Type Checking */
    skipLibCheck: true /* Skip type checking all .d.ts files. */,
    // "isolatedModules": true
  },
}
