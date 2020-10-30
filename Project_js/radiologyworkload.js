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
    $(document).on('click', '#chckvalidate', function () {
        var validate = $('#chckvalidate').is(':checked');
        var oid = $(this).data('orderid');
        validateOrder(validate, oid);
        BindGrid();
    });
    $(document).on('click', '.lnkselect', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        showResult(id, orderid);
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
        $('#ModalRadiologyResult').modal('show');
    });
});

function showResult(id, orderid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyWorkload.aspx/ShowDetail",
        data: JSON.stringify({ OrderID: orderid, RRID: id }),
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
function validateOrder(validate, oid) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'radiologyWorkload.aspx/validateOrder',
        data: JSON.stringify({ ID: oid, Validate: validate }),
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error("Some Error Occured !");
            else {
                alertify.success('Reporting Update Success');

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
function PrintReport(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'radiologyWorkload.aspx/PrintRadiologyBillByReport',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.error("Software Error Found !");
            } else {
                //   $('#radiologyreporting').modal('show');
                $('#gvreport').empty();
                $('#gvreport').append(response.d);
                PrintDivRadiology();
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
        url: "radiologyWorkload.aspx/GetWorkloadDetail",
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
        $("#gvradiologyreporting").empty();
        if (data.d.length > 0) {
            $('#gvradiologyreporting').append("<thead><tr><th>Validate</th><th>Action</th><th>Print</th><th>CentreName</th><th>UHID</th><th>PatientName</th><th>OrderNo</th><th>TestName</th><th>ModilityNo</th><th>DoctorName</th><th>Urgent</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' style='font-size: large;' data-result='" + data.d[i].Result + "'   data-doctor='" + data.d[i].DoctorName + "'  data-itemid='" + data.d[i].ItemID + "' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'></a>";
                var printdetail = "";
                var fillreporting = "";
                var reportvalidate = "";
                var urgent = (data.d[i].Urgent == true) ? 'Yes' : '';
                if (data.d[i].ResultStatus == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].ResultStatus == 'I')
                    fillreporting = '#ec39396b';
                else if (data.d[i].ResultStatus == 'C')
                    fillreporting = '#39ec3f6b';
                else if (data.d[i].ResultStatus == 'V') {
                    fillreporting = '#c839ec6b';
                    printdetail = "<a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-doctor='" + data.d[i].DoctorName + "'   data-itemid='" + data.d[i].ItemID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                } else if (data.d[i].ResultStatus == 'P') {
                    fillreporting = '#b3851d6b';
                    printdetail = "<a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-doctor='" + data.d[i].DoctorName + "'   data-itemid='" + data.d[i].ItemID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                }
                $("#gvradiologyreporting").append("<tr style='background-color:"+fillreporting+"'><td>" +
                    "<input  " + reportvalidate + " type='checkbox' id='chckvalidate' class='form-control' data-orderid='" + data.d[i].OrderID + "'   />" +
                    "</td><td>" + reportingdetail + "</td><td>" + printdetail + "</td>" +
                    "<td class='center'>" + data.d[i].CentreName + "</td>" +
                    "<td class='center'>" + data.d[i].UHID + "</td>" +
                    "<td class='center'>" + data.d[i].PatientName + "</td>" +
                    "<td class='center'>" + data.d[i].OrderNo + "</td>" +
                    "<td>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                    "<td class='center'>" + data.d[i].ModilityNo + "</td>" +
                    "<td class='center'>" + data.d[i].DoctorName + "</td><td>" + urgent + "</td>" +
                   "</tr>");
            }
            $('#gvradiologyreporting').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvradiologyreporting").append("<thead><tr><th>Radiology List</th></tr></thead>");
            $("#gvradiologyreporting").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvradiologyreporting').dataTable({
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