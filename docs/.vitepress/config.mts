import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SCIENTRY",
  description: "Scientific Entry System - Flexible, spreadsheet-inspired data management system",
  base: '/lims/', // For GitHub Pages deployment
  ignoreDeadLinks: true, // Ignore dead links for now
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'SCIENTRY',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'User Guide', link: '/user-guide/' },
      { text: 'Developer Guide', link: '/developer-guide/' },
      { text: 'Deployment', link: '/deployment' }
    ],

    sidebar: {
      '/user-guide/': [
        {
          text: 'User Guide',
          items: [
            { text: 'Overview', link: '/user-guide/' },
            { text: 'Projects', link: '/user-guide/projects' },
            { text: 'Models', link: '/user-guide/models' },
            { text: 'Records', link: '/user-guide/records' },
            { text: 'Links', link: '/user-guide/links' },
            { text: 'Access Control', link: '/user-guide/access-control' },
          ]
        }
      ],
      '/developer-guide/': [
        {
          text: 'Developer Guide',
          items: [
            { text: 'Overview', link: '/developer-guide/' },
            { text: 'API Reference', link: '/developer-guide/api-reference' },
            { text: 'Schema Reference', link: '/developer-guide/schema' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/guigolab/scientry' }
    ],

    footer: {
      copyright: 'Copyright © 2024-present Emilio Righi'
    }
  }
})
