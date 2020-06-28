<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
    .line20{
        height: 20upx;
        background:rgba(239,241,246,1);
    }
    .empty-box{
        height: 50upx;
    }
    .empty-box30{
        height: 30upx;
    }
    .record-time{
        margin-top: 20upx;
        font-size:25upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(162,169,186,1);
        line-height:38upx;
    }
    .record-notes{
        margin-top: 20upx;
        padding: 21upx;
        background:rgba(237,245,255,1);
        border-radius:21upx;
        
        font-size:27upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:40upx;
    }
    .record-info{
        margin-top: 20upx;
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:42upx;
    }
    .record-details{
        font-size:29upx;
        font-family:NotoSansCJKsc-Regular,NotoSansCJKsc;
        font-weight:400;
        color:rgba(67,78,94,1);
        line-height:52upx;
    }
    .record-top{
        flex-direction: row;
        display: flex;
        justify-content: space-between;
    }
    .record-box{
        margin: 31upx 33upx 0upx 33upx;
        width: calc(100% - 120upx);
        background:rgba(255,255,255,1);
        border-radius:21upx;
        padding: 31upx 21upx;
    }
    .nodata{
        text-align: center;
        margin-top: 300upx;
        color: #868E9D;
        font-size:32upx;
    }
    .nodata image{
        width: 232upx;
        height: 232upx;
    }
</style>
