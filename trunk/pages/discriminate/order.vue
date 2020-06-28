<template>
    <view class="content">
        <view class="line20" style="width: 100%" ></view>
        <view class="line20" style="width: 100%" ></view>
        <view v-for="(record, index) in instanceData" :key="index" class="plan-box">
            <view class="plan-box-title">
                <image :src="record.picUrl" mode=""></image>
                <view class="plan-box-name">
                    <view style="margin-top: -10upx;" >{{record.name}} </view>
                    <view class="remarksBox">
                        <view v-for="(item, i) in record.efficacy" :key='i'  class="remarksText">
                            {{item}}  
                        </view>
                        
                    </view>
                    <view class="moneyBox">
                        <text>￥{{record.price/100}}</text>
                        <view class="countBox">
                            <text style="margin-left: 20upx; margin-right: 20upx;" >X {{record.num}}</text>
                        </view>
                    </view>
                </view>
            </view>
            <view style="background: #EFF1F6;width: calc(100% - 66upx); height: 2upx; margin-left: 33upx;"></view>
        </view>    
        <view class="moneyss">
            选中<text style="color: #03BE90; margin: 0upx 10upx;">{{goodsNum}}</text>件商品    总价：<text style="color: #03BE90;margin: 0upx 10upx;">{{goodsMoney/100}}元</text><text style="color: #A2A9BA;font-size:20upx;">（含配送费￥{{expenses/100}}）</text><!-- {{goodsMoney>minimum ? goodsMoney/100 : (goodsMoney+expenses)/100}}元 -->
        </view>
        <view v-if="on_off" class="line20" style="width: 100%" ></view>
        <view v-if="on_off" class="line20" style="width: 100%" ></view>
        <view v-if="on_off" class="money">
            <text>配送费</text><text style="color: #03BE90;">{{distributionMoney}}</text>
        </view>
        <view class="line20" style="width: 100%" ></view>
        <view class="line20" style="width: calc(100% - 66upx);height: 40upx; padding: 33upx;" >收件信息</view>
        <view class="expensesInfo">
            <view style="width: 180upx;" >收件人</view> <input type="text" value="" v-model="name" placeholder="请输入收件人姓名" placeholder-class="inputPaceholder" />
        </view>
        <view style="background: #EFF1F6;width: calc(100% - 66upx); height: 2upx; margin-left: 33upx;"></view>
        <view class="expensesInfo">
            <view style="width: 180upx;" >联系方式</view> <input type="number" v-model="tel" value="" placeholder="请输入联系方式" placeholder-class="inputPaceholder"/>
        </view>
        <view style="background: #EFF1F6;width: calc(100% - 66upx); height: 2upx; margin-left: 33upx;"></view>
        <view class="expensesInfo">
            <view style="width: 180upx;" >所在地区</view> 
            <view class="inputPaceholder" style="flex: 1;height: 100%;" :style="region != '- 请选择省市区 -' ? 'color: #434E5E;' : ''" @click="selectAddress">
                {{region}}
            </view>
            <!-- <input type="text" v-model="region" value="" placeholder="-请输入省市区-" placeholder-class="inputPaceholder"/> -->
        </view>
        <view style="background: #EFF1F6;width: calc(100% - 66upx); height: 2upx; margin-left: 33upx;"></view>
        <view class="expensesInfo">
            <view style="width: 180upx;" >详细地址</view> <input type="text"  v-model="address" placeholder="请输入详细地址" placeholder-class="inputPaceholder"/>
        </view>
        <view style="background: #EFF1F6;width: calc(100% - 66upx); height: 2upx; margin-left: 33upx;"></view>
        <button @click="clickPay" hover-class="button-hover" class="login-btn" :class="{btnopacity:isActive}">结算</button>
        <view  style="height: 100upx;background: #FFFFFF;" ></view>
        <mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
            @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
        
    </view>
</template>

<script>
    import mpvueCityPicker from '../../components/mpvue-citypicker/mpvueCityPicker.vue'
    import api from '../../common/api.js'
    import util from '../../common/util.js'
    export default {
        components: {
            mpvueCityPicker
        },
        data() {
            return {
                instanceData:[],
                distributionMoney:'',
                goodsNum:0,
                goodsMoney:0,
                expenses:0,
                minimum:0,
                on_off:false,
                rid:'',
                tel:'',
                name:'',
                address:'',
                region:'- 请选择省市区 -',
                cityPickerValueDefault: [0, 0, 1],
            }
        },
        onLoad(op) {
            
            this.rid = op.id
            console.log(op.expenses)
            this.expenses = op.expenses
            var data = {
                instanceId:this.rid
            }
            api.findByInstanceId({
                data:data
            }).then(res => {
                console.log(res)
                if(res.status == 'OK'){
                    // this.instanceData = res.data
                    const goos = uni.getStorageSync('Goos');
                    res.data.forEach((item, index) => {
                        console.log(item.picUrl)
                        if(JSON.parse(item.picUrl).length>0){
                            item.picUrl = JSON.parse(item.picUrl)[0].url
                        }
                        
                        item.xuanzhong = 1
                        goos.forEach((val,i)=>{
                            if(val.productId == item.code){
                                item.num = val.num
                                this.goodsNum = this.goodsNum + item.num
                                this.goodsMoney = this.goodsMoney + item.price*item.num
                                item.efficacy = item.efficacy.split(/[、,，]/); 
                                this.instanceData.push(item)
                            }
                        })
                    })
                    this.goodsMoney = this.goodsMoney + parseInt(this.expenses) 
                    console.log(this.expenses)
                }
            })
          
            api.constitutionFindById({
                data: {
                    id:this.rid
                }
            }).then(listRes => {
                console.log(listRes)
                if(listRes.status == 'OK'){
                    this.tel = listRes.data.phone
                    this.name = listRes.data.name
                }
            })
          
        },
        methods:{
            clickPay:function(){
                if(this.goodsNum<=0){
                    uni.showToast({
                        title: '请选择商品',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                if(this.name == ''){
                    uni.showToast({
                        title: '请输入收件人',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                if(this.tel == ''){
                    uni.showToast({
                        title: '请输入联系方式',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                if(!util.verifyMobile(this.tel)){
                    uni.showToast({
                        title: '请输入正确的手机号',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                if(this.region == '' || this.region == "- 请选择省市区 -"){
                    uni.showToast({
                        title: '- 请选择省市区 -',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                if(this.address == ''){
                    uni.showToast({
                        title: '请输入详细地址',
                        icon: "none",
                        duration: 2000
                    })
                    return
                }
                var goods = []
                this.instanceData.forEach((item, i) => {
                    if(item.xuanzhong){
                        var good = {
                            num:item.num,
                            productId:item.code,
                            type:"DIET_PLAN"
                        }
                        goods.push(good)
                    }
                })
                var data = {
                    address:JSON.stringify({"address":this.region + this.address}),
                    instanceId:this.rid,
                    contcatPhone:this.tel,
                    name:this.name,
                    items:goods,
                    "payType": "WECHAT",
                    "scan": true,
                    "type": "EXPRESS"
                }
                api.addOrder({
                    data:data
                }).then(res => {
                    console.log(res)
                    if(res.status == 'OK'){
                        if(res.data.orderStatus == 'SUCCESS'){
                            uni.navigateTo({
                                url:'paySuccess'
                            })
                        }else{
                            uni.setStorageSync('Order', res.data)
                            var url = 'pay'
                            console.log(url)
                            uni.navigateTo({
                                url:url
                            })
                        }
                    }
                })
            },
            // clickGoods:function(index){
            //     console.log(index)
                
            //     this.instanceData.forEach((item, i) => {
            //         if(index == i){
            //             item.xuanzhong = !item.xuanzhong
            //             item.name = item.name + ' '
            //             if(item.xuanzhong){
            //                 this.goodsNum = this.goodsNum + item.num
            //                 this.goodsMoney = this.goodsMoney + item.price*item.num
            //             }else{
            //                 this.goodsNum = this.goodsNum - item.num
            //                 this.goodsMoney = this.goodsMoney - item.price*item.num
            //             }
            //         }
            //         if(this.minimum - this.goodsMoney>0){
            //             this.distributionMoney = "￥"+this.expenses/100 +"（还差"+(this.minimum - this.goodsMoney)/100+"元免基础配送费）"
            //         }else{
            //             this.distributionMoney = "￥0元"
            //         }
            //     })
                
            // },
            // clickJia:function(index){
            //     this.instanceData[index].num = this.instanceData[index].num + 1
               
            //     this.goodsNum = this.goodsNum + 1
            //     this.goodsMoney = this.goodsMoney + this.instanceData[index].price*1
                
            //     if(this.minimum - this.goodsMoney>0){
            //         this.distributionMoney = "￥"+this.expenses/100 +"（还差"+(this.minimum - this.goodsMoney)/100+"元免基础配送费）"
            //     }else{
            //         this.distributionMoney = "￥0元"
            //     }
            // },clickJian:function(index){
            //     if(this.instanceData[index].num == 1){
            //         return
            //     }
            //     this.instanceData[index].num = this.instanceData[index].num - 1
            //     if(this.instanceData[index].num<=0){
            //         item.xuanzhong = false
            //         item.name = item.name + ' '
            //     }
            //     this.goodsNum = this.goodsNum - 1
            //     this.goodsMoney = this.goodsMoney - this.instanceData[index].price*1
                
            //     if(this.minimum - this.goodsMoney>0){
            //         this.distributionMoney = "￥"+this.expenses/100 +"（还差"+(this.minimum - this.goodsMoney)/100+"元免基础配送费）"
            //     }else{
            //         this.distributionMoney = "￥0元"
            //     }
            // },
            onConfirm: function(e) {
                console.log(e)
                console.log(e.label)
                var adr = e.label.replace("-", "");
                var adr = adr.replace("-", "");
                this.region = adr
            },
            selectAddress: function() {
                this.$refs.mpvueCityPicker.show()
            }
        }
    }
</script>

<style>
    .plan-box{
        display: flex;
        flex-direction: row;
        
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        flex-wrap: wrap;
        
    }
    .plan-box-title{
        display: flex;
        flex-direction: row;
        margin-left: 33upx;
        margin-right: 33upx;
        margin-top: 30upx;
        margin-bottom: 30upx;
        width: calc(100% - 66upx);
    }
    .plan-box-title image{
        width: 118upx;
        height: 118upx;
        border-radius:10upx;
    
    }
    .plan-box-name{
        margin-left: 12upx;
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    .remarksBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-size:24upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:34upx;
        /* width: 100%; */
    }
    .remarksText{
        
        height:32upx;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        border-radius:32upx;
        font-size:20upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:28upx;
        padding: 10upx;
        margin-right: 10upx;
    }
    .remarksBox image{
        width: 44upx;
        height: 44upx;
    }
    .moneyBox{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }
    .countBox{
        display: flex;
        align-items: flex-start;
        /* height: 44upx; */
    }
    .countBox image{
        width: 44upx;
        height: 44upx;
    }
    .money{
        padding: 33upx;
        font-size:30upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(42,52,65,1);
        line-height:42upx;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .moneyss{
        padding: 33upx;
        font-size:30upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(42,52,65,1);
        line-height:42upx;
    }
    .expensesInfo{
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        align-items: center;
        height: 100upx;
        padding:0upx 33upx;
    }
    .expensesInfo input{
        height: 100upx;
        flex: 1;
    }
    .inputPaceholder{
        font-size:30upx;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(198,202,212,1);
        line-height:108upx;
    }
    .login-btn {
        margin-left: 63upx;
        margin-right: 63upx;
        margin-top: 83upx;
        height: 104upx;
        line-height: 104upx;
        border-radius: 52upx;
        color: #FFFFFF;
        font-size: 31upx;
        display: flex;
        justify-content: center;
        align-items: center;
        background:linear-gradient(233deg,rgba(136,226,150,1) 0%,rgba(3,190,144,1) 100%);
        box-shadow:0px 6upx 31upx 0px rgba(3,190,144,0.3);
    }
</style>
