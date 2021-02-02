layui.define(['layer', 'jquery'], function (exports) {
    // var BASE_PATCH = 'http://127.0.0.1:8000'
    var BASE_PATCH = 'http://122.14.253.88:20783'
    var token = window.localStorage.getItem('JQ_token');
    var $ = layui.jquery,
        layer = layui.layer;
    var obj = {
        myAjax: function (type, url, data, success) {
            $.ajax({
                type: type,
                url: BASE_PATCH + url,
                dataType: 'json',
                async: true,
                data: data,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", token);
                },
                success: function (data) {
                    if (data.code == '0') {
                        eval(success)

                    } else if (data.code == '110') {
                        layer.msg('登录后再操作', {
                            time: 1000, icon: 5, end: function () {
                                // window.location = '/page/login-3.html'
                                window.location = '../login-3.html';
                            }
                        })
                    } else {
                        layer.msg(data.error, {time: 2000, icon: 5})
                    }
                }
            });
        }
    };
    exports('myModule', obj)
});