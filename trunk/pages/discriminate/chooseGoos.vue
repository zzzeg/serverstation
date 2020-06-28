<template>
    <view class="content">
        <view class="hintText">
            以下是明我健康AI为您定制的调理方案，请根据自身需要进行购买！
        </view>
        <view v-for="(record, index) in instanceData" :key="index" class="plan-box">
            <view style="display: flex;align-items: center;margin-left: 30upx;">
                <image v-if="!record.xuanzhong" @click="clickGoods(index)" src="../../static/image/moren.png" mode=""></image>
                <image v-if="record.xuanzhong" @click="clickGoods(index)" src="../../static/image/selected.png" mode=""></image>
            </view>
            
            <view class="plan-box-title">
                <image @click="clickGoos(record)" :src="record.picUrl" mode=""></image>
                <view class="plan-box-name">
                    <view @click="clickGoos(record)"  style="margin-top: -10upx;" >{{record.name}} </view>
                    <view @click="clickGoos(record)" class="remarksBox">
                        <view v-for="(item, i) in record.efficacy" :key='i' class="remarksText">
                            {{item}}  
                        </view>
                    </view>
                    <view class="moneyBox">
                        <text>￥{{record.price/100}}</text>
                        <view class="countBox">
                            <image v-if="record.xuanzhong" @click="clickJian(index)" style="margin-left: 10upx;" src="../../static/image/jian.png" mode=""></image>
                            <text style="margin-left: 20upx; margin-right: 20upx;" >{{!record.xuanzhong ? 'X' : ''}} {{record.num}}</text>
                            <image v-if="record.xuanzhong" @click="clickJia(index)" src="../../static/image/jia.png" mode=""></image>
                        </view>
                    </view>
                </view>
            </view>
        </view>    
        <view class="expensesbox">
            <text v-if="minimum - goodsMoney>0">还差<text style="color: #03BE90;">{{(minimum-goodsMoney) /100}}</text>元免基础配送费</text> 
            <text v-else>已免基础配送费</text>
        </view>
        <view class="toolBar">
            <view @click="clickAll" style="display: flex;align-items: center;margin-left: 30upx; height: 100%;">
                <image v-if="!all" src="../../static/image/moren.png" mode=""></image>
                <image v-if="all" src="../../static/image/selected.png" mode=""></image>
                <view style="margin-left: 10upx;">全选</view>
            </view>
            <view class="unit">
                <view style="display: flex;align-items: center;">
                    共<text style="color: #03BE90; margin: 0upx 10upx;">{{goodsNum}}</text>件  总价：
                </view> 
                <view class="moneyss">
                    <view class="moneyText">
                        ￥{{goodsMoney/100}}
                    </view>
                    <view class="expensesText">
                        含配送费￥{{minimum - goodsMoney>0 ? expenses/100 : 0}}
                    </view>
                </view>
            </view>
            <view @click="next" class="nextBtn">
                下单
            </view>
        </view>
    </view>
</template>

<script>
    import api from '../../common/api.js'
    import util from '../../common/util.js'
    export default {
        data() {
            return {
                instanceData:[],
                distributionMoney:'',
                goodsNum:0,
                goodsMoney:0,
                expenses:0,
                minimum:0,
                on_off:false,
                rid:'',
                all:true
            }
        },
        onLoad(op) {
            this.rid = op.id
            uni.removeStorageSync("Goos")
            var data = {
                instanceId:this.rid
            }
            api.findByInstanceId({
                data:data
            }).then(res => {
                console.log(res)
                if(res.status == 'OK'){
                    this.instanceData = res.data
                    this.instanceData.forEach((item, index) => {
                        console.log(item.picUrl)
                        if(JSON.parse(item.picUrl).length>0){
                            item.picUrl = JSON.parse(item.picUrl)[0].url
                        }
                        this.goodsNum = this.goodsNum + item.num
                        this.goodsMoney = this.goodsMoney + item.price*item.num
                        item.efficacy = item.efficacy.split(/[、,，]/); 
                        console.log(item.efficacy)
                        item.xuanzhong = 1
                    })
                }
            })
            
            api.getPostage({}).then(res => {
                console.log(res)
                if(res.status == 'OK'){
                    this.expenses = res.data.expenses
                    this.minimum = res.data.minimum
                    this.on_off = res.data.on_off
                    // this.distributionMoney = "还差"+(this.minimum-this.goodsMoney) /100+"元免基础配送费"
                }
            })
        },
        methods:{
            clickAll:function(){
                this.all = !this.all
                console.log(this.all)
                if(!this.all){
                    this.instanceData.forEach((item, i) => {
                        item.xuanzhong = false
                        item.name = item.name + ' '
                        this.goodsMoney = this.goodsMoney - item.price*item.num
                        this.goodsNum = 0
                        
                    })
                }else{
                    this.goodsMoney = 0
                    this.goodsNum = 0
                    this.instanceData.forEach((item, i) => {
                        item.xuanzhong = true
                        item.name = item.name + ' '
                        this.goodsMoney = this.goodsMoney + item.price*item.num
                        this.goodsNum = this.goodsNum + item.num
                    })
                }
            },
            clickGoos:function(record){
                if(record.detail){
                    uni.navigateTo({
                        url:'report?type=2&recordid='+record.detailId
                    })
                }
            },
            next:function(){
                if(this.goodsNum<=0){
                    uni.showToast({
                        title: '请选择商品',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                var goods = []
                this.instanceData.forEach((item, i) => {
                    if(item.xuanzhong){
                        var good = {
                            num:item.num,
                            productId:item.code,
                            type:"DIET_PLAN"
                        }
                        goods.push(good)
                    }
                })
                var eee = 0
                if(this.minimum - this.goodsMoney>0){
                    eee = this.expenses
                }
                uni.setStorageSync("Goos",goods)
                uni.navigateTo({
                    url:"order?id="+this.rid+"&expenses="+eee
                })
            },
            clickGoods:function(index){
                console.log(index)
                this.all = true
                this.instanceData.forEach((item, i) => {
                    if(index == i){
                        item.xuanzhong = !item.xuanzhong
                        item.name = item.name + ' '
                        if(item.xuanzhong){
                            this.goodsNum = this.goodsNum + item.num
                            this.goodsMoney = this.goodsMoney + item.price*item.num
                        }else{
                            this.all = false
                            this.goodsNum = this.goodsNum - item.num
                            this.goodsMoney = this.goodsMoney - item.price*item.num
                        }
                    }else{
                        if(!item.xuanzhong){
                            this.all = false
                        }
                    }
                    // if(this.minimum - this.goodsMoney>0){
                    //     this.distributionMoney ="还差"+(this.minimum - this.goodsMoney)/100+"元免基础配送费"
                    // }else{
                    //     this.distributionMoney = "￥0元"
                    // }
                })
                
            },
            clickJia:function(index){
                this.instanceData[index].num = this.instanceData[index].num + 1
               
                this.goodsNum = this.goodsNum + 1
                this.goodsMoney = this.goodsMoney + this.instanceData[index].price*1
                
                // if(this.minimum - this.goodsMoney>0){
                //     this.distributionMoney = "还差"+(this.minimum - this.goodsMoney)/100+"元免基础配送费"
                // }else{
                //     this.distributionMoney = "￥0元"
                // }
            },clickJian:function(index){
                if(this.instanceData[index].num == 1){
                    return
                }
                this.instanceData[index].num = this.instanceData[index].num - 1
                if(this.instanceData[index].num<=0){
                    item.xuanzhong = false
                    item.name = item.name + ' '
                }
                this.goodsNum = this.goodsNum - 1
                this.goodsMoney = this.goodsMoney - this.instanceData[index].price*1
                
                // if(this.minimum - this.goodsMoney>0){
                //     this.distributionMoney ="还差"+(this.minimum - this.goodsMoney)/100+"元免基础配送费"
                // }else{
                //     this.distributionMoney = "￥0元"
                // }
            }
        }
    }
</script>

<style>
    page{
        background: #EFF1F6;
    }
    .hintText{
        font-size:28upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(2,172,130,1);
        line-height:40upx;
        padding: 30upx;
    }
    .plan-box{
        display: flex;
        flex-direction: row;
        background: #FFFFFF;
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        border-radius:30upx;
        margin: 0upx 20upx 40upx 20upx;
    }
    .plan-box-title{
        display: flex;
        flex-direction: row;
        margin-left: 33upx;
        margin-right: 33upx;
        margin-top: 30upx;
        margin-bottom: 30upx;
        width: calc(100% - 66upx);
    }
    .plan-box image{
        width: 44upx;
        height: 44upx;
    }
    .toolBar image{
        width: 44upx;
        height: 44upx;
    }
    .plan-box-title image{
        width: 156upx;
        height: 142upx;
        border-radius:10upx;
    
    }
    .plan-box-name{
        margin-left: 12upx;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .moneyBox{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .remarksBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:34upx;
        margin-top: 20upx;
        margin-bottom: 20upx;
    }
    .remarksText{
        /* 
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap; */
        /* width:60px; */
        height:32upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        border-radius:32upx;
        font-size:20upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:28upx;
        padding: 10upx;
        margin-right: 10upx;
    }
    .countBox{
        display: flex;
        align-items: flex-start;
        /* height: 44upx; */
    }
    .countBox image{
        width: 44upx;
        height: 44upx;
    }
    .toolBar{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 112upx;
        background: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .expensesbox{
        position: absolute;
        bottom: 132upx;
        left: calc(50% - 160upx);
        width: 320upx;
        height: 56upx;
        background: #FFFFFF;
        border-radius:30upx;
        
        font-size:24upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(42,52,65,1);
        line-height:56upx;
        text-align: center;
    }
    .unit{
        font-size:20upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(42,52,65,1);
        display: flex;
        flex-direction: row;
    }
    .moneyss{
        display: flex;
        flex-direction: column;
    }
    .moneyText{
        font-size:32upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(3,190,144,1);
    }
    .expensesText{
        
    }
    .nextBtn{
        width:200upx;
        height:72upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0upx 6upx 30upx 0px rgba(3,190,144,0.3);
        border-radius:50upx;
        text-align: center;
        line-height: 72upx;
        color: #FFFFFF;
        margin-right: 30upx;
    }
</style>
