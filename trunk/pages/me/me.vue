<template>
    <view class="content">
        <uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
        	<swiper class="swiper-box" @change="change">
        		<swiper-item v-for="(item, index) in info" :key="index">
        			<view :class="item.colorClass" class="swiper-item">
        				<image class="image" :src="item.url" mode="aspectFill" />
        			</view>
        		</swiper-item>
        	</swiper>
        </uni-swiper-dot>
        <view class="standBox">
            <view class="pics">
                
            </view>
            <view class="topBox">
                <image :src="userinfo.icon" mode=""></image>
                <view class="titleBox">
                    <view class="title">
                        <view class="">
                            {{userinfo.name}}
                        </view> 
                    </view>
                    <view class="starbox">
                        <view class="" style="margin-right: 28upx;">
                            {{userinfo.tagName != null ? userinfo.tagName : ''}} 
                        </view>
                    </view>
                </view>
            </view>
            <view style="padding:0upx 30upx 30upx 30upx;color: #434E5E;">
                {{userinfo.remark != null ? userinfo.remark : ''}} 
            </view>
        </view>
        <view class="itme-box">
            <view class="item" @click="clickItem">
                <view class="" style="flex: 1;">服务站二维码</view>
                <image src="../../static/image/icon_wd_erwm.png" mode=""></image> 
                <image class="jiantou" src="../../static/image/icon_jybg_jt.png" mode=""></image>
            </view>
            <view class="item" >
                <view style="flex: 1;">编号</view>
                <view style="color: #A2A9BA;">{{userinfo.code}}</view>
            </view>
            <view class="item" >
                <view style="flex: 1;">地址</view>
                <view style="color: #A2A9BA;">{{userinfo.province}}{{userinfo.city}}</view>
            </view>
            <view class="item" >
                <view style="flex: 1;">联系人</view>
                <view style="color: #A2A9BA;">{{userinfo.contactName}}</view>
            </view>
            <view class="item" >
                <view style="flex: 1;">开启时间</view>
                <view style="color: #A2A9BA;">{{userinfo.date}}  {{userinfo.time}}</view>
            </view>
        </view>
        <button @click="clickLogout" hover-class="button-hover" class="logout-btn" >退出登录</button>
        <view class="empty-box"></view>
    </view>
</template>

<script>
    import util from '../../common/util.js';
    import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
    export default {
        components: {
        	uniSwiperDot
        },
    	data() {
    		return {
    			userinfo:null,
                
                
                info: [
                ],
                current: 0,
                mode: 'dot',
                dotsStyles: {
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    selectedBackgroundColor: '#03BE90',
                    border: '1px rgba(83, 200, 249,0.0) solid',
                    selectedBorder: '1px rgba(83, 200, 249,0.0) solid'
                }
    		}
    	},
    	onLoad() {
            this.userinfo = uni.getStorageSync("userinfo")
            if(this.userinfo.icon){
                this.userinfo.icon = JSON.parse(this.userinfo.icon)[0].url
            }
            if(this.userinfo.pics){
                this.info = JSON.parse(this.userinfo.pics)
            }
            if(this.userinfo.tagName){
                this.userinfo.tagName = this.userinfo.tagName.replace(/,/g,"/")
            }
            
            this.userinfo.score = Math.round(this.userinfo.score)
            this.userinfo.date = util.formatTimestamp(this.userinfo.createTime, 'yyyy-MM-dd')
            
            this.userinfo.time = util.formatTimestamp(this.userinfo.createTime,'hh:mm')
        },
        methods:{
            change(e) {
            	this.current = e.detail.current
            },
         
            clickLogout:function(){
                uni.showModal({
                    content: '确定退出登录？',
                    // showCancel: false,
                    cancelColor: "#03BE90",
                    confirmColor: "#03BE90",
                    success: function(res) {
                        if (res.confirm) {
                            uni.clearStorageSync()
                            
                            uni.reLaunch({
                                url:'login'
                            })
                        }
                    },
                })
                
            },
            clickItem:function(){
                uni.navigateTo({
                    url:'standQrcode'
                })
            }
        }
    }    
</script>

<style>
    page{
        background: #F7F7F8;
    }
    .logout-btn {
        margin-left: 30upx;
        margin-right: 30upx;
        margin-top: 60upx;
        height: 100upx;
        line-height: 100upx;
        border-radius: 50upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
    .itme-box{
        margin-top: 30upx;
        background-color: #FFFFFF;
    }
    .item{
        width: calc(100% - 60upx);
        height: 48upx;
        line-height: 48upx;
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        align-items: center;
        padding: 30upx;
        color: #16202E;
    }
    .item image{
        width: 48upx;
        height: 48upx;
        
    }
    .item .jiantou{
        margin-left: 18upx;
        width: 22upx;
        height: 32upx;
    }
    .standBox{
        background: #FFFFFF;
    }
    .topBox{
        padding: 40upx;
        display: flex;
        flex-direction: row;
        
    }
    .topBox image{
        width: 112upx;
        height: 112upx;
        background: #F8F8F8;
        border-radius: 20upx;
        margin-right: 8upx;
    }
    .titleBox {
        margin-left: 20upx;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:34upx;
        flex: 1;
    }
    .titleBox .title{
        font-size:40upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:76upx;
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    
    
    
    .example {
    	padding: 0 30rpx;
    }
    
    .example-info {
    	/* #ifndef APP-NVUE */
    	display: block;
    	/* #endif */
    	padding: 30rpx;
    	color: #3b4144;
    	background-color: #ffffff;
    	font-size: 30rpx;
    }
    
    .example-info-text {
    	font-size: 28rpx;
    	line-height: 36rpx;
    }
    
    
    .example-body {
    	flex-direction: column;
    	padding: 30rpx;
    	background-color: #ffffff;
    }
    
    .word-btn-white {
    	font-size: 18px;
    	color: #FFFFFF;
    }
    
    .word-btn {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: row;
    	align-items: center;
    	justify-content: center;
    	border-radius: 6px;
    	height: 48px;
    	margin: 15px;
    	background-color: #007AFF;
    }
    
    .word-btn--hover {
    	background-color: #4ca2ff;
    }
    
    
    .swiper-box {
    	height: 200px;
    }
    
    .swiper-item {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: column;
    	justify-content: center;
    	align-items: center;
    	background-color: #999;
    	color: #fff;
    }
    
    .image {
    	width: 750rpx;
    }
    
    .uni-bg-red {
    	background-color: #ff5a5f;
    }
    
    .uni-bg-green {
    	background-color: #09bb07;
    }
    
    .uni-bg-blue {
    	background-color: #007aff;
    }
    
    .example-body {
    	/* #ifndef APP-NVUE */
    	display: flex;
    	/* #endif */
    	flex-direction: row;
    	padding: 20rpx;
    }
    
    .example-body-item {
    
    	flex-direction: row;
    	justify-content: center;
    	align-items: center;
    	margin: 15rpx;
    	padding: 15rpx;
    	height: 60rpx;
    	/* #ifndef APP-NVUE */
    	display: flex;
    	padding: 0 15rpx;
    	/* #endif */
    	flex: 1;
    	/* border-color: #e5e5e5;
    	border-style: solid;
    	border-width: 1px; */
    	border-radius: 5px;
    }
    
    .example-body-item-text {
    	font-size: 28rpx;
    	color: #333;
    }
    
    .example-body-dots {
    	width: 16rpx;
    	height: 16rpx;
    	border-radius: 50px;
    	background-color: #333333;
    	margin-left: 10rpx;
    }
    
    .active {
    	/* border-style: solid;
    	border-color: #007aff;
    	border-width: 1px; */
    }
</style>
