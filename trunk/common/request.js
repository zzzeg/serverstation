// const host = 'http://192.168.13.54:10005'
// const reporthost = 'http://192.168.13.54:9800/'
// const sharehost = 'http://test2-weixin.bainuo.cn/'

// const host = 'http://test-weixin.bainuo.cn/retailerapi/'
// const reporthost = 'http://test3-weixin.bainuo.cn/'


const host = 'https://retailer.bainuojk.com/retailerapi'
const reporthost = 'https://retailer.bainuojk.com/'
const sharehost = 'https://mwsf.bainuojk.com/'


// const downloadhost = "https://coffer.bainuo.cn/doctorqualification-pub/"

function request(url, method, data, header,showHud) {
    
    if(showHud){
        uni.showLoading({
            title: '加载中' // 数据请求前loading
        })
    }
    return new Promise((resolve, reject) => {
        if (header == undefined) {
            header = {
                // 'content-type': 'application/json' // 默认值
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
        
        
        uni.request({
            url: host + url, 
            method: method,
            data: data,
            header: header,
            success: function(res) {
           

                if (res.data.status != '666' && res.data.status != '777') {
                    resolve(res.data)
                }
            },
            fail: function(res) {
                console.log(res)
                
                // reject(false)
            },
            complete: function(res) {
                if(showHud){
                    uni.hideLoading()
                }
                if (res.statusCode !== 200) {
                    if(showHud){
                        uni.showToast({
                            title: res.errMsg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                }

                if (res.data.status == '666' || res.data.status == '777') {
                    try {
                        uni.clearStorageSync()
                        uni.reLaunch({
                            url: "/pages/me/login"
                        })
                    } catch (e) {
                        if(showHud){
                            uni.showToast({
                                title: e,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        
                    }
                    return
                }

                if (res.data && res.data.status !== 'OK') {
                    
                    if(res.data.message){
                        console.log("message:")
                        if(showHud){
                            uni.showToast({
                                title: res.data.message,
                                icon: 'none',
                                duration: 2000
                            })
                        }
                        
                    }
                    
                }
            }
        })
    })
}

function get(obj,showHud) {
    return request(obj.url, 'GET', obj.data, obj.header,showHud)
}

function post(obj,showHud) {
    return request(obj.url, 'POST', obj.data, obj.header,showHud)
}


export default {
    request,
    get,
    post,
    host,
    reporthost,
    sharehost
}
