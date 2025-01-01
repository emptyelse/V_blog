import { defineConfig } from 'vitepress'
import { groupIconMdPlugin, groupIconVitePlugin } from 'vitepress-plugin-group-icons'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MY blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '笔记', link: '/markdown/OpenCourse/CS106B/CS106B_InFo.md'}
    ],

    sidebar: [
      {
        text:"Computer",
        collapsed: false,
        items:[
          {text:'Modern C++',
            collapsed:false,
            items:[
              {text:'智能指针',link:'/markdown/Computer/C++/Modern_C++/智能指针.md'},
              {text:'oop概述',link:'/markdown/Computer/C++/Modern_C++/oop概述.md'},
              {text:'友元_继承_多态',link:'/markdown/Computer/C++/Modern_C++/友元_继承_多态.md'},
            ]
          }
        ]
      },
      {
        text: 'OpenCourse',
        collapsed: true,
        items: [
          {text:'CS106B',
            collapsed:true,
            items:[
              {text:'CS106简介',link:'/markdown/OpenCourse/CS106B/CS106B_InFo.md'},
              {text:'Assignment0',link:'/markdown/OpenCourse/CS106B/Assignment0.md'},
              {text:'Assignment1',link:'/markdown/OpenCourse/CS106B/Assignment1.md'},
            ]
          }
        ],
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    search: {
      provider: 'local'
    },
    outline: {
      level: [2,3]
    }
  },
  lastUpdated: true,
  markdown: {
    config(md){
      md.use(groupIconMdPlugin)
    },
  },
  vite: {
    plugins:[
      groupIconVitePlugin(),
    ],
  },
})
