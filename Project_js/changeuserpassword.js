$(document).ready(function () {
    $(document).on('click', '#btnadd', function () {
        if (checkval())
            ChangePassword();
    });
    $(document).on('click', '#btnclear', function () {
        ClearDetail();
    });
});
function ClearDetail() {
    $('#txtboldpassword').val('');
    $('#txtnewpassword').val('');
    $('#txtconfirmpassword').val('');
}
function checkval() {
    if ($('#txtboldpassword').val() == "") {
        LMSMessage('', 'Please Enter Old Password', 'default');
        return false;
    } if ($('#txtnewpassword').val() == "") {
        LMSMessage('', 'Please Enter Please Enter New Password', 'Info');
        return false;
    } if ($('#txtconfirmpassword').val() == "") {
        LMSMessage('', 'Please Enter Confirm  Password', 'Info');
        return false;
    }
    if ($('#txtnewpassword').val() != $('#txtconfirmpassword').val()) {
        LMSMessage('', "New And Confirm Password Does't Match", 'Info');
        return false;
    }
    return true;
}
function ChangePassword() {
 var oldpassword=  $('#txtboldpassword').val();
 var newpassword=  $('#txtnewpassword').val();
 var confirmpassword=  $('#txtconfirmpassword').val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ChangeUserPassword.aspx/ModifyUserPassword",
        data: JSON.stringify({ OLD:oldpassword,NEW:newpassword,CONFIRM:confirmpassword }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0") {
                LMSMessage('', response.d.MessageName, 'success');
                ClearDetail();
            }
            else
                LMSMessage('', response.d.MessageName, 'success');

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