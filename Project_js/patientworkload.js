$(document).ready(function () {
   BindGrid();
       $(document).on('click', '.lnkprint', function () {
        var BillID = $(this).data('billid');
        PrintReport(BillID);
    });
    window.setInterval(function () {
        BindGrid();
    }, 100000);
});


function PrintReport(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientWorkload.aspx/PrintPathologyBillByReport',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "Error")
                alertify.error("Some Error Occured !");
            else
                window.open(response.d, '_blank');
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
        url: "PatientWorkload.aspx/GetWorkloadDetail",
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
        $("#gvpathology").empty();
        if (data.d.length > 0) {
            $('#gvpathology').append("<thead><tr><th style='width:15px' class='center'>Print</th><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>TestList</th><th>Date</th><th>BloodGroup</th><th>DoctorName</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var fillreporting = (data.d[i].Status == 0) ? 'red' : 'green';
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' data-billid='" + data.d[i].BillID + "' style='font-size: large;' href='javascript:void();'></a>";
                var printdetail = (data.d[i].VerifiedStatus != false) ? " <a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "' style='font-size: large;' href='javascript:void();'> </a>" : "";

                $("#gvpathology").append("<tr style='color:" + fillreporting + "'><td>" + printdetail + " " +
                        " </td>" +
                        "<td class='center'>" + data.d[i].CentreName + "</td>" +
                         "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                        "<td class='center'>" + data.d[i].Mobile + "</td>" +
                        "<td class='center'>" + data.d[i].EmailID + "</td>" +
                        "<td class='center'>" + data.d[i].BillNo + "</td>" +
                        "<td>" + data.d[i].TestList + "</td>" +
                        "<td class='center'>" + data.d[i].BillOpenDate + "</td>" +
                       "<td class='center'>" + data.d[i].BloodGroup + "</td>" +
                        "<td class='center'>" + data.d[i].DoctorName + "</td>" +
                        "</tr>");
            }
            $('#gvpathology').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvpathology").append("<thead><tr><th>Labourtary List</th></tr></thead>");
            $("#gvpathology").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvpathology').dataTable({
        "iDisplayLength": -1,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": true, "targets": [2] }],
        "searching": true,
        "paging": false,
        "processing": false,
        "bSort": true,
        "info": false,
        dom: "Bfrtip",
        buttons: [
          {
              extend: "copy",
              className: "btn-sm"
          },
          {
              extend: "csv",
              className: "btn-sm",
          },
          {
              extend: "print",
              className: "btn-sm"
          }, {
              extend: "pdf",
              className: "btn-sm"
          },
        ],
        responsive: true,
        "bDestroy": true
    });
}