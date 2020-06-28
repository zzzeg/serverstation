<template>
    <view class="content">
        <image class="wxzflogo" src="../../static/image/img_wxzf_logo.png" mode=""></image>
        <view class="wxzftishi">
            微信扫一扫付款
        </view>
        <view class="money">{{price/100}}</view>
        <!-- {{codeUrl}} -->
        <view class="qrcore">
            <tki-qrcode ref="qrcode" :val="codeUrl" :size="size" :unit="unit" :iconSize="iconsize" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
            <!-- <image class="icon" :src="icon" mode="aspectFill"></image> -->
        </view>
        <view class="shuaxin" @click="clickShuaxin">
            <image src="../../static/image/icon_shuaxin.png" mode=""></image>
            <text style="margin-left: 10upx;">刷新二维码</text>
        </view>
    </view>
</template>

<script>
    import api from '../../common/api.js'
    
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
    export default {
        components: {tkiQrcode},
        data() {
            return {
                price:0,
                orderId:'',
                codeUrl:'',
                
                size: 400, // 二维码大小
                unit: 'upx', // 单位
                icon: '', // 二维码图标
                iconsize: 44, // 二维码图标大小
                // val: '', // 要生成的二维码值
                onval: true, // val值变化时自动重新生成二维码
                loadMake: true, // 组件加载完成后自动生成二维码
                src: '' ,// 二维码生成后的图片地址或base64
                
                interval:null
            }
        },
        onLoad() {
            var op = uni.getStorageSync('Order')
            this.orderId = op.orderId
            this.price = op.price
            this.codeUrl = op.codeUrl
            // console.log(op.orderId  + "    "+op.price + "    "+op.codeUrl )
            uni.removeStorageSync('Order')
        },
        onShow() {
            var _self = this
            
            if(_self.interval){
                clearInterval(_self.interval)
            }
            _self.interval = setInterval(function(){
                api.queryOrderStatus({
                    data:{
                        orderId:_self.orderId
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.orderStatus == 'SUCCESS'){
                        clearInterval(_self.interval)
                        uni.navigateTo({
                            url:'paySuccess'
                        })
                    }
                })
            }, 3000);
        },
        onUnload() {
            console.log("onUnload")
            clearInterval(this.interval)
        },
        methods:{
            qrR(res) {
                this.src = res
            },
            clickShuaxin:function(){
                api.getPayCode({
                    data:{
                        orderId:this.orderId
                    }
                }).then(res => {
                    console.log(res)
                    if(res.data.orderStatus == 'SUCCESS'){
                        clearInterval(this.interval)
                        uni.navigateTo({
                            url:'paySuccess'
                        })
                    }else{
                        this.orderId = res.data.orderId
                        this.price = res.data.price
                        this.codeUrl = res.data.codeUrl
                    }
                    
                })
            }
        }
        
    }
</script>

<style>
    page{
        background: #EFF1F6;
    }
    .content{
        text-align: center;
    }
    .wxzflogo{
        width: 160upx;
        height: 160upx;
        margin-top: 80upx;
        
    }
    .wxzftishi{
        font-size:32upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:48upx;
    }
    .money{
        margin: 30upx 0upx;
        font-size:46px;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:68px;
    }
    .qrcore{
        width: 490upx;
        height: 490upx;
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .shuaxin{
        font-size:32upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(3,190,144,1);
        line-height:48upx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .shuaxin image{
        width: 32upx;
        height: 32upx;
    }
</style>
