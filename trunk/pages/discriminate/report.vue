<template>
    <view>
        <web-view @message="postMessage" @onPostMessage="postMessage"  :webview-styles="webviewStyles" :src="url"></web-view>
    </view>
</template>

<script>
    import request from '../../common/request.js'; 
        export default {
            data() {
                return {
                    webviewStyles: {
                        progress: {
                            color: '#FF3333'
                        }
                    },
                    url:'',
                    type:0,
                    rid:null
                }
            },
            onLoad(op) {
                this.type = op.type
                this.recordType = op.recordType
                console.log(this.recordType)
                this.rid = op.recordid
                var token = uni.getStorageSync('sessionKey');
                var timestamp = Date.parse(new Date());
                if(this.type == 2){
                    this.url = request.reporthost + 'productDetail_v2?token='+token+'&id='+this.rid+'&scale=0.45'+ '&timestamp='+ timestamp
                }else{
                    if(this.recordType == 'advisory_report'){
                        this.url = request.reporthost + 'doctorPos?token='+token+'&id='+this.rid+ '&timestamp='+ timestamp
                    }else if(this.recordType == 'face_check'){
                        this.url = request.reporthost + 'skinPos?token='+token+'&id='+this.rid+ '&timestamp='+ timestamp
                    }else{
                        this.url = request.reporthost+'posDetails_v2?token='+token+ '&timestamp='+ timestamp +'&id='+this.rid+'&scale=0.45&orderurl=/pages/discriminate/chooseGoos'
                    }
                }
                console.log(this.url)
                
            },
            onShow() {
                
            },
            methods: {
                postMessage:function(e){
                    console.log("webBack")
                    uni.switchTab({
                        url: '/pages/discriminate/discriminate'
                    });
                }
            },
            onUnload() {
                if(this.type != 2){
                    uni.switchTab({
                        url: '/pages/discriminate/discriminate'
                    });
                }
            }
        }
    
</script>

<style>
</style>
