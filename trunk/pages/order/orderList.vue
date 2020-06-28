<template>
	<view class="content">
        
		<view v-if="recordList.length > 0" v-for="(record, index) in recordList" :key="index" @click='clickRecord(record);' class="record-box" >
			<view class="record-top">
                <text class="record-name">{{record.date}}  {{record.time}}</text>
                <text class="qian">
                    {{record.status=='GRIND_WAIT' ? '待处理' : record.status=='GRIND_DONIG' ? '处理中' : record.status=='GRIND_SUCCES' ? '处理完成' : record.status=='DELIVERY' ? '已发货' : record.status=='RECEIVED' ? '已收件' : 
                    record.status=='GRIND_NOTPAY' ? '未支付' : 
                    record.status=='GRIND_WAIT' ? '待支付' : record.status=='GRIND_SUCCESS' ? '待处理' : record.status=='CANCLE' ? '已取消' : ''}}
                    
                </text>
                <!-- <image v-if="record.orderStatus == 'SUCCESS'" src="../../static/image/icon_jybg_jt.png" mode=""></image> -->
            </view>
            <view class="bagBox" v-for="(item, i) in record.item" :key="i" >
                <image :src="item.pic" mode=""></image>
                <view style="margin-left: 20upx; flex: 1;">
                    <view style="color: #434E5E;">
                        {{item.name}}
                    </view>
                    <view class="" style="display: flex; flex-direction: row; justify-content: space-between;">
                       <text>￥{{item.price/100}}</text>  <text>x {{item.num}}</text>
                    </view>
                </view>
            </view>
            <view v-if="record.status=='DELIVERY'" class="logisticsBox" @click.stop = "clickCopy(record.logisticsNum)" >
                <view>{{record.logisticsCompany}} {{record.logisticsNum}}</view> <view class="copy" ><image src="../../static/image/icon_copy.png" mode=""></image>复制</view>
            </view>
		    <!-- <view class="record-info">
		        共{{record.num}}件商品      |      {{record.payType == 'CASH' ? '现金支付' : '微信支付'}}
		    </view>
            <view class="record-info">
                订单编号：{{record.orderNum}}
            </view> -->
		    <view class="record-time">
		        <text>共{{record.num}}件</text> <text>合计： ￥{{(record.totalPrice-record.expenses)/100}}</text>
		    </view>
		</view>
        <view v-if="recordList.length <=0" class="nodata">
            <image src="../../static/image/img_zwddjl.png" mode=""></image>
            <view class="">暂无订单记录</view>
        </view>
		<view class="empty-box"></view>
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
	</view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    import uniLoadMore from "@/components/uni-load-more.vue"
    
    export default {
        components: {uniLoadMore},
		data() {
			return {
				status: 'more',
                page:1,
                size:10,
                statusTypes: [{
                	value: 'more',
                	text: '加载前'
                }, {
                	value: 'loading',
                	text: '加载中'
                }, {
                	value: 'noMore',
                	text: '没有更多'
                }],
                contentText: {
                    contentdown: '查看更多',
                    contentrefresh: '加载中',
                    contentnomore: '没有更多',
                },
	            recordList:[],
                ismore:false
			}
		},
		onLoad() {
            var obj = {
                page:this.page,
                size:this.size
            }
            console.log(obj)
            api.constitutionOrderList({
                data: obj
            }).then(listRes => {
                console.log(listRes)
                
                listRes.list.forEach((item,index)=>{
                    item.date = util.formatTimestamp(item.payTime, 'yyyy-MM-dd')
                    
                    item.time = util.formatTimestamp(item.payTime,'hh:mm')
                    item.num = 0
                    if(item.item && item.item.length>0){
                        item.item.forEach((it,i)=>{
                            item.num = item.num + it.num
                            
                            if(it.pics){
                                it.pic = JSON.parse(it.pics)[0].url
                                
                            }
                            
                        })
                    }else{
                        item.num = 1
                    }
                    
                })
                
                this.recordList = listRes.list
                if(this.recordList.length>=this.size){
                    this.ismore = true
                }
            })
		},
        onPullDownRefresh() {
            this.page = 1
            var data = {
                page:this.page,
                size:this.size
            }
            api.constitutionOrderList({
                data: data
            }).then(listRes => {
                console.log(listRes)
                listRes.list.forEach((item,index)=>{
                    item.date = util.formatTimestamp(item.payTime, 'yyyy-MM-dd')
                    
                    item.time = util.formatTimestamp(item.payTime,'hh:mm')
                    item.num = 0
                    if(item.item && item.item.length>0){
                        item.item.forEach((it,i)=>{
                            item.num = item.num + it.num
                            if(it.pics){
                                it.pic = JSON.parse(it.pics)[0].url
                                
                            }
                        })
                        
                    }else{
                        item.num = 1
                    }
                })
                
                this.recordList = listRes.list
                uni.stopPullDownRefresh();
            })
        },
        onReachBottom() {
        	let _self = this
        	this.status = 'loading'
      		uni.showNavigationBarLoading()
        	this.page++
        	var data = {
        	    page:this.page,
        	    size:this.size
        	}
            api.constitutionOrderList({
                data: data
            }).then(listRes => {
                console.log(listRes)
                listRes.list.forEach((item,index)=>{
                    item.date = util.formatTimestamp(item.payTime, 'yyyy-MM-dd')
                    
                    item.time = util.formatTimestamp(item.payTime,'hh:mm')
                    item.num = 0
                    if(item.item && item.item.length>0){
                        item.item.forEach((it,i)=>{
                            item.num = item.num + it.num
                            if(it.pics){
                                it.pic = JSON.parse(it.pics)[0].url
                            }
                        })
                        
                    }else{
                        item.num = 1
                    }
                    
                    _self.recordList.push(item)
                })
                
                uni.hideNavigationBarLoading()
            })

        },
		methods: {
            clickRecord:function(record){
                if(record.orderStatus == 'SUCCESS'){
                    uni.navigateTo({
                        url:'orderDetails?recordid='+record.id
                    })
                }
                
            },
            clickCopy:function(string){
                uni.setClipboardData({
                	data: string
                });
            }
		}
	}
</script>

<style>
    
    page {
    	background: #F7F7F8;
    }
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
    .record-time{
        flex-direction: row;
        display: flex;
        justify-content: space-between;
        color: #2A3441;
    }
    .record-top image{
        width: 16upx;
        height: 26upx;
        align-self:center;
        margin-left: 10upx;
    }
    .record-top{
        /* margin-top: 900upx; */
    }
    .qian{
        font-size:32upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(3,190,144,1);
        line-height:44upx;
        
        align-self:flex-end;
        flex: 1;
        text-align: right;
    }
    .record-name{
        color:rgba(162,169,186,1);
    }
    .bagBox{
        display:flex;
        flex-direction: row;
        padding: 15upx 0upx;
    }
    .bagBox image{
        width:100upx;
        height:100upx;
        background:rgba(216,216,216,1);
        border-radius:10upx;
    }
    .logisticsBox{
        height:80upx;
        background:rgba(246,247,250,1);
        border-radius:16upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        color: #434E5E;
        font-size:28upx;
        align-items: center;
        padding: 0 20upx;
    }
    .copy{
        font-size:28upx;
        color:#03BE90;
        display: flex;
        flex-direction: row;
        align-items: center;
       
    }
    .logisticsBox image{
        width: 32upx;
        height: 32upx;
    }
    
</style>
