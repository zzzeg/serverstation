<template>
    <view class="content">
        <!-- <view class="title">{{tools.title}}</view> -->
        <view class="haibao">
        	<canvas class="can" @click="clickCanvas" canvas-id="firstCanvas" ></canvas>
        </view>
     
        <view class="saveBtn" @click="saveImage()">保存海报后分享</view>
        <view class="empty-box"></view>
        <tki-qrcode class="qqqrrrcode" ref="qrcode" cid="dddddd" :val="codeUrl" size="100" :unit="upx" onval loadMake :usingComponents="true" @result="qrR" />
        
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
    import request from '../../common/request.js'; 
    export default {
        components: {
            tkiQrcode
        },
        data() {
            return {
                codeUrl:'',
                codepicUrl:"",
                saveUrl:null,
                tools:null
            }
        },
        onLoad(option) {
            this.tid = option.tid
            var data = {
            	id: this.tid
            }
            
            api.findToolsById({
                data:data
            }).then(res => {
                console.log(res)
                if(res.status=='OK'){
                    this.tools = res.data
                    if(res.data.pics && JSON.parse(res.data.pics)){
                        this.tools.pics = JSON.parse(res.data.pics)[0].url
                    }
                    var _self = this
                    console.log(_self.tools.pics)
                    var downloadUrl =  _self.tools.pics.replace('http://coffer-cdn','https://coffer')
                    downloadUrl =  downloadUrl.replace('http://coffer','https://coffer')
                    uni.downloadFile({
                        url: downloadUrl , //仅为示例，并非真实的资源
                        success: (fileres) => {
                            if (fileres.statusCode === 200) {
                                console.log('下载成功');
                                _self.tools.pics = fileres.tempFilePath
                                console.log(_self.tools.pics)
                                var timestamp = Date.parse(new Date());
                                var userinfo = uni.getStorageSync("userinfo")
                                
                                _self.codeUrl = request.sharehost+'share?id=' + _self.tid +'&time='+timestamp + '&communityId=' + userinfo.id
                            }
                        }
                    });
                    uni.setNavigationBarTitle({
                        title:res.data.title
                    });
                    
                }
            })
            
        },
        methods:{
            qrR(res) {
                this.codepicUrl = res
                console.log(res)
                this.toDrawCanvas()
            },
            clickCanvas:function(){
                if(this.saveUrl){
                    wx.previewImage({
                      current: this.saveUrl,
                      urls: [this.saveUrl]
                    })
                }
            },
            saveImage:function(){
                var _self = this
                uni.canvasToTempFilePath({
                  x: 0,
                  y: 0,
     
                  canvasId: 'firstCanvas',
                  success: function(res) {
                        uni.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success () {
                                uni.saveImageToPhotosAlbum({
                                    filePath: res.tempFilePath,
                                	success: function(successRes) {
                                        _self.saveUrl = res.tempFilePath
                                        wx.previewImage({
                                          current: res.tempFilePath,
                                          urls: [res.tempFilePath]
                                        })
                                		uni.showToast({
                                			title: "保存成功",
                                			icon: "none"
                                		});
                                	},
                                	fail: function(failRes) {
                                        console.log(failRes)
                                        if(failRes.errMsg == 'saveImageToPhotosAlbum:fail auth deny'){
                                            uni.showToast({
                                                title: "保存失败，请授权保存到相册",
                                                icon: "none"
                                            });
                                            
                                            setTimeout(function() {
                                                console.log('openSetting')
                                                uni.openSetting({
                                                  success(res) {
                                                        console.log(res.authSetting)
                                                  },fail(res) {
                                                      console.log(res)
                                                  }
                                                });
                                            },2000)
                                        }
                                	}
                                });
                            }
                        })
                        
                    
                  } 
                })
                
            },
            toDrawCanvas() {
                let that=this
                let title = that.tools.title
                let introduction = that.tools.introduction
                //'简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简..'
                // console.log(title)
            	let ctx = uni.createCanvasContext('firstCanvas')
                
                let canvaWidth=uni.upx2px(630)
                let canvaHight=uni.upx2px(1100)
                
                ctx.setFillStyle('#FFFFFF'); //canvas背景颜色
                ctx.fillRect(0, 0, canvaWidth, canvaHight);
                
            	//uni.upx2px()是尺寸单位转换方法，622为rpx单位，换成px为311，根据设计稿来编辑
            	
            	//绘制文字居中对齐使用，根据我的理解，这个数值是要为需要截图区域宽度的一半
            	let centerCode=uni.upx2px(311)	
            	let xx=uni.upx2px(64)
            	let yy=uni.upx2px(48)
            	let font=uni.upx2px(32)//字体大小
            	let yzmtop=uni.upx2px(80)
            	let yzmleft=uni.upx2px(232)
            	
            	//标题
            	ctx.setFillStyle('#434E5E')//文字颜色
            	ctx.setFontSize(font)
            	ctx.textAlign="start"//居中，而且这个需要放在ctx.setFontSize()后面，其他api就没去一一使用过
            	//绘制文字ctx.fillText(需要绘制的文字,x轴距离,y轴距离);
                let _strLastIndex = 0; //每次开始截取的字符串的索引
                let _strHeight = yzmtop; //绘制字体距离canvas顶部的初始高度
                let _num=1;
                let _strlineW = 0; //文本宽度
                let C_P = 10
                
                if(introduction){
                    for (let i = 0; i < introduction.length; i++) {
                        // console.log(introduction[i])
                        _strlineW += ctx.measureText(introduction[i]).width;
                        
                        
                        if (_strlineW > (canvaWidth - 20)) {
                            if(_num == 3){
                                    //文字换行数量大于二进行省略号处理
                                ctx.fillText(introduction.substring(_strLastIndex, i-8)+'...', C_P, _strHeight);
                                _strlineW = 0;
                                _strLastIndex = i;
                                _num++;
                                break;
                            }else{
                                ctx.fillText(introduction.substring(_strLastIndex, i), C_P, _strHeight);
                                _strlineW = 0;
                                _strHeight += 20;
                                _strLastIndex = i;
                                _num++;
                            }
                        }else if (i == introduction.length - 1) {
                            ctx.fillText(introduction.substring(_strLastIndex, i + 1), C_P, _strHeight);
                            _strlineW = 0;
                        }
                    }
                    _strHeight += 20;
                }
                
                
                console.log(that.tools.pics)
                let fengmianimg=that.tools.pics
                let fmCodeX=10
                let fmCodeW= canvaWidth - fmCodeX*2
                let fmCodeY= canvaHight/2 - fmCodeW/2 - 20
                
                ctx.drawImage(fengmianimg,fmCodeX,fmCodeY,fmCodeW,fmCodeW)
                
                // ctx.fillText(introduction,centerCode,yzmtop);img_1234567
            	
            	//绘制二维码位置
            	let erweimaimg=that.codepicUrl
                let towCodeW=uni.upx2px(200)
            	let towCodeX= canvaWidth - uni.upx2px((750-120-200)/2) -10
            	let towCodeY= fmCodeY + fmCodeW +20
            	
            	ctx.drawImage(erweimaimg,towCodeX,towCodeY,towCodeW,towCodeW)
            	
                ctx.setFillStyle('#434E5E')//文字颜色
                let fontff=uni.upx2px(20)//字体大小
                ctx.setFontSize(fontff)
                ctx.textAlign="start"
                ctx.fillText('扫一扫查看详情',towCodeX + 20 ,towCodeY + towCodeW + 10);
                
                ctx.setFillStyle('#16202E')//文字颜色
                let fontf=uni.upx2px(34)//字体大小
                ctx.setFontSize(fontf)
                ctx.textAlign="start"
                ctx.fillText(title,10,towCodeY + 10);
                
            	ctx.draw()//结束绘画
            }
        }
    }
</script>

<style>
    .title{
        font-size:38upx;
        font-weight:600;
        color:rgba(22,32,46,1);
        line-height:52upx;
        text-align: center;
    }
    .haibao{
        margin: 60upx;
        width:calc(100% - 100upx);
        height:1140upx;
        padding-top: 20upx;
        background:rgba(255,255,255,1);
        box-shadow:0px 10upx 30upx 0px rgba(134,142,157,0.5);
        border-radius:30upx;
    }
    .can{
        height:100%;
        width:100%;
    }
    .qqqrrrcode{
        position: absolute; 
        left: -500upx;
        background: #FFFFFF;
    }
    .saveBtn{
        
        margin: 50upx;
        width:calc(100% - 100upx);
        height:100upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 30upx 0px rgba(3,190,144,0.3);
        border-radius:50upx;
        font-size:32upx;
        line-height: 100upx;
        color: #FFFFFF;
        text-align: center;
    }
</style>
