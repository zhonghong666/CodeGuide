const ossBasePath = "https://hongfly.oss-cn-beijing.aliyuncs.com/blog/";

module.exports = {
    title: '小洪玩编程',
    description: '道阻且长，行则将至，行而不辍，未来可期',
    head: [
        ['link', {rel: 'shortcut icon', type: "image/x-icon", href: getOssSoure('favicon.ico')}],
        // meta
        ["meta", {name: "robots", content: "all"}],
        ["meta", {name: "author", content: "小洪"}],
        ["meta", {"http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate"}],
        ["meta", {"http-equiv": "Pragma", content: "no-cache"}],
        ["meta", {"http-equiv": "Expires", content: "0"}],
        ["meta", {
            name: "keywords",
            content: "小洪玩编程, 设计模式, 字节码编程, 中间件, Spring, Java基础, 面经手册"
        }],
        ["meta", {name: "apple-mobile-web-app-capable", content: "yes"}]
    ],
    port: "8080",
    dest: 'dist',
    plugins: [
        ['@vuepress/back-to-top', true],
        ["seo", {
            siteTitle: (_, $site) => $site.title,
            title: $page => $page.title,
            description: $page => $page.frontmatter.description,
            author: (_, $site) => $site.themeConfig.author,
            tags: $page => $page.frontmatter.tags,
            // twitterCard: _ => 'summary_large_image',
            type: $page => 'article',
            url: (_, $site, path) => ($site.themeConfig.domain || '') + path,
            image: ($page, $site) => $page.frontmatter.image && (($site.themeConfig.domain && !$page.frontmatter.image.startsWith('http') || '') + $page.frontmatter.image),
            publishedAt: $page => $page.frontmatter.date && new Date($page.frontmatter.date),
            modifiedAt: $page => $page.lastUpdated && new Date($page.lastUpdated),
        }]
    ],
    // markdown配置
    markdown: {
        anchor: {permalink: false},
        toc: {includeLevel: [2, 3]},
        extendMarkdown: md => {
            md.use(require('markdown-it-mermaid').default);
            md.use(require('markdown-it-sub'));
            md.use(require('markdown-it-sup'));
            md.use(require('markdown-it-abbr'));
            md.use(require('markdown-it-ins'));
            md.use(require('markdown-it-figure'));
            md.use(require('markdown-it-smartarrows'));
            md.use(require('markdown-it-fontawesome'));
        },
        externalLinks: {
            target: '_blank', rel: 'noopener noreferrer'
        }
    },
    // 主题配置
    themeConfig: {
        logo: getOssSoure('logo.png'),
        docsRepo: "zhonghong666/CodeGuide",
        // 编辑文档的所在目录
        docsDir: '',
        lastUpdated: '上次更新',
        smoothScroll: true,
        docsBranch: 'main',
        editLinks: true,
        editLinkText: '在GitHub中编辑',
        // 导航栏配置
        nav: [
            {text: '导读', link: '/docs/other/guide-to-read'},
            // {text: 'Java', items: [
            //     {text: 'Java基础', link: '/docs/other/guide-to-read'},
            //     {text: 'JVM', link: '/docs/other/guide-to-read'}
            // ]},
            // {text: 'Spring', link: '/docs/designPatterns/index'},
            {text: '设计模式', link: '/docs/designPatterns/preface'},
            // {text: 'Netty', link: '/docs/other/guide-to-read'},
            {text: '资源', items: [
                {text: 'emoji表情符号', link: '/docs/resources/emoji'}
            ]}
        ],
        // 侧边栏配置
        sidebar: {
            "/docs/other/": getBarOther(),
            "/docs/designPatterns/": getBarDesignPatterns(),
            "/docs/resources/emoji": getBarResource()
        }
    }
}

function getOssSoure(path) {
    return `${ossBasePath}${path}`;
}

function getBarOther() {
    return [
        {
            title: "阅读指南",
            collapsable: false,
            sidebarDepth: 4,
            children: [
                "guide-to-read.md"
            ]
        }
    ]
}

function getBarResource() {
    return [
        {
            title: "emoji表情符号大全",
            collapsable: false,
            sidebarDepth: 4,
            children: [
                "emoji.md"
            ]
        }
    ];
}

function getBarDesignPatterns() {
    return [
        {
            title: "概述",
            collapsable: false,
            sidebarDepth: 4,
            children: [
                "preface.md"
            ]
        }
    ];
}
