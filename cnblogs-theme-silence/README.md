# 博客园主题设置


主题部署, 具体参考: [https://github.com/esofar/cnblogs-theme-silence](https://github.com/esofar/cnblogs-theme-silence)

我使用的主题在这个开源库的基础上有一定的修改

1. 将 silence.min.js 上传到博客园
2. 将 css.css 内容复制到 博客园 -> 设置 -> 页面定制CSS 输入框中
3. 将下面代码复制到 博客园 -> 设置 -> 博客侧边栏公告 输入框中

```js
<script src="https://blog-static.cnblogs.com/files/xuange306/silence.min.js"></script>
<script type="text/javascript">
    $.silence({
        avatar: 'https://blog-static.cnblogs.com/files/xuange306/icon.gif',
        navigation: [
            {
                title: '标签',
                url: 'https://www.cnblogs.com/xuange306/tag/'
            },
            {
                title: '归档',
                url: 'https://www.cnblogs.com/xuange306/p/'
            }
        ],
        catalog: {
            enable: true,
            move: true,
            index: true,
            level1: 'h2',
            level2: 'h3',
            level3: 'h4',
        },
        signature: {
            enable: true,
            license: '本博文版权归本博主所有,未经授权不得转载',
            link: 'https://home.cnblogs.com/u/xuange306',
            remark: null
        },
        sponsor: {
            enable: true,
            paypal: null,
            text:"打赏一下呗",
            wechat: 'https://blog-static.cnblogs.com/files/xuange306/wx.gif',
            alipay: 'https://blog-static.cnblogs.com/files/xuange306/zfb.gif'
        },
        github: {
            enable: true,
            link: 'https://github.com/shuiche-it/',
	    target: '_self'
        }
    });
</script>

```
