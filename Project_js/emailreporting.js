$(document).ready(function () {
    BindGrid();
    SendMailDetail();
    setInterval(function () {
        var status = navigator.onLine;
        if (status) {

            SendMailDetail();
            } else {
            alertify.error('No internet Connection !!');
        }
      }, 30000);
  });

function SendMailDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailReporting.aspx/SendMailDetail",
        data: JSON.stringify({  }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                if (response.d != "success") {
                    alertify.error(response.d);
                }
                else{
                    alertify.success(response.d);
                } BindGrid();
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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailReporting.aspx/GetEmailDetail",
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
            $("#gv").append("<thead><tr><th class='center'>Total Mail</th><th>Subject</th><th>Attatchment</th><th>Status</th><th>EmailID</th><th>Message</th><th>Processing</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var emailstatus = (data.d[i].EmailStatus == false) ? "Not Send" : "Send";
                var status = (data.d[i].EmailStatus == false) ? "<div class='progress progress-lg'><div class='progress-bar progress-bar-info active progress-bar-striped' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 50%' role='progressbar'> <span class='sr-only'>85% Complete (success)</span> </div></div>" : "<div class='progress progress-md'><div class='progress-bar progress-bar-success progress-bar-striped' aria-valuenow='85' aria-valuemin='0' aria-valuemax='100' style='width: 100%' role='progressbar'> <span class='sr-only'>85% Complete (success)</span> </div></div>"
                $("#gv").append("<tr><td>" + data.d[i].EmailSuccessCount + "</td><td>" + data.d[i].Subject + "</td><td><a href='" + data.d[i].Attatchment + "' >View Report</a></td><td>" + emailstatus + "</td><td>" + data.d[i].EmailID + "</td><td>" + data.d[i].Message + "</td><td>" +
                    "" + status + "</td></tr>");
            }
            $('#gv').append("</tbody>");
        }
        else {
            $("#gv").append("<thead><tr><th>Email Detail List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}