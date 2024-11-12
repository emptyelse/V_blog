import { defineConfig } from 'vitepress'
import fs from 'fs';
import path from 'path';

function generateSidebar(dirPath: string): any[] {
  const files = fs.readdirSync(dirPath);  // 读取目录内容
  const sidebar: any[] = [];

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);  // 获取完整文件路径
    const stat = fs.statSync(fullPath);  // 获取文件状态
    if (stat.isDirectory()) {
      // 如果是文件夹，递归调用
      sidebar.push({
        text: file.charAt(0).toUpperCase() + file.slice(1),  // 文件夹名作为标题
        items: generateSidebar(fullPath),  // 递归生成子文件夹的侧边栏
        collapsed: false,
      });
    } else if (file.endsWith('.md')) {
      // 如果是 Markdown 文件，加入到侧边栏
      const relativePath = path.relative(path.resolve(__dirname, 'docs'), fullPath);  // 相对路径
      sidebar.push({
        text: file.replace(/\.md$/, ''),  // 文件名作为标题
        link:relativePath,
      });
    }
  });
  return sidebar;
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "MY blog",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: generateSidebar('./docs/markdown'),

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     collapsed: false,
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ],
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
