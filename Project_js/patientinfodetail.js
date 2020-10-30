$(document).ready(function () {
    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            alertify.error('Action Not Allow');
            return false;
        }
    });
    PermissionDetail();
    $("#txtsearchpatient").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PatientInfodetail.aspx/SearchPatient",
                data: "{ 'PatientDetail': '" + request.term + "','Type': '" + $('#ddlfilteration').val() + "'}",
                dataType: "json",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        }
                    }))
                },
                error: function (response) {
                    jQuery.toast('E' + response.responseText);
                },
                failure: function (response) {
                    jQuery.toast('fa' + response.responseText);
                }
            });
        },
        select: function (e, i) {
            if (i.item.val != "#") {
                FillPatientBookingDetail(i.item.val);
                $('#txtsearchpatient').val('');

            }
        },
        minLength: 0
    });
    $(document).on('click', '.lnkcheckreceipt', function () {
        var billid = $(this).data('billid');
        FillPatientBindGrid(billid);
        $('#ModalPatientReceipt').modal('show');
    });
});

function FillPatientBindGrid(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientInfoDetail.aspx/GetPaymentDetail",
        data: JSON.stringify({ BillID:id }),
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
        $("#gvbill").empty();
        if (data.d.length > 0) {
            $('#gvbill').append("<thead><tr><th>Centre Detail</th><th>BillNo</th><th>ReceiptType</th><th>ReceiptNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>BillAmount</th><th>PaidAmount</th><th>ReceiptDate</th><th>TestList</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var color = "black";
                if (data.d[i].Status == 'C') {
                    billdetail = "";
                    color = 'black';
                } else {
                    billdetail = "<a class='glyphicon glyphicon-print lnkselect' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' data-receiptid='" + data.d[i].ReceiptID + "' href='javascript:void();'></a>";
                    color = 'black';
                }
                $("#gvbill").append("<tr style='color:" + color + "'><td class='center'>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td><td class='center'>" + data.d[i].BillNo + "</td>" +
                         "<td class='success'>" + data.d[i].ReceiptType + "</td>" +
                         "<td class='success'>" + data.d[i].ReceiptNo + "</td>" +
                         "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + "</td>" +
                        "<td class='center'>" + data.d[i].Mobile + "</td>" +
                        "<td class='success'>" + data.d[i].NetAmount + "</td>" +
                        "<td class='success'>" + data.d[i].PaidAmount + "</td>" +
                        "<td class='success'>" + data.d[i].ReceiptDate + "</td>" +
                        "<td class='center'>" + data.d[i].TestList + "</td>" +
                        "</tr>");
            }
            $('#gvbill').append("</tbody>");
            InitializeBill();
        }
        else {
            $("#gvbill").append("<thead><tr><th>Payment Detail List</th></tr></thead>");
            $("#gvbill").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function InitializeBill() {
    $('#gvbill').dataTable({
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": true, "targets": [2] }],
        "searching": true,
        "paging": true,
        "processing": true,
        "bSort": true,
        "info": true,
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

function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').detach();
    else
        $('#btnadd').css('display', '');

}


function FillPatientBookingDetail(pid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientInfodetail.aspx/FillPatientBookingDetail",
        data: JSON.stringify({ PatientID: pid }),
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
        $("#gvbooking").empty();
        if (data.d.length > 0) {
            $("#gvbooking").append("<thead><tr><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>BillNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Date</th><th>BillAmount</th><th>DiscountAmount</th><th>TaxAmount</th><th>DoctorAmount</th><th>CentreAmount</th>" +
                "<th>DiscountByName</th><th>ExtraByName</th><th>NetAmount</th><th>TotalPaid</th><th>Balance-Status</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var billdelete = "";
                var color = "warning";
                   if (data.d[i].Status == 'C') {
                    billdetail = "<a class='fa fa-check lnkcheckreceipt' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    if (print == 'False')
                        billdetail = '';
                    color = 'success';
                    $("#gvbooking").append("<tr><td class='" + color + "'>" + billdetail + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].BillNo + "</td>" +
                                "<td  class='" + color + "'>" + data.d[i].UHID + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].PatientName + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].Mobile + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].EmailID + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].BillOpenDate + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].BillAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].DiscountAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].TaxAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].DoctorAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].CentreAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].DiscountByName + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].ExtraByName + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].NetAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].TotalPaidAmount + "</td>" +
                                "<td class='" + color + "'>" + data.d[i].Statusclear + "</td>" +
                                "</tr>");
                } else {

                    billdetail = "";
                    color = 'red';
                    billdetail = "<a class='fa fa-check lnkbookingprint' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    if (print == 'False')
                        billdetail = '';
                    color = 'red';
                        $("#gvbooking").append("<tr><td class='" + color + "'>" + billdetail + "</td>"+
                        "<td class='" + color + "'>" + data.d[i].BillNo + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].UHID + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].PatientName + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].Mobile + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].EmailID + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].BillOpenDate + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].BillAmount + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].DiscountAmount + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].TaxAmount + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].DoctorAmount + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].CentreAmount + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].DiscountByName + "</td>" +
                        "<td class='" + color + "'>" + data.d[i].ExtraByName + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].NetAmount + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].TotalPaidAmount + "</td>" +
                        "<td  class='" + color + "'>" + data.d[i].Statusclear + "</td>" +
                        "</tr>");
                }
            }
            $('#gvbooking').append("</tbody>");
            PatientInitialize();
        }
        else {
            $("#gvbooking").append("<thead><tr><th>Booking List</th></tr></thead>");
            $("#gvbooking").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function PatientInitialize() {
    $('#gvbooking').dataTable({
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": true, "targets": [2] }],
        "searching": true,
        "paging": true,
        "processing": true,
        "bSort": true,
        "info": true,
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