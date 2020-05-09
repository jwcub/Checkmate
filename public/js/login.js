$(function () {
    $("#submitButton").click(function () {
        $("#submitButton").attr('disabled', true);
        $("#submitButton").addClass('iconfont icon-jiazai');
        $.ajax({
            type: "post",
            url: "/login",
            data: $("#loginForm").serialize(),
            dataType: "json",
            success: function (res) {
                if (res.status == 'success') {
                    $.toast({
                        heading: '登录成功',
                        text: '欢迎',
                        icon: 'success',
                        showHideTransition: 'slide',
                        hideAfter: 1000,
                        position: 'bottom-right',
                        afterHidden: function () { window.location.href = '/'; }
                    });
                }
                else {
                    toast('error', '登录失败', res.msg);
                    $("#submitButton").attr('disabled', false);
                    $("#submitButton").removeClass('iconfont icon-jiazai');
                }
            }
        });
    });
    $("#loginForm").keydown(function (e) {
        if ($("#submitButton").attr('disabled') == 'disabled') return;
        var e = e || event,
            keycode = e.which || e.keyCode;
        if (keycode == 13) {
            $("#submitButton").click();
        }
    });
})