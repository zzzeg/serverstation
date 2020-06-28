<template>
    <view class="content">
        <view class="line20" style="height: 2upx;"></view>
        <view v-if="title=='健康管家学院'" class="tabbar-box">
            <view class="itme" @click="clickTag(0)" >
                <text :class="isActive == 0 ? 'activetext' : ''" >课程视频</text>
    
            </view>
            <view class="itme" @click="clickTag(1)" >
                <text :class="isActive == 1 ? 'activetext' : ''" >课程介绍</text>
         
            </view>
        </view>
        <view class="line20"></view>
        <scroll-view v-if="isActive == 0" class="record-list">
            <view class="empty-box30"></view>
            <view v-for="(item,i) in recordData" :key="i" class="courseBox" @click="clickCourse(i)" >
                <image :src="fengmian" mode=""></image>
                <view class="courseTitle">
                    {{title=='健康管家学院' ? item.name : courseData.title}}
                </view>
                <view class="timeBox">
                    <image src="../../static/image/img_xx_spsc.png" mode=""></image>
                    <view class="time"></view>
                    <view class="timeBtn">
                        播放
                    </view>
                </view>
                <view class="line20" style="height: 2upx;"></view>
            </view>
           
        </scroll-view>
        <view v-else style="padding: 30upx;font-weight:400;font-size:30upx;color:rgba(134,142,157,1);">
            <view class="introduceTitle">
                主讲医生
            </view>
            <view class="introduceContent">
                {{courseData.keynote}}
            </view>
            <view class="introduceTitle">
                主讲人介绍
            </view>
            <view v-for="(item,i) in courseData.keynoteInfo" :key="i" style="margin-bottom: 8upx;">
                {{item}}
            </view>
            <view class="introduceTitle">
                课程目的
            </view>
            <view v-for="(item,i) in courseData.purpose" :key="i" style="margin-bottom: 8upx;">
                {{item}}
            </view>
        </view>
    </view>
</template>

<script>
    import healthKnowledge from '../../common/healthKnowledge.js';
    import healthManager from '../../common/healthManager.js';
    
    export default {
    	data() {
    		return {
                page:1,
                size:10,
                status:false,
                type:'IMAGE',
                isActive:0,
                recordData:[],
                courseData:null,
                fengmian:'',
                
                title:'',
                index:0
            }
        },
        onLoad(option) {
            this.title = option.title
            this.index = option.index
            uni.setNavigationBarTitle({
                title:this.title
            })
            if(this.title == '健康管家学院'){
                this.courseData = healthManager[this.index]
                this.recordData = this.courseData.list
                this.fengmian = 'https://coffer.bainuo.cn/mdt-pub/healthManagerfm.png'
            }else{
                var page = parseInt(this.index/10) + 1
                var i = parseInt(this.index) - 10*(page-1)
                console.log(healthKnowledge['page'+page])
                this.courseData = healthKnowledge['page'+page][i]
                this.recordData = healthKnowledge['page'+page][i].list
                this.fengmian = 'https://coffer.bainuo.cn/mdt-pub/healthKnowledgefm.png'
            }
            console.log(this.recordData)
        },
        methods:{
            clickTag:function(tag){
                this.isActive = tag
            },
            clickCourse:function(index){
             
                var name 
                var url
                if(this.title=='健康管家学院'){
                    name = this.recordData[index].name
                    url = this.recordData[index].url
                }else{
                    name = this.courseData.title
                    url = this.recordData[index]
                    
                }
                console.log(url)
                uni.navigateTo({
                    url:"courseDetails?url=" + url + "&name=" + name
                })
            }
        }
    }
    
</script>

<style>
    .courseBox{
        padding: 0upx 40upx 40upx 40upx;
    }
    .courseBox image{
        width: 100%;
        height: 416upx;
        border-radius:20upx;
        background: #F8F8F8;
        
    }
    .courseTitle{
        margin-top: 20upx;
        
    }
    .timeBox{
        margin-top: 20upx;
        margin-bottom: 20upx;
        display: flex;
        flex-direction: row;
        
    }
    .timeBox image{
        width: 36upx;
        height: 36upx;
    }
    .timeBox .time{
        font-size:28upx;
        font-weight:400;
        color:rgba(134,142,157,1);
        line-height:40upx;
        flex: 1;
    }
    .timeBox .timeBtn{
        border: #03BE90 2upx solid;
        font-size:24upx;
        font-weight:400;
        color:rgba(3,190,144,1);
        width:88upx;
        height:44upx;
        border-radius:30upx;
        text-align: center;
        line-height: 44upx;
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
    .introduceTitle{
        margin: 20upx 0upx;
        font-size:36upx;
        font-weight:500;
        color:rgba(22,32,46,1);
    }
</style>
