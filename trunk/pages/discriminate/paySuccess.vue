<template>
    <view class="content">
        <image class="wxzflogo" src="../../static/image/img_zfcg.png" mode=""></image>
        <view class="wxzftishi">
            支付成功
        </view>
        <!-- {{val}} -->
        <view class="qrcore" style="margin-top: 80upx;">
            <tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :iconSize="iconsize" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
            <!-- <image class="icon" :src="icon" mode="aspectFill"></image> -->
            
        </view>
        <view class="wxzftishi" style="color: #A2A9BA; margin-top: -80upx;">
            微信、支付宝扫码开具发票
        </view>
        <view class="shuaxin" @click="clickClose">
            关闭
        </view>
    </view>
</template>

<script>
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
    export default {
        components: {tkiQrcode},
        data() {
            return {
                price:0,
                orderId:'',
                val:'',
                
                size: 400, // 二维码大小
                unit: 'upx', // 单位
                icon: '', // 二维码图标
                iconsize: 44, // 二维码图标大小
                // val: '', // 要生成的二维码值
                onval: true, // val值变化时自动重新生成二维码
                loadMake: true, // 组件加载完成后自动生成二维码
                src: '' ,// 二维码生成后的图片地址或base64
                
                type:0
            }
        },
        onLoad(op) {
            
            this.val = 'https://fp.szhtxx.cn/getInfo/#/99991923/3744'
        },
        methods:{
            qrR(res) {
                this.src = res
            },
            clickClose:function(){
                this.type = 1
                uni.navigateBack({
                    delta:5
                })
            },
            onUnload() {
                if(this.type == 0){
                    uni.navigateBack()({
                        delta:4
                    })
                }
                
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
        width: 132upx;
        height: 132upx;
        margin-top: 92upx;
        
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
   
        width: 100%;
    }
    .shuaxin{
        margin-top: 20upx;
        margin-left: calc(50% - 200upx);
        width:400upx;
        height:100upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 3px 15px 0px rgba(3,190,144,0.3);
        border-radius:25px;
        font-size:32upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:100upx;
    }
    
</style>
