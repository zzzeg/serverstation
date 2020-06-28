<template>
    <view class="content">
        <view class="box">
            <view class="home_top">
                <view class="topBox">
                    <image :src="userinfo.icon" mode=""></image>
                    <view class="titleBox">
                        <view class="title">
                            <view class="userinfoname">
                                {{userinfo.name}}
                            </view> 
                            <view class="calendarBtn" @click="clickCalendar">
                                <image src="../../static/image/icon_sj_rqxz.png" mode=""></image>
                                <view class="">
                                    {{queryTimeText}}
                                </view>
                            </view>
                        </view>
                        <view class="starbox">
                            <view class="" style="margin-right: 28upx;">
                                {{userinfo.joinCount}} 用户 &nbsp;&nbsp;&nbsp;|       
                            </view>
                            <image v-for="(star,index) in 4" :key="index" src="../../static/image/img_star_14yellow.png" mode=""></image>
                        </view>
                    </view>
                    
                </view>
            </view>
        </view>
        <view class="moneyBox">
            <view class="money">
                {{summary.orderPrice/100}}
            </view>
            <view class="unit">
                <image src="../../static/image/img_sj_yye.png" mode=""></image>
                <view class="unitText">
                    营业额（元）
                </view>
            </view>
            <view class="measure">
                <view style="width: 50%;">订单数 {{summary.orderNum}}</view>
                <view style="width: 50%;">辨证数 {{summary.constitutionNum}}</view>
            </view>
        </view>
        <view class="dataTitle">
            数据概览
        </view>
        <view class="dataContent">
            <view class="dataItem" @click="clickStatistics(0)">
                <image src="../../static/image/img_sj_yhs.png" mode=""></image>
                <view class="itemText">用户数</view>
                <view class="itemNum">
                    <text style="font-weight:500;font-size:42upx;color: #16202E;">{{summarySum.joinNum}}</text>个
                </view>
            </view>
            <view class="dataItem" @click="clickStatistics(1)" >
                <image src="../../static/image/img_sjmx_bzjl.png" mode=""></image>
                <view class="itemText">辨证数</view>
                <view class="itemNum">
                    <text style="font-weight:500;font-size:42upx;color: #16202E;">{{summarySum.constitutionNum}}</text>次
                </view>
            </view>
            <view class="dataItem" @click="clickStatistics(2)" >
                <image src="../../static/image/img_sjmx_ddjl.png" mode=""></image>
                <view class="itemText">订单</view>
                <view class="itemNum">
                    <text style="font-weight:500;font-size:42upx;color: #16202E;">{{summarySum.orderNum}}</text>个
                </view>
            </view>
            <view class="dataItem"  @click="clickStatistics(3)" >
                <image src="../../static/image/img_sj_ddje.png" mode=""></image>
                <view class="itemText">订单金额</view>
                <view class="itemNum">
                    <text style="font-weight:500;font-size:42upx;color: #16202E;">{{summarySum.orderPrice/100}}</text>元
                </view>
            </view>
        </view>
        <view  @click="clickStatistics(4)" class="dataContent" style="height: 210upx; background: #FFFFFF;flex-direction: column; justify-content: flex-start;">
            <view style="display: flex; flex-direction: row; align-items: center; padding: 30upx; color: #A2A9BA;font-size:28upx; justify-content: space-between;">
                <view class="itemText">结算金额</view>
                <image style="width: 52upx; height: 52upx;" src="../../static/image/img_sj_jsje.png" mode=""></image>
            </view>
            <view class="itemNum">
                <text style="font-weight:500;font-size:42upx;color: #16202E;">{{summarySum.billingAmount/100}}</text>元
            </view>
        </view>
        <view class="dataTitle">
            数据明细
        </view>
        <view class="dataContent">
            <view class="rowItem" @click="clickRecord(1)" >
                <image class="rowicon" src="../../static/image/img_sjmx_ddjl.png" mode=""></image>
                <view class="" style="flex: 1;margin-left: 20upx;">
                    消费记录
                </view>
                <image style="margin-right: 30upx;" src="../../static/image/icon_jybg_jt.png" mode=""></image>
            </view>
            <view class="line20" style="height: 2upx;width: calc(100% - 60upx);margin-left: 30upx;"></view>
            <view class="rowItem" @click="clickRecord(2)" >
                <image class="rowicon" src="../../static/image/img_sjmx_bzjl.png" mode=""></image>
                <view class="" style="flex: 1;margin-left: 20upx;">
                    辨证记录
                </view>
                <image style="margin-right: 30upx;" src="../../static/image/icon_jybg_jt.png" mode=""></image>
            </view>
            <view class="line20" style="height: 2upx;width: calc(100% - 60upx);margin-left: 30upx;"></view>
            <view class="rowItem" @click="clickRecord(3)">
                <image class="rowicon" src="../../static/image/img_sjmx_jsjl.png" mode=""></image>
                <view class="" style="flex: 1;margin-left: 20upx;">
                    结算记录
                </view>
                <image style="margin-right: 30upx;" src="../../static/image/icon_jybg_jt.png" mode=""></image>
            </view>
        </view>
        <view class="empty-box"></view>
        
        <view v-if="mask" @click="clickCalendar" class="cpt-mask">  
            
        </view>
        <view v-if="mask" class="calendarBox">
            <view class="calendar-title">
                请选择时间
            </view>
            <view style="padding: 0upx 40upx;">
                <Calendar :months="months" :value="value" @next="next" @prev="prev" :events="events" lunar
                  clean @select="select" ref="calendar" @selectMonth="selectMonth" @selectYear="selectYear"
                  :tileContent="tileContent" :almanacs="almanacs" range />
            </view>
            <view class="btnBox">
                <view @click="clickCalendar" style="width: 50%;">
                    取消
                </view>
                <view @click="clickConfirm" style="width: 50%;">
                    确定
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    
    import Calendar from 'mpvue-calendar'
    import 'mpvue-calendar/src/style.css'
    
    export default {
        components: {
          Calendar
        },
        data() {
        	return {
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                disabledArray: ['2018-6-27','2018-6-25'],
                value: null,
                begin:[2016,1,1],
                end:[2020,1,1],
                events: {'2018-6-7':'今日备注', '2018-6-8':'一条很长的明日备注'},
                almanacs: {'9-3': '抗战胜利日', '11-17': '学生日'},
                tileContent: [
                    {date: '2018-9-22', className: 'holiday ', content: '休'},
                    {date: '2018-9-23', className: 'holiday ', content: '休'}
                ],
                mask:false,
                
                userinfo:null,
                summary:null,
                summarySum:null,
                queryTimeText:'',
                
                starTime:null,
                endTime:null,
            }
        },
        onLoad(option) {
            
            this.updateUserInfo()
            
            var day2 = new Date();
            day2.setTime(day2.getTime());
            var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate()
            this.queryTimeText = day2.getFullYear()+"." + (day2.getMonth()+1) + "." + day2.getDate() +'.今'
            this.value = [[day2.getFullYear(),(day2.getMonth()+1),day2.getDate()],[day2.getFullYear(),(day2.getMonth()+1),day2.getDate()]]
            this.loadData(s2,s2)
          
            api.findInfo().then(res =>{
                console.log(res)
                if(res.status == 'OK'){
                    uni.setStorageSync('userinfo', res.data)
                    this.updateUserInfo()
                }
            })
            
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
                }
            })
        },
        methods:{
            clickStatistics:function(tag){
                uni.navigateTo({
                    url:"statisticsCharts?tag="+tag
                })
            },
            updateUserInfo:function(){
                this.userinfo = uni.getStorageSync("userinfo")
                if(this.userinfo.icon){
                    this.userinfo.icon = JSON.parse(this.userinfo.icon)[0].url
                }
                this.userinfo.score = Math.round(this.userinfo.score)
              
            },
            loadData:function(start,end){
                var data = {
                	start: start,
                    end:end
                }
                api.statisticsIndex({
                    data: data
                }).then(res => {
                    if(res.status == 'OK'){
                        this.summary = res.data.summary
                    }
                })
                api.statisticsIndex({
                    data:{}
                }).then(res => {
                    if(res.status == 'OK'){
                        console.log(res)
                        this.summarySum = res.data.summary
                    }
                })
            },
            clickCalendar:function(){
                this.mask = !this.mask
                if(this.mask){
                    uni.hideTabBar() 
                }else{
                    uni.showTabBar()
                }
            },
            clickRecord:function(index){
                if(index==1){
                    uni.navigateTo({
                        url:"../order/orderList"
                    })
                }else if(index==2){
                    uni.navigateTo({
                        url:"../discriminate/discriminate"
                    })
                }else if(index == 3){
                    uni.navigateTo({
                        url:"billingList"
                    })
                }
            },
            clickConfirm:function(){
                this.queryTimeText = this.starTime[0]+"." + this.starTime[1]+"." + this.starTime[2] + '...'
                this.loadData(this.starTime[0]+"-" + this.starTime[1]+"-" + this.starTime[2],this.endTime[0]+"-" + this.endTime[1]+"-" + this.endTime[2])
                this.clickCalendar()
            },
            
            select(val, val2) {
              console.log(val)
              console.log(val2)
              
              if(val2){
                  this.starTime = val
                  this.endTime = val2
                  
                  this.value = [[val[0],val[1],val[2]],[val2[0],val2[1],val2[2]]]
              }
              
            }
        }
    }
</script>

<style>
    page{
        background: #F7F7F8;
    }
    .userinfoname{
        width: 250upx;
        text-align: left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }
    .cpt-mask {  
        position: fixed;  
        top: 0;  
        left: 0;  
        width: 100%; 
        height: 100%;  
        background-color: #000000;  
        opacity: 0.5;
        z-index: 99;  
    }  
    .btnBox{
        font-size:32upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(3,190,144,1);
        line-height:44upx;
        display: flex;
        flex-direction: row;
        text-align: center;
        height: 80upx;
        line-height: 80upx;
    }
    .calendarBox{
        width: 100%;
        height: 80%;
        background: #FFFFFF; 
        opacity: 1;
        position:fixed;
        top: 20%;
        left: 0;
        z-index: 100;  
        border-radius: 40upx 40upx 0upx 0upx;
    }
    .calendar-title{
        height: 170upx;
        line-height: 170upx;
        font-size:42upx;
        font-weight:500;
        color:rgba(22,32,46,1);
        text-align: center;
        border-radius: 40upx 40upx 0upx 0upx;
    }
    .rowItem image{
        width: 20upx;
        height: 30upx;
    }
    .rowItem .rowicon{
        margin-left: 30upx;
        width: 52upx;
        height: 52upx;
    }
    .moneyBox{
        width: calc(100% - 60upx);
        margin-left: 30upx;
        height: 276upx;
        background:linear-gradient(227deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 10upx 60upx 0px rgba(3,190,144,0.2);
        border-radius:30upx;
        margin-top: -270upx;
        
        text-align: center;
        
    }
    .moneyBox image{
        width: 40upx;
        height: 40upx;
    }
    .money{
        font-size:46upx;
        font-family:PingFangSC-Semibold,PingFang SC;
        font-weight:600;
        color:rgba(255,255,255,1);
        line-height:64upx;
        height: 72upx;
        padding-top: 40upx;
    }
    .unit{
        display: flex;
        flex-direction: row;
        justify-content: center;
        
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:40upx;
    }
    .measure{
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:120upx;
        display: flex;
        flex-direction: row;
        height: 120upx;
        
    }
    .dataTitle{
        margin-top: 60upx;
        margin-left: 30upx;
        margin-bottom: 30upx;
        font-size:36upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:50upx;
    }
    .dataContent{
        width: calc(100% - 60upx);
        margin-left: 30upx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        flex-wrap: wrap;
        justify-content: space-between;
        border-radius:40upx;
        overflow: hidden;
    }
    .rowItem{
        width: 100%;
        height: 120upx;
        background: #FFFFFF;
        
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .dataItem{
        width:calc(50% - 15upx);
        height:280upx;
        background:rgba(255,255,255,1);
        border-radius:40upx;
        margin-bottom: 30upx;
    }
    .dataItem image{
        margin-top: 40upx;
        margin-left: 40upx;
        width: 52upx;
        height: 52upx;
    }
    .dataItem .itemText{
        margin-top: 50upx;
        margin-left: 40upx;
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
    }
    .itemNum{
        margin-top: 10upx;
        margin-left: 40upx;
        font-size:20upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
    }
    .box { 
        height: 468upx; 
        margin: auto; 
        width: 100%;
        overflow: hidden; 
    }
    .home_top { 
        position: relative; 
        width: 100%; 
        height: 468upx; 
        text-align: center; 
        line-height: 50px; 
    }
    .home_top:after { 
        width: 140%; 
        height: 468upx; 
        position: absolute; 
        left: -20%; 
        top: 0; 
        z-index: -1; 
        content: ''; 
        border-radius: 0 0 50% 50%; 
        background: #FFFFFF; 
    }
    .calendarBtn{
        width: 232upx;
        height: 60upx;
        border: #03BE90 2upx solid;
        border-radius: 30upx;
        display: flex;
        flex-direction: row;
        font-size:24upx;
        font-weight:400;
        color:rgba(3,190,144,1);
        line-height:70upx;
        align-items: center;
    }
    
    .topBox{
        padding: 40upx;
        display: flex;
        flex-direction: row;
        
    }
    .topBox image{
        width: 112upx;
        height: 112upx;
        background: #F8F8F8;
        border-radius: 20upx;
        margin-left: 20upx;
        margin-right: 8upx;
    }
    .calendarBtn image{
        width: 40upx;
        height: 40upx;
    }
    .titleBox {
        margin-left: 20upx;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:34upx;
        flex: 1;
    }
    .titleBox .title{
        font-size:40upx;
        font-family:NotoSansCJKsc-Medium,NotoSansCJKsc;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:76upx;
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .starbox{
        display: flex;
        flex-direction: row;
    }
    .starbox image{
        width: 28upx;
        height: 26upx;
        background: transparent;
        margin-top: 4upx;
        margin-left: 8upx;
    }
</style>
