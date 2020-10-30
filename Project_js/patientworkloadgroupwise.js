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
        url: 'PatientWorkloadGroupWise.aspx/PrintPathologyBillByReport',
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
        url: "PatientWorkloadGroupWise.aspx/GetWorkloadDetail",
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
            $('#gvpathology').append("<thead><tr>"+
               "<th>Paid</th><th style='width:15px' class='center'>Print</th>" +
                "<th>Centre</th><th>UHID</th><th>Patient_Detail</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>Test_Group</th><th>TestList</th><th>Booking_Date</th><th>TATTimer</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var checkbox = "";
                var statusbill = "";
                var fillreporting = '';
                var printdetail = '';
                var reportvalidate = '';

                var timer;
                timer ="Sample Processing";
                if (data.d[i].Recheck == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].Recheck == 'I')
                    fillreporting = '#ec39396b';
                else if (data.d[i].Recheck == 'C') {
                    fillreporting = '#39ec3f6b';
                    timer = 'Test Complete Done';
                } else if (data.d[i].Recheck == 'V') {
                    fillreporting = '#c839ec6b';
                    printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "'  data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                } else if (data.d[i].Recheck == 'P') {
                    fillreporting = '#b3851d6b';
                    printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "' data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                }
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' data-billid='" + data.d[i].BillID + "' data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'></a>";
                checkbox = "<input type='checkbox'  class='form-control' id='chckvalidate' " + reportvalidate + " data-billid='" + data.d[i].BillID + "' data-groupid='" + data.d[i].GroupID + "' />"
                if (data.d[i].Collect == false) {
                    reportingdetail = "";
                    checkbox = "";
                    timer = "Sample Not Collect";
                    printdetail = "";
                }
                printdetail = (data.d[i].Balance == false) ? "" : printdetail;
                var balance = (data.d[i].Balance == false) ? "" : "<img src='../admin/img/paid.gif' style='width: 56px;height: 50px;'></img>";
                $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                                     "<td>" + balance + " </td> " +
                                     "<td>" + printdetail + " </td> " +
                                   "<td>" + data.d[i].CentreName + "</td>" +
                                      "<td>" + data.d[i].UHID + "</td>" +
                                      "<td>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                                      "<td>" + data.d[i].Mobile + "</td>" +
                                      "<td>" + data.d[i].EmailID + "</td>" +
                                      "<td>" + data.d[i].BillNo + "</td>" +
                                      "<td>" + data.d[i].TestGroup + "</td>" +
                                       "<td>" + data.d[i].TestList + "</td>" +
                                      "<td>" + data.d[i].BillOpenDate + "</td>" +
                                 "<td><i class='fa fa-clock-o' style='background-color:white;font-size:large' >" + timer + "</i></td>" +
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