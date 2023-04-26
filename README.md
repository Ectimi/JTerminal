## 一个命令行风格的浏览器主页
client: 客户端代码

server: 服务端代码，用来简单地实现登录功能和标签的curd（由于代码结构是用的旧项目的，很多地方也只是复制粘贴，没有优化，所以代码可能有点丑）

## 技术栈
client: [react](https://react.dev/) + [typesscript](https://www.typescriptlang.org/) + [Matine](https://mantine.dev/)(UI框架) + [React Recoil](https://recoiljs.org/)(状态管理) + [localforage](http://localforage.docschina.org/)(数据持久化)

server: midwayjs

### terminal使用方法
> 输入help查看所有命令，

> 输入的时候会有提示，按tab自动补全提示的第一项

> 键盘上下键可以上下选择，按下alt+enter选中并执行命令（因为直接按下enter是执行当前输入框的命令，所以加了个alt键进行区分）

> ctrl + 鼠标双击某个已执行命令可快速重复执行

> ctrl + b 打开/隐藏书签列表，已默认内置了一些书签，可以新增书签，若要同步书签需要先注册登录使用

> 输入 “'” 进入书签检索模式

### terminal命令
基本每个命令都会简短的别名，输入命令的时候有提示，也可以通过help命令查看
1. login 登录 
2. logout 退出登录
3. register 注册
4. bookmark 打开书签列表
5. background 随机背景图片
6. search 搜索（别名：s），默认使用百度，其他搜索命令有 baidu,google,zhihu等，用法及别名及参数请输入help查看
7. goto 网页跳转
8. resume 跳转到简历编辑页面
