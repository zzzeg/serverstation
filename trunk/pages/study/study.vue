
<template>
    <view class="content">
        <view class="dataTitle" @click="clickClass('健康管家学院')" >
            <view style="flex: 1;">
                健康管家学院
            </view>
            <view style="font-size:28upx;color: #868E9D;font-weight:400;">
                查看更多
            </view>
            <image src="../../static/image/icon_jybg_jt.png" mode=""></image>
        </view>
        <view v-for="(item,index) in healthManager" :key='index' v-if="index<2" class="dataContent" @click = "clickCourse('健康管家学院',index)">
            <image src="https://coffer.bainuo.cn/mdt-pub/healthManagerfm.png" mode=""></image>
            <view style="display: flex;flex-direction: column; justify-content: space-between; flex: 1;" >
                <view class="dataText" style="font-size:32upx;font-weight:500;margin-top: 28upx;">
                    {{item.title}}
                </view>
                <view class="dataText" style="color: #868E9D;font-size:28upx;margin-bottom: 28upx;">
                    {{item.list.length}}节课
                </view>
            </view>
        </view>
        <view class="dataTitle" @click="clickClass('健康医疗知识学习')" >
            <view style="flex: 1;">
                健康医疗知识学习
            </view>
            <view style="font-size:28upx;color: #868E9D;font-weight:400;">
                查看更多
            </view>
            <image src="../../static/image/icon_jybg_jt.png" mode=""></image>
        </view>
        <view v-for="(item,i) in healthKnowledge" :key='i' v-if="i<2" class="dataContent" @click = "clickCourse('健康医疗知识学习',i)">
            <image src="https://coffer.bainuo.cn/mdt-pub/healthKnowledgefm.png" mode=""></image>
            <view style="display: flex;flex-direction: column; justify-content: space-between; flex: 1;" >
                <view class="dataText" style="font-size:32upx;font-weight:500;margin-top: 28upx;">
                    {{item.title}}
                </view>
                <view class="dataText" style="color: #868E9D;font-size:28upx;margin-bottom: 28upx;">
                    {{item.list.length}}节课  
                </view>
            </view>
        </view>
    </view>
</template>
 
<script>

import healthKnowledge from '../../common/healthKnowledge.js';
import healthManager from '../../common/healthManager.js';

export default {
  data () {
    return {
        healthKnowledge:[],
        healthManager:[]
    }
  },
  onLoad() {
      this.healthKnowledge = healthKnowledge['page1']
     
      this.healthManager = healthManager
      console.log(this.healthKnowledge)
  },
  methods: {
    clickClass:function(title){
        
        uni.navigateTo({
            url:"studyList?title="+title
        })
    },
    clickCourse:function(title,index){
        console.log(index)
        uni.navigateTo({
            url:"course?title="+title +"&index=" +index
        })
    }
  }
}
</script>
<style>
    page{
        background: #F7F7F8;
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
        display:-webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient:vertical;
        overflow:hidden;
    }
    .dataTitle image{
        margin-left: 6rpx;
        width: 22rpx;
        height: 32rpx;
    }
    .dataContent{
        margin: 0upx 40upx 40upx 40upx;
        background: #FFFFFF;
        height: 216upx;
        border-radius: 30upx;
        display: flex;
        flex-direction: row;
    }
    .dataContent image{
        background: #F8F8F8;
        border-radius: 20upx;
        margin: 20upx;
        height: calc(100% - 40upx);
        width: 292upx;
    }
</style>