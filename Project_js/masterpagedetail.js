$(document).ready(function () {
    getthemenow();
    GetOccation();

    $("#txtsearch").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "../../MainHelper.aspx/GetNavigationLink",
                data: "{ 'Navigation': '" + request.term + "'}",
                dataType: "json",

                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        }
                    }))
                },
                error: function (response) {
                    LMSMessage('', 'Navigation Error','info');
                    //   jQuery.toast('E' + response.responseText);
                    $("#txtsearch").val('');
                },
                failure: function (response) {

                    LMSMessage('', 'Navigation failure', 'info');
//                    jQuery.toast('fa' + response.responseText);
                    $("#txtsearch").val('');
                }
            });
        },
        select: function (e, i) {
            if (i.item.val != "#") {
                window.location.href = i.item.val;
            }
            else {
                $("#txtsearch").val('');
                $("#txtsearch").focus();
            }
        },
        minLength: 1
    });
    $(document).on('click', '.lnknavigationdetail', function () {
        if ($('#lnknavigation').hasClass('slide-nav-toggle')) {
            $('#lnknavigation').removeClass('wrapper theme-1-active box-layout pimary-color-red slide-nav-toggle');
            $('#lnknavigation').addClass('wrapper theme-1-active box-layout pimary-color-red');
        } else {
            $('#lnknavigation').removeClass('wrapper theme-1-active box-layout pimary-color-red');
            $('#lnknavigation').addClass('wrapper theme-1-active box-layout pimary-color-red slide-nav-toggle');
        }
    });
    $(document).on('click', '.lnkusermodal', function () {
    });
    var logoimage = $('#hdflogo').val();
    $('#logo').attr('src', logoimage);
});

function GetOccation() {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../MainHelper.aspx/GetOccation",
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.split('*')[0] != undefined)
                $('#occation').text(' ' + response.d.split('*')[0]);
            if (response.d.split('*')[1] != undefined)
                $('#newoccation').text(' ' + response.d.split('*')[1]);
            if (response.d.split('*')[2] != undefined)
                $('#happybirthday').text(' ' + response.d.split('*')[2]);
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alert(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });
}
function getthemenow() {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../MainHelper.aspx/GetThemeNow",
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            $('#lnknavigation').addClass(response.d);
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alert(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });
}