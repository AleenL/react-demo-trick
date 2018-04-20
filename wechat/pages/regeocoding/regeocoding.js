var app = getApp()
const backgroundAudioManager = wx.getBackgroundAudioManager()


Page({
    data: {
        progress: 0,
        netProgress: 0,
        play: true,
        lock: false,
        transform: 0,
        playBtn: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/play.png',
        time: '00:00',
        style: 'video',
        playlist: {},
        backgroundPause: false,
        backgroundTime: 0,
        video: [{
            url: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/video/chapart_53.mp3',
            title: '语言的起源（媒介与传播）',
            anther: '翻转电台-李厚辰',
            coverImgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/part/53_part.png',
            people: ''
        }],
        music: [{
            url: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/Cristian%20Onofreiciuc%20-%20Imagination.mp3',
            coverImgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/Imagination.png',
            title: 'Imagination',
            anther: 'Cristian Onofreiciuc ',
            people: 'Sonder'
        }, {
            url: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/Cristian%20Onofreiciuc%20-%20Imagination.mp3',
            coverImgUrl: 'http://lcimg.oss-cn-hangzhou.aliyuncs.com/video/music/dog.png',
            title: '悲运的巫女',
            anther: '和田薰 - 犬夜叉 音楽篇',
            people: '追风筝的鸡'
        }],
        timeAxis: [
            {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 2
            },
            {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 4
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 6
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 8
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 10
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 60
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 70
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 300
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 320
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 340
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 360
            }, {
                title: '这是题目',
                text: '欢迎收听本次的翻转电台，这一次带来的题目是语言的起源',
                imageUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2837496376,1287987245&fm=200&gp=0.jpg',
                time: 380
            }
        ]
    },
    goPlay: function (e) {

        backgroundAudioManager.seek(e.currentTarget.dataset.time)
        if (backgroundAudioManager.pause) {
            backgroundAudioManager.play()
        }
    },
    playTimeAxis: function (index) {

        this.data.timeAxis.map((value, inx) => {
            if(value.time === parseInt(index)
    )
        {
            this.setData({
                transfrom: inx
            })
        }
    })
    }
    ,
    playPosition: function (e) {
        
        var time = backgroundAudioManager.duration
        backgroundAudioManager.seek(time * (e.detail.x / wx.getSystemInfoSync().windowWidth))
        this.setData({
            progress: (e.detail.x / wx.getSystemInfoSync().windowWidth) * 100
        })
    },
    goHome: function () {
        var play = backgroundAudioManager.paused;

        if (!play) {
            wx.redirectTo({
                url: `../search/search?title=${this.data.playlist.title}`
            })
        } else {
            wx.redirectTo({
                url: "../search/search"
            })
        }
    },
    playBtn: function () {
      
        let play = backgroundAudioManager.paused
        if (play) {
            this.setData({
                play: true
            })
            backgroundAudioManager.play()
        } else {
            this.setData({
                play: false,
                backgroundPause: false
            })
            backgroundAudioManager.pause()
        }
    },
    startPlay: function () {
        var time = backgroundAudioManager.duration
        backgroundAudioManager.seek(time * (this.data.progress / 100))
        this.setData({
            lock: false
        })
    },
    listenerButtonPause: function () {
        wx.pauseBackgroundAudio({});
    },
    changeMusicState: function () {
        let time = backgroundAudioManager.duration - backgroundAudioManager.currentTime
        let timeMin = parseInt(time / 60)
        let timeSec = parseInt(time % 60)
        let timeShow = (timeMin > 9 ? timeMin : '0' + timeMin) + ':' + (timeSec > 9 ? timeSec : '0' + timeSec)
        this.playTimeAxis(backgroundAudioManager.currentTime)
        this.setData({
            progress: (backgroundAudioManager.currentTime / backgroundAudioManager.duration) * 100,
            time: timeShow,
            netProgress: (backgroundAudioManager.buffered / backgroundAudioManager.duration) * 100,
        })
    },
    listenerButtonGetPlayState: function () {
        var self = this;
        backgroundAudioManager.onTimeUpdate(function (callback) {
            self.changeMusicState()
        })
    },

    listenerButtonSeek: function () {
        wx.seekBackgroundAudio({
            position: 40
        })
    },

    listenerButtonStop: function () {
        wx.stopBackgroundAudio({})
        console.log('停止播放')
    },
    onLoad: function (options) {
        var self = this;
        this.listenerButtonGetPlayState()
        if (options.id) {
            this.setData({
                style: options.style,
                playlist: {
                    url: this.data[options.style][options.id].url,
                    coverImgUrl: this.data[options.style][options.id].coverImgUrl,
                    title: this.data[options.style][options.id].title,
                    anther: this.data[options.style][options.id].anther,
                    people: this.data[options.style][options.id].people
                }
            })

            

            backgroundAudioManager.onEnded(function () {
                backgroundAudioManager.src = self.data.playlist.url
            })
            
            backgroundAudioManager.onError(function(err){
              console.log(err)
            })

            backgroundAudioManager.onPause(function () {
                self.setData({
                    play: false,
                    backgroundPause: true,
                    backgroundTime: backgroundAudioManager.currentTime
                })
            })

            if (this.data[options.style][options.id].url === backgroundAudioManager.src && !this.data.backgroundPause) return false
            backgroundAudioManager.src = this.data[options.style][options.id].url
            backgroundAudioManager.title = this.data[options.style][options.id].title
            backgroundAudioManager.singer = this.data[options.style][options.id].anther
            backgroundAudioManager.coverImgUrl = this.data[options.style][options.id].coverImgUrl
            this.setData({backgroundPause: false})
        }
    },
    showLrc:function(){
      var self = this;
      wx.request({
        url: `http://gecimi.com/api/lyric/${this.data.playlist.title}`,
        success:function(res){
          wx.request({
            url:res.result[0].lrc,
            success:function(res){
              self.scroll(res)
            }
          })
        }
      })
    },
    scroll:function(){
      console.log(res)
    },
    onHide: function () {
        let self = this;
        backgroundAudioManager.onPause(function () {
            self.setData({
                play: false,
                backgroundPause: true,
                backgroundTime: backgroundAudioManager.currentTime
            })
        })
    },
    onShow: function () {
        if (!this.data.backgroundPause) return false
        backgroundAudioManager.src = this.data.playlist.url
        backgroundAudioManager.title = this.data.playlist.title
        backgroundAudioManager.singer = this.data.playlist.anther
        backgroundAudioManager.coverImgUrl = this.data.playlist.coverImgUrl
        this.pausePlay()
        this.setData({backgroundPause: false, play: true})
    },
    pausePlay: function () {
        backgroundAudioManager.pause()
        backgroundAudioManager.seek(this.data.backgroundTime)
    },
    onShow: function () {
        backgroundAudioManager.play()
    }
})