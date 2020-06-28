<template>
    <view class="content">
        <view>
            <video id="myVideo" :src="src"
                @error="videoErrorCallback" :title = "videoTitle" enable-danmu controls></video>
        </view>
        <view style="padding: 20upx 30upx;font-size:36upx;font-weight:500;">
            {{videoTitle}}
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                videoContext:null,
                videoTitle:"",
                src: '',
                
                danmuValue: ''
            }
        },
        onLoad(option) {
            this.videoTitle = option.name
            this.src = option.url
            
            uni.setNavigationBarTitle({
                title:this.videoTitle
            })
        },
        onReady: function(res) {
            
            this.videoContext = uni.createVideoContext('myVideo')
            console.log(this.videoContext)
        },
        methods: {
            
            videoErrorCallback: function(e) {
                uni.showModal({
                    content: e.target.errMsg,
                    showCancel: false
                })
            },
            getRandomColor: function() {
                const rgb = []
                for (let i = 0; i < 3; ++i) {
                    let color = Math.floor(Math.random() * 256).toString(16)
                    color = color.length == 1 ? '0' + color : color
                    rgb.push(color)
                }
                return '#' + rgb.join('')
            }
        }
    }
</script>

<style>
    video{
        width: 100%;
        height: 452upx;
    }
</style>
