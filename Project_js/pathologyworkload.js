$(document).ready(function () {
    PermissionDetail();
    $(document).on('keydown', '#txtpatientfilter', function () {
        BindGrid();
    });
    $(document).on('change', '#txtfromdate', function () {
        BindGrid();
    });
    $(document).on('change', '#txttodate', function () {
        BindGrid();
    });
    $(document).on('change', '#txtpatientfilter', function () {
        BindGrid();
    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    cleardetail();
    window.setInterval(function () {
        BindGrid();
    }, 10000);
    $(document).on('click', '.lnkselect', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        var itemid = $(this).data("itemid");
        var test = $(this).data("test");
        var doctor = $(this).data("doctor");
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        ShowStructure(orderid, itemid);
        //GetStructure(orderid, itemid)
        $('#hdforderid').val(orderid);
        $('#hdfid').val(id);
    });
    $(document).on('click', '.lnkprint', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        $('#hdforderid').val(orderid);
        $('#hdfid').val(id);
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        PrintReport(orderid);
    });
    $(document).on('click', '#chckvalidate', function () {
        var orderid = $(this).data('orderid');
        var status = $(this).is(':checked');
        ReportValidate(orderid, status);
    });
});
function ReportValidate(orderid, status) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyWorkload.aspx/ReportValidate',
        data: JSON.stringify({ OrderID: orderid, Status: status }),
        async: false,
        success: function (response) {
            if (response.d == "Error")
                alertify.error("Software Error Found !");
            else
                alertify.success("Validate Done!");
            // window.open(response.d, '_blank');
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

function PrintReport(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyWorkload.aspx/PrintPathologyBillByReport',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error("Access Denied!");
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
function ShowStructure(orderid, itemid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyWorkload.aspx/ShowDetail",
        data: JSON.stringify({ OrderID: orderid, ItemID: itemid }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            window.open(response.d, 'popUpPage', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',scrollbars=yes,toolbar=no,left=0');

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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyWorkload.aspx/GetWorkloadDetail",
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
        $("#gvpathology").empty();
        if (data.d.length > 0) {
            $('#gvpathology').append("<thead><tr><th>Validate</th><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Print</th><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>OrderNo</th><th>TestName</th><th>SampleNo</th><th>SampleName</th><th>DoctorName</th><th>TAT Timer</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var fillreporting = '';
                var printdetail = '';
                var reportvalidate = '';
                var timer;
                timer = data.d[i].TATTimer;
                if (data.d[i].BookingStatus == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].BookingStatus == 'I')
                    fillreporting = '#ec39396b';
                else if (data.d[i].BookingStatus == 'C') {
                    fillreporting = '#39ec3f6b';
                    timer = 'Test Fill Done';
                } else if (data.d[i].BookingStatus == 'V') {
                    fillreporting = '#c839ec6b';
                    printdetail = "<a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-doctor='" + data.d[i].DoctorName + "'   data-itemid='" + data.d[i].ItemID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                } else if (data.d[i].BookingStatus == 'P') {
                    fillreporting = '#b3851d6b';
                    printdetail = "<a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-doctor='" + data.d[i].DoctorName + "'   data-itemid='" + data.d[i].ItemID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                }

              var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' style='font-size: large;'   data-doctor='" + data.d[i].DoctorName + "'  data-itemid='" + data.d[i].ItemID + "' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'></a>";
                $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                     "<td><input type='checkbox'  class='form-control' id='chckvalidate' " + reportvalidate + " data-orderid='" + data.d[i].OrderID + "' /></td>" +
                     "  <td>" + reportingdetail + "</td><td>" + printdetail + " </td>" +
                         "<td>" + data.d[i].Code + "|" + data.d[i].CentreName + "</td>" +
                         "<td>" + data.d[i].UHID + "</td>" +
                         "<td>" + data.d[i].PatientName + "</td>" +
                         "<td>" + data.d[i].Mobile + "</td>" +
                         "<td>" + data.d[i].EmailID + "</td>" +
                         "<td>" + data.d[i].OrderNo + "</td>" +
                         "<td>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                         "<td>" + data.d[i].SampleNo + "</td>" +
                        "<td>" + data.d[i].SampleName + "</td>" +
                         "<td>" + data.d[i].DoctorName + "</td>" +
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
function cleardetail() {
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');

}