define(function() {
    var $ = Dom7;

    function getLocalTime(nS) {

        var dateObj = new Date(parseInt(nS) * 1000);
        var UnixTimeToDate = dateObj.getUTCFullYear() + '/' + (dateObj.getUTCMonth() + 1) + '/' + dateObj.getUTCDate() + ' ' + dateObj.getUTCHours() + ':' + dateObj.getUTCMinutes();
        // + ':' + dateObj.getUTCSeconds()
        return UnixTimeToDate;
        //return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
        //return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
    }

    function getcurrentDate() {
        var timestamp1 = new Date().getTime(); //获取完整时间戳
        return parseInt(timestamp1 / 1000);
    }

    function showStorage(obj) {
        console.log("======[展示本地存储内容][" + obj + "] 开始 ======");
        for (var i = 0; i < localStorage.length; i++) {
            //key(i)获得相应的键，再用getItem()方法获得对应的值
            console.log("######[" + localStorage.key(i) + "]" + localStorage.getItem(localStorage.key(i)));
        }
        console.log("======[展示本地存储内容] 结束 ======");
    }

    function clearStorage(obj) {
        console.log("======[清除本地存储内容][" + obj + "] 开始 ======");
        localStorage.clear();
        console.log("======[清除本地存储内容] 结束 ======");
    }

    function hidePreLoader(obj, times) {
        if (undefined == obj) return;
        if (undefined == times) times = 300;
        setTimeout(function() {
            obj.hidePreloader();
        }, times);
    }

    function hideIndicator(obj, times) {
            if (undefined == obj) return;
            if (undefined == times) times = 300;
            setTimeout(function() {
                myApp.hideIndicator();
            }, 2000);
        }
        /**
         * 显示弹出窗口[提示]
         * @param {Object} obj app.f7
         * @param {Object} msg 消息内容
         */

    function msgInfo(obj, msg) {
        if (undefined == obj) return;
        obj.alert("<label class=''>" + msg + "</label>",
            "<label class='color-green'><i class='icon ion-alert-circled' style='font-size:360%;'></i>&nbsp;&nbsp;提示</label>");
    }

    /**
     * 显示弹出窗口[错误]
     * @param {Object} obj app.f7
     * @param {Object} msg 消息内容
     */
    function msgError(obj, msg) {
        if (undefined == obj) return;
        obj.alert("<label class=''>" + msg + "</label>",
            "<label class='color-red'><i class='icon ion-close-circled' style='font-size:360%;'></i>&nbsp;&nbsp;错误</label>");
    }

    /**
     * 显示弹出窗口[警告]
     * @param {Object} obj app.f7
     * @param {Object} msg 消息内容
     */
    function msgWarning(obj, msg) {
        if (undefined == obj) return;
        obj.alert("<label class=''>" + msg + "</label>",
            "<label class='color-orange'><i class='icon ion-information-circled' style='font-size:360%;'></i>&nbsp;&nbsp;警告</label>");
    }

    /**
     * 显示弹出窗口[正常]
     * @param {Object} obj app.f7
     * @param {Object} msg 消息内容
     */
    function msgOK(obj, msg) {
        if (undefined == obj) return;
        obj.alert("<label class=''>" + msg + "</label>",
            "<label class='color-green'><i class='icon ion-checkmark-circled' style='font-size:360%;'></i>&nbsp;&nbsp;提示</label>");
    }

    return {
        getLocalTime: getLocalTime,
        getcurrentDate: getcurrentDate,
        showStorage: showStorage,
        clearStorage: clearStorage,
        msgInfo: msgInfo,
        msgError: msgError,
        msgWarning: msgWarning,
        msgOK: msgOK,
        hidePreLoader: hidePreLoader,
        hideIndicator: hideIndicator

    };
});