$(document).ready(function () {
    $('.lnksoftwarename').text('Hospital Management System');
    $('.lnkboldtime').text($('#hdftimeslot').val());
    Autocall();
    $(document).on('click', '#btnlogin', function () {
       var username = $('#txtusername').val().trim();
        var password = $('#txtpassword').val().trim();
        LoginCredential(username, password);
    });
    $('#hdfsys').val(navigator.appVersion);
});
function Autocall(){
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/Security",
        data: JSON.stringify({ Security: "Hospital" }),
        dataType: "json",
        success: function (response) {

        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.error(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.error(response.d);
        }
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/Authority",
        data: JSON.stringify({ Authority: navigator.appVersion }),
        dataType: "json",
        success: function (response) {
            if (response.d != "") {
                alertify.error('Your System is Not Registered');
              //  $('.lnksystemnotregistered').css('display', 'none');
            }
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.error(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.log(response.d);
        }
    });
}
