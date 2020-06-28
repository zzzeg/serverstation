<template>
    <view class="content">
    	<view class="tabbar-box">
            <view class="itme" @click="clickTag(2)" >
                <text :class="isActive == 2 ? 'activetext' : ''" >健康管家</text>
                <view v-if="showStewardMsg" class="dot"></view>
            </view>
    	    <view class="itme" @click="clickTag(0)" >
                <text :class="isActive == 0 ? 'activetext' : ''" >图文咨询</text>
                <view v-if="showTextMsg" class="dot"></view>
            </view>
            <view class="itme" @click="clickTag(1)" >
                <text :class="isActive == 1 ? 'activetext' : ''" >电话咨询</text>
                <view v-if="showPhoneMsg" class="dot"></view>
            </view>
    	</view>
    	<view class="condition">
    	    <view class="condition-text" :class="!status ? 'activeconditiontext' : ''" @click="clickCondition(0)" style="margin-right: 40upx;text-align: right;">{{isActive == 2 ? '全部' : '进行中' }}</view>
            <view class="verticalLine" ></view>
            <view class="condition-text" :class="status ? 'activeconditiontext' : ''" @click="clickCondition(1)" style="margin-left: 40upx;">{{isActive == 2 ? '未回复' : '已完成' }}</view>
    	</view>
        <scroll-view class="record-list">
            <view v-if="recordData.length>0" class="record-item" v-for="(item,index) in recordData" :key="index">
                <view class="record-line"></view>
                <view class="record-contet" @click="clickRecord(item)">
                    <image :src="item.userAvatar" mode="" class="record-icon"></image>
                    <view class="record-des">
                        <view class="record-name">
                            <!-- {{item.userName}} -->
                            {{item.userName}}
                        </view>
                        <view v-if="type=='IMAGE' " class="record-name-des">
                            {{item.lastMsgContent ? item.lastMsgContent : item.content}}
                        </view>
                        <view v-else class="record-name-des">
                            电话咨询-{{item.phone}}
                        </view>
                    </view>
                    <view class="record-time-box">
                        <view class="record-time-msg">
                            {{item.msgTime}}
                        </view>
                        <view v-if="type=='IMAGE' && item.displayCount>0 && status == 0" class="record-time-num">
                            <!-- {{item.notReadMsg>99 ? '99+' : item.notReadMsg}} -->
                            {{item.displayCount>99 ? '99+' : item.displayCount}}
                        </view>
                        <view v-if="isActive == 2 && status && item.displayCount>0" class="record-time-num">
                            {{item.displayCount>99 ? '99+' : item.displayCount}}
                        </view>
                    </view>
                    
                </view>
                
            </view>
            <view v-if="recordData.length<=0" class="nodata">
                <image src="../../static/image/img_zwxx.png" mode=""></image>
                <view class="">
                    暂无消息内容
                </view>
            </view>
        </scroll-view>
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
                status:false,
                type:'IMAGE',
                isActive:2,
                recordData:[],
                showStewardMsg:false,
                showTextMsg:false,
                showPhoneMsg:false
            }
        },
        onLoad() {
            console.log("hhhhh")
            this.loadMegNum()
        },
        onPullDownRefresh() {
            
            this.findRecord(true)
        },
        onReachBottom(){
            this.findRecord(false)
        },
        onShow() {
            this.findRecord(true)
            this.loadMegNum()
        },
        methods:{
            loadMegNum:function(){
                api.statistics().then(res =>{
                    console.log(res)
                    if(res.status == 'OK'){
                        if(res.data.communityMessageCount + res.data.imageCount + res.data.phoneCount>0){
                            var text = res.data.communityMessageCount + res.data.imageCount + res.data.phoneCount
                            uni.setTabBarBadge({
                              index: 2,
                              text: ''+ text
                            })
                        }
                        
                        
                        if(res.data.communityMessageCount>0){
                            this.showStewardMsg = true
                        }else{
                            this.showStewardMsg = false
                        }
                        if(res.data.imageCount>0){
                            this.showTextMsg = true
                        }else{
                            this.showTextMsg = false
                        }
                        if(res.data.phoneCount){
                            this.showPhoneMsg = true
                        }else{
                            this.showPhoneMsg = false
                        }
                    }
                })
            },
            findRecord:function(isRefresh){
                
                if(isRefresh){
                    this.page = 1
                    this.recordData = []
                }else{
                    this.page++
                }
                if(this.isActive == 2){
                    
                    var rstatus 
                    if(this.status){
                        rstatus = 'false'
                    }else{
                        rstatus = ''
                    }
                    
                    var data = {
                        replayStatus:rstatus,
                        page:this.page,
                        size:this.size,
                    }
                    api.findCommunityDisplayPage({
                        data:data
                    }).then(listRes=>{
                        console.log(listRes)
                        if(listRes.status == 'OK'){
                            // this.recordData = listRes.list
                            listRes.list.forEach((item,index)=>{
                                if(item.type=='img'){
                                    item.lastMsgContent = '[图片]'
                                }
                                if(item.type=='audio'){
                                    item.lastMsgContent = '[语音]'
                                }
                                if(item.lastMsgContent == null){
                                	item.lastMsgContent = ''
                                }
                                item.userAvatar = item.displayAvatar
                                item.userName = item.displayName
                                if(item.lastMsgTime){
                                    var today = util.formatDate(new Date, 'yyyy-MM-dd')
                                    
                                    var msgTime = util.formatTimestamp(item.lastMsgTime, 'yyyy-MM-dd')
                                    
                                    if(today==msgTime){
                                        item.msgTime = util.formatTimestamp(item.lastMsgTime,'hh:mm')
                                    }else{
                                        item.msgTime = msgTime
                                    }
                                }else if(item.createTime){
                                    var today = util.formatDate(new Date, 'yyyy-MM-dd')
                                    
                                    var msgTime = util.formatTimestamp(item.createTime, 'yyyy-MM-dd')
                                    
                                    if(today==msgTime){
                                        item.msgTime = util.formatTimestamp(item.createTime,'hh:mm')
                                    }else{
                                        item.msgTime = msgTime
                                    }
                                }else {
                                    var today = util.formatDate(new Date, 'yyyy-MM-dd')
                                    
                                    var msgTime = util.formatTimestamp(item.startTime, 'yyyy-MM-dd')
                                    
                                    if(today==msgTime){
                                        item.msgTime = util.formatTimestamp(item.startTime,'hh:mm')
                                    }else{
                                        item.msgTime = msgTime
                                    }
                                }
                                this.recordData.push(item)
                            })
                        }
                    })
                }else{
                    var data = {
                        page:this.page,
                        size:this.size,
                        status:this.status,
                        type:this.type
                    }
                    api.advisoryPage({
                        data:data
                    }).then(listRes=>{
                        console.log(listRes)
                        if(listRes.status == 'OK'){
                            // this.recordData = listRes.list
                            listRes.list.forEach((item,index)=>{
                                if(item.msgType=='img'){
                                    item.lastMsgContent = '[图片]'
                                }
                                if(item.msgType=='audio'){
                                    item.lastMsgContent = '[语音]'
                                }
                            	if(item.lastMsgContent == null){
                            		item.lastMsgContent = ''
                            	}
                                if(item.lastMsgTime){
                                    var today = util.formatDate(new Date, 'yyyy-MM-dd')
                                    
                                    var msgTime = util.formatTimestamp(item.lastMsgTime, 'yyyy-MM-dd')
                                    
                                    if(today==msgTime){
                                        item.msgTime = util.formatTimestamp(item.lastMsgTime,'hh:mm')
                                    }else{
                                        item.msgTime = msgTime
                                    }
                                }else if(item.createTime){
                                    var today = util.formatDate(new Date, 'yyyy-MM-dd')
                                    
                                    var msgTime = util.formatTimestamp(item.createTime, 'yyyy-MM-dd')
                                    
                                    if(today==msgTime){
                                        item.msgTime = util.formatTimestamp(item.createTime,'hh:mm')
                                    }else{
                                        item.msgTime = msgTime
                                    }
                                }else {
                                    var today = util.formatDate(new Date, 'yyyy-MM-dd')
                                    
                                    var msgTime = util.formatTimestamp(item.startTime, 'yyyy-MM-dd')
                                    
                                    if(today==msgTime){
                                        item.msgTime = util.formatTimestamp(item.startTime,'hh:mm')
                                    }else{
                                        item.msgTime = msgTime
                                    }
                                }
                                this.recordData.push(item)
                            })
                        }
                    })
                }
                
                
                
            },
            clickRecord:function(item){
                if(this.isActive == 2){
                    var finish
                    if(item.status == false){
                        finish = 0
                    }else{
                        finish = 1
                    }
                                  
                    uni.navigateTo({
                        url:'consultDetails?userId=' + item.userId +'&title=' + item.userName 
                    })
                }
                
            },
            clickCondition:function(tag){
                if(tag == 1){
                    // this.showchunlei = 1
                    this.status = true
                }else{
                    // this.showchunlei = 0
                    this.status = false
                }
            
                this.findRecord(true)
            },
            clickTag:function(tag){
                this.isActive = tag
                if(tag == 1){
                    this.isActive = true
                    this.type = 'PHONE'
                }else{
                    this.type = 'IMAGE'
                }
                this.findRecord(true)
            }
        }
    }
</script>

<style>
    page {
    	background: #F7F7F8;
        
    }
    
    .condition-text{
        height: 100upx;
        line-height: 100upx;
        width: 300upx;
    }
    .verticalLine{
        width: 2upx;
        background: #C6CAD4;
        height: 36upx;
    }
    .record-time-msg{
        margin-top: 6rpx;
    
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(198,202,212,1);
        line-height:34upx;
    }
    .record-time-box{
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10upx;
    }
    .record-time-num{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-content: center;
       
        height:36upx;
        min-width: 36upx;
        background:rgba(247,207,65,1);
        border-radius:20upx;
        padding: 0upx 10upx;
        
        margin-top: 34rpx;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:32upx;
    }
    .record-des{
        margin-left: 18upx;
        flex: 1;
    }
    .record-name{
        font-size:34upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(22,32,46,1);
        line-height:48upx;
    }
    .record-name-des{
        margin-top: 24upx;
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:40upx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
    .record-item{
        height: 192upx;
        background: #FFFFFF;
    }
    .record-line{
        background: #E0E2E6;
        height: 2upx;
        margin: 0 30upx;
    }
    .record-contet{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 110upx;
        padding: 40upx 30upx;
    }
    .record-icon{
        width: 112upx;
        height: 112upx;
        border-radius:56upx;
        background: rgba(162,169,186,1);
    }
    .chunLei{
        background: rgba(0,0,0,1);
        opacity:0.8;
    }
    .condition{
        width:100%;
        background: #FFFFFF;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 100upx;
        font-size:28upx;
    }
    .condition-pic{
        width: 48upx;
        height: 48upx;
        margin-left: 8upx;
    }
    .content {
    	display: flex;
    	flex-direction: column;
    	align-items: center;
    	justify-content: center;
        
    }
    .tabbar-box{
        display: flex;
        flex-direction: row;
        width: 100%;
    }
    .tabbar-box .itme{
        height: 92upx;
        width: 50%;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight:300;
        color:rgba(22,32,46,1);
        /* position: relative; */
    }
    .dot{
        /* position: absolute; */
        margin-top: -30upx;
        margin-left: -6upx;
        width: 12upx;
        height: 12upx;
        background-color: #F7CF41;
        border-radius:50%;
    }
    .tabbar-box .itme .activetext{
        font-size:32upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        background-image: linear-gradient(200deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        background-repeat: no-repeat;
        background-size: 100% 12upx;
        background-position: 0 110%;
        line-height: 40upx;
    }
    .activeconditiontext{
        color: #03BE90;
    }
</style>
