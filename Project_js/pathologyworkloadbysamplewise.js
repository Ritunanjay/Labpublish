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
    $(document).on('click', '.lnkselect', function () {
        var billid = $(this).data('billid');
        var sampleid = $(this).data('sampleid');
        ShowStructure(billid, sampleid);

    });
    $(document).on('click', '.lnkprint', function () {
        var BillID = $(this).data('billid');
        var sampleid = $(this).data('sampleid');
        PrintReport(BillID, sampleid);
    });
    window.setInterval(function () {
        BindGrid();
    }, 10000);
    $(document).on('click', '#chckvalidate', function () {
        var billid = $(this).data('billid');
        var sampleid = $(this).data('sampleid');
        var status = $(this).is(':checked');
        ReportValidate(billid, status, sampleid);
    });
    cleardetail();
});
function ReportValidate(billid, status, sampleid) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyWorkloadBySampleWise.aspx/ReportValidate',
        data: JSON.stringify({ BillID: billid, Status: status, SampleID: sampleid }),
        async: false,
        success: function (response) {
            if (response.d != "")
                alertify.error("Report Validate Not Permitted !");
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
function PrintReport(id, sampleid) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyWorkloadBySampleWise.aspx/PrintPathologyBillByReport',
        data: JSON.stringify({ ID: id, SampleID: sampleid }),
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
function ShowStructure(billid, sampleid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyWorkloadBySampleWise.aspx/ShowDetail",
        data: JSON.stringify({ BillID: billid, SampleID: sampleid }),
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
        url: "PathologyWorkloadBySampleWise.aspx/GetWorkloadDetail",
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
            $('#gvpathology').append("<thead><tr><th style='width:15px' class='center'>Validate</th><th style='width:15px' class='center'>Select</th>" +
                "<th style='width:15px' class='center'>Print</th><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>TestList</th><th>SampleName</th><th>SampleNo</th><th>Bill Date</th><th>DoctorName</th><th>TATTimer</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var fillreporting = '';
                var printdetail = '';
                var reportvalidate = '';
                var timer;
                timer = data.d[i].TATTimer;
                if (data.d[i].Recheck == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].Recheck == 'I')
                    fillreporting = '#ec39396b';
                else if (data.d[i].Recheck == 'C') {
                    fillreporting = '#39ec3f6b';
                    timer = 'Test Success Done';
                } else if (data.d[i].Recheck == 'V') {
                    fillreporting = '#c839ec6b';
                    printdetail = "<a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "' data-sampleid='" + data.d[i].SampleID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    reportvalidate = "checked";

                    timer = 'Test Validate Done';
                } else if (data.d[i].Recheck == 'P') {
                    fillreporting = '#b3851d6b';
                    printdetail = "<a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "' data-sampleid='" + data.d[i].SampleID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                } var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' data-billid='" + data.d[i].BillID + "' data-sampleid='" + data.d[i].SampleID + "' style='font-size: large;' href='javascript:void();'></a>";
                var testlist = data.d[i].TestList.replace('<br>', '');
                testlist = testlist.replace('<br>', '');
                testlist = testlist.replace('<br>', '');
                testlist = testlist.replace('<br>', '');
                testlist = testlist.replace('<br>', '');
                $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'><td><input type='checkbox'  class='form-control' id='chckvalidate' " + reportvalidate + " data-billid='" + data.d[i].BillID + "' data-sampleid='" + data.d[i].SampleID + "'  /></td><td>" +
                        "" + reportingdetail + "" +
                        "</td><td>" + printdetail + " " +
                        " </td>" +
                        "<td>" + data.d[i].CentreName.split('|')[0] + "</td>" +
                        "<td>" + data.d[i].UHID + "</td>" +
                        "<td>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                        "<td>" + data.d[i].Mobile + "</td>" +
                        "<td>" + data.d[i].EmailID + "</td>" +
                        "<td>" + data.d[i].BillNo + "</td>" +
                        "<td>" + testlist + "</td>" +
                        "<td>" + data.d[i].SampleName + " " +
                        " </td><td>" + data.d[i].SampleNo + " " +
                        " </td>" +
                        "<td>" + data.d[i].BillOpenDate + "</td>" +
                      // "<td>" + data.d[i].BloodGroup + "</td>" +
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
        "paging": false,
        "processing": true,
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