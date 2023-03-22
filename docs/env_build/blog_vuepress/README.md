[[toc]]

# vuepress教程

## 1. vuepress是什么？

vuepress是vuejs官方提供的以Vue为驱动的静态网站生成工具。

## 2. vuepress项目搭建

### 2.1 项目初始化

1. 新建目录，并在vsCode中打开
2. 进入文件夹，安装本地依赖

```
npm install -D vuepress
```

3. 初始化项目，生成package.json

```
npm init -y
```

4. 在根目录下创建.vuepress文件夹，创建docs文件夹，并增加README.md文件

5. 在package.json中添加构建和启动脚本

```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
6. 本地启动
```
npm run dev
```

### 2.2 目录结构说明

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │ 
│   ├── README.md
│   ├── guide (一般用户都在这个目录下创建网站指南,当然可以不用)
│   │   └── README.md （指南里面的具体内容）
│   └── config.md
│ 
└── package.json 项目初始化时，根目录下自动生成的配置文件,定义了项目的基本配置信息及需要依赖的各个模块、指定运行脚本命令的npm命令行缩写等。
```

### 2.3 配置文件config.js

该文件为vuepress的核心配置文件

```js
module.exports = {
    title: "yilyn",
    head: [
        ['link', { rel: 'icon', href: '/images/logo.png' }],
    ],
    base: '',
    markdown: {
        toc: { includeLevel: [1, 2, 3] }, //使用[[toc]]生成页面顶部目录
        lineNumbers: true,
    },
    plugins: [
        ['@vuepress/plugin-medium-zoom'], //图片放大插件
        ['@vuepress/back-to-top'], //回到顶部插件
        ['@vuepress/plugin-toc'], //顶部的目录插件
        [
            'vuepress-plugin-right-anchor', // 右侧的目录插件
            {
                showDepth: 2,
                ignore: [
                    '/',
                ],
                expand: {
                    trigger: 'click', //点击才能显示/关闭； click/hover
                    clickModeDefaultOpen: true //click模式默认展开
                },
            }
        ],
    ],
    themeConfig: {
        logo: '/images/logo.png',
        search: false,
        // lastUpdated: 'Last Updated', // string | boolean
        // displayAllHeaders: true, // 默认值：false
        collapsable: false,
        nav: [
            { text: '首页', link: '/' },
            { text: 'JAVA基础', items:[
                { text: '集合类', link: '/java_basics/collections/'},
                { text: '多线程', link: '/java_basics/multi_threads/'},
                { text: 'JUC', link: '/java_basics/JUC/'},
            ]},
        ],
        sidebarDepth: 2, // 侧边栏显示等级
        sidebar: {//侧边栏的导航
            
        }
    }
}
```

### 2.4 插件安装

插件安装完成后，如果有不生效的情况，需要检查一下vuepress是否在本地安装，如果没有问题，重新安装一次。

当插件安装完成之后，需要在plugins中配置
```js
plugins: [
    ['@vuepress/plugin-medium-zoom'], //图片放大插件
    ['@vuepress/back-to-top'], //回到顶部插件
    ['@vuepress/plugin-toc'], //顶部的目录插件
    [
        'vuepress-plugin-right-anchor', // 右侧的目录插件
        {
            showDepth: 2,
            ignore: [
                '/',
            ],
            expand: {
                trigger: 'click', //点击才能显示/关闭； click/hover
                clickModeDefaultOpen: true //click模式默认展开
            },
        }
    ],
],
```

1. 图片放大插件
```
npm install -D @vuepress/plugin-medium-zoom
```

2. 回到顶部插件
```
npm install -D @vuepress/back-to-top
```

3. 顶部目录插件
```
npm install -D @vuepress/plugin-toc
```

4. 右边的目录插件
```
npm install -D vuepress-plugin-right-anchor
```

## 使用github action实现自动部署

1. 登录到github后新建仓库，这里名字最使用[用户名.gothub.io]，这样的话部署完成可以直接访问[用户名.gothub.io]就能进入首页

2. 创建成功后，在本地vuepress的项目根目录下，创建`.github/workflows/deploy.yml`文件,文件配置如下：

```shell
# ci脚本的名称
name: YILYN-BLOG-DEPLOY-CI
# 触发的时机
on:
  # 在push阶段触发
  push:
    # 对应的分支
    branches: [ master ]
  # 在PR阶段触发
  pull_request:
    # 对应的分支
    branches: [ master ]
# 执行的任务
jobs:
  # 任务名称
  build:
    # 执行的环境，默认是在最新版本的Ubuntu系统
    runs-on: ubuntu-latest
    # 执行的步骤
    steps:
      # checkout代码
      # 其中actions是github官方账号，checkout是改账号下提供的库，可以直接拿来使用，对应的版本是v2
      # setup-node同上
      - uses: actions/checkout@v3  # 这里需要注意一下版本，需要和node版本对应上，否则会部署失败
      - uses: actions/setup-node@v3 # 也是版本问题
        # 设置node的版本
        with:
          node-version: '16' 
        # 执行步骤的名称
      - name: Compiling start
        # 执行的具体脚本
        run: echo Compiling start!
        # 如果在执行的时候报错，提示需要用户名跟邮箱，那么需要单独设置下邮箱跟用户名
      - run: git config --global user.email "xxx" # 设置自己的邮箱
      - run: git config --global user.name "xxx" # 设置自己的用户名
        # 执行安装跟打包命令
      - run: npm install && npm run build
      - name: Deploy
        # 这个是第三方提供的库，可以推送打包后的内容到指定分支
        uses: avinal/github-pages-deploy-action@v0.9
        with:
          # 当前仓库的密钥
          GITHUB_TOKEN: ${{ secrets.ACCESS_TOKEN }}  # 这个TOKEN是在个人中心下申请的TOKEN，将TOKEN设置到Action密钥中
          # 部署到 gh-pages 分支
          PAGES_BRANCH: gh-pages # 这个分支用来存放静态文件，master分支用来存放源码
          # 部署目录为 VuePress 的默认输出目录
          DOCS_FOLDER: docs/.vuepress/dist
```
   
3. 初始化git仓库并提交代码到代码库

4. 在代码库的Settings下，设置GitHub Pages的分支和目录，如图：
![部署设置](/images/vuepress-blog/deploy.png)

5. 过一会就能通过https://用户名.github.io/ 访问你的博客了。
   
6. deploy.sh 脚本实现自动提交和自动部署，可以把执行脚本的命令放在`package.json`中，通过npm方式执行

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 如果不执行下面这一行，那么在更新部署的时候部署目录要设置成docs/.vuepress/dist，因为静态文件在dist目录下。提交代码的时候会比较慢
# 如果执行下面这一行，那么在更新部署的时候部署目录不需要单独设置，只上传dist文件夹下静态文件。
# cd docs/.vuepress/dist

# 如果是发布到自定义域名，现在还不支持
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到github，使用ssh方式
git push -f 你的github地址

```

7. 执行deploy.sh ，可以吧部署命令放在`package.json`中，通过npm run deploy命令访问
```shell
"scripts": {
    "dev": "vuepress dev docs",
    "build": "vuepress build docs",
    "deploy": "bash deploy.sh"
},
```

8. 执行完成后，可以在git仓库的Action菜单下查看部署结果，如果失败了点击进去可以看到对应的错误信息
   ![部署设置](/images/vuepress-blog/部署action.png)