<template>
	<view class="content">
		<!-- <view class="discriminate-btn" @click='clickAL'>
		    开始辨证
            <image src="../../static/image/icon_znbz_add.png" mode=""></image>
		</view>
        <view class="discriminateText">
            辨证记录
        </view> -->
		<view v-if="recordList.length > 0" v-for="(record, index) in recordList" :key="index" @click='clickRecord(record);' class="record-box">
			<view class="record-top">
                <view class="record-info">
                    {{record.userName}}  
                    <!-- <text style="margin-left: 20upx;" v-if="record.communityName != null" >{{record.communityName}}</text> -->
                </view>
                <text v-if="record.type == 'advisory_report'" class="record-details">
                    <!-- {{record.serverName}} -->
                    驻站医生：{{record.expertName}}
                    <!-- {{record.status == 'doing' ? '处理中' : record.status == 'elementary' ? '舌象报告' : record.status == 'question' ? '已完成问询' : '查看报告' }} -->
                </text>
                <!-- <image class="jiantou" src="../../static/image/icon_jybg_jt.png" mode=""></image> -->
            </view>
            <view class="">
                <image class="mingpian" src="../../static/image/icon_sy_sj.png" mode=""></image>
                <text class="record-name">{{record.date}}  {{record.time}}</text>
                <text class="record-name" v-if="record.orderId" style="float: right;">方案已实施 </text>
                <text class="record-name" v-if="!record.orderId " style="float: right;color: #03BE90;">方案未实施 </text>
            </view>
            
            <!-- <view v-if="record.remark != null" class="record-notes">
                备注：{{record.remark}}
            </view> -->
            <view class="record-reporttype" :class="{aaa : record.orderStatus}">
                <!-- {{record.orderStatus ? '已购买' : '未购买'}} -->
                <!-- {{record.date}}  {{record.time}} -->
                {{record.reportTitle}}
            </view>
		</view>
        <view v-if="recordList.length <=0" class="nodata">
            <image src="../../static/image/img_zwddjl.png" mode=""></image>
            <view class="">暂无辨证记录</view>
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
        onShow() {
            
        },
		onLoad() {
            var data = {
                page:this.page,
                size:this.size
            }
            api.constitutionList({
                data: data
            }).then(listRes => {
                console.log(listRes)
                if(listRes.status == "OK"){
                    listRes.list.forEach((item,index)=>{
                        item.date = util.formatTimestamp(item.createTime, 'yyyy-MM-dd')
                        
                        item.time = util.formatTimestamp(item.createTime,'hh:mm')
                        if(item.type == 'TONGUE_QUES'){
                            item.reportTitle = '脏腑和体质报告'
                        }else if(item.type == 'TONGUE'){
                            item.reportTitle = '体质报告'
                        }else if(item.type == 'QUES'){
                            item.reportTitle = '脏腑报告'
                        }else if(item.type == 'advisory_report'){
                            item.reportTitle = '健康调理报告'
                        }else if(item.type == 'face_check'){
                            item.reportTitle = '皮肤检测报告'
                        }
                    })
                    
                    
                    this.recordList = listRes.list
                    if(this.recordList.length>=this.size){
                        this.ismore = true
                    }
                }
                
            })
		},
        onPullDownRefresh() {
            this.page = 1
            var data = {
                page:this.page,
                size:this.size
            }
            api.constitutionList({
                data: data
            }).then(listRes => {
                console.log(listRes)
                listRes.list.forEach((item,index)=>{
                    item.date = util.formatTimestamp(item.createTime, 'yyyy-MM-dd')
                    
                    item.time = util.formatTimestamp(item.createTime,'hh:mm')
                    if(item.type == 'TONGUE_QUES'){
                        item.reportTitle = '脏腑和体质报告'
                    }else if(item.type == 'TONGUE'){
                        item.reportTitle = '体质报告'
                    }else if(item.type == 'QUES'){
                        item.reportTitle = '脏腑报告'
                    }else if(item.type == 'advisory_report'){
                        item.reportTitle = '健康调理报告'
                    }else if(item.type == 'face_check'){
                        item.reportTitle = '皮肤检测报告'
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
         	// console.log('reach');
            this.page++
            var data = {
                page:this.page,
                size:this.size
            }
            api.constitutionList({
                data: data
            }).then(listRes => {
                console.log(listRes)
                listRes.list.forEach((item,index)=>{
                    item.date = util.formatTimestamp(item.createTime, 'yyyy-MM-dd')
                    
                    item.time = util.formatTimestamp(item.createTime,'hh:mm')
                    if(item.type == 'TONGUE_QUES'){
                        item.reportTitle = '脏腑和体质报告'
                    }else if(item.type == 'TONGUE'){
                        item.reportTitle = '体质报告'
                    }else if(item.type == 'QUES'){
                        item.reportTitle = '脏腑报告'
                    }else if(item.type == 'advisory_report'){
                        item.reportTitle = '健康调理报告'
                    }else if(item.type == 'face_check'){
                        item.reportTitle = '皮肤检测报告'
                    }
                    _self.recordList.push(item);
                })
                
                // console.log('recordList:')
                // console.log(this.recordList)
                uni.hideNavigationBarLoading()
            })
        },
		methods: {
            clickRecord:function(record){
                console.log(record)
                uni.navigateTo({
                    url:'report?recordid='+record.id + '&recordType=' + record.type
                })
            },
            clickAL:function(){
                uni.navigateTo({
                    url:'aldiscriminate/welcome'
                })
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
    .record-name{
        /* flex: 1; */
        font-size: 25upx;
        font-weight: 400;
        color: rgba(162,169,186,1);

    }
    .record-details{
        align-self:flex-end;
        flex: 1;
        text-align: right;
        font-size: 25upx;
        font-weight: 400;
        color: rgba(162,169,186,1);
    }
    .record-top .jiantou{
        width: 16upx;
        height: 26upx;
        align-self:center;
        margin-left: 10upx;
    }
    .discriminate-btn{
        margin-top: 30upx;
        width: calc(100% - 100upx);
        height: 160upx; 
        background:linear-gradient(227deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 5px 30px 0px rgba(3,190,144,0.2);
        border-radius:20px;
        font-size:36upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height:160upx;
        text-align: left;
        padding-left: 40upx;
        position: relative;
    }
    .discriminate-btn image{
        width: 86upx;
        height: 86upx;
        position: absolute;
        right: 20upx;
        bottom: 26upx;
    }
    .discriminateText{
        margin-top: 40upx;
        font-size:36upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:50upx;
        width: calc(100% - 100upx);
        text-align: left;
        padding-left: 40upx;
    }
    .mingpian{
        width:32upx;
        height:32upx;
        margin-top: 5upx;
        margin-right: 6upx;
    }
    .record-time{
        width:112upx;
        height:40upx;
        border-radius:24upx;
        
        font-size:24upx;
        font-weight:400;
        color:#C6CAD4;
        border:2upx solid #C6CAD4;
        text-align: center;
        line-height: 40upx;
    }
    .aaa{
        border:2upx solid rgba(1,156,117,1);
        color:rgba(1,156,117,1);
    }
    .record-reporttype{
        font-size:32upx;
        color:rgba(22,32,46,1);
    }
</style>
