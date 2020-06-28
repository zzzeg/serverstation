
<template>
    <view class="content">
        <view class="empty-box30"></view>
        <view v-for="(item,index) in recordList" :key="index" class="dataContent" @click = "clickCourse(index)">
            <image :src="fengmian" mode=""></image>
            <view style="display: flex;flex-direction: column; justify-content: space-between; flex: 1;" >
                <view class="dataText" style="font-size:32upx;font-weight:500;margin-top: 28upx;">
                    {{item.title}}
                </view>
                <view class="dataText" style="color: #868E9D;font-size:28upx;margin-bottom: 28upx;">
                    {{item.list.length}}节课  
                </view>
            </view>
        </view>
        <view v-if="ismore">
        	<uni-load-more :status="status"  :content-text="contentText" color="#007aff"  />
        </view>
    </view>
</template>
 
<script>

import healthKnowledge from '../../common/healthKnowledge.js';
import healthManager from '../../common/healthManager.js';

import uniLoadMore from "@/components/uni-load-more.vue"

export default {
    components: {uniLoadMore},
  data () {
    return {
        page:1,
        size:10,
        recordList:[],
        dataList:[],
        ismore:false,
        fengmian:'',
        
        title:''
    }
  },
  onLoad(option) {
      this.title = option.title
      uni.setNavigationBarTitle({
          title:this.title
      })
      if(this.title == '健康管家学院'){
          this.dataList = healthManager
          this.loadManagerData(true)
          this.fengmian = 'https://coffer.bainuo.cn/mdt-pub/healthManagerfm.png'
      }else{
          this.dataList = healthKnowledge
          this.loadKnowledgeData(true)
          this.fengmian = 'https://coffer.bainuo.cn/mdt-pub/healthKnowledgefm.png'
      }
      
  },
   onReachBottom() {
       this.page ++
       if(this.title == '健康管家学院'){
           // this.loadManagerData(false)
       }else{
           this.loadKnowledgeData(false)
       }
   },
  methods: {
        loadManagerData:function(isRefresh){
            this.recordList = this.dataList
        },
        loadKnowledgeData:function(isRefresh){
            if(this.dataList['page'+this.page] && this.dataList['page'+this.page].length>0){
                this.recordList = this.recordList.concat(this.dataList['page'+this.page]) 
            }
        },
        clickCourse:function(index){
            uni.navigateTo({
                url:"course?title="+this.title +"&index=" +index
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
        -webkit-line-clamp:3;
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