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

```
module.exports = {
  title: '网站标题',
  description: '描述'
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

## 部署到gitee

1. 登录到gitee后新建仓库，这里名字最好喝自己的空间名称保持一致，那样的话就可以通过[空间地址.http://gitee.io]的形式访问

![新建仓库.png](/images/vuepress-blog/新建仓库.png)

2. 创建成功后，在vuepress的项目根目录下，初始化git仓库并提交代码到代码库

```sh
git init

git add -A

git commit -m "我的博客，第一次提交"

git remote add origin git@gitee.com:yilyn16/yilyn16.git

# 这里使用ssh方式，需要先生成公钥才能提交
git push -u origin master
```

3. 打开[服务]菜单，选择[Gitee Pages]，修改部署目录：`docs/.vuepress/dist`，点击[启动]/[更新]，稍等片刻即可访问

![部署目录](/images/vuepress-blog/部署giteePages.png)

4. deploy.sh 脚本实现自动提交

```sh
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 如果不执行下面这一行，那么在更新部署的时候部署目录要设置成docs/.vuepress/dist，因为静态文件在dist目录下。提交代码的时候会比较慢
# 如果执行下面这一行，那么在更新部署的时候部署目录不需要单独设置，只上传dist文件夹下静态文件。
# cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 发布到gitee，gitee不支持自动部署，需要在Gitee Pages上手动更新才能生效
git push -f git@gitee.com:yilyn16/yilyn16.git

cd -
```

终端运行如下命令即可提交到gitee：
```sh
sh ./deploy.sh
```

Gitee Pages不支持提交后自动部署，后面有时间会研究部署到Github Action实现自动部署