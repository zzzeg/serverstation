<template>
    <view class="content">
		
        <view v-if="item.instanceId != null" class="report-box" @click="clickReport">
            <view>辨证</view>
            <view>报告</view>
        </view>
        <view class="systemview">
            {{msgTime}}
        </view>
        <view class="msgContent">
            <image :src="item.userAvatar" mode=""></image>
            <view class="mmmcontent">
                类型：电话咨询</br>
                电话：{{item.phone}}
            </view>
        </view>
        <view v-for="(row,index) in msgList" :key='index' class="suggest-box" @click="clickEndSuggest(row)">
            <view class="suggest">
                <view class="suggest-title">
                    专家建议
                </view>
                <view class="suggest-des">
                    {{row.msg.content.text}}
                </view>
                <view class="suggest-xing" >
                    <text v-if="row.msg.score==null">用户暂未评价</text>
                    <image v-if="row.msg.score" src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="row.msg.score>1"  src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="row.msg.score>2"  src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="row.msg.score>3"  src="../../static/image/img_star_pj64.png" mode=""></image>
                    <image v-if="row.msg.score>4"  src="../../static/image/img_star_pj64.png" mode=""></image>
                </view>
                <view class="suggest-btn">
                    <view class="suggest-btn-txt">
                        查看详情
                    </view>
                    <image src="../../static/image/icon_jyxq_jt.png" mode=""></image>
                </view>
            </view>
        </view>
        <view style="height:130upx">
            
        </view>
        <view v-if="item.instanceId != null" @click="clickSuggest" class="suggest-input">
            建议
        </view>
        <xy-dialog ref="dialog" @confirmButton="confirmButton" @cancelButton="cancelButton" :content.sync="content" :score='score' :type='dialogtype' :lastMsgTime.sync="lastMsgTime"
            ></xy-dialog>
    </view>
</template>

<script>
    import api from '../../common/api.js';
    import util from '../../common/util.js';
    import xyDialog from '../../components/xy-dialog/xy-dialog.vue'
    
    export default {
        components: {
            xyDialog
        },
        data() {
            return {
                content:'',
                lastMsgTime:'',
                draft:'',
                msgTime:'',
                item:null,
                msgList:[],
                score:null,
                dialogtype:1,
                communityId:''
            }
        },
        onLoad(op) {
            var item = uni.getStorageSync('phoneConsult');
            this.item = item
            this.communityId = op.communityId
            this.msgTime = op.lastMsgTime
            uni.setNavigationBarTitle({
                title:item.userName
            });
            this.getAdvisoryRecordExt()
        },methods:{
            getAdvisoryRecordExt:function(){
                var data = {
                    recordId:this.item.id
                }
                let _self = this;
                this.msgList = []
                api.advisoryRecordExt({
                    data: data
                }).then(listRes => {
                           
                    if(listRes.status=='OK' && listRes.data.length>0 ){
                        
                        listRes.data.forEach((item,index)=>{
                            var extContent = item
                            
                            var message = {}
                            message.type = 'suggest'
                            message.msg = {}
                            var date 
                            if(item.lastUpdateTime){
                                date = util.formatTimestamp(item.lastUpdateTime, 'yyyy-MM-dd hh:mm')
                            }else{
                                date = util.formatTimestamp(item.createTime, 'yyyy-MM-dd hh:mm')
                            }
                            
                                        
                            message.msg.time = date
                            message.msg.content = {}
                            message.msg.content.text = extContent.analysis
                            message.msg.score = extContent.score
                            this.msgList.unshift(message)
                        })
                        
                    }
                })
            },
            clickEndSuggest:function(item){
                this.content = item.msg.content.text
                
                this.lastMsgTime = item.msg.time
                console.log(item.msg.score)
                this.score = item.msg.score
                console.log(this.score)
                this.dialogtype = 2
                this.$refs.dialog.confirm()
            },
            confirmButton:function(content){
                console.log(content)
                
                let _self = this;
                uni.showModal({
                    title: '确定提交',
                    content: '提交用户即发送给用户，不可撤回修改，点击确定继续。',
                    // showCancel: false,
                    cancelColor: "#03BE90",
                    confirmColor: "#03BE90",
                    success: function(res) {
                        if (res.confirm) {
                            var rid
                            
                            var data = {
                            	context: content,
                                recordId:_self.item.id,
                                communityId:_self.communityId
                            }
                            if(_self.draft){
                                data = {
                                	context: content,
                                    recordId:_self.item.id,
                                    id:_self.draft.id,
                                    communityId:_self.communityId
                                }
                            }
                            api.addAnalysis({
                                data: data
                            }).then(res => {
                                console.log(res)
                                _self.getAdvisoryRecordExt()
                            })
                        }
                    },
                })
                
                
            },
            cancelButton:function(content){
                console.log(content)
                var str_1 = content.trim();
                if(str_1!=''){
                    var data = {
                    	context: content,
                        recordId:this.item.id,
                    }
                    if(this.draft){
                        data = {
                        	context: content,
                            recordId:this.item.id,
                            id:this.draft.id
                        } 
                    }
                    api.saveDraft({
                        data: data
                    }).then(res => {
                        console.log(res)
                    })
                }
                
                
            },
            clickSuggest:function(){
               
                const data = {
                	recordId: this.item.id
                }
                api.findByRecordIdDraft({
                	data: data
                }).then(res => {
                    console.log(res)
                    if(res.status == 'OK' && res.data != null  && res.data != ''){
                        this.content = res.data.analysis
                        this.draft = res.data
                       
                        if(res.data.lastUpdateTime){
                            var date = util.formatTimestamp(res.data.lastUpdateTime, 'yyyy-MM-dd')
                                                  
                            var time = util.formatTimestamp(res.data.lastUpdateTime,'hh:mm')
                            
                            this.lastMsgTime = date + ' ' +time
                        }else{
                            var date = util.formatTimestamp(res.data.createTime, 'yyyy-MM-dd')
                                                  
                            var time = util.formatTimestamp(res.data.createTime,'hh:mm')
                            
                            this.lastMsgTime = date + ' ' +time
                        }
                    }else{
                        this.content = ''
                        this.lastMsgTime = ''
                    }
                    this.dialogtype = 1
                    this.$refs.dialog.confirm()
                })
                
                
            },
            clickReport:function(){
                console.log(this.item.instanceId)
                uni.navigateTo({
                    url:'report?rid='+this.item.instanceId
                })
            }
        }
        
    }
</script>

<style>
    page {
    	background: #F7F7F8;
        
    }
    .suggest-box{
        margin-top: 60upx;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .suggest{
        width:502upx;
        // height:356upx;
        background:rgba(255,255,255,1);
        border-radius:30upx;
        padding: 30upx;
    }
    .suggest-title{
        display: flex;
        align-items: center;
        font-size:32upx;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(22,32,46,1);
        line-height:44upx;
        height: 100upx;
    }
    .suggest-des{
        font-size:26upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:40upx;
    }
    .suggest-btn{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size:28upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:#03BE90;
        line-height:40upx;
    }
    .suggest-btn image{
        height: 26upx;
        width: 16upx;
    }
    .suggest-xing{
        display: flex;
        align-items: center;
        height: 100upx;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:34upx;
    }
    .suggest-xing image{
        width: 32upx;
        height: 30upx;
    }
    .suggest-input{
        position: fixed;
        bottom: 0upx;
        min-height: 100upx;
        width: 100%;
        font-size:32upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:44upx;
        background:linear-gradient(315deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .report-box{
        position: fixed;
        bottom: 130upx;
        right: 30upx;
        z-index: 99;
        width:120upx;
        height:120upx;
        background:#FFFFFF;
        box-shadow:0px 6upx 30upx 0px #868E9D;
        border-radius: 60upx;
        
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(3,190,144,1);
    }
    .report-text{
        margin-left: 4upx;
        margin-top: 4upx;
        width:36upx;
        height:36upx;
        padding: 14upx;
        background:linear-gradient(315deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        
        border-radius: 32upx;
        font-size:18upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:26upx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    .mmmcontent{
        background: #FFFFFF;
        width:280upx;
        height:126upx;
        border-radius:30upx;
        margin-left: 40upx;
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding-left: 30upx;
    }
    .msgContent image{
        margin-left: 30upx;
        width: 80upx;
        height: 80upx;
        border-radius: 20upx;
        
    }
    .msgContent{
        width: 100%;
        display: flex;
        flex-direction: row;
        font-size:28upx;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:40upx;
        margin-top: 60upx;
    }
    .content{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .systemview{
        padding: 0 30rpx;
        height: 50rpx;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #E4E7F2;
        color: #fff;
        font-size: 24rpx;
        border-radius: 40rpx;
        width:270upx;
        margin-top: 40upx;
    }
</style>
