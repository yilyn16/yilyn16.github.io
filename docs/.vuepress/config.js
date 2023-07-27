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
                    clickModeDefaultOpen: false //click模式默认展开
                },
            }
        ],
        [
            "@mr-hope/copy-code"
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
                { text: 'JVM', link: '/java_basics/jvm/'},
                { text: '算法', link: '/java_basics/algorithm/'},
            ]},
            { text: '中间件', items:[
                { text: 'Kafka', link: '/middleware/kafka/' },
            ]},
            { text: '网络', items:[
                { text: 'netty', link: '/network/netty/' },
            ]},
            { text: '大数据', items:[
                {text:'Flink CDC', link: '/big_data/flink-cdc/'},
                {text:'Hadoop', link: '/big_data/hadoop/'},
            ] },
            { text: '数据库', items:[
                { text: 'MySQL', link: '/databases/mysql/' },
                { text: 'Redis', link: '/databases/redis/' },
            ]},
            { text: '环境搭建', items:[
                { text: '博客by-vuepress', link: '/env_build/blog_vuepress/' },
                { text: 'docker', link: '/env_build/docker/' },
                { text: 'linux', link: '/env_build/linux/' },
            ]},
            { text: '记录', items:[
                { text: '面试', link: '/take_notes/interview/' },
                { text: '优秀文章', link: '/take_notes/essay/' },
            ]},
        ],
        sidebarDepth: 0, // 侧边栏显示等级
        sidebar: {
            '/java_basics/':[
                {
                    title: 'Java基础',
                    collapsable: true,
                    children: [
                        {
                            title: '集合',
                            collapsable: true,
                            path: '/java_basics/collections/',
                            children: [
                                '/java_basics/collections/Collection-List',
                                '/java_basics/collections/Map-ConcurrentHashMap',
                                '/java_basics/collections/Map-HashMap',
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
                                '/java_basics/multi_threads/ThreadLocal',
                            ]
                        },
                        {
                            title: '算法',
                            collapsable: true,
                            path: '/java_basics/algorithm/',
                            children: [
                                '/java_basics/algorithm/排序:快速排序',
                            ]
                        },
                    ]
                }
            ],
            '/middleware/': [
                {
                    title: '中间件',
                    collapsable: true,
                    children: [
                        {
                            title: 'Kafka',
                            collapsable: true,
                            path: '/middleware/kafka/',
                        }
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
                            path: '/databases/mysql/',
                            children: [
                                '/databases/mysql/一条数据的写入流程',
                                '/databases/mysql/隔离级别',
                            ]
                        },
                        {
                            title: 'Redis',
                            collapsable: true,
                            path: '/databases/redis/',
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
                        },
                        {
                            title: 'Hadoop',
                            collapsable: true,
                            path: '/big_data/hadoop/'
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
                            path: '/env_build/docker/',
                            children: [
                                {
                                    title: 'docker搭建ES集群',
                                    collapsable: true,
                                    path: '/env_build/docker/Docker搭建ES集群',
                                },
                                {
                                    title: 'docker搭建Kafka集群',
                                    collapsable: true,
                                    path: '/env_build/docker/Docker搭建Kafka集群',
                                }

                            ]
                        },
                        {
                            title: 'linux',
                            collapsable: true,
                            path: '/env_build/linux/',
                            children: [
                                {
                                    title: 'vim命令基础教程',
                                    collapsable: true,
                                    path: '/env_build/linux/vim命令基础教程',
                                }
                            ]
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
                        },
                        {
                            title: '好文推荐',
                            collapsable: true,
                            path: '/take_notes/essay/'
                        }
                    ]
                }
            ],
        }
    }
}