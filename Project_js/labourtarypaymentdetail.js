$(document).ready(function () {
    PermissionDetail();
    $(document).on('keydown', '#txtpatientfilter', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txtfromdate', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txttodate', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txtpatientfilter', function () {
        FillPatientBindGrid();
    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('change', '#ddlpaymenttype', function () {
        FillPatientBindGrid();
    });
   
    $(document).on('click', '.lnkselect', function () {
        var receiptid = $(this).data('receiptid');
        PrintReceipt(receiptid);
    });
    clearRecord();
});
function clearRecord() {
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    FillPatientBindGrid();
}
function PrintReceipt(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'LabourtaryPaymentDetail.aspx/PrintPathologyReceipt',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "Error") alertify.error("Some Error Occured !");
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
}
function FillPatientBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LabourtaryPaymentDetail.aspx/GetPaymentDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val(), PaymentType: $('#ddlpaymenttype').val() }),
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
            $('#gvbill').append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Centre Detail</th><th>BillNo</th><th>ReceiptType</th><th>ReceiptNo</th><th>UHID</th>" +
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
                $("#gvbill").append("<tr style='color:" + color + "'><td>" + billdetail + "</td><td class='center'>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td><td class='center'>" + data.d[i].BillNo + "</td>" +
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
            Initialize();
        }
        else {
            $("#gvbill").append("<thead><tr><th>Payment Detail List</th></tr></thead>");
            $("#gvbill").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
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
