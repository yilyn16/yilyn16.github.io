module.exports = {
    title: "yilyn",
    head: [
        ['link', { rel: 'icon', href: '/images/logo.png' }], 
    ],
    base: '/',
    markdown: {
        toc: { includeLevel: [1, 2, 3] },
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
            { text: '网络', items:[
                { text: 'netty', link: '/network/netty/' },
            ]},
            { text: '环境搭建', items:[
                { text: '博客by-vuepress', link: '/env_build/blog_vuepress/' },
                { text: 'docker', link: '/env_build/docker/' },
            ]},
            { text: '大数据', items:[
                {text:'Flink CDC', link: '/big_data/flink-cdc/'},
            ] },
            { text: '数据库', items:[
                { text: 'MySQL', link: '/databases/mysql/' },
                { text: 'Redis', link: '/databases/redis/' },
            ]},
            { text: '记录', items:[
                { text: '面试', link: '/take_notes/interview/' },
            ]},
        ],
        sidebarDepth: 2, // 侧边栏显示等级
        sidebar: {
            '/java_basics/':[
                {
                    title: 'Java基础',
                    collapsable: false,
                    children: [
                        {
                            title: '集合',
                            collapsable: true,
                            path: '/java_basics/collections/',
                            children: [
                                '/java_basics/collections/Collection-List',
                                '/java_basics/collections/Map',
                            ]
                        },
                        {
                            title: 'JUC',
                            collapsable: true,
                            path: '/java_basics/JUC/',
                            children: [
                                '/java_basics/JUC/AQS',
                                '/java_basics/JUC/ReentrantLock',
                            ]
                        },
                        {
                            title: 'JVM',
                            collapsable: true,
                            path: '/java_basics/jvm/',
                        },
                        {
                            title: '多线程',
                            collapsable: true,
                            path: '/java_basics/multi_threads/',
                            children: [
                                '/java_basics/multi_threads/线程池',
                            ]
                        },
                    ]
                }
            ],
            '/databases/': [
                {
                    title: '数据库',
                    collapsable: true,
                    children: [
                        {
                            title: 'MySQL',
                            collapsable: true,
                            // path: '/databases/mysql/',
                            children: [
                                '/databases/mysql/事物隔离级别',
                            ]
                        },
                        {
                            title: 'Redis',
                            collapsable: true,
                            path: '/databases/redis/',
                            // children: [
                            //     '/databases/mysql/事物隔离级别',
                            // ]
                        },
                    ]
                }
            ],
            '/network/': [
                {
                    title: 'netty',
                    collapsable: true,
                    children: [
                        {
                            title: 'netty入门',
                            collapsable: true,
                            path: '/network/netty/'
                        },
                        {
                            title: '简单demo',
                            collapsable: true,
                            path: '/network/netty/简单demo'
                        },
                    ]
                }
            ],
            '/big_data/':[
                {
                    title: '大数据',
                    collapsable: true,
                    children: [
                        {
                            title: 'Flink CDC',
                            collapsable: true,
                            path: '/big_data/flink-cdc/'
                        }
                    ]
                }
            ],
            '/env_build/':[
                {
                    title: '各种环境搭建',
                    collapsable: true,
                    children: [
                        {
                            title: 'vuepress搭建博客',
                            collapsable: true,
                            path: '/env_build/blog_vuepress/'
                        },
                        {
                            title: 'docker',
                            collapsable: true,
                            path: '/env_build/docker/'
                        }
                    ]
                }
            ],
            '/take_notes/':[
                {
                    title: '记录',
                    collapsable: true,
                    children: [
                        {
                            title: '面试',
                            collapsable: true,
                            path: '/take_notes/interview/'
                        }
                    ]
                }
            ],
        }
    }
}