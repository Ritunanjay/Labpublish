$(document).ready(function () {
    PermissionDetail();
    ClearRecord();
    $('#ddltitle').prop('selectedIndex', 1);
    getgenderdetail();
    $('#txtdateofleaving,#txtdob,#txtdoj,#txtesidleavingdate,#txtvpfleavingdate,#txtpfleavingdate,#txtdlexpiry,#txtvisexpiry,#txtpassportexpiry,#txtanniversary').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('change', '#ddlstate', function () {
        BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    });
    $(document).on('change', '#ddlcity', function () {
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#ddltitle', function () {
        getgenderdetail();
    });
    $(document).on("click", "#btnadd", function () {
        CheckJoining();

    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetUserByID(navid);
    });
    $(document).on("click", "#btnaddfingureprint", function () {
        GetInfo();
    });
    $(document).on("click", "#btnupdatefingure", function () {
        UpdateFingure();
        BindGrid();
    });
    $(document).on("click", "#btnprintPrevious", function () {
        if ($("#hdfuserid").val() == "0") {
            alertify.log("Please Select User First.");
            return false;
        }

        $('#FingurePrintModal').modal('show');
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteUser(id);
                BindGrid();
            }
        }
    });
    $('#ddlusertype').focus();
    $(document).on('change', '#txtemail', function () {
        checkEmailID($('#txtemail'));
        if ($('#txtemail').val() != "")
            $('#txtofficialemailid').val($('#txtemail').val());
    });
    $(document).on('change', '#ddldoctor', function () {
        var doctorid = $('#ddldoctor :selected').val();
        if (doctorid != "0")
            GetDoctorByID(doctorid);
        else
            ClearRecord();
    });
});

function GetDoctorByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/GetDoctorByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            setDoctorValues(response);
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
function setDoctorValues(response) {
    $('#txtloginname').val(response.d.DoctorCode)
    $('#txtpassword').val(response.d.DoctorCode)
    $('#txtusername').val(response.d.DoctorName);
    $('#ddlcentre').val(response.d.CentreID);
    $('#txtmobile').val(response.d.Mobile);
    $('#txtaddress').val(response.d.Address);
    $('#txtemail').val(response.d.EmailID);
    $('#txtofficialemailID').val(response.d.EmailID);
    $('#ddlstate').val(response.d.StateID);
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    $('#ddlcity').val(response.d.CityID);
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#ddlarea').val(response.d.AreaID);

}

function setValues(response) {
    $('#hdfuserid').val(response.d.UserID);
    $('#ddlrole').val(response.d.RoleID);
    $('#txtusername').val(response.d.FullName);
    $('#ddltitle').val(response.d.Title);
    $('#ddlgender').val(response.d.Gender);
    $('#ddlstateid').val(response.d.StateID);
    $('#ddlcityid').val(response.d.CityID);
    $('#ddlareaid').val(response.d.AreaID);
    $('#ddlbloodgroup').val(response.d.BloodGroup);
    $('#ddleducation').val(response.d.Education);
    $('#ddlreligion').val(response.d.Religion);
    $('#ddlmaritialstatus').val(response.d.MaritialStatus);
    $('#txtspouse').val(response.d.Spouse);
    $('#txtanniversary').val(response.d.Anniversary);
    $('#txtfathername').val(response.d.FatherName);
    $('#txtmothername').val(response.d.MotherName);
    $('#txtpan').val(response.d.PAN);
    $('#txtaddress').val(response.d.Address);
    $('#txtvoterid').val(response.d.VoterID);
    $('#ddlnationality').val(response.d.Nationality);
    $('#txtpincode').val(response.d.PinCode);
    $('#txtpassport').val(response.d.Passport);
    $('#txtpassportexpiry').val(response.d.PassportExpiry);
    $('#txtvisa').val(response.d.Visa);
    $('#txtvisatype').val(response.d.VisaType);
    $('#txtvisaexpiry').val(response.d.VisaExpiry);
    $('#txtdl').val(response.d.DL);
    $('#txtdlexpiry').val(response.d.DLExpiry);
    $('#txtcontactperson').val(response.d.ContactPerson);
    $('#txtcontactmobile').val(response.d.ContactMobile);
    $('#ddldisablity').val(response.d.Disablity);
    $('#ddlworkertype').val(response.d.WorkerType);
    $('#txtloginvalidTill').val(response.d.LoginValidTill);
    $('#txtpfleavingdate').val(response.d.PFLeavingDate);
    $('#ddlpfreason').val(response.d.PFReason);
    $('#txtuanno').val(response.d.UANNo);
    $('#txtvpfno').val(response.d.VPFNO);
    $('#txtvpfleavingDate').val(response.d.VPFLeavingDate);
    $('#ddlvpfreason').val(response.d.VPFReason);
    $('#txtapplicable').val(response.d.Applicable);
    $('#txtdateofleavig').val(response.d.DateOfLeavig);
    $('#ddlleavingreason').val(response.d.LeavingReason);
    $('#txtclopening').val(response.d.CLOpening);
    $('#ddlgrade').val(response.d.Grade);
    $('#txtofficialemailID').val(response.d.OfficialEmailID);
    $('#txtesidno').val(response.d.ESIDNo);
    $('#txtesicleavingDate').val(response.d.ESICLeavingDate);
    $('#ddlesicreason').val(response.d.ESICReason);
    $('#txtremark').val(response.d.Remark);
    $('#txtnoticeperiod').val(response.d.NoticePeriod);
    $('#txtusername').val(response.d.UserName);
    $('#fingureusername').val(response.d.UserName);
    $('#txtloginname').val(response.d.LoginName);
    $('#txtpassword').val(response.d.Password);
    $('#txtmobile').val(response.d.Mobile);
    $('#txtemail').val(response.d.EmailID);
    $('#ddlusertype').val(response.d.UserType);
    $('#ddldoctor').val(response.d.DoctorID);
    //  $('#txtcompanyid').val(response.d.CompanyID);
    $('#ddldesignation').val(response.d.DesignationID);
    $('#ddlstore').val(response.d.StoreID);
    $('#ddlbillingcounter').val(response.d.BillingCounterID);
    $('#ddlbillingcounter').val(response.d.PharmacyCounterID);
    $('#ddldepartment').val(response.d.DepartmentID);
    //  $('#txtphoto').val(response.d.Photo);
    $('#txtcentreid').val(response.d.CentreID);
    $('#txtdob').val(response.d.DOB);
    $('#txtsignature').val(response.d.Signature);
    $('#ddlallowsignature').val(response.d.AllowSignature.toString());
    $('#ddlstate').val(response.d.StateID);
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    $('#ddlcity').val(response.d.CityID);
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#ddlarea').val(response.d.AreaID);

    $('#ddlstatus').val(response.d.Active.toString());
    $('#txtdoj').val(response.d.DOJ);

    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify User");
}
function DeleteUser(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/DeleteUser",
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
function getgenderdetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/GetGenderDetail",
        data: JSON.stringify({ ID: $('#ddltitle').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != "") {
                var detail = data.d.split('*');
                if (detail[0] != "")
                    $('#ddlgender').val(detail[0]);
                //if (detail[1] != "")
                //    $('#ddlguardianrelation').val(detail[1]);
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
function BindAllComboBox() {
    BindCombo($("#ddlrole"), "ddlrole", "");
    BindCombo($("#ddlcentre"), "ddlcentre", "");
    BindCombo($("#ddldoctor"), "ddldoctor", "");
    BindCombo($("#ddldesignation"), "ddldesignation", "EMT");
    BindCombo($("#ddlstore"), "ddlstore", "");
    BindCombo($("#ddlbillingcounter"), "ddlbillingcounter", "UC");
    BindCombo($("#ddldepartment"), "ddldepartment", "");
    BindCombo($("#ddltitle"), "ddltitle", "PTT");
    BindCombo($("#ddlmaritalstatus"), "ddlmaritalstatus", "PMS");
    BindCombo($("#ddlbloodgroup"), "ddlbloodgroup", "PBG");
    BindCombo($("#ddlstate"), "ddlstate", "");
    BindCombo($("#ddlreligion"), "ddlreligion", "PR");
    BindCombo($("#ddlnationality"), "ddlnationality", "PNT");
    BindCombo($("#ddldisability"), "ddldisability", "EDA");
    BindCombo($("#ddlworkertype"), "ddlworkertype", "WT");
    BindCombo($("#ddlesidreason"), "ddlesidreason", "PFR");
    BindCombo($("#ddlpfreason"), "ddlpfreason", "PFR");
    BindCombo($("#ddlvpfreason"), "ddlvpfreason", "PFR");
    BindCombo($("#ddlleavingreason"), "ddlleavingreason", "PFR");
    BindCombo($("#ddlgrade"), "ddlgrade", "EG");

}
function BindCombo(ele, ControlName, Code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: Code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlrole") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.RoleID).html(value.RoleName));
                });
            }
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddldoctor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
                });
            } if (ControlName == "ddlworkertype" || ControlName == "ddlesidreason" || ControlName == "ddlpfreason" || ControlName == "ddlvpfreason" || ControlName == "ddlleavingreason" || ControlName == "ddlgrade" || ControlName == "ddldesignation" || ControlName == "ddltitle" || ControlName == "ddldisability" || ControlName == "ddlmaritalstatus" || ControlName == "ddlbloodgroup" || ControlName == "ddlreligion" || ControlName == "ddlnationality") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlstore") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.StoreID).html(value.StoreName));
                });
            } if (ControlName == "ddlbillingcounter") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddldepartment") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DepartmentID).html(value.DepartmentName));
                });
            } if (ControlName == "ddlstate") {
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
function GetUserByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/GetUserByID",
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
function Save() {
    if ($("#txtusername").val() == "") {
        alertify.log("User Full Name is required.");
        $("#txtusername").focus();
        return false;
    } if ($("#txtmobile").val() == "") {
        alertify.log("Mobile is required.");
        $("#txtmobile").focus();
        return false;
    }
    if ($("#txtemail").val() == "") {
        alertify.log("EmailID is required.");
        $("#txtemail").focus();
        return false;
    } if ($("#txtloginname").val() == "") {
        alertify.log("login Name is required.");
        $("#txtloginname").focus();
        return false;
    } if ($("#txtpassword").val() == "") {
        alertify.log("Password is required.");
        $("#txtpassword").focus();
        return false;
    } if ($("#txtdoj").val() == "") {
        alertify.log("DOJ is required.");
        $("#txtdoj").focus();
        return false;
    } if ($("#txtdob").val() == "") {
        alertify.log("DOB is required.");
        $("#txtdob").focus();
        return false;
    } if ($("#ddlcentre").val() == null) {
        alertify.log("You Don't Have Permission Any Centre ! Please Contact Admin.");
        $("#ddlcentre").focus();
        return false;
    }

    var obj = {};
    obj.UserID = $('#hdfuserid').val();
    obj.RoleID = $('#ddlrole').val();
    obj.FullName = $('#txtusername').val();
    obj.Title = $('#ddltitle').val();
    obj.Gender = $('#ddlgender').val();
    obj.StateID = $('#ddlstate').val();
    obj.CityID = $('#ddlcity').val();
    obj.AreaID = $('#ddlarea').val();
    obj.BloodGroup = $('#ddlbloodgroup').val();
    obj.Education = $('#txteducation').val();
    obj.Religion = $('#ddlreligion').val();
    obj.MaritialStatus = $('#ddlmaritalstatus').val();
    obj.Spouse = $('#txtspouse').val();
    obj.Anniversary = $('#txtanniversary').val();
    obj.FatherName = $('#txtfathername').val();
    obj.MotherName = $('#txtmothername').val();
    obj.PAN = $('#txtpan').val();
    obj.Address = $('#txtaddress').val();
    obj.VoterID = $('#txtvoterid').val();
    obj.Nationality = $('#ddlnationality').val();
    obj.PinCode = $('#txtpincode').val();
    obj.Passport = $('#txtpassport').val();
    obj.PassportExpiry = $('#txtpassportexpiry').val();
    obj.Visa = $('#txtvisa').val();
    obj.VisaType = $('#txtvisatype').val();
    obj.VisaExpiry = $('#txtvisexpiry').val();
    obj.DL = $('#txtdl').val();
    obj.DLExpiry = $('#txtdlexpiry').val();
    obj.ContactPerson = $('#txtcontactperson').val();
    obj.ContactMobile = $('#txtcontactmobile').val();
    obj.Disablity = $('#ddldisability').val();
    obj.WorkerType = $('#ddlworkertype').val();
    obj.LoginValidTill = '0';
    obj.PFLeavingDate = $('#txtpfleavingdate').val();
    obj.PFReason = $('#ddlpfreason').val();
    obj.UANNo = '0';
    obj.VPFNO = $('#txtvpfno').val();
    obj.VPFLeavingDate = $('#txtvpfleavingdate').val();
    obj.VPFReason = $('#ddlvpfreason').val();
    obj.Applicable = '0';
    obj.DateOfLeaving = $('#txtdateofleaving').val();
    obj.LeavingReason = $('#ddlleavingreason').val();
    obj.CLOpening = $('#txtclopening').val();
    obj.Grade = $('#ddlgrade').val();
    obj.OfficialEmailID = $('#txtofficialemailid').val();
    obj.ESIDNo = $('#txtesidno').val();
    obj.ESICLeavingDate = $('#txtesidleavingdate').val();
    obj.ESICReason = $('#ddlesidreason').val();
    obj.Remark = $('#txtremark').val();
    obj.NoticePeriod = $('#txtnoticeperiod').val();
    obj.UserName = $('#txtusername').val();
    obj.LoginName = $('#txtloginname').val();
    obj.Password = $('#txtpassword').val();
    obj.Mobile = $('#txtmobile').val();
    obj.EmailID = $('#txtemail').val();
    obj.UserType = $('#ddlusertype').val();
    obj.DoctorID = $('#ddldoctor').val();
    obj.CompanyID = '1';
    obj.DesignationID = $('#ddldesignation').val();
    obj.StoreID = $('#ddlstore').val();
    obj.BillingCounterID = $('#ddlbillingcounter').val();
    obj.PharmacyCounterID = $('#ddlbillingcounter').val();
    obj.DepartmentID = $('#ddldepartment').val();
    obj.Photo = '';
    obj.CentreID = $('#ddlcentre').val();
    obj.DOB = $('#txtdob').val();
    obj.DOJ = $('#txtdoj').val();
    obj.Signature = '';
    obj.AllowSignature = false;
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'UserRegistration.aspx/Save',
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
    getserverdate1($("#txtdateofleaving"));
    getserverdate1($("#txtdob"));
    getserverdate1($("#txtdoj"));
    getserverdate1($("#txtesidleavingdate"));
    getserverdate1($("#txtvpfleavingdate"));
    getserverdate1($("#txtpfleavingdate"));
    getserverdate1($("#txtdlexpiry"));
    getserverdate1($("#txtvisexpiry"));
    getserverdate1($("#txtpassportexpiry"));
    getserverdate1($("#txtanniversary"));
    getserverdate1($("#txtpassportexpiry"));
    BindAllComboBox();
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    BindGrid();
    $('#ddlusertype').focus();

    $('#hdfuserid').val('0');
    $('#txtusername').val('');
    $('#ddltitle').val('0');
    $('#txtspouse').val('');
    $('#txtfathername').val('');
    $('#txtmothername').val('');
    $('#txtpan').val('');
    $('#txtaddress').val('');
    $('#txtvoterid').val('');
    $('#txtpincode').val('');
    $('#txtpassport').val('');
    $('#txtvisa').val('');
    $('#txtvisatype').val('');
    $('#txtdl').val('');
    $('#txtcontactperson').val('');
    $('#txtcontactmobile').val('');
    $('#txtuanno').val('');
    $('#txtvpfno').val('');
    $('#txtapplicable').val('');
    $('#txtclopening').val('0');
    $('#txtofficialemailID').val('');
    $('#txtesidno').val('');
    $('#txtremark').val('');
    $('#txtnoticeperiod').val('');
    $('#txtusername').val('');
    $('#fingureusername').val('');
    $('#txtloginname').val('');
    $('#txtpassword').val('');
    $('#txtmobile').val('');
    $('#txtemail').val('');
    $('#txtcentreid').val('');
    $('#txtsignature').val('');
    $('#ddlstatus').val('true');
    PermissionDetail();
    $("#btnadd").attr("value", "Add User");
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/GetUserDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Role</th><th>UserName</th><th>Mobile</th><th>Email</th><th>Store</th>" +
                //"<th>CentreName</th>
                "<th>Designation</th><th>Status</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' User='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].UserID + "' href='javascript:void();'> Edit</a>" +
                    " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].UserID + "' href='javascript:void();'> Delete</a>" +
                    " </div> </li></ul></div></td>" +
                    "<td class='" + activecolor + "'>" + data.d[i].RoleName + "</td><td  class='" + activecolor + "'>" + data.d[i].UserName + "</td><td class='" + activecolor + "'>" + data.d[i].Mobile + "</td><td class='" + activecolor + "'>" + data.d[i].EmailID + "</td><td class='" + activecolor + "'>" + data.d[i].StoreName + "</td>" +
                    //  "<td>" + data.d[i].CentreName + "</td>"
                    "<td class='" + activecolor + "'>" + data.d[i].Designation + "</td><td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>User/Employee List</th></tr></thead>");
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

function UpdateFingure() {
    if ($("#txtisoimage").val() == "") {
        alertify.log("Please Scan Fingure.");
        $("#txtisoimage").focus();
        return false;
    } if ($("#hdfuserid").val() == "0") {
        alertify.log("Please Select User First.");
        return false;
    }
    var fingure = $("#txtisoimage").val();
    var finguretype = $("#ddlfingure").val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'UserRegistration.aspx/UpdateFingure',
        data: JSON.stringify({ userID: $('#hdfuserid').val(), Fingure: fingure, FingureUpdate: finguretype }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
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
function CheckJoining() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserRegistration.aspx/GetJoiningAge",
        data: JSON.stringify({ joiningdate: $('#txtdoj').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d == "") {
                Save();
                //LMSMessage('', 'Joining Age Not Allow', 'Error');
                // return false;
            }
            else {
                Save();

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

