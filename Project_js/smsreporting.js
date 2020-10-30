$(document).ready(function () {
    BindGrid();
    setInterval(function () {
        var status = navigator.onLine;
        if (status) {
            if ($('#gv tr td').length>1){
            SendSMSDetail();
            }
        } else {
            alertify.error('No internet Connection !!');
        }
    }, 30000);
});

function SendSMSDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SMSReporting.aspx/SendSMSDetail",
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            alertify.log(response.d);
            BindGrid();
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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SMSReporting.aspx/GetSMSDetail",
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
        $("#gv").empty();
        if (data.d.length > 0) {
            $("#gv").append("<thead><tr><th class='center'>Report</th><th>Status</th><th>Success</th><th>Fail</th><th>Mobile</th><th>Message</th><th>Detail</th><th>Processing</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var SMSstatus = (data.d[i].SMSStatus == false) ? "Not Send " : "SMS Send";
                var status = (data.d[i].SMSStatus == false) ? "<div class='progress progress-lg'><div class='progress-bar progress-bar-info active progress-bar-striped' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 50%' role='progressbar'> <span class='sr-only'>85% Complete (success)</span> </div></div>" : "<div class='progress progress-md'><div class='progress-bar progress-bar-success progress-bar-striped' aria-valuenow='85' aria-valuemin='0' aria-valuemax='100' style='width: 100%' role='progressbar'> <span class='sr-only'>85% Complete (success)</span> </div></div>"
                $("#gv").append("<tr><td><a href='" + data.d[i].LinkDetail + "'  target='_blank'><i class='fa fa-report'></i> View Report</a></td><td>" + SMSstatus + "</td><td>" + data.d[i].SuccessCount + "</td><td>" + data.d[i].FailCount + "</td><td>" + data.d[i].Mobile + "</td><td>" + data.d[i].Message + "</td><td>" + data.d[i].Detail + "</td><td>" +
                    "" + status + "</td></tr>");
            }
            $('#gv').append("</tbody>");
        }
        else {
            $("#gv").append("<thead><tr><th>SMS Detail List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}