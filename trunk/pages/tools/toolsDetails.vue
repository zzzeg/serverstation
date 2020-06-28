<template>
    <view class="content">
        <view class="toolsTitle">
            {{tools.title}}
        </view>
        <view class="toolsTime">
            <view class="">
                {{tools.time}}
            </view>
            
            <view style="display: flex;flex-direction: row; position: relative;" >
                <image src="../../static/image/icon_yxsc_fx.png" mode=""></image>
                <view class="fenxiang" @click="clickShare" >分享</view>
                <!-- <button open-type='share' class="shareBtn" type="default"></button> -->
            </view>
        </view>
        <view style="padding: 40upx 30upx;color:rgba(67,78,94,1);">
            {{tools.introduction == null ? '' : tools.introduction}}
        </view>
        <view style="border: #A2A9BA 2upx dashed; margin: 0upx 30upx;" ></view>
        <view style="padding: 30upx;">
            <u-parse :content="tools.content" @preview="preview" @navigate="navigate" />
        </view>
        <view style="margin: 30upx;background: #F6F7FA;border-radius:10upx;">
            <view class="topBox">
                <image :src="userinfo.icon" mode=""></image>
                <view class="titleBox">
                    <view class="title">
                        <view class="" style="flex: 1;">
                            {{userinfo.name}}
                        </view>
                        <image v-for="(star,index) in userinfo.score" :key="index" src="../../static/image/img_star_14yellow.png" mode=""></image>
                    </view>
                    <view class="ssss">
                        <text>{{userinfo.code}}</text> 
                        <text>好评率 {{userinfo.applauseRate*100}}% </text> 
                        <view style="display: flex;flex-direction: row;">
                            <image src="../../static/image/icon_lsd_dz.png" mode=""></image> <text>{{userinfo.city}} </text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="userpic">
                <image v-for="(item,index) in userinfo.pics" :key="index" :src="item.url" mode="aspectFill"></image>
            </view>
        </view>
        <view style="margin: 30upx; padding:30upx;background: #F6F7FA;border-radius:10upx;display: flex;flex-direction: row;">
            <view style="font-size:32upx;color: #434E5E; flex: 1;margin-right: 20upx;">
                <view style="color: #16202E;font-size:36upx;">
                    关注明我公众号
                </view>
                <view class="">
                    明我，开启智慧健康新人生。明我是为每一个用户打造的专属的超级私人医生，是个体生命信息的数字化身。
                </view>
            </view>
            <tki-qrcode ref="qrcode" :val="codeUrl" :size="180" :unit="unit" :icon="icon" :iconSize="iconsize" :onval="onval" :loadMake="loadMake" :usingComponents="true" @result="qrR" />
            <!-- <image style="width: 200upx;height: 200upx; margin-left: 20upx;" src="" mode=""></image> -->
        
        </view>
        
        <view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
        	<view class="flex_column">
        		<view class="backgroundColor-white padding1vh border_radius_10px">
        			<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
        		</view>
        		<view class="flex_row marginTop2vh">
        			<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
        			<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
                    
                    
        		</view>
        	</view>
        </view>
        
        <view class="hideCanvasView">
        	<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'px', height: (poster.height||10) + 'px'}"></canvas>
        </view>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    import uParse from '@/components/u-parse/u-parse.vue'
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
    
    import request from '../../common/request.js'; 
    
    
    import _app from '@/components/QS-SharePoster/app.js';
    import {
    	getSharePoster
    } from '@/components/QS-SharePoster/QS-SharePoster.js';
    
    export default {
        components: {
          uParse,
          tkiQrcode
        },
        data() {
        	return {
                poster: {},
                qrShow: false,
                canvasId: 'default_PosterCanvasId',
                
                
                page:1,
                size:100000,
                tools:null,
                userinfo:null,
                
                codeUrl:'',
                
                // size: 400, // 二维码大小
                unit: 'upx', // 单位
                icon: '', // 二维码图标
                iconsize: 44, // 二维码图标大小
                // val: '', // 要生成的二维码值
                onval: true, // val值变化时自动重新生成二维码
                loadMake: true, // 组件加载完成后自动生成二维码
                src: '' ,// 二维码生成后的图片地址或base64
                
                tid:null
            }
        },
        onLoad(option) {
            this.userinfo = uni.getStorageSync("userinfo")
            if(this.userinfo.icon){
                this.userinfo.icon = JSON.parse(this.userinfo.icon)[0].url
            }
            if(this.userinfo.pics){
                this.userinfo.pics = JSON.parse(this.userinfo.pics)
            }      
            this.userinfo.score = Math.round(this.userinfo.score)
            this.codeUrl = this.userinfo.channelUrl
            this.tid = option.tid
            uni.setNavigationBarTitle({
                title:option.title
            });
            
            var data = {
            	id: this.tid
            }
            api.findToolsById({
                data:data
            }).then(res => {
                console.log(res)
                if(res.status=='OK'){
                    this.tools = res.data
                    this.tools.time = util.formatTimestamp(this.tools.lastUpdateTime , 'yyyy-MM-dd') + ' ' + util.formatTimestamp(this.tools.lastUpdateTime ,'hh:mm:ss')
                    
                }
            })
        },
 
        methods:{
            qrR(res) {
                this.src = res
            },
            // clickShare:function(){
                // var timestamp = Date.parse(new Date());
                // var string = request.reporthost+'share?id=' + this.tid +'&time='+timestamp
                
                // uni.setClipboardData({
                // 	data: string
                // });
            // }，
            async clickShare() {
            // clickShare:function(){
                // var timestamp = Date.parse(new Date());
                // var string = request.reporthost+'share?id=' + this.tid +'&time='+timestamp
                
                // uni.setClipboardData({
                // 	data: string
                // });
                uni.navigateTo({
                    url:"share?tid="+this.tid
                })
                
                // try {
                // 	console.log('准备生成:' + new Date())
                // 	const d = await getSharePoster({
                // 		_this: this, //若在组件中使用 必传
                // 		type: 'testShareType',
                // 		formData: {
                // 			//访问接口获取背景图携带自定义数据
                
                // 		},
                // 		posterCanvasId: this.canvasId,	//canvasId
                // 		delayTimeScale: 20, //延时系数
                // 		/* background: {
                // 			width: 1080,
                // 			height: 1920,
                // 			backgroundColor: '#666'
                // 		}, */
                // 		drawArray: ({
                // 			bgObj,
                // 			type,
                // 			bgScale
                // 		}) => {
                // 			const dx = bgObj.width * 0.3;
                // 			const fontSize = bgObj.width * 0.045;
                // 			const lineHeight = bgObj.height * 0.04;
                // 			//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
                // 			return new Promise((rs, rj) => {
                // 				rs([{
                // 						type: 'custom',
                // 						setDraw(Context) {
                // 							Context.setFillStyle('black');
                // 							Context.setGlobalAlpha(0.3);
                // 							Context.fillRect(0, bgObj.height - bgObj.height * 0.2, bgObj.width, bgObj.height * 0.2);
                // 							Context.setGlobalAlpha(1);
                // 						}
                // 					},
                // 					// {
                // 					// 	type: 'image',
                // 					// 	url: '/static/3.jpg',
                // 					// 	alpha: .3,
                // 					// 	dx,
                // 					// 	dy: bgObj.height - bgObj.width * 0.25,
                // 					// 	infoCallBack(imageInfo) {
                // 					// 		let scale = bgObj.width * 0.2 / imageInfo.height;
                // 					// 		return {
                // 					// 			circleSet: {
                // 					// 				x: imageInfo.width * scale / 2,
                // 					// 				y: bgObj.width * 0.2 / 2,
                // 					// 				r: bgObj.width * 0.2 / 2
                // 					// 			}, // 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
                // 					// 			dWidth: imageInfo.width * scale, // 因为设置了圆形图片 所以要乘以2
                // 					// 			dHeight: bgObj.width * 0.2,
                // 					// 			/* roundRectSet: { // 圆角矩形
                // 					// 				r: imageInfo.width * .1
                // 					// 			} */
                // 					// 		}
                // 					// 	}
                // 					// },
                // 					{
                // 						type: 'text',
                // 						fontStyle: 'italic',
                // 						text: '取舍',
                // 						size: fontSize,
                // 						color: 'white',
                // 						alpha: .5,
                // 						textAlign: 'left',
                // 						textBaseline: 'middle',
                // 						infoCallBack(textLength) {
                // 							_app.log('index页面的text的infocallback ，textlength:' + textLength);
                // 							return {
                // 								dx: bgObj.width - textLength - fontSize,
                // 								dy: bgObj.height - lineHeight * 3
                // 							}
                // 						},
                // 						serialNum: 0,
                // 						id: 'tag1'	//自定义标识
                // 					},
                // 					{
                // 						type: 'text',
                // 						text: '取舍',
                // 						fontWeight: 'bold',
                // 						size: fontSize,
                // 						color: 'white',
                // 						alpha: .75,
                // 						textAlign: 'left',
                // 						textBaseline: 'middle',
                // 						serialNum: 1,
                // 						allInfoCallback({	//v3.0.1 更新 可以获取drawArray中全部数据
                // 							drawArray
                // 						} = {}) {
                // 							const obj = drawArray.find(item => item.id === 'tag1');
                // 							/* return {
                // 								dx: obj.dx,
                // 								dy: obj.dy + lineHeight
                // 							} */
                // 							//也可以return promise对象
                // 							return new Promise((rs, rj) => {
                // 								setTimeout(() => {
                // 									rs({
                // 										dx: obj.dx,
                // 										dy: obj.dy + lineHeight
                // 									});
                // 								}, 1);
                // 							});
                // 						}
                // 					},
                // 					{
                // 						type: 'text',
                // 						text: '取舍',
                // 						size: fontSize,
                // 						color: 'white',
                // 						alpha: 1,
                // 						textAlign: 'left',
                // 						textBaseline: 'middle',
                // 						infoCallBack(textLength) {
                // 							return {
                // 								dx: bgObj.width - textLength - fontSize,
                // 								dy: bgObj.height - lineHeight
                // 							}
                // 						}
                // 					},
                // 					{
                // 						type: 'qrcode',
                // 						text: '你好，我是取舍',
                // 						// size: bgObj.width * 0.2,
                // 						size: 80,
                // 						dx: bgObj.width * 0.05,
                // 						// dy: bgObj.height - bgObj.width * 0.25
                // 						dy: 380
                // 					}
                // 				]);
                // 			})
                // 		},
                // 		setCanvasWH: ({
                // 			bgObj,
                // 			type,
                // 			bgScale
                // 		}) => { // 为动态设置画布宽高的方法，
                // 			this.poster = bgObj;
                // 		}
                // 	});
                // 	console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
                // 	this.poster.finalPath = d.poster.tempFilePath;
                // 	this.qrShow = true;
                // } catch (e) {
                // 	_app.hideLoading();
                // 	_app.showToast(JSON.stringify(e));
                // 	console.log(JSON.stringify(e));
                // }
            }
        }
    }    
</script>

<style>
    .hideCanvasView {
    	position: relative;
    }
    .hideCanvas {
    	position: fixed;
    	top: -99999upx;
    	left: -99999upx;
    	z-index: -99999;
    }
    .flex_row_c_c {
    	display: flex;
    	flex-direction: row;
    	justify-content: center;
    	align-items: center;
    }
    
    .modalView {
    	width: 100%;
    	height: 100%;
    	position: fixed;
    	top: 0;
    	left: 0;
    	right: 0;
    	bottom: 0;
    	opacity: 0;
    	outline: 0;
    	transform: scale(1.2);
    	perspective: 2500upx;
    	background: rgba(0, 0, 0, 0.6);
    	transition: all .3s ease-in-out;
    	pointer-events: none;
    	backface-visibility: hidden;
    	z-index: 999;
    }
    
    .modalView.show {
    	opacity: 1;
    	transform: scale(1);
    	pointer-events: auto;
    }
    .flex_column {
    	display: flex;
    	flex-direction: column;
    }
    
    .backgroundColor-white {
    	background-color: white;
    }
    
    .border_radius_10px {
    	border-radius: 10px;
    }
    
    .padding1vh {
    	padding: 1vh;
    }
    
    .posterImage {
    	width: 60vw;
    }
    
    .flex_row {
    	display: flex;
    	flex-direction: row;
    }
    
    .marginTop2vh {
    	margin-top: 2vh;
    }
    
    
    
    
    
    .toolsTitle{
        padding: 40upx 30upx 0upx 30upx;
        font-size:56upx;
        font-weight:600;
        color:rgba(22,32,46,1);
        line-height:80upx;
    }
    .toolsTime{
        padding: 0upx 30upx;
        font-size:28upx;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:40upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    .fenxiang{
        display: flex;
        flex-direction: row;
        align-items: center;
        color:rgba(3,190,144,1);
    }
    .toolsTime image{
        width: 44upx;
        height: 44upx;
    }
    
    .topBox{
        padding-left: 30upx;
        padding-top: 30upx;
        display: flex;
        flex-direction: row;
    }
    .topBox image{
        width: 80upx;
        height: 80upx;
        background: #F8F8F8;
        border-radius: 10upx;
    }
    .titleBox {
        margin-left: 20upx;
        font-size:28upx;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:40upx;
        flex: 1;
        margin-right: 20upx;
    }
    .titleBox .title{
        font-size:32upx;
        font-weight:500;
        color:#434E5E;
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .ssss{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
    }
    .titleBox image{
        margin-top: 8upx;
        width:28upx;
        height: 28upx;
    }
    .userpic{
        padding: 30upx;
        display: flex;
        flex-direction: row;
    }
    .userpic image{
        height: 180upx;
        margin-right: 20upx;
    }
    
    .shareBtn{
        position: absolute; 
        top: 0upx; 
        left: 0upx; 
        width: 100%;
        height: 100%;
        opacity: 0;
    }
</style>
