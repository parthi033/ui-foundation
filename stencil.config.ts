import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'ui-foundation',
  plugins: [
    sass({
      injectGlobalPaths: ['src/global/_tokens.scss']
    })
  ],
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: '../node_modules/@fortawesome/fontawesome-free/css/all.min.css',
          dest: 'fontawesome/css/all.min.css'
        },
        {
          src: '../node_modules/@fortawesome/fontawesome-free/webfonts',
          dest: 'fontawesome/webfonts'
        }
      ]
    },
  ],
  testing: {
    browserHeadless: "shell",
  },
};
