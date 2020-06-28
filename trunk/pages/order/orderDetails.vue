<template>
    <view class="content">
        <view v-if="isload" v-for="(item,index) in order.item" :key="index" class="plan-box">
            <view class="line20" style="width: 100%" ></view>
            <view class="plan-box-title" >
                <image :src="item.img" mode=""></image>
                <view class="plan-box-name">
                    <view class="" style="display: flex;justify-content: space-between;height: 50%;">
                        <text style="height: 50%;">{{item.name}}</text> <image style="width: 16upx; height: 20upx;" src="../../static/image/icon_jybg_jt.png" mode=""></image>
                    </view> 
                    <view style="display: flex;justify-content: space-between;height: 50%;margin-top: 20upx;" >
                        <text style="height: 50%;">￥{{item.price/100}}</text><text style="height: 50%;">x {{item.num}}</text>
                    </view>
                    
                </view>
            </view>
            <!-- <view v-if="item.type=='DIET_PLAN'" v-for="(snapshot,i) in item.snapshot" :key="i" class="plan-box sss">
                <view style="">
                    [配料]
                </view>
                <view class="plan-box-itme" >
                    <view v-for="(dietician,ind) in snapshot.dieticianComponents" :key="ind" style="width: 50%;" >
                    <view v-for="(dietician,ind) in snapshot.dieticianComponents" :key="ind" :class="{marginLeft40:ind != 0}" >
                        {{dietician.name}}({{dietician.quantity}}{{dietician.unit}})
                    </view>
                </view>
            </view> -->
            <!-- <view class="empty-box30"></view> -->
        </view>
       
        <!-- <view class="empty-box30"></view> -->
   
        <view class="line20"></view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">订单金额（元）</text> <text style="color: #A2A9BA;">{{(order.totalPrice - order.expenses)/100}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">配送费（元）</text> <text style="color: #A2A9BA;">{{order.expenses/100}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">实收款（元）</text> <text style="color: #A2A9BA;">{{order.actualPrice/100}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">支付方式</text> <text style="color: #A2A9BA;">{{order.payType == 'CASH' ? '现金支付' : '微信支付'}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">用户姓名</text> <text style="color: #A2A9BA;">{{order.name ? order.name : ''}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">手机号码</text> <text style="color: #A2A9BA;">{{order.contcatPhone ? order.contcatPhone : ''}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">订单号</text> <text style="color: #A2A9BA;">{{order.orderNum}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">创建时间</text> <text style="color: #A2A9BA;">{{order.date}} {{order.time}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">快递公司</text> <text style="color: #A2A9BA;">{{order.logisticsCompany != null ? order.logisticsCompany : ''}}</text>
        </view>
        <view v-if="isload" class="order-info-box">
        	<text class="title">快递单号</text> <text style="color: #A2A9BA;">{{order.logisticsNum != null ? order.logisticsNum : ''}}</text>
        </view>
        
        <view class="empty-box30"></view>
        
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    
    export default {
    	data() {
    		return {
    			order:null,
                isload:false
    		}
    	},
    	onLoad(option) {
            var data = {
                id:option.recordid
            }
            api.constitutionOrderFindById({
                data: data
            }).then(listRes => {
                console.log(listRes)
                this.order = listRes.data
                this.order.date = util.formatTimestamp(listRes.data.orderTime, 'yyyy-MM-dd')
                this.order.time = util.formatTimestamp(listRes.data.orderTime,'hh:mm')
                listRes.data.item.forEach((item,index)=>{
                    if(item.icon){
                        var iconvalue = JSON.parse(item.icon)
                        item.img = iconvalue[0].url
                    }else{
                        item.img = "../../static/image/img_1234567.png"
                    }
                })
                this.isload = true
            })
    	},
    	methods: {
            clickDtails:function(record){
                console.log(record)
                uni.navigateTo({
                    url:'../discriminate/report?type=2&recordid='+record.id
                })
            }
    	},
    }
</script>

<style>
    .marginLeft40{
        margin-left: 40upx;
    }
    .plan-box-itme{
        /* width: 60%; */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .plan-box-name{
        margin-left: 12upx;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        flex: 1;
    }
    .plan-box-title{
        display: flex;
        flex-direction: row;
        margin: 30upx;
        width: 100%;
    }
    .plan-box-title image{
        width: 118upx;
        height: 118upx;
        border-radius:10upx;
    
    }
    
    .plan-box{
        display: flex;
        flex-direction: row;
        
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        flex-wrap: wrap;
        
    }
    .sss{
        width: 100%;
        margin-top: 31upx;
        margin-right: 33upx;
        margin-left: 33upx;
        padding: 21upx;
        background:rgba(239,241,246,1);
        border-radius:10upx;
        flex-direction: column;
    }
    .order-info-box{
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        margin-top: 30upx;
        margin-left: 33upx;
        margin-right: 33upx;
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:42upx;
    }
</style>
