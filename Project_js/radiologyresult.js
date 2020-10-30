var ID = 0;
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $('#ddlresultstatus').prop('selectedIndex', 1);
    GetStructure();
    $(document).on('click', '#btnsaveresult', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        var Reporthtml = CKEDITOR.instances['txtradiologyresult'].getData();
        SaveReport(orderid, id, Reporthtml, 'FR');
        window.close('RadiologyReporting.aspx');

    });
    $(document).on('change', '#ddltemplate', function () {
        var helpid = $('#ddltemplate').val();
        GetHelpDetail(helpid);
    });
    $(document).on('click', '#btndeleteresult', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        DeleteResult(orderid, id);
        window.close('RadiologyReporting.aspx');

    });
    $(document).on('click', '#btnclose', function () {

        window.close('RadiologyReporting.aspx');

    });
   
});

function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
}
function BindAllComboBox() {
    BindCombo($("#ddltemplate"), "ddltemplate", ID);
    BindCombo($("#ddlresultstatus"), "ddlresultstatus", "RS");
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
            if (ControlName == "ddlresultstatus") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailCode).html(value.HeadDetailName));
                });
            } if (ControlName == "ddltemplate") {
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
function GetStructure() {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'RadiologyReporting.aspx/GetStructure',
        data: JSON.stringify({}),
        async: false,
        success: function (response) {
            debugger;
            CKEDITOR.instances['txtradiologyresult'].setData(response.d.Result);
            $('#txtuhid').val(response.d.UHID);
            $('#txtpatientname').val(response.d.PatientName);
            $('#txttestname').val(response.d.TestName);
            $('#txtdoctor').val(response.d.DoctorName);
            $('#txtmodilityno').val(response.d.ModilityNo);
            getserverdate1($('#txtresultdate'));
            ID = response.d.ItemID;
            $('#hdforderid').val(response.d.OrderID);
            $('#hdfid').val(response.d.RRID);
     //    alertify.log(response.d.ResultStatus);
            BindAllComboBox();
            $('#ddlresultstatus').val(response.d.ResultStatus);
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

function SaveReport(orderid, id, Reporthtml, code) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyReporting.aspx/SaveReporting",
        data: JSON.stringify({ OrderID: orderid, ID: id, ReportResult: Reporthtml, Code: code, Status: $('#ddlresultstatus').val() }),
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