$(function () {
    BarCode(1, "B")
    BarCode(1, "Q")
    window.setInterval(function () {
        GetUserByID()
    }, 2000);
});

function GetUserByID() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "BarcodeLoginTest.aspx/GetUserByID",
        data: JSON.stringify({ }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.UserName != null) {
                alertify.log(response.d.UserName)
                $('#username').text(response.d.UserName);
            }
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
function BarCode(number, type) {
    var link = "http://192.168.61.19/VerifyBarcode.aspx?information=";
    $.ajax({
        type: "POST",
        url: "BarcodeLoginTest.aspx/Barcode",
        data: JSON.stringify({ Number: number, type: type ,Link:link}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#img").append("<div class='col-md-6 col-sm-6 col-xs-6' style='display: inline;'> <img id='qrimg' class='img img-thumbnail' alt='' src='" + response.d + "' /></div>");

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
