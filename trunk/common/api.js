import request from './request'

function login(obj) {
    const header = {
        'content-type': 'application/x-www-form-urlencoded'
    }
    return request.post({
        url: '/api/application/login',
        data: obj.data,
        header: header
    },true);

}

function constitutionList(obj) {
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    return request.get({
        url: '/report/findPage',
        // url: '/api/constitutionRecordInstance/page',
        data: obj.data,
        header: header
    },true);

}

function constitutionFindById(obj) {
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    return request.get({
        url: '/api/constitutionRecordInstance/findById',
        data: obj.data,
        header: header
    },true);
}

function constitutionOrderList(obj) {
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    return request.get({
        url: '/constitutionOrder/page',
        data: obj.data,
        header: header
    },true);
}

function constitutionOrderFindById(obj) {
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    return request.get({
        url: '/constitutionOrder/findById',
        data: obj.data,
        header: header
    },true);
}

function getUploadParams(obj) {
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }

    return request.get({
        url: '/api/getUploadParams',
        data: obj.data,
        header: header
    },true)
}

function analysisFaceImage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/api/constitutionRecordInstance/analysisFaceImage',
        data: obj.data,
        header: header
    },false)
}

function cutTongueBackImage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/api/constitutionRecordInstance/cutTongueBackImage',
        data: obj.data,
        header: header
    },false)
}

function cutTongueImage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/api/constitutionRecordInstance/cutTongueImage',
        data: obj.data,
        header: header
    },false)
}

function dialWithQuesTest(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/json'
    }
    
    return request.post({
        url: '/api/constitutionRecordInstance/v1/dialWithQuesTest',
        data: obj.data,
        header: header
    },true)
}

function findByInstanceId(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/dieticianPlan/findByInstanceId',
        data: obj.data,
        header: header
    },true)
}

function getPostage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/constitutionOrder/getPostage',
        data: obj.data,
        header: header
    },false)
}

function addOrder(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/json'
    }
    
    return request.post({
        url: '/constitutionOrder/addOrder',
        data: obj.data,
        header: header
    },true)
}

function getPayCode(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/constitutionOrder/getPayCode',
        data: obj.data,
        header: header
    },true)
}

function queryOrderStatus(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/constitutionOrder/queryOrderStatus',
        data: obj.data,
        header: header
    },false)
}

function getTongueResult(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/api/constitutionRecordInstance/getTongue',
        data: obj.data,
        header: header
    },false)
}

function getTongueBackImageResult(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/api/constitutionRecordInstance/getTongueBackImageResult',
        data: obj.data,
        header: header
    },false)
}
function getFaceImageResult(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/api/constitutionRecordInstance/getFaceImageResult',
        data: obj.data,
        header: header
    },false)
}

function statisticsIndex(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/statistics/index',
        data: obj.data,
        header: header
    },false)
}

function toolsPage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/tools/page',
        data: obj.data,
        header: header
    },false)
}

function findInfo(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/api/communityInfo/findInfo',
        // data: obj.data,
        header: header
    },false)
}

function findToolsById(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/tools/findById',
        data: obj.data,
        header: header
    },false)
}

function statistics(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/statistics/statistics',
        // data: obj.data,
        header: header
    },false)
}

function paySummary(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/payInfo/summary',
        data: obj.data,
        header: header
    },false)
}

function payinfoPage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/payInfo/page',
        data: obj.data,
        header: header
    },false)
}

function toolsFWZPage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/tools/fwzPage',
        data: obj.data,
        header: header
    },false)
}

function findCommunityDisplayPage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/manager/findCommunityDisplayPage',
        data: obj.data,
        header: header
    },false)
}

function advisoryPage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/manager/advisoryPage',
        data: obj.data,
        header: header
    },false)
}

function managerRead(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/manager/read',
        data: obj.data,
        header: header
    },false)
}


function managerSend(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.post({
        url: '/manager/send',
        data: obj.data,
        header: header
    },false)
}
function managerMsgPage(obj){
    const sessionKey = uni.getStorageSync('sessionKey');
    const header = {
        'sskey': sessionKey,
        'content-type': 'application/x-www-form-urlencoded'
    }
    
    return request.get({
        url: '/manager/managerPage',
        data: obj.data,
        header: header
    },false)
}

export default {
    login,
    constitutionList,
    constitutionFindById,
    constitutionOrderList,
    constitutionOrderFindById,
    analysisFaceImage,
    dialWithQuesTest,
    cutTongueImage,
    cutTongueBackImage,
    getUploadParams,
    findByInstanceId,
    getPostage,
    addOrder,
    getPayCode,
    queryOrderStatus,
    getTongueResult,
    getTongueBackImageResult,
    getFaceImageResult,
    statisticsIndex,
    toolsPage,
    findInfo,
    findToolsById,
    statistics,
    paySummary,
    payinfoPage,
    toolsFWZPage,
    findCommunityDisplayPage,
    advisoryPage,
    managerRead,
    managerSend,
    managerMsgPage
}
