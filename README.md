# cnblog-mouse

博客园鼠标特效, 目前收录了12种特效

DEMO参考: [https://www.cnblogs.com/shuiche/](https://www.cnblogs.com/shuiche/)


### 部署说明
#### 上传脚本
打开./dist文件夹，获取主题的 JS 脚本文件mouse.min.js。

进入[『文件』](https://i.cnblogs.com/Files.aspx)界面，将该文件上传到自己的博客中。上传完成后，点击文件名便可在浏览器地址栏中获取上传文件的外链，类似如下所示：

    https://blog-static.cnblogs.com/files/xuange306/mouse.min.js
    
然后使用\<script>标签将外链包裹，生成一个网页脚本引用，类似如下所示：
```
<script src="https://blog-static.cnblogs.com/files/xuange306/mouse.min.js"></script>
```

### 使用脚本
进入[『设置』](https://i.cnblogs.com/Configure.aspx)界面，将上面生成的网页脚本引用复制到「页脚 HTML 代码」文本域中。

```js
<script src="https://blog-static.cnblogs.com/files/xuange306/mouse.min.js"></script>
<script type="text/javascript">
    $.shuicheMouse({
        type:10, 
        color:"rgba(187,67,128,1)"
    })
</script>
```
### 参数说明
|参数|类型|说明|
|---|---|---|
|type| int | 鼠标类型, 赋值 1 ~ 12 任意一个数字, 分别代表12种类型 |
|color| string/ false | 特效颜色, 如果赋值 false (这里的 false 是 布尔类型), 则会随机一种颜色. string 支持类型(css颜色赋值类型都支持)<br> 1. "#ffffff" 类型 <br> 2: rgb(255,255,255) <br> 3: rgba(255,255,255, 0.8)|

