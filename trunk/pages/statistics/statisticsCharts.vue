<template>
    <view class="content">
        <view class="topBox" :class="textData[tag].className">
            <view class="yonghushu">
                {{textData[tag].title}}
            </view>
            <view class="">
                <text style="font-size: 46upx;">
                {{tag == 0 ? summary.joinNum : tag == 1 ? summary.constitutionNum : tag == 2 ? summary.orderNum : tag == 3 ? summary.orderPrice/100 : summary.billingAmount/100}}
                </text> <text style="font-size: 24upx;">  {{textData[tag].unit}}</text>  
            </view>
            <view class="calendarBtn" @click="clickCalendar">
                <image src="../../static/image/icon_sj_rqxz_white.png" mode=""></image>
                <view style="margin-left: 10upx;" >
                    {{queryTimeText}}
                </view>
                
                
            </view>
        </view>
        <view class="chartsBox">
            <view class="chartsTitle">
                {{textData[tag].chartsTitle}}
            </view>
            
             <view class="qiun-charts">
                 <canvas v-if="!mask" canvas-id="canvasLineA" id="canvasLineA" @touchmove="moveLineA" disable-scroll=true @touchend="touchEndLineA" class="charts" @touchstart="touchLineA"></canvas>
             </view>
        </view>
        <!-- <view v-if="tag == 0" class="chartsBox">
            <view class="chartsTitle">
                新增加入用户趋势
            </view>
            
             <view class="qiun-charts">
                 <canvas v-if="!mask" canvas-id="canvasLineB" id="canvasLineB" @touchmove="moveLineB" disable-scroll=true @touchend="touchEndLineB" class="charts" @touchstart="touchLineB"></canvas>
             </view>
        </view> -->
        <view v-if="mask" @click="clickCalendar" class="cpt-mask">
            
        </view>
        <view v-if="mask" class="calendarBox">
            <view class="calendar-title">
                请选择时间
            </view>
            <view style="padding: 0upx 40upx;">
                <Calendar :months="months" :value="value" :events="events" lunar
                  clean @select="select" ref="calendar" :tileContent="tileContent" :almanacs="almanacs" range />
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
    
    import uCharts from '@/components/u-charts/u-charts.js';
    
    var _self;
    var canvaLineA=null;
    var canvaLineB=null;
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
                queryTimeText:'',
                
                starTime:null,
                endTime:null,
                
                textData:[
                    {title:'用户数',
                    unit:'人',
                    chartsTitle:'新增加入用户',
                    className:'blue',
                    chartslineTitle:['新增加入用户'],
                    chartslineKey:['joinNum'],
                    chartsUnit:'',
                    maxValue:200
                    },
                    {title:'辨证数',
                    unit:'人',
                    chartsTitle:'辨证分型趋势',
                    className:'green',
                    chartslineTitle:['总辨证分型','线上辨证分型','线下辨证分型'],
                    chartslineKey:[['constitutionOnlineNum','constitutionOfflineNum'],'constitutionOnlineNum','constitutionOfflineNum'],
                    chartsUnit:'',
                    maxValue:200
                    },
                    {title:'订单',
                    unit:'人',
                    chartsTitle:'订单趋势',
                    className:'shallowBlue',
                    chartslineTitle:['总订单数','线上订单数','线下订单数'],
                    chartslineKey:['orderNum','orderOnlineNum','orderOfflineNum'],
                    chartsUnit:'',
                    maxValue:200
                    },
                    {title:'订单金额',
                    unit:'元',
                    chartsTitle:'订单金额(实收)趋势(元)',
                    className:'blue',
                    chartslineTitle:['总实收金额','线上实收金额','线下实收金额'],
                    chartslineKey:[['orderOnlineActualPrice','orderOfflineActualPrice'],'orderOnlineActualPrice','orderOfflineActualPrice'],
                    chartsUnit:'k',
                    maxValue:20
                    },
                    {title:'结算金额',
                    unit:'元',
                    chartsTitle:'结算金额趋势(元)',
                    className:'shallowBlue',
                    chartslineTitle:['结算金额'],
                    chartslineKey:['billingAmount'],
                    chartsUnit:'k',
                    maxValue:20
                    },
                ],
                tag:0,
                
                
                cWidth:'',
				cHeight:'',
                pixelRatio:1,
            }
        },
        onLoad(option) {
            _self = this
            this.tag = option.tag
             uni.setNavigationBarTitle({
                 title: this.textData[option.tag].title
             });
            this.cWidth = uni.upx2px(690);
            this.cHeight = uni.upx2px(600);
            
            
            var day2 = new Date();
            day2.setTime(day2.getTime());
            var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate()
            var date2 = new Date(day2);
                date2.setDate(date2.getDate() - 7);
            var s1 = date2.getFullYear()+"-" + (date2.getMonth()+1) + "-" + date2.getDate()
            this.loadData(s1,s2)
            this.value = [[date2.getFullYear(),(date2.getMonth()+1),date2.getDate()],[day2.getFullYear(),(day2.getMonth()+1),day2.getDate()]]
            
            this.starTime = [date2.getFullYear(),(date2.getMonth()+1),date2.getDate()]
            this.endTime = [day2.getFullYear(),(day2.getMonth()+1),day2.getDate()]
            this.queryTimeText = date2.getFullYear()+"." + (date2.getMonth()+1) + "." + date2.getDate() +'.今'
        },
        methods:{
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
                 
                        let LineA={categories:[],series:[]};
                        
                        let LineB={categories:[],series:[]};
                       	//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
                        this.textData[this.tag].chartslineTitle.forEach((item,index)=>{
                            var value = {
                                name:item,
                                data:[]
                            }
                            
                            // var valueB 
                            // if(index == 0){
                            //     valueB = {
                            //         name:'新增加入用户',
                            //         data:[]
                            //     }
                            // }
                            res.data.items.forEach((it,i)=>{
                                var key = this.textData[this.tag].chartslineKey[index]
                                console.log(Array.isArray(key))
                                if(Array.isArray(key)){
                                    var key = this.textData[this.tag].chartslineKey[index+1]
                                    var key2 = this.textData[this.tag].chartslineKey[index+2]
                                    if(this.tag == 3 || this.tag == 4){
                                        value.data.push((it[key]+it[key2])/100000)
                                    }else{
                                        value.data.push(it[key]+it[key2])
                                    }
                                    
                                }else{
                                    var key = this.textData[this.tag].chartslineKey[index]
                                     
                                    if(this.tag == 3 || this.tag == 4){
                                        value.data.push(it[key]/100000)
                                        
                                    }else{
                                        value.data.push(it[key])
                                    }
                                }
                                // if(index == 0){
                                //     valueB.data.push(it['joinNum'])
                                // }
                            })
                            // if(index == 0){
                            //     LineB.series.push(valueB)
                            // }
                            LineA.series.push(value)
                        })
                        
                        res.data.items.forEach((item,index)=>{
                            var time = util.formatTimestamp(item.time, 'MM/dd') 
                            
                            LineA.categories.push(time)
                            // LineB.categories.push(time)
                        })
                        this.showLineA("canvasLineA",LineA,this.textData[this.tag].chartsUnit,this.textData[this.tag].maxValue);
                        // this.showLineB("canvasLineB",LineB,'',200)
                    }
                })
                
            },
            clickConfirm:function(){
                this.queryTimeText = this.starTime[0]+"." + this.starTime[1]+"." + this.starTime[2] + '...'
                this.loadData(this.starTime[0]+"-" + this.starTime[1]+"-" + this.starTime[2],this.endTime[0]+"-" + this.endTime[1]+"-" + this.endTime[2])
                this.clickCalendar()
            },
            clickCalendar:function(){
                this.mask = !this.mask
                this.queryTimeText = this.starTime[0]+"." + this.starTime[1]+"." + this.starTime[2] + '...'
                this.loadData(this.starTime[0]+"-" + this.starTime[1]+"-" + this.starTime[2],this.endTime[0]+"-" + this.endTime[1]+"-" + this.endTime[2])
            },
			showLineA(canvasId,chartData,unit,maxValue){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					fontSize:11,
					legend:{show:true},
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
                    enableScroll:true,
					xAxis: {
						type:'grid',
						gridColor:'#ffffff',
						gridType:'dash',
						dashLength:4,
                        itemCount:7,
                        scrollShow:false,
                        scrollAlign:'left',
                        scrollBackgroundColor:'#F7F7FF',
                        scrollColor:'#DEE7F7',
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:8,
						splitNumber:5,
						min:0,
						max:maxValue,
						format:(val)=>{return val.toFixed(0)+ unit}
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'curve'
						}
					}
				});
				
			},
            showLineB(canvasId,chartData,unit,maxValue){
            	canvaLineB=new uCharts({
            		$this:_self,
            		canvasId: canvasId,
            		type: 'line',
            		fontSize:11,
            		legend:{show:true},
            		dataLabel:false,
            		dataPointShape:true,
            		background:'#FFFFFF',
            		pixelRatio:_self.pixelRatio,
            		categories: chartData.categories,
            		series: chartData.series,
            		animation: true,
                    enableScroll:true,
                    xAxis: {
                    	type:'grid',
                    	gridColor:'#ffffff',
                    	gridType:'dash',
                    	dashLength:4,
                        itemCount:7,
                        scrollShow:false,
                        scrollAlign:'left',
                        scrollBackgroundColor:'#F7F7FF',
                        scrollColor:'#DEE7F7',
                    },
            		yAxis: {
            			gridType:'dash',
            			gridColor:'#CCCCCC',
            			dashLength:8,
            			splitNumber:5,
            			min:0,
            			max:maxValue,
            			format:(val)=>{return val.toFixed(0)+ unit}
            		},
            		width: _self.cWidth*_self.pixelRatio,
            		height: _self.cHeight*_self.pixelRatio,
            		extra: {
            			line:{
            				type: 'curve'
            			}
            		}
            	});
            	
            },
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
            moveLineA(e) {
                canvaLineA.scroll(e);
            },
            touchEndLineA(e) {
                canvaLineA.scrollEnd(e);
                    //下面是toolTip事件，如果滚动后不需要显示，可不填写
            		canvaLineA.showToolTip(e, {
            			format: function (item, category) {
            				return category + ' ' + item.name + ':' + item.data 
            			}
            		});
            },
            touchLineB(e) {
            	canvaLineB.scrollStart(e);
            },
            moveLineB(e) {
                canvaLineB.scroll(e);
            },
            touchEndLineB(e) {
                canvaLineB.scrollEnd(e);
                    //下面是toolTip事件，如果滚动后不需要显示，可不填写
            		canvaLineB.showToolTip(e, {
            			format: function (item, category) {
            				return category + ' ' + item.name + ':' + item.data 
            			}
            		});
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
    .qiun-charts {
    	width: 690upx;
        height: 600upx;
    	background-color: #FFFFFF;
    }
    .charts {
        width: 690upx;
    	height: 600upx;
    	background-color: #FFFFFF;
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
    .topBox{
        height:300upx;
        text-align: center;
        font-size:32upx;
        color: #FFFFFF;
        border-radius:0px 0px 30upx 30upx;
    }
    .blue{
        background:linear-gradient(315deg,rgba(65,185,247,1) 0%,rgba(65,117,247,1) 100%);
    }
    .green{
        background:linear-gradient(315deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
    }
    .shallowBlue{
        background:linear-gradient(315deg,rgba(65,229,247,1) 0%,rgba(65,170,247,1) 100%);
    }
    .yonghushu{
        height:120upx;
        line-height: 120upx;
    }
    
    .calendarBtn{
        margin-left: calc(50% - 116upx);
        width: 232upx;
        height: 60upx;
        margin-top: 30upx;
        border: #FFFFFF 2upx solid;
        border-radius: 30upx;
        display: flex;
        flex-direction: row;
        font-size:24upx;
        font-weight:400;
        color:#FFFFFF;
        line-height:70upx;
        align-items: center;
    }
    .calendarBtn image{
        margin-left: 20upx;
        width: 40upx;
        height: 40upx;
    }
    .chartsBox{
        margin: 30upx;
        background: #FFFFFF;
        border-radius:30upx;
        height: 726upx;
    }
    .chartsTitle{
        padding-top: 20upx;
        text-align: center;
        line-height: 90upx;
        height: 90upx;
    }
</style>
