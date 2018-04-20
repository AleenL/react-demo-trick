var app = getApp()
Page({
    data: {
        //tab切换内容
        selectNew:true,
        selectLong:false,
        //图片地址
        imgUrls: [
            {
                link:"/pages/search/search",
                url:'../../img/banner/banner_1.png'
            },{
                link:"pages/search/search",
                url:'../../img/banner/banner_2.png'
            },{
                link:"pages/search/search",
                url:'../../img/banner/banner_3.png'

            }
        ],
        centerContentLink:[
            {
                link:"/pages/search/search",
                text:'我要借',
                url:'../../img/button/center_content_1.png'
            },{
                link:"pages/search/search",
                text:'逛一逛',
                url:'../../img/button/center_content_2.png'
            },{
                link:"pages/search/search",
                text:'打折季',
                url:'../../img/button/center_content_3.png'

            }
        ],
        centerBottomContentLink:[
            {
                link:"/pages/search/search",
                text:'电玩',
                url:'../../img/button/center_bottom_1.png'
            },{
                link:"pages/search/search",
                text:'电影',
                url:'../../img/button/center_bottom_2.png'
            }
        ],
        bottomLink:[
            {
                link:'/pages/search/search',
                text:'刚刚发布'
            },{
                link:'/pages/search/search',
                text:'附近最热'
            }
        ],
        //是否采用衔接滑动
        circular: true,
        //是否显示画板指示点
        indicatorDots: true,
        //选中点的颜色
        indicatorcolor: "#000",
        //是否竖直
        vertical: false,
        //是否自动切换
        autoplay: true,
        //自动切换的间隔
        interval: 3000,
        //滑动动画时长毫秒
        duration: 1000,
        //所有图片的高度
        imgheights: [],
        //图片宽度
        imgwidth: 750,
        //默认
        current: 0
    },
    selectedNew:function(e){
        console.log('selectedNew')
        this.setData({
            selectNew:true,
            selectLong:false
        })
    },
    selectedLong:function(e){
        console.log('selectedLong')
        this.setData({
            selectNew:false,
            selectLong:true
        })
    },
    listenerButtonPause:function(){
        wx.pauseBackgroundAudio({
        });
        console.log('暂停播放')
    },
    imageLoad: function (e) {//获取图片真实宽度
        var imgwidth = e.detail.width,
            imgheight = e.detail.height,
            //宽高比
            ratio = imgwidth / imgheight;
        console.log(imgwidth, imgheight)
        //计算的高度值
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight;
        var imgheights = this.data.imgheights;
        //把每一张图片的对应的高度记录到数组里
        imgheights[e.target.dataset.id] = imgheight;
        this.setData({
            imgheights: imgheights
        })
    },
    bindchange: function (e) {
        // console.log(e.detail.current)
        this.setData({ current: e.detail.current })
    }
})