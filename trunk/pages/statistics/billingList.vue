<template>
    <view class="content">
        <view style="padding: 30upx;display: flex;flex-direction: row;" >
            <view class="amount">
                <view style="line-height: 80upx; margin-top: 30upx;" >
                    {{amount.payMoneyTotal == null ? '0' : amount.payMoneyTotal/100}}
                </view>
                <view style="font-size: 28upx;" >结算金额（元）</view>
            </view>
            <view class="amount" style="margin-left: 30upx;">
                <view style="line-height: 80upx; margin-top: 30upx;" >
                    {{amount.orderMoneyTotal == null ? '0' : amount.orderMoneyTotal/100}}
                </view>
                <view style="font-size: 28upx;" >订单实收金额（元）</view>
            </view>
        </view>
        <view class="menubox">
            <view :class="{activate:!isActive}" @click="clickStatus(0)" >待收款</view>
            <view :class="{activate:isActive}" style="margin-left: 60upx;" @click="clickStatus(1)" >已收款</view>
        </view>
        <view v-if="recordList.length > 0" v-for="(record, index) in recordList" :key="index"  class="record-box" >
            <view class="record-top">
                <image src="../../static/image/icon_sy_sj.png" mode=""></image>
                <text style="flex: 1; margin-left: 10upx;" >结算日期：{{record.date}}</text>
                <!-- <text style="color: #03BE90;">{{status == 'UNCONFIRMED_PAY' ? '未结算' : '已结算'}}</text> -->
            </view>
            <view style="margin-top: 20upx;font-weight:500;">
                <text style="color: #2A3441;">结算金额（元）：</text> <text style="color: #03BE90;">{{record.payMoney/100}}</text> 
            </view>
            <view style="margin-top: 20upx;">
                销售金额（元）：{{record.orderMoney/100}}
            </view>
            <view style="margin-top: 20upx;">
                实收金额（元）：{{record.orderDealMoney/100}}
            </view>
        </view>
        <view v-if="recordList.length <=0" class="nodata">
            <image src="../../static/image/img_zwddjl.png" mode=""></image>
            <view class="">暂无结算记录</view>
        </view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    export default {
    	data() {
    		return {
                recordList:[],
                page:1,
                size:10,
                status:'UNCONFIRMED_PAY',
                
                amount:'',
                isActive:false
            }
        },
        onLoad() {
            this.loadData()
        },
        methods:{
            clickStatus:function(tag){
                if(!tag){
                    this.status = 'UNCONFIRMED_PAY'
                }else{
                    this.status = 'CONFIRMED_PAY'
                }
                this.isActive = tag
                this.loadData()
            },
            loadData:function(){
                var data = {
                    page:this.page,
                    size:this.size,
                    payStatus:this.status
                }
                api.payinfoPage({
                    data:data
                }).then(res=>{
                    console.log(res)
                    if(res.status=='OK'){
                        this.recordList = res.list
                        res.list.forEach((item,index)=>{
                            if(util.formatTimestamp(item.settlementStart, 'yyyy-MM-dd') != util.formatTimestamp(item.settlementEnd, 'yyyy-MM-dd') ){
                                item.date = util.formatTimestamp(item.settlementStart, 'yyyy-MM-dd') + " ~ " + util.formatTimestamp(item.settlementEnd, 'yyyy-MM-dd') 
                            }else{
                                item.date = util.formatTimestamp(item.settlementStart, 'yyyy-MM-dd')
                            }
                            
                            // + " " + util.formatTimestamp(item.createTime,'hh:mm:ss')
                            
                        })
                    }
                })
                
                var obj = {
                    payStatus:this.status
                }
                api.paySummary({
                    data:obj
                }).then(res=>{
                    console.log(res)
                    this.amount = res.data
                })
            }
        }
    }
</script>

<style>
    page {
    	background: #F7F7F8;
    }
    
    .amount{
        width: calc(50% - 15upx);
        height: 186upx;
        background:linear-gradient(315deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        border-radius:30upx;
        font-size:42upx;
        font-weight:500;
        color:rgba(255,255,255,1);
        text-align: center;
    }
    .menubox{
        padding: 10upx 30upx;
        display: flex;
        flex-direction: row;
        color: #16202E;
        font-weight:400;
    }
    .activate{
        font-weight: 500;
        background-image: linear-gradient(200deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        background-repeat: no-repeat;
        background-size: 100% 12upx;
        background-position: 0 85%;
        line-height: 40upx;
    }
    .record-box{
        font-size:28upx;
        font-weight:400;
        color:rgba(162,169,186,1);
        padding: 30upx;
        margin:15upx 30upx;
        background: #FFFFFF;
    }
    .record-top{
        display: flex;
        flex-direction: row;
    }
    .record-top image{
        width: 36upx;
        height: 36upx;
    }
</style>
