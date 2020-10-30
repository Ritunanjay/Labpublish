
function Getdate(ele) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../Helper.aspx/DateTimeNow",
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            var st = response.d;
            var today = st;
            $(ele).val(today);
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
function Savefingureprint(fingure) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../Helper.aspx/FingurePrint",
        data: JSON.stringify({ Fingure: fingure }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error('Fingure Print DoesNot Add');
            else
                alertify.success('Fingure Add Success');
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


function LoginFingure(fingure) {
    var loginstatus = '';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Default.aspx/LoginFingure",
        data: JSON.stringify({ Fingure: fingure }),
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
            if (response.d == "")
                alertify.error('Error Encountered');
            else if (response.d == "*")
                alertify.error('Fingure Print DoesNot Add');
            else {
                $('#txtusername').val(response.d.split('~')[0]);
                $('#txtpassword').val(response.d.split('~')[1]);
                alertify.success('Login Successfully');
                window.location.href = window.location.href.replace('Default.aspx', '') + 'Navigation/D_View/MainDashboard.aspx';

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
    return loginstatus;
}
