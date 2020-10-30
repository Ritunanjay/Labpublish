$(document).ready(function () {
    $(document).on('click', '#btnfingureprintlogin', function () {
        
        GetInfo();
        UserDetail();
       
    });
    
 // setInterval("GetInfo()", 4000);
 // setInterval("UserDetail()", 4000);
    //setTimeout(function () {
    //    GetInfo();
    //    Verify();

    //}, 1000);
});
function UserDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Login.aspx/GetUserDetail",
        data: "{}",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: FillJsonXML,
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
    function FillJsonXML(data) {
        if (data.d.length > 0) {
            var isotemplate = $('#txtisoimage').val();
            if (isotemplate == '') {
                alertify.log('Please Scan Fingure First!!!');
                return false;
            }
            for (var i = 0; i < data.d.length; i++) {
                $('#finguredetail').val(data.d[i].Fingure1);
                $('#fingureuser').val(data.d[i].UserName);
                 if (Verify()) {
                     {
                         logindetail(data.d[i].UserID);
                         i = data.d.length;
                     }
                 }
            }
        }
    }
}

function logindetail(userid) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Login.aspx/UserLogin',
        data: JSON.stringify({ User: userid }),
        async: false,
        success: function (response) {
            if(response.d.MessageName="login success")
                window.location.href = 'Navigation/Dashboard/UserHome.aspx';
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