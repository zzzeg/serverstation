<template>
    <view class="content">
        <view class="box">
            <view class="topBox">
                <image :src="userinfo.icon" mode=""></image>
                <view class="titleBox">
                    <view class="title">
                        {{userinfo.name}}
                    </view>
                    <view class="">
                         {{userinfo.tagName != null ? userinfo.tagName : ''}} 
                    </view>
                </view>
            </view>
            <view class="qrcore">
                <tki-qrcode ref="qrcode" :val="codeUrl" :size="size" :unit="unit" :icon="icon" :iconSize="iconsize" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
                
            </view>
            <view class="codeText">
                扫一扫上面的二维码图案，了解详情
            </view>
            <view class="empty-box"></view>
        </view>
    </view>
</template>

<script>
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
    export default {
        components: {tkiQrcode},
    	data() {
    		return {
                codeUrl:'',
                
    			size: 400, // 二维码大小
    			unit: 'upx', // 单位
    			icon: '', // 二维码图标
    			iconsize: 44, // 二维码图标大小
    			// val: '', // 要生成的二维码值
    			onval: true, // val值变化时自动重新生成二维码
    			loadMake: true, // 组件加载完成后自动生成二维码
    			src: '' ,// 二维码生成后的图片地址或base64
                
                userinfo:null
    		}
    	},
    	onLoad(option) {
            
            this.userinfo = uni.getStorageSync("userinfo")
            if(this.userinfo.icon){
                this.userinfo.icon = JSON.parse(this.userinfo.icon)[0].url
            }
            if(this.userinfo.tagName){
                this.userinfo.tagName = this.userinfo.tagName.replace(/,/g,"/")
            }
            
            this.codeUrl = this.userinfo.channelUrl
            // this.icon = this.userinfo.icon
        },
        methods:{
            qrR(res) {
                this.src = res
            }
        }
    }
</script>

<style>
    page{
        background: #F7F7F8;
    }
    .box{
        margin: 30upx 40upx;
        width: calc(100% - 60upx);
        background: #FFFFFF;
        border-radius:30upx;
    }
    .topBox{
        padding-left: 40upx;
        padding-top: 40upx;
        display: flex;
        flex-direction: row;
    }
    .topBox image{
        width: 112upx;
        height: 112upx;
        background: #F8F8F8;
        border-radius: 10upx;
    }
    .titleBox {
        margin-left: 20upx;
        font-size:28upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:40upx;
    }
    .titleBox .title{
        font-size:40upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:76upx;
    }
    .qrcore{
        margin-top: 100upx;
        margin-bottom: 60upx;
        width: 490upx;
        height: 400upx;
        display: flex;
        justify-content: center;
        
        width: 100%;
    }
    .codeText{
        display: flex;
        justify-content: center;
        font-size:14px;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(162,169,186,1);
    }
</style>
