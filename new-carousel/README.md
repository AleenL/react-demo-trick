#### 心路历程


这个小DEMO耗时3天多一点，十分感谢遥远的国外的Antonio Petraglia提供的灵感，这个轮播效果是在Dribbble网站上看到的，效果看起来十分的简洁明了，实现起来也不是很难，有点jq基础都可以完成的内容，由于全屏轮播看起来有一点怪怪的，所以我就没使用全屏轮播，实现了视频里差不多，百分之80的效果。

[视频效果](https://cdn.dribbble.com/users/912401/screenshots/2211615/attachments/410224/video.mp4)

我完成的效果，没有视频只能上图了：
![img](carousel(1).jpg)
![img](carousel(2).jpg)
![img](carousel(3).jpg)


不足之处有很多：
第一点：新手最容易出现的问题，代码不够简洁，如果掌握的知识够多的话，就能明白，那些代码可以优化，那些代码可以删除了
第二点：点击放大的效果不好，点击放大图片的效果应该是图片的位置保持不变，然后慢慢扩大为父元素的宽高，由于我使用的是浮动进行的轮播，所以造成，图片点击放大，由于left的值变化，造成图片会瞬移之后放大