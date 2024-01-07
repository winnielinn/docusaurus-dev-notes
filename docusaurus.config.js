// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Winnie\'s Tech Notes ',
  tagline: 'Record my learning process',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://winnielin-tech.vercel.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/winnielinn/docusaurus-dev-notes/tree/main',
          showLastUpdateTime: true,
          remarkPlugins: [
            [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
          ],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: '',
      navbar: {
        title: 'WINNIE',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Notes',
          },
        ],
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      algolia: {
        apiKey: '95effdf4b82c703e5f70dfc9fcad07b2',
        appId: '1UQ8TC1THD',
        indexName: 'winnie-tech-notes'
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Hello World',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Github',
                href: 'https://github.com/winnielinn',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/winnie-lin-8a8924228/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Mail',
                href: 'mailto:yaysa903@gmail.com',
              },
              {
                label: 'Medium',
                href: 'https://medium.com/@winnie_lin',
              },
              // {
              //   label: 'CakeResume',
              //   href: '',
              // }
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Winnie. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        magicComments: [
          {
            className: "theme-code-block-highlighted-line",
            line: "highlight",
            block: { start: "highlight-start", end: "highlight-end" },
          },
          {
            className: "code-block-error-line",
            line: "error",
          },
        ],
        additionalLanguages: ['JSON', 'Bash', 'Git', 'PHP', 'SQL']
      },
    }),
};

export default config;
