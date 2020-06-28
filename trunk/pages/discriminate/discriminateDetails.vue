<template>
    <view class="content">
        <view class="discriminate-title">
            客户信息
        </view>
        <view class="discriminate-content">
            <view style ="width: 50%;">{{discriminate.name}}, {{discriminate.gender == 'MAN' ? '男' : '女'}} {{discriminate.age}}岁</view>
            <view style ="width: 50%;">{{discriminate.phone}}</view>
        </view>
        <view class="discriminate-title">
            体质评估结果
        </view>
        <view class="discriminate-content">
            {{discriminate.tzpgjg == null ? '无' : discriminate.tzpgjg}}
        </view>
        <view class="discriminate-title">
            <text style="">舌像照片</text> <text style="margin-left: 64upx;" class="discriminate-title-text">{{discriminate.date}} {{discriminate.time}}</text>
        </view>
        <view class="discriminate-content">
            <image class="discriminate-tongueimage" :src="discriminate.tongueImagesVo.back" mode="widthFix"></image>
            <image class="discriminate-tongueimage" :src="discriminate.tongueImagesVo.body" mode="widthFix"></image>
            <image class="discriminate-tongueimage" :src="discriminate.tongueImagesVo.front" mode="widthFix"></image>
        </view>
        <view class="discriminate-title">
            {{discriminate.type == 'constitution' ? '总体特征' : '主要表现'}}
        </view>
        <view class="discriminate-content">
            {{discriminate.type == 'constitution' ? 
            discriminate.consResult[0].tongue.constitution.zttz == null ? '无' : discriminate.consResult[0].tongue.constitution.zttz 
            : discriminate.mainPerformance == null ? '无' : discriminate.mainPerformance}}
        </view>
        <view class="discriminate-title">
            {{discriminate.type == 'constitution' ? '常见表现' : '发生原因'}}
        </view>
        <view class="discriminate-content">
            {{discriminate.type == 'constitution' ? 
            discriminate.consResult[0].tongue.constitution.cjbx == null ? '无' : discriminate.consResult[0].tongue.constitution.cjbx 
            : discriminate.occurReason == null ? '无' : discriminate.occurReason}}
        </view>
        <view class="discriminate-title">
            {{discriminate.type == 'constitution' ? '易感疾病' : '易感病症'}}
        </view>
        <view class="discriminate-content">
            {{discriminate.type == 'constitution' ? 
            discriminate.consResult[0].tongue.constitution.fbqx == null ? '无' : discriminate.consResult[0].tongue.constitution.fbqx 
            : discriminate.predisposition  == null ? '无' : discriminate.predisposition}}
        </view>
        <view class="empty-box30"></view>
        <view class="line20"></view>
        <view class="discriminate-title">
            专家建议
        </view>
        <view v-if="discriminate.type != 'constitution'" class="">
            <view class="discriminate-content-title">
                <image src="../../static/image/img_szbg_tlfx.png" mode="widthFix"></image> <text class="discriminate-content-text" style="margin-left: 10upx;">调理方向</text>
            </view>
            <view class="discriminate-content">
                {{discriminate.tlfxjy == null ? '无' : discriminate.tlfxjy}}
            </view>
        </view>
        <view class="">
            <view class="discriminate-content-title">
                <image src="../../static/image/img_szbg_ysjy.png" mode="widthFix"></image> 
                <text class="discriminate-content-text" style="margin-left: 10upx;">
                    {{discriminate.type == 'constitution' ? '饮食忌宜' : '饮食建议'}}</text>
            </view>
            <view class="discriminate-content">
                {{discriminate.type == 'constitution' 
                ? discriminate.consResult[0].tongue.constitution.ysyj == null ? '无' : discriminate.consResult[0].tongue.constitution.ysyj 
                : discriminate.yxjyjy == null ? '无' : discriminate.yxjyjy}}
            </view>
        </view>
        <view class="">
            <view class="discriminate-content-title">
                <image src="../../static/image/img_szbg_ydjy.png" mode="widthFix"></image> 
                <text class="discriminate-content-text" style="margin-left: 10upx;">
                    {{discriminate.type == 'constitution' ? '日常保健' : '运动建议'}}</text>
            </view>
            <view class="discriminate-content">
                {{discriminate.type == 'constitution' 
                ? discriminate.consResult[0].tongue.constitution.rcbj == null ? '无' : discriminate.consResult[0].tongue.constitution.rcbj 
                : discriminate.ydjyjy == null ? '无' : discriminate.ydjyjy}}
            </view>
        </view>
        <view class="empty-box30"></view>
        <view v-if="discriminate.consResult[0].plan" class="line20"></view>
        <view v-if="discriminate.consResult[0].plan" class="discriminate-title">
            适用调理配方
        </view>
        <view v-if="discriminate.consResult[0].plan" v-for="(item,index) in discriminate.consResult[0].plan" :key="index" class="plan-box">
            <view style="width: 30%;">
                [{{item.name}}]
            </view>
            <view class="plan-box-itme" >
                <view style="width: 50%;" v-for="(dietician,ind) in item.dieticianComponents" :key="ind">
                    {{dietician.name}} 
                    <!-- <text style="margin-left: 10upx;" v-if="ind == (item.dieticianComponents.length-1)">等数十种食材（见现场配置）</text>  -->
                </view>
                <view class="">
                    等数十种食材（见现场配置）
                </view>
            </view>
        </view>
        <view v-if="discriminate.consResult[0].plan" class="plan-box">
            <view style="width: 30%;">
                [服用方法]
            </view>
            <view class="plan-box-itme" >
                {{discriminate.consResult[0].plan[0].instructions}}
            </view>
        </view>
        <view class="empty-box"></view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    
    export default {
    	data() {
    		return {
    			discriminate:null,
                recordid:null
    		}
    	},
    	onLoad(option) {
            this.recordid = option.recordid
            var data = {
                id:option.recordid
            }
            api.constitutionFindById({
                data: data
            }).then(listRes => {
                console.log(listRes)
                this.discriminate = listRes.data
                console.log("tongue.constitution")
                if(listRes.data.consResult[0].tongue.constitution){
                    console.log(listRes.data.consResult[0].tongue.constitution)
                    this.discriminate.type = 'constitution'
                }else{
                    this.discriminate.type = 'nonono'
                }
                console.log('tyep:'+this.discriminate.type)
                this.discriminate.date = util.formatTimestamp(listRes.data.createTime, 'yyyy-MM-dd')
                this.discriminate.time = util.formatTimestamp(listRes.data.createTime,'hh:mm')
                this.discriminate.tongueImagesVo.zljyList.forEach((item,index)=>{
                    console.log(item.key)
                    
                    if (item.key == '调理方向') {
                        console.log(item.value)
                        this.discriminate.tlfxjy = item.value
                    }
                    if (item.key == '饮食建议') {
                        console.log(item.value)
                        this.discriminate.yxjyjy = item.value
                    }
                    if (item.key == '运动建议') {
                        console.log(item.value)
                        this.discriminate.ydjyjy = item.value
                    }
                    
                })
            })
           
            if(option.share == 1){
                console.log('hideShareMenu')    
                uni.hideShareMenu()
                wx.hideHomeButton();
            }else{
                console.log('showShareMenu')
                uni.showShareMenu({
                    withShareTicket: true  
                })
            }
            
    	},
    	methods: {
            onShareAppMessage(res) {
                if (res.from === 'button') {// 来自页面内分享按钮
                  console.log(res.target)
                }
                console.log(this.recordid)
                return {
                  path: '/pages/discriminate/discriminateDetails?share=1&recordid='+this.recordid
                }
              }
    	}
    }
</script>

<style>
    .plan-box-itme{
        width: 70%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .plan-box{
        display: flex;
        flex-direction: row;
        margin-left: 33upx;
        margin-right: 33upx;
        margin-top: 40upx;
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        flex-wrap: wrap;
    }
    .discriminate-content-title image{
        width: 146upx;
        
    }
    .zjjy{
        display: flex;
        justify-content: flex-start; /*定义body的里的元素水平居中*/
    }
    .discriminate-content-title{
        margin-top: 42upx;
        margin-left: 33upx;
        margin-right: 33upx;
        display: flex;
        align-items: center; /*定义body的元素垂直居中*/
        justify-content: flex-start; /*定义body的里的元素水平居中*/
        font-size:29upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(42,52,65,1);
        line-height: 32upx;
    }
    .discriminate-tongueimage{
        width: calc(30% - 5upx);
        
    }
    .discriminate-content{
        margin:20upx;
        margin-left: 33upx;
        margin-right: 33upx;
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:#434E5E;
        line-height:42upx;
        flex-direction: row;
        display: flex;
        justify-content: space-between;
    }
    .discriminate-title-text{
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:#434E5E;
    }
    .discriminate-title{
        font-size:33upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:#2A3441;
        line-height:50upx;
        margin-top:42upx;
        margin-left: 33upx;
        margin-right: 33upx;
        flex-direction: row;
        display: flex;
    }
</style>
