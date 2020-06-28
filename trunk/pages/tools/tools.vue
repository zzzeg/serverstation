<template>
    <view class="content">
        <view class="tabbar-box">
            <view class="itme" @click="clickTag(1)" >
                <text :class="isActive ? 'activetext' : ''" >平台素材</text>
            </view>
            <view class="itme" @click="clickTag(0)" >
                <text :class="!isActive ? 'activetext' : ''" >服务站素材</text>
            </view>
        </view>
        <view class="empty-box" style="height: 120upx;"></view>
        <view v-for="(item,index) in dataList" :key="index" class="dataContent" @click = "clickDetails(item)">
            <view class="dataText" >
                <view style="font-size:32upx;font-weight:500;margin-top: 28upx;display: flex;flex-direction: row;">
                    <image src="../../static/image/img_yxsc.png" mode=""></image>
                    <view style="margin-left: 10upx;">
                        {{item.title}}
                    </view>
                </view>
                <view class="introduction" style="color: #6F7887;">
                    {{item.introduction == null ? '' : item.introduction}}
                </view>
                <view style="color: #868E9D;font-size:28upx;margin-bottom: 28upx;">
                    {{item.time}}
                </view>
            </view>
            <!-- <tki-qrcode ref="qrcode" :val="item.pic" size="100" :unit="upx" onval loadMake :usingComponents="true" @result="qrR" /> -->
            <image :src="item.pic" mode=""></image>
        </view>
        <view v-if="dataList.length <=0" class="nodata">
            <image src="../../static/image/img_zwddjl.png" mode=""></image>
            <!-- <view class="">暂无内容</view> -->
        </view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    import request from '../../common/request.js'; 
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
    export default {
        components: {tkiQrcode},
        data() {
        	return {
                page:1,
                size:100000,
                dataList:[],
                isActive:true
            }
        },
        onLoad() {
            
            this.loadData()
        },
        onPullDownRefresh() {
            
            if(this.isActive){
                this.loadData()
            }else{
                this.loadFWZData()
            }
        },
        methods:{
            qrR(res) {
                // this.src = res
            },
            loadData:function(){
                var data = {
                	page: this.page,
                    size:this.size
                }
                api.toolsPage({
                    data:data
                }).then(res => {
                    console.log(res)
                    this.dataList = []
                    if(res.status=='OK'){
                        this.dataList = res.list
                        this.dataList.forEach((it,i)=>{
                            // if(it.pics){
                                // it.pic = request.reporthost+'share?id=' + this.tid 
                                // JSON.parse(it.pics)[0].url
                            // }
                            if(it.pics && JSON.parse(it.pics)){
                                it.pic = JSON.parse(it.pics)[0].url
                            }
                            
                            if(it.lastUpdateTime){
                                it.time = util.formatTimestamp(it.lastUpdateTime, 'yyyy-MM-dd') + " " + util.formatTimestamp(it.lastUpdateTime,'hh:mm:ss')
                            }else{
                                it.time = util.formatTimestamp(it.createTime, 'yyyy-MM-dd') + " " + util.formatTimestamp(it.createTime,'hh:mm:ss')
                            }
                            
                
                        })
                    }
                })
            },
            loadFWZData:function(){
                var data = {
                	page: this.page,
                    size:this.size
                }
                api.toolsFWZPage({
                    data:data
                }).then(res => {
                    console.log(res)
                    this.dataList = []
                    if(res.status=='OK'){
                        this.dataList = res.list
                        this.dataList.forEach((it,i)=>{
                            if(it.pics){
                                it.pic = JSON.parse(it.pics)[0].url
                            }
                            it.time = util.formatTimestamp(it.lastUpdateTime, 'yyyy-MM-dd') + " " + util.formatTimestamp(it.lastUpdateTime,'hh:mm:ss')
                
                        })
                    }
                })
            },
            clickDetails:function(item){
                uni.navigateTo({
                    url:"toolsDetails?tid=" + item.id +'&title=' + item.title 
                })
            },
            clickTag:function(){
                this.isActive = !this.isActive
                if(this.isActive){
                    this.loadData()
                }else{
                    this.loadFWZData()
                }
            }
        }
    }
</script>

<style>
    page{
        background: #F7F7F8;
    }
    .introduction{
        text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
    }
    .dataTitle{
        margin: 40upx;
        font-size:36upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:50upx;
        
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .dataText{
        display: flex;
        flex-direction: column; 
        justify-content: space-between;
        margin-left: 20upx;
        flex: 1;
    }
    .dataContent{
        margin: 0upx 40upx 40upx 40upx;
        background: #FFFFFF;
        height: 264upx;
        border-radius: 30upx;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
    }
    .dataContent image{
        background: #F8F8F8;
        border-radius: 20upx;
        height: 200upx;
        width: 200upx;
        margin-top: 32upx;
        margin-right: 30upx;
    }
    .dataText image{
        width: 36upx;
        height: 36upx;
        margin-top: 8upx;
        margin-right: 0upx;
        border-radius: 8upx;
    }
    
    .tabbar-box{
        position: fixed;
        display: flex;
        flex-direction: row;
        width: 100%;
        overflow: hidden;
        z-index: 9999;
        position: fixed;
        top: 0;
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
