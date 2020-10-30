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
  $(document).on('keydown', '#txtpatientdetail', function () {
        BindGrid($('#txtpatientdetail').val().trim());
    });
    $(document).on('click', '.lnkselect', function () {
     var BillID= $(this).data('billid');
     PrintBill(BillID);
    });
    ClearDetail();
});
function ClearDetail()
{
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    $('#txtpatientfilter').val('');

    FillPatientBindGrid();

}
function PrintBill(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'LabourtaryBill.aspx/PrintPathologyBill',
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
        url: "LabourtaryBill.aspx/GetBillDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val() }),
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
        $('#gvbill').empty();
        if (data.d.length > 0) {
            $('#gvbill').append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Centre Detail</th><th>BillNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Date</th><th>NetAmount</th><th>TotalPaid</th><th>Balance-Status</th></tr></thead><tbody>");
           var print= $('#hdfprint').val();
           
            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var statuscolor = "info";
                var color = "orange";
                if (data.d[i].Status == 'C') {
                    billdetail = "<a class='glyphicon glyphicon-print lnkselect' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    if (print == 'False')
                        billdetail = '';
                    statuscolor = 'success';
                    color = 'green';
                    $("#gvbill").append("<tr style='color:" + color + "'><td class='" + statuscolor + "'>" + billdetail + "</td><td  class='" + statuscolor + "'>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td><td  class='" + statuscolor + "'>" + data.d[i].BillNo + "</td>" +
                              "<td class='"+statuscolor+"'>" + data.d[i].UHID + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].PatientName + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].Mobile + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].EmailID + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].BillOpenDate + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].NetAmount + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].TotalPaidAmount + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].Statusclear + "</td>" +
                             "</tr>");
                } else {
                    billdetail = "";
                    color = 'red';
                    billdetail = "<a class='glyphicon glyphicon-print lnkselect' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    if (print == 'False')
                        billdetail = '';
                    color = 'red';
                    statuscolor = 'danger';
                    $("#gvbill").append("<tr style='color:" + color + "'><td class='" + statuscolor + "'>" + billdetail + "</td><td class='" + statuscolor + "'>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td><td class='" + statuscolor + "'>" + data.d[i].BillNo + "</td>" +
                                "<td class='" + statuscolor + "'>" + data.d[i].UHID + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].PatientName + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].Mobile + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].EmailID + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].BillOpenDate + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].NetAmount + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].TotalPaidAmount + "</td>" +
                             "<td class='" + statuscolor + "'>" + data.d[i].Statusclear + "</td>" +
                             "</tr>");
                }
                
            }
            $('#gvbill').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvbill").append("<thead><tr><th>Bill List</th></tr></thead>");
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
