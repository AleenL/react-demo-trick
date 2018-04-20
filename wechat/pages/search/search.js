var app = getApp()


Page({
    data: {
        //tab切换内容
        title:'',
        selectVideo: true,
        selectArticle: false,
        selectMusic:false,
        style:'video',
        playBtn: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/play.png',
        banner: {
            url: '',
            imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/title.png',
            title: '',
            time: [20, 21]
        },
        Video: [
            {
                url: '',
                imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/part/2_part.png',
                title: '孔子其人',
                text:'先秦诸子百家之首',
                time: [20, 21]
            },
            {
                url: '',
                imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/part/3_part.png',
                title: '宗教改革',
                text:'纪念500年宗教改革通识',
                time: [20, 21]
            },
            {
                url: '',
                imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/part/53_part.png',
                title: '求职崩坏',
                text:'关于求知崩坏和知识付费的关系',
                time: [20, 21]
            }
        ],
        Article: [
            {
                url: '',
                imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=796036945,2538546770&fm=27&gp=0.jpg',
                title: '这是一个测试的文章',
                anther:'风在吼&马仔笑',
                see: 120
            },
            {
              url: '',
              imgUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3017709312,2225594501&fm=27&gp=0.jpg',
              title: '这是一个文章标题',
              anther: '头号玩家',
              see: 78
            }, {
              url: '',
              imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/part/53_part.png',
              title: '这是一个测试的文章',
              anther: '@Packggt',
              see: 20
            }
        ],
        Music: [
            {
                url: '',
                imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/everdream.png',
                title: 'Everdream',
                text:'Epic Soul Factory/Casc Vila/Fran Soto - Sigma',
                people: '爱洗澡的小熊'
            },
            {
                url: '',
                imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/dog.png',
                title: '悲运的巫女',
                text:'和田薰 - 犬夜叉 音楽篇',
                people: '追风筝的鸡'
            },
            {
                url: '',
                imgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/Imagination.png',
                title: 'Imagination',
                text:'Cristian Onofreiciuc ',
                people: 'Sonder'
            }

        ]
    },
    goSuggestion:function(){
      wx.redirectTo({
        url: '../suggestion/suggestion'
      })
    },
    goMusic:function(e){
      wx.navigateTo({
            url:`../regeocoding/regeocoding?style=${this.data.style}&id=${e.currentTarget.dataset.id}`
        })
    },
    goArticle:function(e){
      wx.navigateTo({
        url: `../suggestion/suggestion?id=${e.currentTarget.dataset.id}`
      })
    },
    selectedArticle: function (e) {
        this.setData({
          style:'article',
          selectVideo: false,
          selectArticle: true,
          selectMusic: false,
        })
    },
    selectedVideo: function (e) {
        this.setData({
          style:'video',
          selectVideo: true,
          selectArticle: false,
          selectMusic: false,
        })
    },
    selectedMusic:function (e){
        this.setData({
          style:'music',
          selectVideo: false,
          selectArticle: false,
          selectMusic: true,
        })
    },
    onLoad:function(options){
      if (options.title){
        this.setData({
          title: options.title
        })
      }
    },
    onShareAppMessage: function () {
      return {
        title: '欢迎来到翻转电台小程序',
        desc: '翻转电台小程序',
        path: 'pages/search/search'
      }
    }
})