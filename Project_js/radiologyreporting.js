$(document).ready(function () {
    PermissionDetail();
    BindGrid();
    $(document).on('click', '#btndeleteresult', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        DeleteResult(orderid, id);
        cleardetail();
    });
    $(document).on('click', '#chckvalidate', function () {
        var validate = $('#chckvalidate').is(':checked');
        var oid = $(this).data('orderid');
        validateOrder(validate, oid);
        BindGrid();
    });
    $(document).on('change', '#ddltemplate', function () {
        var helpid = $('#ddltemplate').val();
        GetHelpDetail(helpid);
    });
    $(document).on('click', '#btnsaveresult', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        var Reporthtml = CKEDITOR.instances['txtradiologyresult'].getData();
        SaveReport(orderid, id, Reporthtml, 'FR');
        cleardetail();
    });
    $(document).on('click', '#btnvalidsaveresult', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        var Reporthtml = CKEDITOR.instances['txtradiologyresult'].getData();
        SaveReport(orderid, id, Reporthtml, 'FRV');
        cleardetail();
    });
    $(document).on('click', '.lnkselect', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        var itemid = $(this).data("itemid");
        var test = $(this).data("test");
        var doctor = $(this).data("doctor");
        var result = $(this).data("result");
        if (result != "") {
            $('#btnsaveresult').val('Update Report');
            $('#btnsaveresult').removeClass("btn btn-success btn-md");
            $('#btnsaveresult').addClass("btn btn-warning btn-md");

        }
        CKEDITOR.instances['txtradiologyresult'].setData(result);
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        $('#ModalReporting').modal('show');
        $('#txtuhid').val(uhid);
        $('#txtpatientname').val(patientname);
        $('#txttestname').val(test);
        $('#txtdoctorname').val(doctor);
        BindAllComboBox(itemid);
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
});

function DeleteResult(orderid, id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'RadiologyReporting.aspx/DeleteResult',
        data: JSON.stringify({ ID: id, OrderID: orderid }),
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error("Some Error Occured !");
            else {
                alertify.success("Save Done!");

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
function validateOrder(validate,oid)
{
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'RadiologyReporting.aspx/validateOrder',
        data: JSON.stringify({ ID: oid,Validate:validate }),
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
        url: 'RadiologyReporting.aspx/PrintRadiologyBillByReport',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error("Some Error Occured !");
            else {
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
function SaveReport(orderid, id, Reporthtml, code) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyReporting.aspx/SaveReporting",
        data: JSON.stringify({ OrderID: orderid, ID: id, ReportResult: Reporthtml, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (code == 'FR')
                alertify.success('Report Save Success');
            else
                alertify.success('Report Save & Validate Success');
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
function GetHelpDetail(helpid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyReporting.aspx/GetHelpDetail",
        data: JSON.stringify({ HelpID: helpid }),
        dataType: "json",
        async: false,
        success: function (data) {
            CKEDITOR.instances['txtradiologyresult'].setData(data.d.MessageName);

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
function BindAllComboBox(ID) {
    BindCombo($("#ddltemplate"), "ddltemplate", ID);
}
function BindCombo(ele, ControlName, ID) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyReporting.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: ID }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddltemplate") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
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
        url: "RadiologyReporting.aspx/GetWorkloadDetail",
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
        $("#gvradiologyreporting").empty();
        if (data.d.length > 0) {
            $('#gvradiologyreporting').append("<thead><tr><th style='width:15px' class='center'>Validate</th><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Print</th><th>CentreName</th><th>UHID</th><th>PatientName</th><th>OrderNo</th><th>TestName</th><th>ModilityNo</th><th>DoctorName</th><th>Urgent</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var fillreporting = (data.d[i].Status == 0) ? 'red' : 'green';
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' style='font-size: large;' data-result='" + data.d[i].Result + "'   data-doctor='" + data.d[i].DoctorName + "'  data-itemid='" + data.d[i].ItemID + "' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'></a>";
                var printdetail = (data.d[i].VerifiedStatus != false) ? " " : "";
                var urgent = (data.d[i].Urgent != true) ? 'No' : 'Yes';
                var color = (data.d[i].Urgent != true) ? '' : 'yellow';
                var  validatecheckbox = (data.d[i].VerifiedStatus != false) ? "checked" : "";
                    $("#gvradiologyreporting").append("<tr style='color:" + fillreporting + "'><td>" +
                        "<input type='checkbox' id='chckvalidate' class='form-control' "+validatecheckbox+"  data-orderid='" + data.d[i].OrderID + "'  />" +
                        "</td><td>" +
                        "" + reportingdetail + "" +
                        "</td><td>" + printdetail + " " +
                        " </td>" +
                        "<td class='center'>" + data.d[i].CentreName + "</td>" +
                        "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + "</td>" +
                        "<td class='center'>" + data.d[i].OrderNo + "</td>" +
                        "<td>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                        "<td class='center'>" + data.d[i].ModilityNo + "</td>" +
                        "<td class='center'>" + data.d[i].DoctorName + "</td>" +
                         "<td class='center' style='background-color:" + color + "'>" + urgent + "</td>" +
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
    CKEDITOR.instances['txtradiologyresult'].setData('');
    $('#ModalReporting').modal('hide');
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');
    $('#txtuhid').val('');
    $('#txtpatientname').val('');
    $('#txttestname').val('');
    $('#txtdoctorname').val('');
}