var type = 'D';
var fromdate = '01/01/1990';
var todate = '01/01/1990';
$(document).ready(function () {
    $('.dashboard').text('Today');
    BindAllComboBox();
    var val = Math.floor(1 + Math.random() * 10);
    if (parseFloat(val) < 5)
        $('.lnkcolor').addClass('sm-data-box bg-blue');
    else
        $('.lnkcolor').addClass('sm-data-box bg-red');

    getserverdate1($(".dashboardfromdate"));
    getserverdate1($(".dashboardtodate"));
    fromdate = $(".dashboardfromdate").val();
    todate = $(".dashboardtodate").val();
    BindGrid(type, fromdate, todate)
    FillPatientBindGrid(type, fromdate, todate)
    //window.setInterval(function () {
    //    BindGrid();
    //}, 5000);
    IPTrace();
    $(".mydashboardfilter li").click(function () {
        type = $(this).data('id');
        typename = $(this).text();
        fromdate = $(".dashboardfromdate").val();
        todate = $(".dashboardtodate").val();
        BindGrid(type, fromdate, todate)
        FillPatientBindGrid(type, fromdate, todate)
        $('.dashboard').text(typename);
    });
    $('.dashboardfromdate,.dashboardtodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('focusout', '.dashboardfromdate', function () {
        if ($('.dashboardfromdate').val() == "")
            getserverdate1($(".dashboardfromdate"));
        fromdate = $(".dashboardfromdate").val();
        todate = $(".dashboardtodate").val();
        BindGrid(type, fromdate, todate)
        FillPatientBindGrid(type, fromdate, todate)

    });
    $(document).on('focusout', '.dashboardtodate', function () {
        if ($('.dashboardtodate').val() == "")
            getserverdate1($(".dashboardtodate"));
        fromdate = $(".dashboardfromdate").val();
        todate = $(".dashboardtodate").val();
        BindGrid(type, fromdate, todate)
        FillPatientBindGrid(type, fromdate, todate)

    })
    $(document).on('change', '#ddlcentre', function () {
        GetPieValue();
        GetNewPieValue();
        BindGrid(type, fromdate, todate);
        FillPatientBindGrid(type, fromdate, todate);

    });
});

function BindAllComboBox() {
    BindCombo($("#ddlcentre"), "ddlcentre", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountDashboard.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
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
        }
    });
}
function BindGrid(type, fromdate, todate) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreDetailDashboard.aspx/GetInformationDetail",
        data: JSON.stringify({ Type: type, FromDate: fromdate, ToDate: todate, CentreID: $('#ddlcentre').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            $('.dashboardbooking').text(response.d.TotalBooking);
            $('.dashboardbookingamount').text(response.d.TotalBookingAmount);
            $('.dashboardcollection').text(response.d.TotalCollection);
            $('.dashboardbalance').text(response.d.TotalBalance);
            $('.dashboardnewpatient').text(response.d.NewPatient);
            $('.dashboardoldpatient').text(response.d.OldPatient);
            $('.dashboardreceipt').text(response.d.TotalReceipt);
            $('.dashboardrefund').text(response.d.TotalRefund);
            $('.dashboardsamplecollect').text(response.d.TotalSampleCollect);
            $('.dashboardsamplereceive').text(response.d.TotalSampleReceive);


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
function FillPatientBindGrid(type, fromdate, todate) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreDetailDashboard.aspx/GetBillDetail",
        data: JSON.stringify({ Type: type, FromDate: fromdate, ToDate: todate, CentreID: $('#ddlcentre').val() }),
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
            $('#gvbill').append("<thead><tr><th>Centre Detail</th><th>BillNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Date</th><th>NetAmount</th><th>TotalPaid</th><th>Balance-Status</th></tr></thead><tbody>");
            var print = $('#hdfprint').val();

            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var statuscolor = "info";
                var color = "orange";
                billdetail = "<a class='glyphicon glyphicon-print lnkselect' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                if (data.d[i].Statusclear == 'Account Clear')
                    color = successcolor;
                else
                    color = failcolor;

                billdetail = '';
                statuscolor = 'success';
                $("#gvbill").append("<tr style='background-color:" + color + "'><td>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td><td>" + data.d[i].BillNo + "</td>" +
                          "<td>" + data.d[i].UHID + "</td>" +
                         "<td >" + data.d[i].PatientName + "</td>" +
                         "<td >" + data.d[i].Mobile + "</td>" +
                         "<td >" + data.d[i].EmailID + "</td>" +
                         "<td >" + data.d[i].BillOpenDate + "</td>" +
                         "<td >" + data.d[i].NetAmount + "</td>" +
                         "<td >" + data.d[i].TotalPaidAmount + "</td>" +
                         "<td >" + data.d[i].Statusclear + "</td>" +
                         "</tr>");

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
        "iDisplayLength": -1,
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
