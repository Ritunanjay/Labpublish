
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $('#txtestablishmentdate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('keyup', '#txtcompanycut', function () {
     
        if ($("#txtcompanycut").val() == "" || $("#txtcompanycut").val() <= 0 || isNaN($("#txtcompanycut").val()))
            $("#txtcompanycut").val("0");
        else
            if ($("#txtcompanycut").val().substring(0, 1) == '0') $("#txtcompanycut").val($("#txtcompanycut").val().substring(1));
        if ($("#txtcompanycut").val() > 100) {
            alertify.log('Percentage should not be greater than 100');
            $("#txtcompanycut").val('0');
        }
        if ($("#txtcompanycut").val() == "")
            $("#txtcompanycut").val("0");

    });
    getserverdate1($("#txtestablishmentdate"));
    $(document).on('change', '#ddlstate', function () {
        BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#ddlcity', function () {
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());

    CompanyDetail();
    $(document).on('click', '#btnfileupdate', function () {
        sendFile($('#txtcode').val());
       
    });
});
function ClearRecord() {
    CompanyDetail();
}
function BindAllComboBox() {
    BindCombo($("#ddlstate"), "ddlstate", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CompanyDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlstate") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.StateID).html(value.StateName));
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
                alertify.error(responseText.Message);
            }
        }
    });
}
function CompanyDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CompanyDetail.aspx/CompanyDetailInfo",
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            setValues(response);
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.error(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alertify.error(response.d);
        }
    });

}
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}

function setValues(response) {
    debugger;
    $('#hdfcompanyid').val(response.d.CompanyID);
    $('#txtlicenseno').val(response.d.LicenseNo);
    $('#txtcode').val(response.d.CompanyCode);
    $('#txtname').val(response.d.CompanyName);
    $('#txtownername').val(response.d.OwnerName);
    $('#txtdegree').val(response.d.Degree);
    $('#txtphone').val(response.d.Phone);
    $('#txtmobile').val(response.d.Mobile);
    $('#txtemergencymobile').val(response.d.EmergencyMobile);
    $('#txtaddress').val(response.d.Address);
    $('#txtemailid').val(response.d.EmailID);
    $('#txtwebsite').val(response.d.Website);
    $('#txttagline').val(response.d.TagLine);
    $('#ddlregtype').val(response.d.RegType.toString());
    $('#txtsoftwarename').val(response.d.SoftwareName);
    $('#txtestablishmentdate').val(response.d.EstablishmentDate);
    $('#txtfirmregno').val(response.d.FirmRegNo);
    $('#txtpan').val(response.d.PAN);
    $('#txttaxdeductionno').val(response.d.TaxDeductionacno);
    $('#txtcontactpersonname').val(response.d.contactPersonname);
    $('#txtdaysdivided').val(response.d.Noofdaystodivide);
    $('#txtminageofjoining').val(response.d.Minageofjoining);
    $('#txtmaxageretirement').val(response.d.Maxageofretirement);
    $('#txtprincipal').val(response.d.principalofficername);
    $('#txtdesignation').val(response.d.Designation);
  //  $('#filelogo').val(response.d.CompanyLogo);
    $('#ddlstate').val(response.d.StateID);
    $('#companylogo').attr('src', '../../' + response.d.CompanyLogo.split('.')[0]+'/'+response.d.CompanyLogo);
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    $('#ddlcity').val(response.d.CityID);
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#ddlarea').val(response.d.CountryID);
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Update Company Detail");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {

    var obj = {};
    obj.CompanyID = $('#hdfcompanyid').val();
    obj.LicenseNo = $('#txtlicenseno').val();
    obj.CompanyCode = $('#txtcode').val();
    obj.CompanyName = $('#txtname').val();
    obj.OwnerName = $('#txtownername').val();
    obj.Degree = $('#txtdegree').val();
    obj.Phone = $('#txtphone').val();
    obj.Mobile = $('#txtmobile').val();
    obj.EmergencyMobile = $('#txtemergencymobile').val();
    obj.Address = $('#txtaddress').val();
    obj.CountryID = $('#ddlarea').val();
    obj.StateID = $('#ddlstate').val();
    obj.CityID = $('#ddlcity').val();
    obj.EmailID = $('#txtemailid').val();
    obj.Website = $('#txtwebsite').val();
    obj.TagLine = $('#txttagline').val();
    obj.RegType = $('#ddlregtype').val();
    obj.SoftwareName = $('#txtsoftwarename').val();
    obj.EstablishmentDate = ($('#txtestablishmentdate').val() == "") ? "01/01/1990" : $('#txtestablishmentdate').val();
    obj.FirmRegNo = $('#txtfirmregno').val();
    obj.PAN = $('#txtpan').val();
    obj.TaxDeductionacno = $('#txttaxdeductionno').val();
    obj.contactPersonname = $('#txtcontactpersonname').val();
    obj.Noofdaystodivide = ($('#txtdaysdivided').val() == "") ? "0" : $('#txtdaysdivided').val();
    obj.Minageofjoining = ($('#txtminageofjoining').val() == "") ? "0" : $('#txtminageofjoining').val();
    obj.Maxageofretirement = ($('#txtmaxageretirement').val() == "") ? "0" : $('#txtmaxageretirement').val(); 
    obj.principalofficername = $('#txtprincipal').val();
    obj.Designation = $('#txtdesignation').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'CompanyDetail.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearRecord();
            }
            else
                alertify.error(response.d.MessageName);
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.error(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alertify.error(response.d);
        }
    });
}

function sendFile(uhid) {
    var fp = $("#filelogo").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', $('#txtcode').val());
    formData.append('ID',$('#txtcode').val());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            UpdateCompanyLogo(status);
        },
        processData: false,
        contentType: false,
        error: function () {
            alertify.error("Whoops something went wrong!");
        }
    });
}
function UpdateCompanyLogo(location)
{
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'CompanyDetail.aspx/UpdateCompanyLogo',
        data: JSON.stringify({ logopath: location }),
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.error('Software Error');
            }
            else {
                alertify.success('Logo Upload Successfully');
                $("#filelogo").val('');
                CompanyDetail();
            }
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.error(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alertify.error(response.d);
        }
    });
}