<template>
    <view class="dialog dialog-visibility" v-if="isVisibility">
        <view class="dialog-model" v-if="overlay" ></view>
        <view v-on:touchstart="gestureStart" @touchend="gestureEnd" catchtouchmove="return;"  class="dialog-wrap"
            :animation="animationData" :class="{isVisibility}">
            <scroll-view v-if="type==1" scroll-y="true" style="height: 100%;">
                <view >
                    <image class="icon_gb" src="../../static/image/icon_gb.png" mode="" @click='handleClose'></image>
                    <view style="clear:both"></view>
                    <view style="margin-left: 30upx;">填写专家建议：</view>
                    <view style="padding: 30upx; margin: 30upx; background: #F1F2F7;border-radius:16upx;">
                        <textarea class="ssssss" :style="{height:winHeight + 'px;'}" v-model="content" placeholder-style="font-size:12px;font-weight:300;color:#A2A9BA;" placeholder="请输入内容" maxlength='500'></textarea>
                    </view>
                    <view style="margin-left: 30upx; font-size:28upx;font-weight:400;color:rgba(162,169,186,1);line-height:40upx;">
                        上次保存时间
                    </view>
                    <view style="margin-left: 30upx;font-size:28upx;font-weight:400;color:#434E5E;line-height:40upx;">
                        {{lastMsgTime=='' ? '暂无记录' : lastMsgTime}}
                    </view>
                    <view class="close-btn" @click="handleConfirm">
                        提交建议
                    </view>
                </view>
            </scroll-view>
            <view v-if="type==2" class="">
                <image class="icon_gb" src="../../static/image/icon_gb.png" mode="" @click='__close'></image>
                <view style="clear:both"></view>
                <view style="margin-left: 30upx;">专家建议</view>
                <view style="padding: 30upx;color:rgba(67,78,94,1);" class="ssssss" >
                    {{content}}
                </view>
                <view v-if="score!=null" class="suggest-xing" style="margin-left: 30upx;">
                    <image v-if="score" src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="score>1"  src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="score>2"  src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="score>3"  src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="score>4"  src="../../static/image/img_star_pj64.png" mode=""></image>
                </view>
                <view v-else style="margin-left: 30upx; margin-bottom: 30upx; font-size:24upx;font-weight:400;color:rgba(162,169,186,1);">
                    用户未评价
                </view>
                <view style="margin-left: 30upx; font-size:28upx;font-weight:400;color:rgba(162,169,186,1);line-height:40upx;">
                    提交用户时间
                </view>
                <view style="margin-left: 30upx;font-size:28upx;font-weight:400;color:#434E5E;line-height:40upx;">
                    {{lastMsgTime}}
                </view>
            </view>
            <view v-if="type==3" class="">
                <image class="icon_gb" src="../../static/image/icon_gb.png" mode="" @click='__close'></image>
                <view style="clear:both"></view>
                <view style="margin-left: 30upx;">开启时间</view>
                <picker mode="time" :value="time" start="09:01" end="21:01" @change="bindTimeChange">
                    <view class="uni-input">{{time}}</view>
                </picker>
            </view>     
        </view>
        
    </view>
</template>

<script>
    export default {
        props: {
            type: '', 
            score:null,
            content: '',
            lastMsgTime:'',
            curmemberId: '',
            username: '',
            email: '',
            relation: '',
            diseaseData: [],
            nutritionData: '',
            medicalData: null,

            // 是否显示蒙层
            overlay: {
                type: Boolean,
                default: true
            },
            // 点击蒙层是否关闭弹窗
            closeOnClickOverlay: {
                type: Boolean,
                default: false
            }
        },


        data() {
            return {
                // content:'',
                time: '12:01',
                animationData: null,
                animation: null,
                wrapHeight: 0,

                expressNo: "",
                timest: '',
                isVisibility: false,

                touchDotY: 0,
                touchDotX: 0,
                touchTimeStamp: 0,

                winHeight:300,
                boxHeight:0,
            };
        },
        updated: function() {

        },
        created: function() {
            
            this.animation = uni.createAnimation({
                duration: 300,
                timingFunction: 'ease',
            });
            const res = uni.getSystemInfoSync();
            this.winHeight = res.screenHeight*2/5 - 30
            this.boxHeight = res.screenHeight*3/4
            if(this.type == 3){
                this.boxHeight = 362
            }
        },
        beforeUpdate() {

        },
        watch: {
            medicalData: {
                handler(newValue, oldValue) {

                },
                deep: true
            }
        },

        methods: {
            __show() {
                this.timest = Date.parse(new Date());
                this.isVisibility = true
                this.$nextTick(function() {
                    setTimeout(() => {
                        var yuansu;
                        if (this.type > 10) {
                            yuansu = ".dialog-wrap"
                        } else {
                            yuansu = '.relation-box'
                        }
                        console.log(yuansu)
                        var view = uni.createSelectorQuery().select(".dialog-wrap");
                        view.boundingClientRect(function(data) { //data - 各种参数
                            console.log('data:'+data)  // 获取元素宽度
                        }).exec()
                        
                        uni.createSelectorQuery().select('.dialog-wrap').fields({
                            size: true,
                            scrollOffset: true
                        }, (data) => {
                            console.log(data);
                            
                            this.animation.translate(0, -this.boxHeight).step();
                            this.animationData = this.animation.export();
                        }).exec();

                    }, 300)
                })
            },
            __close() {
                var yuansu;
              
                uni.createSelectorQuery().select('.relation-box').fields({
                    size: true,
                    scrollOffset: true
                }, (data) => {
                    this.animation.translate(0, this.boxHeight).step();
                    this.animationData = this.animation.export();
                    this.$nextTick(function() {
                        setTimeout(() => {
                            this.isVisibility = false
                            // this.$emit('cancelButton')
                        }, 300)
                    })
                    
                }).exec();
                
            },
            alert() {
                this.__show()
            },
            confirm() {
                this.showCancelButton = true
                this.__show()
            },
            gestureStart(e) {
                // console.log(e)
                this.touchDotX = e.mp.changedTouches[0].clientX;
                this.touchDotY = e.mp.changedTouches[0].clientY;
                this.touchTimeStamp = e.mp.timeStamp;

            },
            gestureEnd(e) {
                // console.log(e)
                let touchEndX = e.mp.changedTouches[0].clientX;
                let touchEndY = e.mp.changedTouches[0].clientY;
                let touchEndTime = e.mp.timeStamp;

                if (Math.abs(this.touchDotX - touchEndX) < 40 && (touchEndY - this.touchDotY) > 50) {
                    // this.__close();
                }
            },
            member(menbers) {
                this.memberData = menbers
            },
            handleClose() {
                this.__close()
                this.$emit('cancelButton',this.content)
            },
            handleConfirm() {
                
                var str_1 = this.content.trim();
                if(str_1==''){
                    uni.showToast({
                        title: '请输入建议内容',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                this.__close()
                this.$emit('confirmButton',this.content)
            }
            
        }

    }
</script>

<style lang="scss" scoped>
    
    .ssssss{
        width: 100%;
    }
    .close-btn{
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100% - 60upx);
        margin-left: 30upx;
        margin-top: 40upx;
        color: #FFFFFF;
        height:100upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 30upx 0px rgba(3,190,144,0.3);
        border-radius:50upx;
    }
    .doctors-head {
        width: 122upx;
        height: 122upx;
        margin-right: 20upx;
        border-radius: 66upx;
    }

    .doctors-head image {
        width: 122upx;
        height: 122upx;
        border-radius: 66upx;
    }

    .doctors-name {
        font-size: 52upx;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(34, 34, 34, 1);
        line-height: 72upx;
    }

    .doctors-title {
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 44upx;
    }

    .biaozhi {
        width: 98upx;
        height: 52upx;
        margin-left: 20upx;
        line-height: 52upx;
        background: rgba(247, 207, 65, 1);
        border-radius: 32upx 32upx 32upx 0px;
        font-size: 28upx;
        color: #FFFFFF;
        text-align: center;
    }

    .degree {
        display: flex;
        flex-direction: row;
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 44upx;
        margin-left: 40upx;
    }

    .degree-view {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 30upx;
        width: 110upx;
        margin-bottom: 30upx;
        margin-top: 10upx;
    }

    .degree-view-item {
        width: 16upx;
        height: 32upx;
        background: rgba(234, 236, 243, 1);
        border-radius: 10upx;
    }

    .activationDegree {
        background: rgba(73, 135, 234, 1);
    }

    .app-more {
        text-align: center;
        margin-top: 100upx;
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 44upx;
    }

    .app-analysis-box {
        background: rgba(239, 241, 246, 1);
        border-radius: 30upx;
        margin: 60upx 30upx 30upx 30upx;
    }

    .analysis-title {
        font-size: 40upx;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(34, 34, 34, 1);
        line-height: 56upx;
        padding: 40upx 40upx 22upx 40upx;

    }

    .analysis-des {
        font-size: 28upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 40upx;
        padding: 0upx 40upx 40upx 40upx;
    }

    .app-des {
        font-size: 26upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 36upx;
        margin: 0 30upx;
        margin-top: 20upx;
    }

    .app-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 0 30upx;
    }

    .app-name {
        font-size: 56upx;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(34, 34, 34, 1);
        line-height: 80upx;
    }

    .app-logo {
        width: 80upx;
        height: 80upx;

    }

    .member-box {
        margin: 40upx;
    }

    .top-box {
        width: 80upx;
        height: 8upx;
        background: rgba(216, 216, 216, 1);
        border-radius: 8upx;
        margin: 0 auto;
        margin-top: 20upx;
    }
    .icon_gb{
        margin-top: 20upx;
        margin-right: 30upx;
        width: 48upx;
        height: 48upx;
        float:right;
    }
    

    .relation-box {}

    .report-item-title {
        padding-left: 24upx;
        padding-top: 112upx;
        font-size: 52upx;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(34, 34, 34, 1);
        line-height: 74upx;
    }

    .num-box {
        width: 200upx;
        height: 20upx;
        display: flex;
        flex-direction: row;
        margin-top: 6upx;
        justify-content: space-between;

    }

    .num-box-item {
        width: 48upx;
        height: 20upx;

    }

    ::-webkit-scrollbar {
        width: 0;
        height: 0;
        color: transparent;
    }

    .disease-desc {
        text-align: right;
        font-size: 24upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        line-height: 34upx;
    }

    .diseasebox {
        // height: 80%;
        margin: 40upx 40upx 20upx 40upx;
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(84, 84, 84, 1);
        line-height: 44upx;
    }

    .disease-content {
        margin-top: 50upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .relation-item {
        width: 100%;
        height: 104upx;
        background: #ffffff;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .relation-title {
        font-size: 36upx;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 40upx;
        margin: 40upx;
    }

    .relation-item text {
        margin-left: 40upx;
    }

    .relation-item image {
        margin-right: 40upx;
        width: 26upx;
        height: 18upx;
    }

    .active {
        background: rgba(237, 238, 243, 1);
    }

    .express {
        width: 100%;
        height: 128upx;
        background: rgba(245, 245, 245, 1);
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

    }

    .sendbtn {
        width: 480upx;
        height: 90upx;
        line-height: 90upx;
        background: rgba(3, 190, 144, 1);
        box-shadow: 0px 6upx 20upx 0px rgba(3, 190, 144, 0.3);
        border-radius: 52upx;
        opacity: 0.3;
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 40upx;
        margin-top: 80upx;
    }

    .activate {
        opacity: 1;
    }

    .express input {
        flex-grow: 1;
    }

    .express-title {
        width: 206upx;
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(34, 34, 34, 1);
        text-align: center;
    }

    .member-content {
        display: flex;
        flex-direction: row;
        // justify-content: space-between;
        flex-wrap: wrap;

    }

    .express-scan {
        width: 90upx;
        height: 100upx;
        margin-left: 20rpx;

    }

    .express-scan image {
        width: 52upx;
        height: 52upx;
        margin-top: 28rpx;

    }

    .member-title {
        font-size: 36upx;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: rgba(0, 0, 0, 1);
        margin-bottom: 40upx;
    }

    .member-user {
        width: 22%;
        padding: 9upx;
        position: relative;
        text-align: center;
    }

    .recordhead {
        height: 116upx;
        width: 116upx;
        border-radius: 58upx;
    }

    .recordname {
        margin-top: 16upx;
        font-size: 28upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(84, 84, 84, 1);
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .selecticon {
        position: absolute;
        top: 2rpx;
        right: 22rpx;
        height: 44upx;
        width: 44upx;
    }

    .member-btn {
        margin: 66upx 135upx 66upx 135upx;
        height: 90upx;
        line-height: 90upx;
        background: rgba(3, 190, 144, 1);
        box-shadow: 0px 6px 30px 0px rgba(3, 190, 144, 0.35);
        border-radius: 45upx;
        color: #ffffff;
        font-size: 32upx;
        font-family: PingFangSC-Regular;
        font-weight: 400;
    }

    [class*='dialog-hairline']::after {
        content: ' ';
        position: absolute;
        pointer-events: none;
        box-sizing: border-box;
        top: -50%;
        left: -50%;
        right: -50%;
        bottom: -50%;
        -webkit-transform: all 0.2s ease-in;
        transform: all 0.2s ease-in;
        border: 0 solid #ebedf0;
    }

    .dialog {
        width: 100%;
        height: 0%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 99910;
        visibility: hidden;
        -webkit-transition: all 0.2s ease-in;
        transition: all 0.2s ease-in;

        &.dialog-visibility {
            visibility: visible;
            height: 100%;
        }

        .dialog-model {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, .5);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 99920;
        }

        .dialog-wrap {
            width: 100%;
            position: absolute;
            left: 0;
            top: 100%;
            bottom: 0;
            overflow: hidden;
            background: #ffffff;
            border-radius: 40upx 40upx 0upx 0upx;
            -webkit-transform: all 0.2s ease-in;
            transform: all 0.2s ease-in;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            z-index: 99950;

            &.isVisibility {
                height: 90%;
            }

            &.visibility {
                height: 85%;
            }
        }
    }
</style>
