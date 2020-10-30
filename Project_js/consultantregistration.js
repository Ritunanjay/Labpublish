
$(document).ready(function () {
    PermissionDetail();
    ClearRecord();
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $(document).on('click', '.lnkcompliment', function () {
        $('#ModalDoctorCompliment').modal('show');
        var docid = $(this).data('id');
        GetDoctorCompliment(docid);
    });
    $(document).on('click', '#addcompliment', function () {
        SaveCompliment();
        $('#ModalDoctorCompliment').modal('hide');
    });
    $(document).on("click", ".lnkispercentage", function () {
        var gid = $(this).data('gid');
        var did = $(this).data('did');
        var ispercentage = $(this).is(":checked");
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
         
        ChangeCompliment(gid, did, "IsPercentage", ispercentage, rowindex)
    });
    $(document).on('change', '#ddlaccountpost', function () {
        if ($('#ddlaccountpost').val() == "false") {
            $('#ddlaccounttype').attr('disabled', 'disabled');
        }
        else {
            $('#ddlaccounttype').removeAttr('disabled');
          
        }
    });
    $(document).on("change", ".lnkpercentage", function () {
        var gid = $(this).data('gid');
        var did = $(this).data('did');
        var percentage = $(this).val();
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        ChangeCompliment(gid, did, "Percentage", percentage, rowindex)

    });
    $(document).on("change", ".lnkrate", function () {
        var gid = $(this).data('gid');
        var did = $(this).data('did');
        var rate = $(this).val();
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        ChangeCompliment(gid, did, "Rate", rate, rowindex)

    });
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetCentreByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        var navid = $(this).data("id");
        DeleteCentreByID(navid);
    });
    $(document).on('change', '#ddlstate', function () {
        BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#ddlcity', function () {
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('click', '#btnfilesign', function () {
        if ($('#hdfconsultantid').val() == "0")
            alertify.error('Please Select Consultant');
        else
            sendFile($('#txtcode').val());
    });
    $(document).on('change', '#txtcode', function () {
        if ($('#txtcode').val() != "") {
            var code = $('#txtcode').val();
            var path = "ConsultationRegistration.aspx/CodeExist";
            var status = "";
            CodeAvailable(code, path);
        }
    });
    $(document).on('change', '#txtemailid', function () {
        checkEmailID($('#txtemailid'));
    });
    $(document).on('change', '#txtmobile', function () {
        check($('#txtmobile'));
    });
    $(document).on('change', '#txtresidencecontact', function () {
        check($('#txtresidencecontact'));
    });
    $(document).on('change', '#txtsmsmobile', function () {
        check($('#txtsmsmobile'));
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteConsultant(id);
                BindGrid();
            }
        }
    });
    $("#ddlcentre").focus();
});


function SaveCompliment() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ConsultationRegistration.aspx/SaveCompliment",
        data: JSON.stringify({  }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0") {
                alertify.success(response.d.MessageName);
               
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
                alert(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function DeleteConsultant(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ConsultationRegistration.aspx/DeleteConsultant",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0") {
                alertify.success(response.d.MessageName);
                BindGrid();
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
                alert(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function sendFile(uhid) {
    var fp = $("#filesign").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', 'Doctor/' + $('#txtcode').val());
    formData.append('ID', $('#txtcode').val());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            UpdateDoctorSign(status);
        },
        processData: false,
        contentType: false,
        error: function () {
            alertify.error("Whoops something went wrong!");
        }
    });
}
function UpdateDoctorSign(location) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'ConsultationRegistration.aspx/UpdateDoctorSign',
        data: JSON.stringify({ logopath: location, DoctorID: $('#hdfconsultantid').val() }),
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.error('Software Error');
            }
            else {
                alertify.success('Sign Upload Successfully');
                $("#filesign").val('');
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
function BindAllComboBox() {
    BindCombo($("#ddlstate"), "ddlstate");
    BindCombo($("#ddlcentre"), "ddlcentre");
    BindCombo($("#ddldepartment"), "ddldepartment");
    BindCombo($("#ddlconsultanttype"), "ddlconsultanttype");
    BindCombo($("#ddlspecialization"), "ddlspecialization");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Consultationregistration.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlstate") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.StateID).html(value.StateName));
                });
            } if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddldepartment") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DepartmentID).html(value.DepartmentName));
                });
            } if (ControlName == "ddlconsultanttype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlspecialization") {
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
function GetCentreByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Consultationregistration.aspx/GetConsultantByID",
        data: JSON.stringify({ ID: id }),
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
                alert(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function DeleteCentreByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Consultationregistration.aspx/DeleteConsultantByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0")
                alertify.success(response.d.MessageName)
            else
                alertify.error(response.d.MessageName)
            BindGrid();

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
function setValues(response) {

    $('#hdfconsultantid').val(response.d.DoctorID);
    $('#txtcode').val(response.d.DoctorCode);
    $('#txtconsultantname').val(response.d.DoctorName);
    $('#ddldepartment').val(response.d.DepartmentID);
    $('#ddlconsultanttype').val(response.d.DoctorTypeID);
    $('#ddlcentre').val(response.d.CentreID);
    $('#txtqualification').val(response.d.Qualification);

    $('#ddlspecialization').val(response.d.SpecializationID);
    $('#txtclinicnumber').val(response.d.ClinicPhone);
    $('#txtmobile').val(response.d.Mobile);
    $('#txtresidencecontact').val(response.d.ResidensePhone);
    $('#txtlicenseno').val(response.d.LicenseNo);
    $('#txtaddress').val(response.d.Address);
    $('#txtemailid').val(response.d.EmailID);
    $('#ddlotconsultant').val(response.d.IsOTDoctor.toString());
    $('#ddlopdconsultant').val(response.d.IsOPD.toString());
    $('#ddlratelist').val(response.d.IsRateList.toString());
    $('#ddlipdconsultant').val(response.d.IsIPD.toString());
    $('#txtvaliddays').val(response.d.ValidityDays);
    $('#ddlaccountpost').val(response.d.AccountPost.toString());
    $('#ddlaccounttype').val(response.d.AccountPostType);
    //$('#txtvisitno').val('0');
    //$('#txtroomno').val(response.d.OPDRoomId);
    //$('#txtopdlimit').val(response.d.OPDLimit);

    $('#ddlipdshowonbill').val(response.d.IPDShowOnBill.toString());
    // $('#filephoto').val(response.d.Photo);
    $('#ddlallowsign').val(response.d.IsAllowSign.toString());
    // $('#filesign').val();
  $('#txtsmsmobile').val(response.d.SMSMobileNo);
    //$('#ddlstate').val(response.d.StateID);
    //$('#ddlcity').val(response.d.CityID);
    //$('#ddlarea').val(response.d.AreaID);
    $('#ddlstate').val(response.d.StateID);
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    $('#ddlcity').val(response.d.CityID);
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#ddlarea').val(response.d.AreaID);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Physician");
}
function Save() {
    if ($("#ddlcentre").val() == "0" || $("#ddlcentre").val() == null) {
        alertify.log("Please Select Centre/Franchise First .");
        $("#ddlcentre").focus();
        return false;
    } if ($("#ddldepartment").val() == "0" || $("#ddldepartment").val() == null) {
        alertify.log("Please Select Department First .");
        $("#ddldepartment").focus();
        return false;
    }
    if ($("#txtcode").val() == "") {
        alertify.log("Physician Code is required.");
        $("#txtcode").focus();
        return false;
    } if ($("#txtconsultantname").val() == "") {
        alertify.log("Physician Name is required.");
        $("#txtconsultantname").focus();
        return false;
    }  if ($("#txtmobile").val() == "") {
        alertify.log("Mobile is required.");
        $("#txtmobile").focus();
        return false;
    } if ($("#txtemailid").val() == "") {
        alertify.log("EmailID is required.");
        $("#txtemailid").focus();
        return false;
    } if ($("#txtqualification").val() == "") {
        alertify.log("Qualification is required.");
        $("#txtqualification").focus();
        return false;
    }
    if ($("#txtaddress").val() == "") {
        alertify.log("Address is required.");
        $("#txtaddress").focus();
        return false;
    }

    var obj = {};
    obj.DoctorID = $('#hdfconsultantid').val();
    obj.DoctorCode = $('#txtcode').val();
    obj.DoctorName = $('#txtconsultantname').val();
    obj.DepartmentID = $('#ddldepartment').val();
    obj.DoctorTypeID = $('#ddlconsultanttype').val();
    obj.CentreID = $('#ddlcentre').val();
    obj.Qualification = $('#txtqualification').val();
    obj.SpecializationID = $('#ddlspecialization').val();
    obj.ClinicPhone = $('#txtclinicnumber').val();
    obj.Mobile = $('#txtmobile').val();
    obj.ResidensePhone = $('#txtresidencecontact').val();
    obj.LicenseNo = $('#txtlicenseno').val();
    obj.Address = $('#txtaddress').val();
    obj.EmailID = $('#txtemailid').val();
    obj.IsOTDoctor = $('#ddlotconsultant').val();
    obj.IsOPD = $('#ddlopdconsultant').val();
    obj.IsIPD = $('#ddlipdconsultant').val();
    obj.IsRateList = $('#ddlratelist').val();
    obj.ValidityDays = $('#txtvaliddays').val();
    obj.NoVisit = $('#txtvisitno').val();
    obj.OPDRoomId = $('#txtroomno').val();
    obj.OPDLimit = $('#txtopdlimit').val();
    obj.IPDShowOnBill = $('#ddlipdshowonbill').val();
    obj.StateID = $('#ddlstate').val();
    obj.CityID = $('#ddlcity').val();
    obj.AreaID = $('#ddlarea').val();
    obj.Photo = $('#filephoto').val();
    obj.IsAllowSign = $('#ddlallowsign').val();
    obj.SignPhoto = $('#filesign').val();
    obj.SMSMobileNo = $('#txtsmsmobile').val();
    obj.Active = $('#ddlstatus').val();

    obj.AccountPost= $('#ddlaccountpost').val();
    obj.AccountPostType=  $('#ddlaccounttype').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Consultationregistration.aspx/Save',
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
                alert(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });
}
function ClearRecord() {
    $('#hdfconsultantid').val('0');
    $('#txtcode').val('');
    $('#txtconsultantname').val('');
    $('#ddldepartment').val('');
    $('#ddlconsultanttype').val('');
    $('#ddlcentre').val('');
    $('#txtqualification').val('');

    $('#ddlspecialization').val('');
    $('#txtclinicnumber').val('');
    $('#txtmobile').val('');
    $('#txtresidencecontact').val('');
    $('#txtlicenseno').val('');
    $('#txtaddress').val('');
    $('#txtemailid').val('');
    $('#ddlotconsultant').val('false');
    $('#ddlopdconsultant').val('false');
    $('#ddlipdconsultant').val('false');
    $('#txtvaliddays').val('0');
    $('#txtvisitno').val('0');
    $('#txtroomno').val('0');
    $('#txtopdlimit').val('0');

    $('#ddlipdshowonbill').val('false');
    $('#filephoto').val('');
    $('#ddlallowsign').val('false');
    $('#filesign').val('');
    $('#txtsmsmobile').val('');
    $('#ddlstate').val('');
    $('#ddlcity').val('');
    $('#ddlarea').val('');
    BindAllComboBox(); BindGrid();

    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Physician");
    $("#ddlcentre").focus();
    if ($('#ddlaccountpost').val() == "false") {
        $('#ddlaccounttype').attr('disabled', 'disabled');
    }
    else {
        $('#ddlaccounttype').removeAttr('disabled');

    }
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Consultationregistration.aspx/GetConsultantDetail",
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
        $("#gv").empty();
        if (data.d.length > 0) {
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Physician</th><th>Qualification</th><th>Mobile</th><th>LicenseNo</th><th>Address</th><th>Reporting</th><th>Outsider</th><th>RateList</th><th>Status</th><th>Sign</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                var ratelist = (data.d[i].IsRateList == false) ? 'Not Apply' : 'Apply';
                var Reporting = (data.d[i].IsOTDoctor == false) ? 'No' : 'Yes';
                var outsider = (data.d[i].IsOPD == false) ? 'No' : 'Yes';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                                "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].DoctorID + "' href='javascript:void();'> Edit</a>" +
                                " </div> </li>" +
                                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].DoctorID + "' href='javascript:void();'> Delete</a>" +
                                " </div> </li>" +
                               "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkcompliment' data-id='" + data.d[i].DoctorID + "' href='javascript:void();'> Compliment</a>" +
                                " </div> </li>" +
                                "</ul></div></td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].DoctorCode + " | " + data.d[i].DoctorName + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].Qualification + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].Mobile + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].LicenseNo + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].Address + "</td>" +
                                "<td class='" + activecolor + "'>" + Reporting + "</td>" +
                                "<td class='" + activecolor + "'>" + outsider + "</td>" +
                                "<td class='" + activecolor + "'>" + ratelist + "</td>" +
                                "<td class='" + activecolor + "'>" + active + "</td>"+
                "<td class='" + activecolor + "'><img src='../../Doctor/" + data.d[i].SignPhoto.split('.')[0]+"/" + data.d[i].SignPhoto + "' style='width: 60px;height: 30px;' /></td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Physician List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gv').dataTable({
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


function GetDoctorCompliment(docid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Consultationregistration.aspx/GetDoctorComplimentDetail",
        data: JSON.stringify({ DoctorID: docid }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        onRequest: function () {
            alertify.log('loading');
        },
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
        $("#gvcompliment").empty();
        if (data.d.length > 0) {
            $("#gvcompliment").append("<thead><tr><th>Doctor Detail</th><th>Group Detail</th><th>IsPercentage</th><th>Percentage</th><th>Rate</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var ispercentage = (data.d[i].IsPercentage == true) ? "checked" : "";
                 $("#gvcompliment").append("<tr>"+
                                "<td>" + data.d[i].DoctorCode + " | " + data.d[i].DoctorName + "</td>" +
                                "<td>" + data.d[i].GroupCode + " | " + data.d[i].GroupName + "</td>" +
                                "<td><input data-gid='" + data.d[i].GroupID + "' data-did='" + data.d[i].DoctorID + "' " + ispercentage + " onfocus='allownumericwithoutdecimal(this);' type='checkbox' class='form-control lnkispercentage' value='" + ispercentage + "' /></td>" +
                                "<td><input data-gid='" + data.d[i].GroupID + "' data-did='" + data.d[i].DoctorID + "'  onfocus='allownumericwithoutdecimal(this);' type='text'  value='" + data.d[i].Percentage + "' class='form-control lnkpercentage' /><label style='display:none'>'" + ispercentage + "'</label></td>" +
                                "<td><input data-gid='" + data.d[i].GroupID + "' data-did='" + data.d[i].DoctorID + "' onfocus='allownumericwithoutdecimal(this);'  type='text' value='" + data.d[i].Rate + "' class='form-control lnkrate' /></td>" +
                            "</tr>");
            }
             $("#gvcompliment").append("</tbody>");
           Initializecompliment();
        }
        else {
            $("#gvcompliment").append("<thead><tr><th>Doctor Compliment List</th></tr></thead>");
            $("#gvcompliment").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initializecompliment() {
    $('#gvcompliment').dataTable({
        "iDisplayLength": -1,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": true, "targets": [1] }],
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

function ChangeCompliment(gid,did,type,value,index) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ConsultationRegistration.aspx/ChangeCode",
        data: JSON.stringify({ Type: type ,DoctorID:did,GroupID:gid,Value:value,index:index}),
        dataType: "json",
        async: false,
        success: function (response) {
            //if (response.d.MessageID != "0") {
            //   // alertify.success(response.d.MessageName);
            //    BindGrid();
            //}
            //else
            //    alertify.error(response.d.MessageName);
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