const DEFAULT_BOOKMARKS = [
  {
    id: '96',
    name: '掘金',
    url: 'https://juejin.cn/',
    icon: 'https://infinityicon.infinitynewtab.com/user-share-icon/534995dd434a6e0e39a4521a5fe04f8e.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
    description: '开发者社区',
    label: '前端',
    sticky: '1',
  },
  {
    id: '97',
    name: 'React文档',
    url: 'https://zh-hans.reactjs.org/',
    icon: 'http://124.223.24.47:7001/public/images/upload_1656408805366.0.9097177715084721.0.webp',
    description: 'React文档',
    label: 'React',
    sticky: '1',
  },
  {
    id: '98',
    name: 'Ant Design',
    url: 'https://ant.design/index-cn',
    icon: '/public/images/upload_1656408833830.0.8245794872027508.0.webp',
    description: 'React组件库',
    label: 'React',
    sticky: '0',
  },
  {
    id: '99',
    name: 'ahooks',
    url: 'https://ahooks.js.org/zh-CN',
    icon: '/public/images/upload_1656408858167.0.5408010117336419.0.webp',
    description: 'React hooks 库',
    label: 'React',
    sticky: '0',
  },
  {
    id: '100',
    name: 'Vue2文档',
    url: 'https://v2.cn.vuejs.org/v2/guide/',
    icon: 'http://124.223.24.47:7001/public/images/upload_1656664029735.0.9179732604067081.0.png',
    description: 'Vue2文档',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '101',
    name: 'Vue3文档',
    url: 'https://staging-cn.vuejs.org/',
    icon: '/public/images/upload_1656664029735.0.9179732604067081.0.png',
    description: 'Vue3文档',
    label: 'Vue',
    sticky: '1',
  },
  {
    id: '102',
    name: 'Element Plus',
    url: 'https://element-plus.org/zh-CN/',
    icon: 'https://element-plus.org/images/element-plus-logo.svg',
    description: '基于 Vue 3，面向设计师和开发者的组件库',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '103',
    name: 'Element',
    url: 'https://element.eleme.cn/#/zh-CN',
    icon: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjMwcHgiIGhlaWdodD0iMzBweCIgdmlld0JveD0iMCAwIDM4IDQ4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0MCAoMzM3NjIpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPlNoYXBlIENvcHk8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0idjIuMi4wIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i6aaW6aG1Lem7mOiupOaViOaenC1jb3B5LTIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC03MC4wMDAwMDAsIC0xOS4wMDAwMDApIiBmaWxsPSIjNDA5RUZGIj4KICAgICAgICAgICAgPHBhdGggZD0iTTIxMi4xMzU0NDEsNDUuMTU3ODA3NyBaIE0xMDMuNDE2NTAyLDQ2LjIxNzU1MTEgQzEwMy40MDcwMDgsNDcuNzk0NTY4MiAxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgMTAyLjU4Nzg0MSw0OC4xNDYzNDc0IEMxMDIuNTg3ODQxLDQ4LjE0NjM0NzQgODguNDUyMDQ3OCw1Ni4zMTQ1MDg3IDg3LjUzMjk5NTYsNTYuODI2Mjc1MSBDODYuNjIyMzM2LDU3LjIxNzE1NjEgODYuMDEzNjcwMyw1Ni44MjYyNzUxIDg2LjAxMzY3MDMsNTYuODI2Mjc1MSBDODYuMDEzNjcwMyw1Ni44MjYyNzUxIDcxLjIyMjU3MDYsNDguMjQ3OTU3MiA3MC42ODI2OTYyLDQ3Ljg3MDg0NDQgQzcwLjE0MjY4NDMsNDcuNDkzNzMxNiA3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTMwMTY0Myw0Ni45MDYzNzc0IEM3MC4xMzAxNjQzLDQ2LjkwNjM3NzQgNzAuMTQ1MDIzMiwyOS45MTk5MTc0IDcwLjEzMDE2NDMsMjkuMTMzMzM2NCBDNzAuMTE1MzA1MywyOC4zNDY2MTc3IDcxLjA5Njk1NzYsMjcuNzU1NTQ2MSA3MS4wOTY5NTc2LDI3Ljc1NTU0NjEgTDg1Ljg3NTUzNzMsMTkuMjEzNDM4NyBDODYuNzg1MzcxNCwxOC43MzMyMDE2IDg3LjY3MTEyODYsMTkuMjEzNDM4NyA4Ny42NzExMjg2LDE5LjIxMzQzODcgQzg3LjY3MTEyODYsMTkuMjEzNDM4NyAxMDAuNzI2NjIzLDI2LjgwMjA5MzcgMTAyLjE3MzQ0MiwyNy42MTc3MjU3IEMxMDMuNTkxNTA3LDI4LjI5MTk1NzcgMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MTY1MDIsMjkuNjg0MzQyNCBDMTAzLjQxNjUwMiwyOS42ODQzNDI0IDEwMy40MjUzMDcsNDQuNzUxOTE5MiAxMDMuNDE2NTAyLDQ2LjIxNzU1MTEgTDEwMy40MTY1MDIsNDYuMjE3NTUxMSBaIE05Ny41MTYwMTA1LDI5LjE2OTEzMzkgQzk0LjQ5MDAxNzMsMjcuNDI3NDQ4MyA4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODcuMzYxNTg0MiwyMy4yOTcxMDYzIEM4Ny4zNjE1ODQyLDIzLjI5NzEwNjMgODYuNjY2MTAzOSwyMi45MjEyMzI2IDg1Ljk1MTc3NDcsMjMuMjk3MTA2MyBMNzQuMzQ4NzQwNiwyOS45ODIxNSBDNzQuMzQ4NzQwNiwyOS45ODIxNSA3My41NzgwMDI1LDMwLjQ0NDkwMTQgNzMuNTg5Njk3LDMxLjA2MDQ4MDUgQzczLjYwMTM5MTUsMzEuNjc2MDU5NyA3My41ODk2OTcsNDQuOTY5ODcwOCA3My41ODk2OTcsNDQuOTY5ODcwOCBDNzMuNTg5Njk3LDQ0Ljk2OTg3MDggNzMuNTk5NDY1NCw0NS40Mjk1OTMyIDc0LjAyMzQ5NTEsNDUuNzI0NjQ3MiBDNzQuNDQ3Mzg3Myw0Ni4wMTk3MDExIDg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni4wNjAxODk4LDUyLjczMzI0NTEgQzg2LjA2MDE4OTgsNTIuNzMzMjQ1MSA4Ni41MzgxNTIsNTMuMDM5MTc1OSA4Ny4yNTMwMzE1LDUyLjczMzI0NTEgQzg3Ljk3NDY1MjYsNTIuMzMyNzI2MiA5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuMDczMDMzNSw0NS45NDAyNTgyIEM5OS4wNzMwMzM1LDQ1Ljk0MDI1ODIgOTkuNzE2MjMyNSw0NS42NjQ4OTI5IDk5LjcyMzY2MTksNDQuNDMwNzA1NiBDOTkuNzI1NzI1Nyw0NC4wNzQ3OTU5IDk5LjcyNjU1MTIsNDIuNjkzMjg4MSA5OS43MjY2ODg3LDQwLjk1NzUyMjkgTDg2LjY2MDA1MDIsNDguODc1MjM5NCBMODYuNjYwMDUwMiw0NS44NDYyMjEgQzg2LjY2MDA1MDIsNDQuNjAyMTIwNSA4Ny42MjMxMjg5LDQzLjc4MDk4MTEgODcuNjIzMTI4OSw0My43ODA5ODExIEw5OS4xODA3NjA3LDM2LjgxNjU3OTMgQzk5LjYxNjg5NzgsMzYuMzYxMTI1MSA5OS43MDY4NzY4LDM1LjYzMTU0NDcgOTkuNzI1NDUwNSwzNS4zNTU2Mjg3IEM5OS43MjUwMzc4LDM0LjA5MDQ2MjcgOTkuNzI0NDg3NCwzMi45ODUyODQxIDk5LjcyNDA3NDcsMzIuMjg1MTY3OCBMODYuNjYwMDUwMiw0MC4yMDEyMzIxIEw4Ni42NjAwNTAyLDM3LjAzNDUzMSBDODYuNjYwMDUwMiwzNS43OTA0MzA1IDg3LjQ4NTU0NjIsMzUuMjQ0NjU2NCA4Ny40ODU1NDYyLDM1LjI0NDY1NjQgTDk3LjUxNjAxMDUsMjkuMTY5MTMzOSBaIiBpZD0iU2hhcGUtQ29weSI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+',
    description:
      'Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '104',
    name: 'umi',
    url: 'https://umijs.org/',
    icon: 'http://124.223.24.47:7001data:image/png;base64,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',
    description: '企业级前端开发框架',
    label: 'React',
    sticky: '0',
  },
  {
    id: '105',
    name: 'npm',
    url: 'https://www.npmjs.com/',
    icon: '/public/images/upload_1656407682461.0.7821876288642555.0.png',
    description: '包管理工具',
    label: '前端',
    sticky: '1',
  },
  {
    id: '106',
    name: 'vite',
    url: 'https://vitejs.dev/',
    icon: 'https://vitejs.dev/logo.svg',
    description: '下一代的前端工具链',
    label: '前端',
    sticky: '0',
  },
  {
    id: '107',
    name: 'webpack',
    url: 'https://webpack.docschina.org/',
    icon: 'https://webpack.docschina.org/site-logo.1fcab817090e78435061.svg',
    description: '一个用于现代 JavaScript 应用程序的 静态模块打包工具',
    label: '前端',
    sticky: '0',
  },
  {
    id: '108',
    name: 'babel',
    url: 'https://www.babeljs.cn/',
    icon: 'https://www.babeljs.cn/img/babel.png',
    description: 'Babel 是一个 JavaScript 编译器',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '109',
    name: 'ES6 入门教程',
    url: 'https://es6.ruanyifeng.com/',
    icon: 'https://es6.ruanyifeng.com/favicon.ico',
    description:
      '《ECMAScript 6 入门教程》是一本开源的 JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '110',
    name: 'typescript',
    url: 'https://www.typescriptlang.org/',
    icon: '/public/images/upload_1656409024420.0.4809526579940224.0.webp',
    description: 'TypeScript is JavaScript with syntax for types.',
    label: 'javascript',
    sticky: '1',
  },
  {
    id: '111',
    name: 'Vant',
    url: 'https://vant-contrib.gitee.io/vant-weapp/#/home',
    icon: '/public/images/upload_1656408963357.0.9171348816176332.0.png',
    description: '轻量、可靠的小程序 UI 组件库',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '112',
    name: 'React Vant',
    url: 'https://github.com/3lang3/react-vant/blob/main/packages/react-vant/README.zh-CN.md',
    icon: '/public/images/upload_1656408922570.0.38256874335344304.0.png',
    description: ' 一个参照Vant打造的 React 框架移动端组件库',
    label: 'React',
    sticky: '0',
  },
  {
    id: '113',
    name: 'echarts',
    url: 'https://echarts.apache.org/zh/index.html',
    icon: 'https://fastly.jsdelivr.net/gh/apache/echarts-website@asf-site/zh/images/logo.png?_v_=20200710_1',
    description:
      '一个基于 JavaScript 的开源可视化图表库\r\n一个基于 JavaScript 的开源可视化图表库\r\n',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '114',
    name: 'threejs',
    url: 'https://threejs.org/',
    icon: '/public/images/upload_1656408990425.0.7552471507496623.0.webp',
    description: 'Three.js是基于原生WebGL封装运行的三维引擎',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '115',
    name: 'vueuse',
    url: 'https://vueuse.org/',
    icon: 'https://d33wubrfki0l68.cloudfront.net/1b822abb7d99b8e4d82f61385bf087eadcc9db14/eca9f/logo-vertical-dark.png',
    description: 'Collection of essential Vue Composition Utilities',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '116',
    name: 'Naive UI',
    url: 'https://www.naiveui.com/zh-CN/os-theme',
    icon: 'https://www.naiveui.com/assets/naivelogo.93278402.svg',
    description: '一个 Vue 3 组件库',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '117',
    name: 'Pinia',
    url: 'https://pinia.vuejs.org/',
    icon: 'https://pinia.vuejs.org/logo.svg',
    description: 'The Vue Store that you will enjoy using',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '118',
    name: 'Recoil',
    url: 'https://recoiljs.org/',
    icon: 'https://recoiljs.org/img/logo.svg',
    description: 'A state management library for React',
    label: 'React',
    sticky: '0',
  },
  {
    id: '119',
    name: 'StackBlitz',
    url: 'https://stackblitz.com/',
    icon: '/public/images/upload_1656408498462.0.2133632920369446.0.webp',
    description: 'Boot a fresh environment in milliseconds',
    label: '前端',
    sticky: '0',
  },
  {
    id: '120',
    name: '前端导航',
    url: 'https://www.kwgg2020.com/',
    icon: '/public/images/upload_1656408722673.0.0027720779287216946.0.webp',
    description: '一个前端导航收集网站',
    label: '前端',
    sticky: '0',
  },
  {
    id: '121',
    name: 'swift',
    url: 'https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html',
    icon: 'https://docs.swift.org/swift-book/_static/images/swift.svg',
    description:
      'Swift is a new programming language for iOS, macOS, watchOS, and tvOS app development.',
    label: '前端',
    sticky: '0',
  },
  {
    id: '122',
    name: 'flutter',
    url: 'https://flutter.dev/',
    icon: '/public/images/upload_1656409052014.0.941080008929174.0.webp',
    description: 'Build apps for any screen',
    label: '前端',
    sticky: '0',
  },
  {
    id: '123',
    name: 'jquery中文文档',
    url: 'https://www.jquery123.com/',
    icon: 'https://www.jquery123.com/assets/images/logo-jquery.png',
    description: 'jQuery 是一个高效、精简并且功能丰富的 JavaScript 工具库',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '124',
    name: 'codepng',
    url: 'https://www.codepng.app/?from=thosefree.com',
    icon: 'https://www.codepng.app/logo192.png',
    description: 'Turn your code into awesome pictures.',
    label: '设计',
    sticky: '0',
  },
  {
    id: '125',
    name: 'ray',
    url: 'https://ray.so/',
    icon: 'https://ray.so/img/icons/favicon-32x32.png',
    description: 'Create beautiful images of your code',
    label: '设计',
    sticky: '0',
  },
  {
    id: '126',

    name: 'midway',
    url: 'http://www.midwayjs.org/',
    icon: 'http://www.midwayjs.org/img/logo.svg',
    description: 'Node.js Framework',
    label: 'node',
    sticky: '0',
  },
  {
    id: '127',

    name: 'nestjs',
    url: 'https://nestjs.com/',
    icon: 'https://d33wubrfki0l68.cloudfront.net/e937e774cbbe23635999615ad5d7732decad182a/26072/logo-small.ede75a6b.svg',
    description:
      'A progressive Node.js framework for building efficient, reliable and scalable server-side applications',
    label: 'node',
    sticky: '0',
  },
  {
    id: '128',

    name: 'animate.css',
    url: 'https://animate.style/',
    icon: '/public/images/upload_1656671803409.0.4290558481583764.0.png',
    description: 'Just-add-water CSS animations',
    label: 'css',
    sticky: '0',
  },
  {
    id: '129',

    name: 'animista',
    url: 'https://animista.net/',
    icon: 'https://animista.net/favicon-32x32.png',
    description: 'CSS animations on demand',
    label: 'css',
    sticky: '0',
  },
  {
    id: '130',

    name: 'cubic-bezier',
    url: 'https://cubic-bezier.com',
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAeZJREFUSEtjZFi5s4GBkamegRbg/79GRoZVu//TwmyYmUPLAnkuDgYVHi6Gva/ewQOFqj5462/PkH72OsOaJ6+oa4EwGyvDLU8rhntfvzOY7jmFEqUU+8BTQphhg7U+w9JHLxiyz91g+P73H3UsALl6taUeg74AD4Pn4fMMMpwcDOueIoIGbyriZGZi8JQQwaoBpLFPX40hR0WWofvmA4bGa/cZouQkGLa/eMPw8scvjBSPNYjEOdgYmrSVwRGGDPylRBlWWeoynHz3icHr8HmGL3/+gqXrtZQYZtx7QrwF3CzMDHwsLAzPf/wEG8DBzMRw0MGEQYWHk8HxwFmGSx+/EJ03sfpAmYeT4cHXHwx///9nkOZkZ3jiY8sw9/4zhpQz14g2GG8c+EqJMmx+9ppBX4CX4YyLGYPR7pMMl0lwNbIrsPogUk6C4ez7TwwXXS0YJDYfYvj4+w/JLsfrA1MhPoZjTqYMKtuOMjz89oNsw0EaMXxgIMDLsN/BmCHp9DWG9VjSNam2YVgw01iTwVlMiEFl+1FSzcKqHsUCZkZGhq9BjgzK244yPP0OSaKUAhQLQMGzxlKPaq7HiIN1VnoMix++oErYY01FruJCDMfffoQXAZQGD9ZURA1DCWY0alrCSOtmCwCHvMh1HDRbNQAAAABJRU5ErkJggg==',
    description: '在线绘制贝塞尔曲线',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '131',

    name: 'neumorphism',
    url: 'https://neumorphism.io/',
    icon: 'https://neumorphism.io/android-chrome-192x192.png',
    description: 'Generate Soft-UI CSS code',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '132',

    name: 'universe.io',
    url: 'https://uiverse.io/',
    icon: 'https://uiverse.io/favicon-32x32.png',
    description: 'Universe of UI elements to\r\nhelp you stand out',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '133',

    name: '速写板',
    url: 'https://www.suxieban.com/#',
    icon: 'https://www.suxieban.com/favicon.ico',
    description: '在线速写板',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '134',

    name: 'happyhue',
    url: 'https://www.happyhues.co/',
    icon: 'https://assets.website-files.com/5dd40aa8049df8748c72d0ee/5dd9b92056a2d6ed5e537c61_happy-hues-apple-icon.png',
    description: '一个配色网站',
    label: '设计',
    sticky: '0',
  },
  {
    id: '135',

    name: 'colors.ichuantong',
    url: 'https://colors.ichuantong.cn/',
    icon: 'https://colors.ichuantong.cn/favicon-32x32.png',
    description: '中国传统颜色手册',
    label: '设计',
    sticky: '0',
  },
  {
    id: '136',

    name: 'webapps',
    url: 'https://123apps.com/',
    icon: 'https://123apps.com/static/i/v3/favicon.svg',
    description: 'webapp集合',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '137',

    name: 'webgradients',
    url: 'https://webgradients.com/',
    icon: 'https://webgradients.com/favicons/favicon-32x32.png',
    description:
      'WebGradients is a free collection of 180 linear gradients that you can use as content backdrops in any part of your website',
    label: '设计',
    sticky: '0',
  },
  {
    id: '138',

    name: 'removebg',
    url: 'https://www.remove.bg/zh',
    icon: 'https://www.remove.bg/favicon-32x32.png?v=YAXaAv7pao',
    description: '在线抠图',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '139',

    name: 'unsplash',
    url: 'https://unsplash.com/',
    icon: 'https://unsplash.com/favicon-32x32.png',
    description:
      'The internet’s source of freely-usable images.\nPowered by creators everywhere.',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '140',

    name: 'Regulex',
    url: 'https://jex.im/regulex',
    icon: '/public/images/upload_1656409078414.0.9205025883045663.0.webp',
    description: '可视化正则表达式',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '141',

    name: 'iodraw',
    url: 'https://www.iodraw.com/',
    icon: 'https://www.iodraw.com/img/common/iodraw.svg',
    description: '在线绘制流程图',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '142',

    name: 'cdnjs',
    url: 'https://cdnjs.com/',
    icon: '/public/images/upload_1656408772266.0.18278479218457244.0.webp',
    description:
      'cdnjs is a free and open-source CDN service trusted by over 12.5% of all websites, serving over 200 billion requests each month, powered by Cloudflare',
    label: '前端',
    sticky: '0',
  },
  {
    id: '143',

    name: 'devdocs',
    url: 'https://devdocs.io/',
    icon: 'https://devdocs.io/favicon.ico',
    description:
      'DevDocs combines multiple API documentations in a fast, organized, and searchable interface',
    label: '前端',
    sticky: '0',
  },
  {
    id: '144',

    name: 'picdiet',
    url: 'https://picdiet.eula.club/',
    icon: 'https://picdiet.eula.club/favicon.ico',
    description: '极速的在线图片压缩',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '145',

    name: 'tinypng',
    url: 'https://tinypng.com/',
    icon: 'https://tinypng.com/images/favicon.ico',
    description:
      'image compression\n',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '146',

    name: 'maynpixels',
    url: 'https://www.manypixels.co/gallery',
    icon: '/public/images/upload_1656420689964.0.6087293059925094.0.png',
    description: 'Free to use clip art images',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '147',

    name: 'undraw',
    url: 'https://undraw.co/',
    icon: 'https://undraw.co/favicon.ico',
    description: '免费的svg插图',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '148',

    name: 'error404',
    url: 'https://error404.fun/',
    icon: 'https://error404.fun/img/favicon.png',
    description: '404页面插图',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '149',

    name: 'squoosh',
    url: 'https://squoosh.app/',
    icon: "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20269.5%2081%22%3E%3Cstyle%3E%40font-face%7Bfont-family%3Afont%3Bfont-weight%3A700%3Bsrc%3Aurl(data%3Afont%2Fwoff%3Bbase64%2Cd09GMgABAAAAAASoAA4AAAAACOQAAARUAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhYbgnYcgXAGYABkEQwKhHiEFgsUAAE2AiQDJAQgBYJaByAbeQfIxId%2FN%2F1zb0JJk7qwVQyoSyhM6qJf2zN3wnP5MyX%2Fc6mabKKFAVwk4QDd%2B3f7Z41FoYvttryoVK6NsWls0wJjfeO38YjNiCJjtHr%2F1Q8CwAqDCAUBr2QweT2PEoyA1elzSuDRPDnUg8D2odZuRPU0jvQhDaxz5rMh0dmYGFMJs4nu1qE%2BeGjM%2FweALmNBwUEBOxTgRXxFMYpg%2F%2Fe8Ci0oLAD5Z%2Fl7jALyz0eIk0p5wwIKMGmoUVDk%2BI2Voc2UQOpf%2BV8SHykzsc2YglhhpAxij4qYCCDLLiZGpIxaxGLgdEfA8VXagNHBPOEGN4kdxIwSYCOPFjwtuDxUnqS%2BIGdGuWtrAgUsQYZRHpDu7Qiw6ukb7cWFrWzAQoFsxEIZPaFS7IAQDQ4cvEx4DjEL%2BW8XY9w93bi6CVjaTB8XOUO3aIVhv7jXI3UoIVGDVOAYRkFZmv6lSiyebcjPN%2BBqWJ91Zp43fwUwPxAfFchViYiY6etaTAWH6kKIhE7SgEaAL0DMDnZmf6FCMTrQj0EMY1SW726Rv5Tvki%2FJp%2FKJfCwf5XNoQXWWGi%2FLsNXQcgvxSnnJ8wFi43KUbaZAdno0JKEudnYudkHOvy6ZysqvkYTtt8jiu2VxJhNZfP99YVuKLLnyTX7rdSy8cT5WkrBgNPL1AkqEuyzOB%2BWZxXf5LSMoLzmnXHS9%2F9b7ZNHk7wAjFqQ3hMZy%2FnbFtQXbNAIRWP4jQ8kUVX7FG8L2Y4VH4%2FQvOjyltORefuthLJSWBnyUZCKMQBfeEbbfP3h5MvqPEuA12%2F1Or4a5yB8MYpzmv%2BDgZ3O9ntK5NjZdTEis7owRG%2FurcsYir%2B4JU2%2BcUdUY36zxbeoo1RsaBsJTkP7a8gPKCq64OCyytqmvKXVZE5mtjskqTmWW8Y3ttF43lZujm57W5%2BdN63XTObm6qWl9XsDErwGiVhMg%2FhoY%2BGugqNEE6n4NxH280sBFFITFZA%2FoMqby8zKmB3TZMfnqDC5tyrRUm%2FF7gKhWB4i%2FBfj%2FFiCq1QHi7%2F643nboYs9I1K%2FXB%2Fn%2F4eH%2B8COPf1aYl6yOya4KiL8ypq8%2FQso6O%2BHoL9pfsL%2FokJObGJlwoSkkBZds6wfb4pYDYzxCEjIL09ll83QG11IUGgUAAJrLVRQvuOTOlNTbpvzOCcwPZllp%2BcGK%2FbUffKT%2BwRxg%2FtrKyDwPAmVzJTtUmnnR%2FCa2bGU0B5hvtjI2u3ZLmoci%2FIQP0Fz40ipk0Hb402H4k7%2FhScuRQrJj7rXEg%2BBR85QaWsDzADqVUNUxBLbRYp0JnCMELkwBnsiOEWgYqDGjYaHCzRoFPPDyyy3gg68goh8DmMQQOtGODoxAhShEIBKx9DgD%2BtGPdvSgFSrkIAcitEolEz3oIVeRDxy%2B4lvVSiuGMEbLtUDr97BiNKIPw8hCvzLeYjOefMW4mq5hUSguFWNZnL3D6EQ%2F%2BtLPa3ktEYgO08G8O9bbQgkWAA%3D%3D)%20format('woff2')%7D%3C%2Fstyle%3E%3Ctext%20fill%3D%22%231F1F1F%22%20font-family%3D%22font%22%20font-size%3D%2250%22%20letter-spacing%3D%22-5%22%20transform%3D%22translate(92%2056.5)%22%3ESquoosh%3C%2Ftext%3E%3Cg%20transform%3D%22translate(4%203.7)%22%3E%3Ccircle%20cx%3D%2236.5%22%20cy%3D%2236.8%22%20r%3D%2237%22%20fill%3D%22%2340403F%22%20stroke%3D%22%234A494A%22%20stroke-width%3D%227%22%2F%3E%3Cpath%20fill%3D%22%23E17926%22%20d%3D%22m12.3%2020.6-1.1-1.4%202.2-1.3a6%206%200%200%200-1.1%202.7zm9.6%2016.7h-1.8l.3%201.3%201.8-.5c-.2-.2-.3-.5-.3-.8zm-.7%2012-.3.4-.1%201%20.3-.1%201.5-.4.1-2.1-1.5%201.2zm36.2-36.2A47.7%2047.7%200%200%200%2018.6%2015c1%20.1%202%20.3%202.9.7%201.4-.6%202.8-1.2%204.3-1.6%204.6-1.5%209.4-2.3%2014.3-2.4%205%200%2010%20.9%2014.8%202.5a75.5%2075.5%200%200%200-6.7%2021.3%2045.8%2045.8%200%200%200%201.9%2020.4%2036.3%2036.3%200%200%201-18.3%205.4%2032%2032%200%200%201-10.2-1.7c-.7.3-1.5.4-2.2.4l-.2.6c4%201.6%208.3%202.4%2012.6%202.5%207.1%200%2014-2.4%2020.6-6.4-5.4-13.5-2.6-28%205-43.6zm-40%2014.2-1.1-2.1-.5.9.7%201.3.9-.1z%22%2F%3E%3Cpath%20fill%3D%22%23F78F20%22%20d%3D%22M49.1%2035.5c1.2-7.6%203.6-15%207-21.9a46.2%2046.2%200%200%200-35.9%201.7c2.1.5%203.9%201.6%205.4%203.1l.3.3c.6.5.9%201.4.5%202.1a5.6%205.6%200%200%201-2.7%203.2c-1.5.7-3.3.8-4.8.3-.5-.1-1-.2-1.4-.1-.5.1-.9.5-1.1.9l1.1%202.1%202.2-.1c1.9-.1%203.7-.1%205.5.1.8.1%201.7.3%202.5.6l.9.5c.3.3.5.7.6%201%201.2%203.3-1.2%206.2-4.2%207.2-1.2.4-2.4.6-3.6.7H21l.2%201.1%202.1-.6%203-.6c.8-.1%202-.3%202.6.2.3.3.6.7.7%201.2l.9%202.2c.2.6.3%201.3.2%201.9-.2%201.1-.9%202-1.9%202.5-1.8%201-3.6%201.8-5.5%202.6l-1.4.8-.1%201.7c2.2-.6%204.5-.7%206.7-.3l1.2.4c.6.4%201%201.2%201%202s-.3%201.5-.7%202.2a9%209%200%200%201-4.8%203.8l-2.8.8c-.7.2-1.3.5-2%20.6v.1c3.7%201.4%207.6%202.1%2011.5%202.1A37%2037%200%200%200%2051.3%2056a39.6%2039.6%200%200%201-2.2-20.5z%22%2F%3E%3Cpath%20fill%3D%22%23FDCDA0%22%20d%3D%22M37.4%2029.1c1.4-.2%202.7-2%203.1-4.2s-.9-4-3-3.8-3.3%202.3-3%204.5%201.6%203.7%202.9%203.5z%22%2F%3E%3Cpath%20fill%3D%22%23E17827%22%20d%3D%22M44.6%2041c-3.8-2.5-5.6-6.6-8.6-10.9-2.8%205.1-4%2010.5-7.6%2014.5%206%20.4%2011.3-1.3%2016.2-3.6z%22%2F%3E%3Cpath%20fill%3D%22%23C86228%22%20d%3D%22M40%2048.3C35.1%2043.8%2033.2%2037%2025.9%2033c1.1%206.3%201.3%2011.7-2.7%2016.3a30%2030%200%200%200%2016.8-1z%22%2F%3E%3Cpath%20fill%3D%22none%22%20stroke%3D%22%23E17827%22%20stroke-miterlimit%3D%2210%22%20stroke-width%3D%224%22%20d%3D%22M46%2043a41%2041%200%200%201-23.8%203.9c1.4-8.1.2-15.9-5.3-23.1a53.9%2053.9%200%200%201%2032.6-5c-4%208.6-5.8%2016.7-3.5%2024.2z%22%2F%3E%3Cpath%20fill%3D%22%23C96328%22%20d%3D%22m27.2%2019.6-.1-.3-.1-.2-.7-.2H26l-.1-.2a11.7%2011.7%200%200%200-7-3.5%206%206%200%200%200-1.9%200c-2.7.7-4.9%204.3-4.6%207%20.3%201.8%201.6%202.8%202.9%204l.4.1c.4.1.6-.7.8-1%20.2-.5.6-.8%201.1-1l1.5.1c1.6.5%203.3.4%204.8-.2.5-.2.9-.5%201.2-.9.1%200%20.2%200%20.3-.2l.8-.7.4-.2c.3-.4.5-.9.6-1.4v-1.2zm10.3%2014.5.2-.4c1.2-2.4%202.7-4.6%204.7-6.4%201.8-1.9%203.6-3.5%206-4a11%2011%200%200%201%205.1%200c1%200%202.1.3%203.1.7.9.6%201.7%201.4%202.2%202.3%201.7%202.6%203.2%205.3%204.6%208.1.9%201.7%201.9%203.4%201.9%205.4%200%201.2-.3%202.4-.6%203.6-1%203.1-2.2%206.2-3.7%209.2a16%2016%200%200%201-5.7%207.3c-3.9%202.6-8.8%202.1-13.2%201.5-.7%200-6.9-.7-7-1.3%200-.3%202-1%202.2-1a17%2017%200%200%200%206.7-5.3c.6-.9%201-1.9%201.2-2.9.2-1.5.8-3%201.6-4.4.9-1.3%202-2.2%202-3.9l-.1-1.7c0-.6.3-1%20.9-1.4.6-.2.7%200%20.9-.4l.1-.4c.2-1.5.8-2.9%201.6-4.2a12%2012%200%200%201-6.4%205%209%209%200%200%201-5.1.6%204.6%204.6%200%200%201-3.7-3.3c0-.8.1-1.8.5-2.7zm-7.7-2.8V31l-.2-1.6a1%201%200%200%200-.5-.6h-.2c-.2-.3-.5-.5-.8-.6-.8-.3-1.6-.5-2.5-.6-1.8-.2-3.7-.2-5.5%200-1.9%200-3.5%200-5.1.8a6.4%206.4%200%200%200-2.7%204.3c-.3%201.5%200%203.1.9%204.4%201.5%202%204%202.6%206.3%201.7.1%200%20.3%200%20.4-.2l.3-.6c.3-.5%201.2-.3%201.7-.3%201.2%200%202.4-.3%203.6-.7%201.6-.6%203-1.7%203.9-3.2.1%200%20.2%200%20.3-.3l.1-.3.1-1.2-.1-.6zm2.3%2010c0-.9-.3-1.6-.6-2.2-.3-.4-.4-.9-.9-1l-.9.1-.3-.5c-.6-.6-1.8-.4-2.6-.3a31.3%2031.3%200%200%200-8.8%202.2c-1.7.6-3.5%201.2-4.7%202.6a6%206%200%200%200-1.4%202.1c-.5%202.2.1%205%202.3%206.1%201.4.6%202.9.7%204.4.4.8%200%201.5-.3%202.1-.8l.8-.8c.6-.6%201.3-1%202-1.3%201.9-.7%203.8-1.5%205.6-2.4%201-.5%201.7-1.4%202-2.5l.1-.4.5-.2c.2%200%20.4-.3.6-.5-.2%200-.1-.4-.2-.7zm-.6%2011c-.1-.6-.4-1.3-1-1.4h-.4l-.3-.3-1.2-.4c-2.4-.4-4.9-.3-7.3.4-2%20.6-5.7%202-5.9%204.4-.1%201%20.2%202%20.8%202.7.7%201.2%201.9%202%203.3%202.2%201%200%202.1-.3%203-.7%201-.3%201.9-.4%202.8-.8a9%209%200%200%200%204.5-3.4h.1c.5%200%20.9-.3%201.2-.6l.3-.5c.3-.4.3-1%20.1-1.6z%22%20opacity%3D%22.5%22%2F%3E%3Cpath%20fill%3D%22%23F7DDC4%22%20d%3D%22M25.7%2018.5a12.3%2012.3%200%200%200-7-3.5%204%204%200%200%200-1.9.1c-2.7.7-4.9%204.3-4.6%207%20.3%201.7%201.5%202.8%202.8%203.8l.4.2c.4.1.6-.7.8-1%20.3-.4.7-.8%201.1-.9.5-.1%201%200%201.4.1%201.6.5%203.3.4%204.9-.2a5.3%205.3%200%200%200%202.7-3.2c.2-.4.2-.8.1-1.2l-.6-.9-.1-.3z%22%2F%3E%3Cpath%20fill%3D%22%23EACEB1%22%20d%3D%22m23.7%2024.1.5-.3c-1.6-.2-2.2%200-2.6-.1s-1.7%200-2.2-.2-1.1-.1-1.5-.2l-1.8-.3c-.9-.1-1.7-.5-2.3-.1l-1%20.7a8%208%200%200%200%202.7%202.4c.4.1.6-.7.8-1%20.3-.4.7-.8%201.1-.9.5-.1%201%200%201.4.1%201.7.6%203.4.5%204.9-.1z%22%2F%3E%3Cpath%20fill%3D%22%23F8E9DB%22%20d%3D%22m26.6%2019.7-.6-.9-.3-.3a12.3%2012.3%200%200%200-7-3.5%204%204%200%200%200-1.9.1%204.4%204.4%200%200%200-2.2%204c.2%203.5.9%203.5%202.8%205.1.5-.1%201%200%201.4.1%201.6.5%203.3.4%204.9-.2a5.3%205.3%200%200%200%202.7-3.2c.2-.4.3-.8.2-1.2z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%2334B9EB%22%20d%3D%22M26.9%2019.2c-.3-.2-.5-.3-.8-.3l-.9-.3-1.5-.4c-1.2-.3-2.6-.6-3.7%200a2%202%200%200%200-1.1%201.5c-.1.6.1%201.2.5%201.6a5%205%200%200%200%201.8.9c1.1.5%202.3.8%203.5%201h.4l.2-.2c.4-.2.7-.5%201-.9.3-.4.5-.9.6-1.4l.1-1.1-.1-.4z%22%2F%3E%3Cpath%20fill%3D%22%23F7DDC4%22%20d%3D%22m63.3%2034.3-2.8-5.2-.5-.9-.2-.3-.4-.6-.2-.3-.6-.9c-.5-1-1.3-1.8-2.2-2.3-1-.4-2-.6-3.1-.7-1.7-.4-3.4-.4-5.1-.1a12%2012%200%200%200-6%204.1c-1.9%201.9-3.5%204-4.7%206.4l-.2.4c-.4.9-.5%201.9-.3%202.8.5%201.7%201.9%203%203.7%203.3H43c1-.1%202-.4%202.9-.8%202.6-.9%204.9-2.6%206.4-4.9l-1.1%202.1-.6%202.1-.1.4c-.2.3-.6.3-.9.4l-.3.2c-.3%205.9.7%2011.8%202.9%2017.2a45.5%2045.5%200%200%201-9.4%204.6c4.2.6%208.7.8%2012.4-1.6%202.7-1.8%204.4-4.5%205.7-7.4%201.4-3%202.6-6%203.6-9.2.4-1.2.6-2.4.6-3.6%200-1.8-1-3.5-1.8-5.2z%22%2F%3E%3Cpath%20fill%3D%22%23EACEB1%22%20d%3D%22M49.4%2041.2V44l.1.8v.2l.1%201%20.3%202.1v.2l.1.8.1.3.1.7.1.4.1.6.1.4.2.6.1.4.2.6.1.4.2.6.1.4.2.7.1.3.4%201-1.1.7-.1.1-.9.7-.1.1-1%20.6-.1.1-1%20.5-.2.1-1%20.5-.1.1-1%20.5-.1.1-1.1.4h-.1l-1.1.4c4.2.6%208.7.8%2012.4-1.6%201.1-.7%202.1-1.7%202.9-2.7a27.5%2027.5%200%200%200-9-15.9zm8.7-12c1.1-1.9.9-1.6.2-3.6a5.8%205.8%200%200%200-1.8-1.7%2079%2079%200%200%200-5-1%207.3%207.3%200%200%201%202.9%205.7c0%201.7-1.5%204.4-2.2%205.8s-3.7%207.3.6%201.9c1.3-1.7%202.9-2.7%203.8-4.3l1.5-2.8z%22%2F%3E%3Cpath%20fill%3D%22%23F8E9DB%22%20d%3D%22M53.4%2024.2c-.4-.4-1.2-1.3-1.8-1.5-1-.1-2%200-3%20.2-2.4.6-4.4%202.3-6%204.1-1.9%201.9-3.5%204-4.7%206.4l-.2.4c-.4.9-.5%201.9-.3%202.8a4.4%204.4%200%200%200%203.4%203.2c3.6-.2%206.9-1.8%209.4-4.3%204.1-4.1%205.4-9.1%203.2-11.3z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%239F87BF%22%20d%3D%22m42.2%2031-.9.6-2.1%201.8c-.7.6-1.7%201.2-2%202.2a3%203%200%200%200%20.1%201.6c.2.9.8%201.7%201.5%202.2%201.4.9%203%20.1%204.1-.8s2.4-1.6%203-2.9-.2-2.4-.9-3.3-1.6-1.7-2.7-1.4h-.1z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M45.3%2032.6%2038%2038.5l.8.8c1.4.9%203%20.1%204.1-.8s2.4-1.6%203-2.9c.6-.9%200-2.1-.6-3z%22%20opacity%3D%22.1%22%2F%3E%3Cpath%20fill%3D%22%23F7DDC4%22%20d%3D%22m28.5%2028.5-.9-.5c-.8-.3-1.6-.5-2.5-.6-1.8-.2-3.7-.2-5.5-.1-1.9%200-3.5%200-5.1.9a6.2%206.2%200%200%200-2.7%204.3c-.3%201.5%200%203.1.9%204.4%201.5%201.9%204%202.6%206.3%201.7l.4-.2.3-.6c.3-.5%201.2-.3%201.7-.3%201.2-.1%202.4-.3%203.6-.7%203-1.1%205.4-3.9%204.2-7.2a3%203%200%200%200-.7-1.1z%22%2F%3E%3Cpath%20fill%3D%22%23EACEB1%22%20d%3D%22M20.6%2039.8c.5-.1-.1-1.4-.5-2.2l-.2-.1c.4-.2%201.1-.1%201.5-.1%201.2-.1%202.4-.3%203.6-.7a7.3%207.3%200%200%200%203.3-2.4c-2.6-.3-3.8%202.2-7.8%201.8a36%2036%200%200%200-4.7.3c-1.5%200-2.7-.7-3.2.2l.1.2a5%205%200%200%200%203.4%202h.1l.9.1%203.2.8.3.1z%22%2F%3E%3Cpath%20fill%3D%22%23F8E9DB%22%20d%3D%22m28.5%2028.5-.9-.5c-.8-.3-1.6-.5-2.5-.6-1.8-.2-3.7-.2-5.5-.1-1.9%200-4.4.9-4.7%203.9-.5%205.7%208.2%205.8%2010.4%205.3a5%205%200%200%200%204.1-5.9l-.3-1a2%202%200%200%200-.6-1.1z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%235D509E%22%20d%3D%22M21.3%2031.4c0-.6.2-1.1.6-1.5a3%203%200%200%201%202-.9l1.2-.2%203.3-.3.5.1c.3.1.4.4.5.6.2.5.3%201.1.2%201.6l-.2%202.2-.1.3c-.2.3-.7.4-1%20.4a20.6%2020.6%200%200%201-5.5-.1c-1-.4-1.5-1.3-1.5-2.2z%22%2F%3E%3Cpath%20fill%3D%22%23DDC1A8%22%20d%3D%22m15.8%2025.6-.7-.2h-.6l.6.5h.2l.2.2.3-.1.2-.3v-.1h-.2zm.2%2013.3c1.4%200%202.8.4%204.2.9h.4c.5-.1-.1-1.4-.5-2.2-.1-.1-.2-.2-.3-.1h-.1c-.6.9-3.3%201.3-3.7%201.4zm33.5%206.3V45zm-.1-2.4v-1%201zm.3-3.4c.3-.1.8-.1.9-.4v-.4a9%209%200%200%201%20.7-2.2l1-2.1a9%209%200%200%201-2.8%203l-.2%202.2.4-.1zm-.3%204.6v1-1zm0-1.2v1-1zm0-3.2z%22%2F%3E%3Cpath%20fill%3D%22%23F7DDC4%22%20d%3D%22M11.6%2044.3a6%206%200%200%201%201.4-2.1c1.2-1.3%203-1.9%204.7-2.6a38.6%2038.6%200%200%201%208.8-2.2c.8-.1%202-.3%202.6.3.3.3.5.7.7%201.2l.8%202.3c.2.6.2%201.3.2%201.9-.3%201.1-1%202-2%202.5-1.8.9-3.7%201.7-5.6%202.4-.7.3-1.4.7-2%201.3a4.2%204.2%200%200%201-2.9%201.6c-1.5.3-3%20.2-4.4-.4-2.2-1.3-2.8-4-2.3-6.2z%22%2F%3E%3Cpath%20fill%3D%22%23EACEB1%22%20d%3D%22M20%2050.1c.6-.4%201.1-.9%201.5-1.4l.1-.1.1.1c.4.3-.7%201.2-.6%201.7v.5c-.1.2-.3.1-.5.1-1.3.2-.7-.5-2-.2l1.4-.7zm8.6-5.8c-.6%200-7.6%202.8-8.6%203.1-1.4.6-2.8.9-4.2%201-1.6%200-2%20.1-2.5.7l-.5.5%201.1.8c1.4.6%202.9.7%204.4.4.8%200%201.5-.3%202.1-.8l.8-.8c.6-.6%201.3-1%202-1.3%201.9-.7%203.8-1.5%205.6-2.4.6-.3%201.1-.8%201.4-1.3l-1.6.1z%22%2F%3E%3Cpath%20fill%3D%22%23F8E9DB%22%20d%3D%22m30.6%2041.1-.8-2.3c-.1-.4-.4-.8-.7-1.2-.6-.6-1.8-.4-2.6-.3-1%20.1-2%20.2-3%20.5-1.5.3-3%20.8-4.5%201.3-2.9%201.8-3.8%204-3.1%205.9.8%202.4%204.6%203%208.6%202%201.5-.6%202.9-.7%204.3-1.5%201-.5%201.7-1.4%202-2.5%200-.7%200-1.3-.2-1.9z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%2341439A%22%20d%3D%22M23.9%2040c.7-.6%201.5-1.1%202.4-1.2l2.8-.6%201.3-.2c.3.1.6.5.9%201%20.4.7.6%201.4.6%202.1l-.1.8-.6.5-1.5.6-2.4.7c-1%20.2-2.1.5-3-.1-.4-.3-.7-.8-.8-1.3a3%203%200%200%201%20.2-2.1l.2-.2z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22m31.8%2040.1-8.1%202.3c.1.4.4.8.7%201.1.8.7%202%20.4%203%20.1l2.4-.7%201.5-.6.6-.5.1-.8-.2-.9z%22%20opacity%3D%22.4%22%2F%3E%3Cpath%20fill%3D%22%23F7DDC4%22%20d%3D%22m29.7%2050.5-1.2-.4c-2.4-.4-4.9-.3-7.3.4-2%20.6-5.7%201.9-5.9%204.4-.1%201%20.2%201.9.8%202.7.7%201.2%201.9%202%203.3%202.2%201%200%202.1-.3%203-.7%201-.3%201.9-.4%202.8-.8%202-.7%203.7-2%204.8-3.7.4-.6.7-1.4.7-2.2%200-.8-.4-1.5-1-1.9z%22%2F%3E%3Cpath%20fill%3D%22%23EACEB1%22%20d%3D%22M26%2056.9c-1.7.6-3.1.7-4.6%201.1s-3-1.2-3.9%201c.5.4%201.2.7%201.9.7%201%200%202.1-.3%203-.7%201-.3%201.9-.4%202.8-.8a9%209%200%200%200%204.2-3c-1.3.8-2.6%201.4-3.4%201.7z%22%2F%3E%3Cpath%20fill%3D%22%23F8E9DB%22%20d%3D%22m29.7%2050.5-1.2-.4c-2.4-.4-4.8-.3-7.1.4-1.6%201.4-2.4%203-1.9%204.4.6%202.1%202.9%204.2%207.6%202.6a9.2%209.2%200%200%200%203-2.9c.4-.6.7-1.4.7-2.2-.1-.7-.5-1.5-1.1-1.9z%22%20opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%23005C9F%22%20d%3D%22M23.8%2054c.4.8%201.2%201.4%202.1%201.5.6.1%201.2.1%201.8-.1l2.1-.5c.5-.1.9-.3%201.2-.6l.3-.5c.2-.6.2-1.2%200-1.7-.1-.6-.4-1.3-1-1.4h-1c-1%20.1-1.9.5-2.9.7a5%205%200%200%200-1.7.6%202%202%200%200%200-1%201.4l.1.6z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22m19%2019.5-.1.2c-.1.6.1%201.2.5%201.6a5%205%200%200%200%201.8%201l3.5%201h.4l.2-.3c.4-.2.7-.5%201-.9l.3-.6-7.6-2zm2.3%2012.2c.1.8.6%201.5%201.4%202l1.2.1h4.3c.3-.2.8-.2%201-.5l.1-.3.2-2-8.2.7zm2.6%2022.4c.4.8%201.2%201.3%202%201.4h1.8l2.1-.6c.5%200%20.9-.3%201.2-.6l.3-.5c.2-.5.2-1%20.1-1.5l-7.5%201.8z%22%20opacity%3D%22.3%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E%0A",
    description: '图片压缩',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '150',

    name: 'ihateregex',
    url: 'https://ihateregex.io/',
    icon: 'https://ihateregex.io/favicon.ico',
    description: '正则可视化',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '151',

    name: 'carbon',
    url: 'https://carbon.now.sh/',
    icon: 'https://carbon.now.sh/favicon.ico',
    description:
      'Create and share beautiful images of your source code.\nStart typing or drop a file into the text area to get started.',
    label: '设计',
    sticky: '0',
  },
  {
    id: '152',

    name: 'dribble',
    url: 'https://dribbble.com/',
    icon: 'https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico',
    description: 'Explore the world’s leading design portfolios',
    label: '设计',
    sticky: '0',
  },
  {
    id: '153',

    name: 'shapedivider',
    url: 'https://www.shapedivider.app/',
    icon: 'https://www.shapedivider.app/favicon.ico',
    description:
      'Custom Shape Dividers\nCustom Shape Dividers\nCustom Shape Dividers',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '154',

    name: 'codesandbox',
    url: 'https://codesandbox.io/',
    icon: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'> <style> svg { background: transparent; } path { fill: black; } @media (prefers-color-scheme: dark)  { path { fill: white; } } </style> <path fill-rule='evenodd' clip-rule='evenodd' d='M81.8182 18.1818V81.8182H18.1818V18.1818H81.8182ZM10 90V10H90V90H10Z'/> </svg>",
    description: '一个在线的代码编辑器，主要聚焦于创建 Web 应用项目',
    label: '前端',
    sticky: '0',
  },
  {
    id: '155',

    name: 'colorhunt',
    url: 'https://colorhunt.co/',
    icon: 'https://colorhunt.co/img/colorhunt-favicon.svg?2',
    description: 'Color Palettes for Designers and Artists',
    label: '设计',
    sticky: '0',
  },
  {
    id: '156',

    name: 'Adobe Color',
    url: 'https://color.adobe.com/zh/create/color-wheel',
    icon: 'https://color.adobe.com/apple-touch-icon.png',
    description: '色轮调色盘产生器',
    label: '设计',
    sticky: '0',
  },
  {
    id: '157',

    name: 'uigradients',
    url: 'https://uigradients.com/#MonteCarlo',
    icon: 'https://uigradients.com/static/images/favicon-32x32.png',
    description: '渐变配色',
    label: '设计',
    sticky: '0',
  },
  {
    id: '158',

    name: 'photock',
    url: 'https://www.photock.asia/',
    icon: 'https://www.photock.asia/common/img/img_logo.gif',
    description: '日本免费摄影网站',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '159',

    name: 'pexels',
    url: 'https://www.pexels.com/zh-cn/',
    icon: 'https://www.pexels.com/assets/static/images/meta/pexels-icon.png',
    description: '才华横溢的摄影作者在这里免费分享最精彩的素材图片和视频。',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '160',

    name: 'picjumbo',
    url: 'https://picjumbo.com/',
    icon: 'https://picjumbo.com/favicon-32x32.png',
    description: 'Beautiful FREE stock photos',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '162',

    name: 'upfox',
    url: 'https://cupfox.app/',
    icon: '/public/images/upload_1656468347263.0.05922003519064356.0.png',
    description: '努力让找电影变得更简单',
    label: '影视',
    sticky: '0',
  },
  {
    id: '163',

    name: 'Zzzfun',
    url: 'http://www.zzzfun.com/',
    icon: '/public/images/upload_1656468625969.0.44555974405613985.0.png',
    description: '提供最新最快的动漫新番资讯和在线播放',
    label: '影视',
    sticky: '0',
  },
  {
    id: '164',

    name: 'aconvert',
    url: 'https://www.aconvert.com/',
    icon: '/public/images/upload_1656468787955.0.9074791173507955.0.png',
    description: '在线转换文档，视频，图片格式',
    label: '在线工具',
    sticky: '1',
  },
  {
    id: '166',

    name: 'DataV',
    url: 'http://datav.aliyun.com/portal/school/atlas/area_selector',
    icon: '/public/images/upload_1656469343307.0.8449988180176737.0.png',
    description: '地图选择器',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '167',

    name: '慕课教程',
    url: 'http://www.imooc.com/wiki/',
    icon: '/public/images/upload_1656470416460.0.7270268844646244.0.png',
    description: '编程入门快速学习手册',
    label: '编程',
    sticky: '0',
  },
  {
    id: '168',

    name: 'axios',
    url: 'https://www.axios-http.cn/',
    icon: '/public/images/upload_1656472669517.0.07136524722856286.0.png',
    description:
      'Axios 是一个基于 promise 的网络请求库，可以用于浏览器和 node.js',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '169',

    name: 'iconfont',
    url: 'https://www.iconfont.cn/',
    icon: '/public/images/upload_1656490142447.0.42286215467382604.0.png',
    description: '阿里巴巴图标库',
    label: '设计',
    sticky: '0',
  },
  {
    id: '170',

    name: 'magdeleine',
    url: 'https://magdeleine.co/',
    icon: '/public/images/upload_1656553144237.0.9063891644104245.0.png',
    description: 'A FREE HI-RESOLUTION PHOTO EVERY DAY',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '171',

    name: 'Magic Animations CSS3',
    url: 'https://www.minimamente.com/project/magic/',
    icon: '/public/images/upload_1656554080596.0.3632852815809333.0.png',
    description: '适合做转场的css动画',
    label: 'css',
    sticky: '0',
  },
  {
    id: '172',

    name: 'fabricjs',
    url: 'http://fabricjs.com/',
    icon: '/public/images/upload_1656572579333.0.14671842919759515.0.png',
    description:
      'Fabric.js是一个可以轻松处理 HTML5 Canvas元素的框架，使得Canvas元素支持交互式对象模型，同时也是一个SVG-to-Canvas和Canvas-to-SVG的解析器',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '173',

    name: 'pintura',
    url: 'https://pqina.nl/pintura/',
    icon: '/public/images/upload_1656573663567.0.08950548222788068.0.png',
    description:
      'A powerful JavaScript Image Editor that integrates with every stack',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '174',

    name: 'github',
    url: 'https://github.com/',
    icon: 'https://infinityicon.infinitynewtab.com/user-share-icon/a23b4cf17327527ae66aad5d13f059da.png?imageMogr2/thumbnail/240x/format/webp/blur/1x0/quality/100|imageslim',
    description: '代码管理',
    label: '前端',
    sticky: '1',
  },
  {
    id: '175',

    name: '码云',
    url: 'https://gitee.com/',
    icon: '/public/images/upload_1656601321011.0.6632358393642745.0.webp',
    description: '代码管理',
    label: '前端',
    sticky: '1',
  },
  {
    id: '176',

    name: '美创意',
    url: 'https://madewith.cn/',
    icon: '/public/images/upload_1656603190956.0.10260742530133937.0.png',
    description: '热门开发框架案例展示',
    label: '前端',
    sticky: '0',
  },
  {
    id: '177',

    name: 'Staticfile CDN',
    url: 'https://www.staticfile.org/',
    icon: 'http://172.16.20.188:7001/public/images/upload_1656641291253.0.9283042888024229.0.png',
    description: '免费的CDN加速服务',
    label: '前端',
    sticky: '0',
  },
  {
    id: '178',

    name: 'webframe',
    url: 'https://webframe.xyz/',
    icon: '/public/images/upload_1656642308677.0.6432823476688938.0.png',
    description: 'Discover and be inspired by beautiful webapp designs',
    label: '设计',
    sticky: '0',
  },
  {
    id: '519',

    name: '菜鸟工具',
    url: 'https://c.runoob.com/',
    icon: '/public/images/upload_1657158866405.0.7230909336142242.0.png',
    description: '在线工具集合',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '520',

    name: '工具箱',
    url: 'https://toolgg.com/',
    icon: '/public/images/upload_1657164454360.0.4458797136839363.0.png',
    description: '在线压缩代码，在线转换各种文件格式',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '863',

    name: 'gulp',
    url: 'https://www.gulpjs.com.cn/',
    icon: '/public/images/upload_1658482150442.0.3708161477471805.0.png',
    description: '自动化构建工具',
    label: '前端',
    sticky: '0',
  },
  {
    id: '864',

    name: 'rollup',
    url: 'https://www.rollupjs.com/',
    icon: '/public/images/upload_1658482241216.0.6773272148575216.0.png',
    description: '一个 JavaScript 模块打包器',
    label: '前端',
    sticky: '0',
  },
  {
    id: '865',

    name: 'tldraw',
    url: 'https://www.tldraw.com/',
    icon: '/public/images/upload_1658328771367.0.2128339944199078.0.png',
    description: '在线绘图',
    label: '在线工具',
    sticky: '1',
  },
  {
    id: '866',

    name: 'macos icons',
    url: 'https://macosicons.com/',
    icon: '/public/images/upload_1658503488508.0.9213244009116957.0.png',
    description: 'macos图标',
    label: '图片素材',
    sticky: '0',
  },
  {
    id: '867',

    name: 'OpenLayers',
    url: 'https://openlayers.org/',
    icon: 'http://124.223.24.47:7001/public/images/upload_1658904667301.0.04308186517766721.0.png',
    description:
      'A high-performance, feature-packed library for all your mapping needs.',
    label: '前端',
    sticky: '0',
  },
  {
    id: '868',

    name: 'Leaflet',
    url: 'https://leafletjs.com/index.html',
    icon: '/public/images/upload_1658904743559.0.08884107786045936.0.png',
    description:
      'an open-source JavaScript library for mobile-friendly interactive maps',
    label: '前端',
    sticky: '0',
  },
  {
    id: '869',

    name: '知乎',
    url: 'https://www.zhihu.com/',
    icon: '/public/images/upload_1658906474597.0.9674621527690765.0.png',
    description: '问答社区',
    label: '其他',
    sticky: '1',
  },
  {
    id: '870',

    name: 'https://antfu.me/',
    url: 'https://c.me/',
    icon: '/public/images/upload_1658908126656.0.3976191976999208.0.png',
    description: 'antfu的个人网站',
    label: '其他',
    sticky: '0',
  },
  {
    id: '871',

    name: 'MacZip',
    url: 'https://ezip.awehunt.com/',
    icon: '/public/images/upload_1658991038195.0.6799836852499745.0.png',
    description: 'mac压缩软件',
    label: '软件',
    sticky: '0',
  },
  {
    id: '872',

    name: 'bilibili',
    url: 'https://www.bilibili.com/',
    icon: '/public/images/upload_1659066462194.0.5833115633080712.0.ico',
    description: 'B站',
    label: '影视',
    sticky: '1',
  },
  {
    id: '873',

    name: 'D3.js',
    url: 'https://d3js.org',
    icon: 'http://124.223.24.47:7001/public/images/upload_1659078711815.0.25370344549258284.0.png',
    description:
      'D3.js is a JavaScript library for manipulating documents based on data',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '874',

    name: 'Microsoft 技术文档',
    url: 'https://docs.microsoft.com/zh-cn/',
    icon: '/public/images/upload_1659088266290.0.12246051607643715.0.ico',
    description: '面向开发人员和技术专业人员的 Microsoft 文档和学习主页。',
    label: '编程',
    sticky: '0',
  },
  {
    id: '875',

    name: 'designcode',
    url: 'https://designcode.io/courses',
    icon: '/public/images/upload_1659428859690.0.056789289214814076.0.png',
    description: 'Learn the best tools and platforms',
    label: '编程',
    sticky: '0',
  },
  {
    id: '876',

    name: 'diagrams',
    url: 'https://www.diagrams.net/',
    icon: '/public/images/upload_1659691290541.0.6421917160829402.0.ico',
    description: '在线绘制流程图',
    label: '在线工具',
    sticky: '0',
  },
  {
    id: '877',

    name: '腾讯文档',
    url: 'https://docs.qq.com/desktop/?u=c7c8e8bbd4654788bbd93551e98dcdb0',
    icon: '/public/images/upload_1659693024303.0.08555715552555543.0.ico',
    description: '在线文档',
    label: '在线工具',
    sticky: '1',
  },
  {
    id: '962',

    name: '手册网',
    url: 'https://www.shouce.ren/',
    icon: '/public/images/upload_1660181815597.0.6713756234146147.0.ico',
    description: '网站开发教程大全 - 在线手册 - 参考手册 - 手册网',
    label: '编程',
    sticky: '0',
  },
  {
    id: '963',

    name: 'ECharts Demo',
    url: 'https://www.isqqw.com/',
    icon: '/public/images/upload_1660570124384.0.9176192176472109.0.png',
    description: 'ECharts Demo集合',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '964',

    name: 'Echart DataInsight',
    url: 'http://analysis.datains.cn/finance-admin/index.html#/chartLib/all',
    icon: '/public/images/upload_1660570442924.0.9844270203229508.0.png',
    description: 'DataInsight',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '965',

    name: 'PPChart',
    url: 'http://ppchart.com/#/',
    icon: '/public/images/upload_1660570568744.0.9466625400962421.0.png',
    description: 'echart demo',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '966',

    name: 'echarts热门组件',
    url: 'http://192.144.199.210/forum.php?mod=forumdisplay&fid=2',
    icon: '/public/images/upload_1660570961761.0.6540168885741824.0.png',
    description: '数据可视化技术分享',
    label: 'javascript',
    sticky: '0',
  },
  {
    id: '967',

    name: 'caniuse',
    url: 'https://caniuse.com/',
    icon: '/public/images/upload_1661392253576.0.08772541132120293.0.png',
    description: 'Can I use... Support tables for HTML5, CSS3, etc',
    label: '前端',
    sticky: '1',
  },
  {
    id: '968',

    name: 'Vue Cli',
    url: 'https://cli.vuejs.org/zh/',
    icon: 'http://124.223.24.47:7001/public/images/upload_1656664029735.0.9179732604067081.0.png',
    description: 'Vue.js 开发的标准工具',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '969',

    name: 'Vue Router',
    url: 'https://router.vuejs.org/zh/',
    icon: 'http://124.223.24.47:7001/public/images/upload_1656664029735.0.9179732604067081.0.png',
    description: 'Vue.js 的官方路由',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '970',

    name: 'VARLET',
    url: 'https://varlet.gitee.io/varlet-ui/#/zh-CN/index',
    icon: '/public/images/upload_1665760805580.0.20156983300887155.0.png',
    description: '一个基于 Vue3 开发的 Material 风格移动端组件库',
    label: 'Vue',
    sticky: '0',
  },
  {
    id: '971',

    name: 'XClient',
    url: 'https://xclient.info/',
    icon: 'https://img.xclient.info/icon/favicon.ico',
    description: 'mac应用分享',
    label: '软件',
    sticky: '0',
  },
  {
    id: '972',

    name: '佛系软件',
    url: 'https://foxirj.com',
    icon: 'http://124.223.24.47:7001/public/images/upload_1665763476118.0.08788412530969336.0.png',
    description: '佛系软件',
    label: '软件',
    sticky: '0',
  },
  {
    id: '973',

    name: '马可菠萝',
    url: 'https://www.macbl.com/',
    icon: '/public/images/upload_1665763684073.0.6380774720521649.0.png',
    description: 'mac应用',
    label: '软件',
    sticky: '0',
  },
  {
    id: '974',

    name: 'puppeteer',
    url: 'http://www.puppeteerjs.com/',
    icon: '/public/images/upload_1666594215152.0.37609055912302236.0.png',
    description:
      'Puppeteer 是一个 Node 库，它提供了一个高级 API 来通过 DevTools 协议控制 Chromium 或 Chrome。',
    label: 'node',
    sticky: '0',
  },
  {
    id: '975',

    name: 'swiper',
    url: 'https://www.swiper.com.cn/',
    icon: '/public/images/upload_1666747643752.0.6447132295720444.0.png',
    description:
      'Swiper是纯javascript打造的滑动特效插件，面向手机、平板电脑等移动终端',
    label: 'javascript',
    sticky: '0',
  },

  {
    id: '977',

    name: 'cssanimation',
    url: 'https://cssanimation.io/index.html',
    icon: '/public/images/upload_1666958409354.0.42688813190570896.0.png',
    description: 'css动画集合',
    label: 'css',
    sticky: '0',
  },
  {
    id: '978',

    name: 'hovercss',
    url: 'https://ianlunn.github.io/Hover/',
    icon: '',
    description: 'hover css动画',
    label: 'css',
    sticky: '0',
  },
  {
    id: '979',

    name: 'react-router',
    url: 'https://reactrouter.com/en/main',
    icon: '/public/images/upload_1667285964704.0.09061128043809563.0.png',
    description: 'react router',
    label: 'React',
    sticky: '0',
  },
  {
    id: '980',

    name: 'radix ui',
    url: 'https://www.radix-ui.com/',
    icon: '/public/images/upload_1667286414645.0.26851038404574235.0.png',
    description:
      'Unstyled, accessible components for building high‑quality design systems and web apps in React.',
    label: 'React',
    sticky: '0',
  },
  {
    id: '981',

    name: 'Material UI',
    url: 'https://mui.com/',
    icon: '/public/images/upload_1667286658208.0.635124146238927.0.png',
    description:
      "Material UI is a library of React UI components that implements Google's Material Design.",
    label: 'React',
    sticky: '0',
  },
  {
    id: '982',

    name: 'Mantine',
    url: 'https://mantine.dev/',
    icon: '/public/images/upload_1667286889889.0.6678179313500208.0.png',
    description:
      'Mantine is a React components library focused on providing great user and developer experience',
    label: 'React',
    sticky: '0',
  },
  {
    id: '983',

    name: 'chakra-ui',
    url: 'https://chakra-ui.com/',
    icon: '/public/images/upload_1667287178504.0.01096327235200989.0.png',
    description:
      'Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.',
    label: 'React',
    sticky: '0',
  },
  {
    id: '984',

    name: 'parcel',
    url: 'https://parceljs.org/',
    icon: '/public/images/upload_1667355214488.0.8714455673151318.0.png',
    description: 'zero configuration build tool',
    label: '前端',
    sticky: '0',
  },
  {
    id: '985',

    name: 'localforage',
    url: 'http://localforage.docschina.org/',
    icon: '',
    description:
      'localForage 是一个 JavaScript 库，通过简单类似 localStorage API 的异步存储来改进你的 Web 应用程序的离线体验。',
    label: '前端',
    sticky: '0',
  },
  {
    id: '986',

    name: 'github.dev',
    url: 'https://github.dev/github/dev',
    icon: '/public/images/upload_1667488172045.0.6639834976867636.0.png',
    description: '在线vscode',
    label: '前端',
    sticky: '0',
  },
];

export default DEFAULT_BOOKMARKS;
