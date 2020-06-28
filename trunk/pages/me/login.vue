<template>
    <view class="content">
    	<image v-if="load" class="logo" src="https://coffer.bainuo.cn/mdt-pub/img_ygdl_bg.png"></image>
    	<view v-if="load" class="login-box">
    		<view class="welcome-text">
    		    欢迎登录
    		</view>
            <view class="title-text">
                明我食方 <text style="color: #019C75;font-size:36upx;">（店员端）</text>
            </view>
            <view class="name-text">
                账号
            </view>
            <input class="input" type="text" v-model="username" v-on:input="watchNum" 
                placeholder-class ="inputps" :placeholder="nameTitle" />
            <view class="name-text">
                密码
            </view>
            <input class="input" type="text"  password="ture" v-on:input="watchNum" v-model="userpass"
                placeholder-class ="inputps" :placeholder="passTitle" />
            <view class="tips-text">
                {{tips}}
            </view>
            <button @click="clickLogin" hover-class="button-hover" class="login-btn" :class="{btnopacity:isActive}">{{buttonTitle}}</button>
                
    	</view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    
    export default {
    	data() {
    		return {
    			nameTitle: "请输入帐号",
    			passTitle: '请输入密码',
                buttonTitle: '登录',
                username: "",
                userpass: "",
                // username: "bnshequ",
                // userpass: "bn##123",
                load:false,
                isActive:false,
                tips:''
    		}
    	},
    	onLoad() {
            var sessionKey = uni.getStorageSync('sessionKey');
            if(sessionKey.length>10){
                uni.switchTab({
                    url: '../statistics/statistics'
                });
            }
            this.load = true
    	},
    	methods: {
            watchNum: function() {
                if (this.userpass.length > 0 && this.username.length>0) {
                    this.isActive = true
                }else{
                    this.isActive = false
                }
            },
            clickLogin: function(){
                if (this.username == '') {
                    uni.showToast({
                        title: '请输入账号',
                        icon: "none",
                        duration: 2000
                    })
                    return;
                }
                if (this.userpass == '') {
                    uni.showToast({
                        title: '请输入密码',
                        icon: "none",
                        duration: 2000
                    })
                    return;
                }
                var data = {
                    'account': this.username,
                    'password': this.userpass
                }
                api.login({
                    data: data
                }).then(accountRes => {
                    console.log(accountRes)
                    if (accountRes.status == "OK") {
                        const sessionKey = accountRes.data.sskey
                        uni.setStorageSync('sessionKey', sessionKey)
                        uni.setStorageSync('userinfo', accountRes.data)
                        uni.switchTab({
                            url: '../statistics/statistics'
                        });
                        
                        
                    }
                })
                
                
            }
    	}
    }
</script>

<style>
    
    .login-btn {
        margin-left: 63upx;
        margin-right: 63upx;
        margin-top: 83upx;
        height: 104upx;
        line-height: 104upx;
        border-radius: 52upx;
        opacity: 0.4;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
    .inputps{
        font-size:33upx;
        font-weight:400;
        /* color: #F0AD4E; */
        color:#C6CAD4;
        line-height:46upx;
        
    }
    .input{
        text-align: left;
        margin-top: 16upx;
        /* width: 100%; */
        margin-left: 63upx;
        margin-right: 63upx;
        margin-right: 63upx;
        height: 92upx;
        font-size: 40upx;
        color: #2A3441;
        -moz-border-radius: 46upx;
        border-bottom: 2upx solid #E0E2E6;
    }
    .name-text{
        margin-left: 63upx;
        margin-top: 63upx;
        font-size:38upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:#16202E;
        line-height:56upx;
    }
    .title-text{
        margin-left: 63upx;
        font-size:58upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:85upx;
    }
    .content {
    	display: flex;
    	flex-direction: column;
    	align-items: center;
    	justify-content: center;
        
    }
    
    .logo {
    	height: 692upx;
    	width: 100%;
    	margin-top: 0upx;
    	margin-left: auto;
    	margin-right: auto;
    	margin-bottom: 0upx;
    }
    
    .login-box{
        width: 90%;
        height: 940upx;
        /* margin-top: -310upx; */
        background:#FFFFFF;
        box-shadow:0upx 42upx 208upx 0upx rgba(22,32,46,0.15);
        border-radius:31upx;
        position: absolute;
        top: 60%;
        left: 50%;
        transform-style: preserve-3d;
        transform: translate(-50%, -50%);
    }
    .welcome-text{
        margin-left: 63upx;
        margin-top: 63upx;
        font-size:42upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(42,52,65,1);
        line-height:60upx;
    }
    .btnopacity {
        opacity: 1;
    }
</style>
