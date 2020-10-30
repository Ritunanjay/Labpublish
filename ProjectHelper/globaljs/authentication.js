$(document).ready(function () {
    $('#btnregister').click(function () {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Authentication.aspx/Software_Reg",
            data: JSON.stringify({ value: navigator.appVersion, Password: $('#password').val() }),
            dataType: "json",
            success: function (response) {
                if (response.d == '0') {
                    alertify.error("Sorry!"+ "Your System Are Not Register");
                } else {
                    alertify.success("Good job!"+"Your System Are Register");
                }
                $('#password').val('');
                $('#Allpassword').val('');
                
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
    });
    $('#btnreuniversalregister').click(function () {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "Authentication.aspx/AuthenticationSoftware",
            data: JSON.stringify({ value: $('#type').val(), Password: $('#Allpassword').val() }),
            dataType: "json",
            success: function (response) {
                if (response.d == '0') {
                    alertify.error("Sorry!"+"Your System Are Not Register");
                } else {
                    alertify.success( "Good job!"+"Your System Are Register");
                }
                $('#password').val('');
                $('#Allpassword').val('');
                //  window.location.href = window.location.href.replace('ScreenLock.aspx', '');

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
    });
});