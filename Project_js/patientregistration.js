
$(document).ready(function () {
    PermissionDetail();
    $(document).on('click', '#btnadvancesearch', function () {
        $('#ModalPatientDetail').modal('show');
        FillPatientBindGrid();
    });
    $(document).on('click', '.lnkedit', function () {
        var id = $(this).data('id');
        GetPatientByID(id);
        $('#ModalPatientDetail').modal('hide');
    });
    $('#txtregdate,#txtdob,#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('keydown', '#txtpatientfilter', function () {
        FillPatientBindGrid();
    }); $(document).on('change', '#txtfromdate', function () {
        FillPatientBindGrid();
    }); $(document).on('change', '#txttodate', function () {
        FillPatientBindGrid();
    });
    $("#txtpatientname").focus();
    getserverdate1($("#txtregdate"));
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    getserverdate1($("#txtdob"));
    BindAllComboBox();
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#txtyear,#txtmonth,#txtday').change(function () {
        CalculateDOB();
        if ($("#txtmonth").val() == '')
            $("#txtmonth").val('0');
        if ($("#txtday").val() == '')
            $("#txtday").val('0');
    });
    $('#txtdob').change(function () {
        CalculateAge();
    });
    CalculateAge();
    $(document).on('change', '#ddlstate', function () {
        BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#ddlcity', function () {
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on("click", "#btnadd", function () {
        Save();
    });
    $(document).on("click", "#btnreset", function () {
        ClearRecord();
    });

  
    $(document).on("click", "#btndelete", function () {
        var navid = $(this).data("id");
        DeletePatietByID(navid);
    });
    $("#txtsearchpatient").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PatientRegistration.aspx/SearchPatient",
                data: "{ 'PatientDetail': '" + request.term + "','Type':'" + $('#ddlfilteration').val() + "'}",
                dataType: "json",

                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        }
                    }))
                },
                error: function (response) {
                    jQuery.toast('E' + response.responseText);
                },
                failure: function (response) {
                    jQuery.toast('fa' + response.responseText);
                }
            });
        },
        select: function (e, i) {
            if (i.item.val != "#") {
                GetPatientByID(i.item.val);
                $('#txtsearchpatient').val('');
            }
        },
        minLength: 1
    });
    $(document).on('change', '#txtmobilenumber', function () {
        check($('#txtmobilenumber'));
    }); $(document).on('change', '#txtemail', function () {
        checkEmailID($('#txtemail'));
    });
    $(document).on('change', '#ddltitle', function () {
        getgenderdetail();
    });
    $('#ddltitle').prop('selectedIndex', 1);
    getgenderdetail();
    $(document).on('click', '#btnphotoupload', function () {
        if ($('#hdfpatientid').val() != "0") {
            sendFile($('#txtuhid').val());
            GetPatientByID($('#hdfpatientid').val());
        } else
            alertify.log('Please Select Patient First!');
    });
    $('#btnadd').css('display', 'none');
});


function UpdatePatientPic(location) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientRegistration.aspx/UpdatePatientPic',
        data: JSON.stringify({ logopath: location, PatientID: $('#hdfpatientid').val() }),
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.error('Software Error');
            }
            else {
                alertify.success('Patient Picture Upload Successfully');
                $("#filelogo").val('');
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
function sendFile(uhid) {
    var fp = $("#filepatientphoto").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', "Patient/"+$('#txtuhid').val());
    formData.append('ID', $('#txtuhid').val());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            UpdatePatientPic(status);
        },
        processData: false,
        contentType: false,
        error: function () {
            alertify.error("Whoops something went wrong!");
        }
    });
}
function getgenderdetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DirectPatientRegistration.aspx/GetGenderDetail",
        data: JSON.stringify({ ID: $('#ddltitle').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != "") {
                var detail = data.d.split('*');
                if (detail[0] != "")
                    $('#ddlgender').val(detail[0]);
                if (detail[1] != "")
                    $('#ddlguardianrelation').val(detail[1]);
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
    // BindCombo($("#ddlcentre"), "ddlcentre", '');
    BindCombo($("#ddltitle"), "ddltitle", 'PTT');
    BindCombo($("#ddlguardiantitle"), "ddlguardiantitle", 'PTT');
    BindCombo($("#ddlguardianrelation"), "ddlguardianrelation", 'GR');
    BindCombo($("#ddlidtype"), "ddlidtype", 'IDT');
    BindCombo($("#ddlcaste"), "ddlcaste", 'PCST');
    BindCombo($("#ddlreligion"), "ddlreligion", 'PR');
    // BindCombo($("#ddlmartialstatus"), "ddlmartialstatus", 'PMS');
    BindCombo($("#ddlbloodgroup"), "ddlbloodgroup", 'PBG');
    BindCombo($("#ddloccupation"), "ddloccupation", 'POC');
    BindCombo($("#ddlstate"), "ddlstate", '');
    BindCombo($("#ddlnationality"), "ddlnationality", 'PNT');
    BindCombo($("#ddlmlctype"), "ddlmlctype", 'MLCT');
    BindCombo($("#ddlkinrelation"), "ddlkinrelation", 'KR');
    BindCombo($("#ddlpatientcategory"), "ddlpatientcategory", 'PT');
    BindCombo($("#ddltpasponser"), "ddltpasponser", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientRegistration.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddltitle") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddlguardiantitle") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlguardianrelation") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlidtype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlcaste") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlreligion") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlmartialstatus") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlbloodgroup") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddloccupation") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlstate") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.StateID).html(value.StateName));
                });
            } if (ControlName == "ddlnationality") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            }
            if (ControlName == "ddlmlctype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            }
            if (ControlName == "ddlkinrelation") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlpatientcategory") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddltpasponser") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.TPASponsorID).html(value.SponsorName));
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
function CalculateDOB() {
    var yr = $('#txtyear').val().replace(/^\s+|\s+$/g, "");
    var mn = $('#txtmonth').val().replace(/^\s+|\s+$/g, "");
    var dy = $('#txtday').val().replace(/^\s+|\s+$/g, "");
    if (dy < 10) { dy = '0' + dy } if (mn < 10) { mn = '0' + mn }
    var dated = new Date(new Date().getFullYear() - yr, new Date().getMonth() - mn, (new Date().getDate() - dy));
    var dd = dated.getDate();
    var mm = dated.getMonth() + 1;
    var yy = dated.getFullYear();
    if (dd < 10) dd = "0" + dd; if (mm < 10) mm = "0" + mm;
    var dob = dd + "/" + mm + "/" + yy;
    $('#txtdob').val(dob);
}
function CalculateAge() {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();

    var pieces = $('#txtdob').val().split('/');
    var birth_date = pieces[0];
    var birth_month = pieces[1];
    var birth_year = pieces[2];

    if (curr_month == birth_month && curr_date >= birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year));
        $('#txtmonth').val(0);
        $('#txtday').val(parseInt(curr_date - birth_date));
    }
    if (curr_month == birth_month && curr_date < birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year - 1));
        $('#txtmonth').val(parseInt(12 - 1));
        $('#txtday').val(parseInt(curr_date - birth_date + 30));
    }
    if (curr_month > birth_month && curr_date >= birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year));
        $('#txtmonth').val(curr_month - birth_month);
        $('#txtday').val(parseInt(curr_date - birth_date));
    }
    if (curr_month > birth_month && curr_date < birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year));
        $('#txtmonth').val(curr_month - birth_month - 1);
        $('#txtday').val(parseInt(curr_date - birth_date + 30));
    }
    if (curr_month < birth_month && curr_date >= birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year - 1));
        $('#txtmonth').val(curr_month - birth_month + 12);
        alert(parseInt(curr_date - birth_date));
    }
    if (curr_month < birth_month && curr_date < birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year - 1));
        $('#txtmonth').val(curr_month - birth_month + 11);
        $('#txtday').val(parseInt(curr_date - birth_date + 30));
    }
}
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetPatientByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Patientregistration.aspx/GetPatientByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            setValues(response);
            $('#txtsearchpatient').val('');
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
function DeletePatientByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Patientregistration.aspx/DeletePatientByID",
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
    $("#txtsearchpatient").val('');
    $('#lnkname').html(response.d.Title + '.' + response.d.PatientName);
    $('#lnkuhid').html(response.d.UHID);
    $('#lnkpatientdetail').html(response.d.AgeYear + 'Y' + response.d.AgeMonth + 'M' + response.d.AgeDay + '/' + response.d.EMobileNo);
    $('#hdfpatientid').val(response.d.PatientID.toString());
    $('#txtuhid').val(response.d.UHID);
    $('#ddltitle').val(response.d.Title);
    $('#txtpatientname').val(response.d.PatientName);
    $('#ddlguardiantitle').val(response.d.GTitle);
    $('#txtguardianname').val(response.d.GuardianName);
    $('#ddlguardianrelation').val(response.d.GuardianRelationID);
    $('#txtmobilenumber').val(response.d.Mobile);
    $('#txtemail').val(response.d.EmailID);
    $('#ddlidtype').val(response.d.IDTypeID);
    $('#txtidno').val(response.d.IDTypeNo);
    $('#ddlcaste').val(response.d.CasteID);
    $('#ddlreligion').val(response.d.ReligionID);
    $('#ddlgender').val(response.d.GenderID);
    $('#ddlbloodgroup').val(response.d.BloodGroupID);
    $('#ddloccupation').val(response.d.OccupationID);
    $('#txtaddress').val(response.d.Address);
    $('#txtpincode').val(response.d.PinCode);
    $('#ddlnationality').val(response.d.NationalityID);
    $('#txtremark').val(response.d.Remark);
    $('#txtregdate').val(response.d.RegistrationDate);
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

    $("#btnadd").attr("value", "Modify Patient");
    $('#txtsearchpatient').val('');
    if (response.d.PatientPhoto!="")
        $('#patientpic').attr('src', '../../' + response.d.PatientPhoto);
}
function Save() {
    if ($('#hdfpatientid').val() == "0")
    {
        alertify.error('Patient Detail Update Only');
        return false;}
    if ($("#txtpatientname").val() == "") {
        alertify.log("Patient Name is required.");
        $("#txtpatientname").focus();
        return false;
    } if ($("#txtaddress").val() == "") {
        alertify.log("Address is required.");
        $("#txtaddress").focus();
        return false;
    } if ($("#txtmobilenumber").val() == "") {
        alertify.log("Mobile is required.");
        $("#txtmobilenumber").focus();
        return false;
    }
    if ($('#ddlgender').val() == "0") {
        alertify.log("Gender is required.");
        $("#ddlgender").focus();
        return false;
    } if ($('#txtyear').val() == "0" && $('#txtmonth').val() == "0" && $('#ddlday').val() == "0") {
        alertify.log("Please Select Age First.");
        $("#txtyear").focus();
        return false;
    }

    var obj = {};
    obj.PatientID = $('#hdfpatientid').val();
    obj.UHID = $('#txtuhid').val();
    obj.Title = $('#ddltitle').val();
    obj.PatientName = $('#txtpatientname').val();
    obj.GTitle = $('#ddlguardiantitle').val();
    obj.GuardianName = $('#txtguardianname').val();
    obj.GuardianRelationID = $('#ddlguardianrelation').val();
    obj.Mobile = $('#txtmobilenumber').val();
    obj.EmailID = $('#txtemail').val();
    obj.IDTypeID = $('#ddlidtype').val();
    obj.IDTypeNo = $('#txtidno').val();
    obj.CasteID = $('#ddlcaste').val();
    obj.ReligionID = $('#ddlreligion').val();
    obj.GenderID = $('#ddlgender').val();
    obj.BloodGroupID = $('#ddlbloodgroup').val();
    obj.OccupationID = $('#ddloccupation').val();
    obj.Address = $('#txtaddress').val();
    obj.PinCode = $('#txtpincode').val();
    obj.StateID = $('#ddlstate').val();
    obj.CityID = ($('#ddlcity').val() == undefined) ? '0' : $('#ddlcity').val();
    obj.AreaID = ($('#ddlarea').val() == undefined) ? '0' : $('#ddlarea').val();
    obj.NationalityID = $('#ddlnationality').val();
    obj.Remark = $('#txtremark').val();
    obj.RegistrationDate = $('#txtregdate').val();
    obj.RegistrationTime = $('#txtregdate').val();
  //  obj.PatientPhoto = $('#filepatientphoto').val();
    obj.Active = $('#ddlstatus').val();
    var objr = {};
    objr.RecordID = $('#hdfrecordid').val();
    objr.PID = $('#hdfpatientid').val();
    objr.Type = $('#ddltype').val();
    objr.VisitNo = '';
    objr.IsMLC = $('#ddlismlc').val();
    objr.MLCID = '0';
    objr.MLCType = $('#ddlmlctype').val();
    objr.MCLAccidentPlace = $('#txtaccidentplace').val();
    objr.MLCPoliceStation = $('#txtpolicestation').val();
    objr.MLCRemarks = $('#txtmlcremark').val();
    objr.MLCCertificateStatus = $('#txtmlccertificate').val();
    objr.AgeYear = $('#txtyear').val();
    objr.AgeMonth = $('#txtmonth').val();
    objr.AgeDay = $('#txtday').val();
    objr.DOB = $('#txtdob').val();
    objr.Mobile = $('#txtmobilenumber').val();
    objr.KinRelationID = $('#ddlkinrelation').val();
    objr.KinName = $('#txtkinname').val();
    objr.KinMobile = $('#txtkinmobile').val();
    objr.KinAddress = $('#txtkinaddress').val();
    objr.PatientCategoryID = $('#ddlpatientcategory').val();
    objr.IsVIP = $('#ddlisvip').val();
    objr.IsPoor = $('#ddlispoor').val();
    objr.GuardianRelationID = $('#ddlguardianrelation').val();
    objr.GuardianName = $('#txtguardianname').val();
    objr.GuardianMobile = $('#txtmobilenumber').val();
    objr.TPASponsorID = $('#ddltpasponser').val();
    objr.ConsultationDate = $('#txtregdate').val();
    objr.Remark = '';
    objr.DutyDoctorID = '0';
    objr.ReferredDoctorID = '0';
    objr.Active = $('#ddlstatus').val();
    objr.InitiateDischargeDate = $('#txtregdate').val();
    objr.InitiateDischargeDoctorID = '0';
    objr.InitiateDischargeUserID = '0';
    objr.InitiateDischargeRemarks = '';
    objr.FinalizebedDischargeDate = $('#txtregdate').val();
    objr.FinalizebedDischargeUserID = '0';
    objr.FinalizebedDischargeRemarks = '';
    objr.PhysicalDischType = '0';
    objr.PhysicalDischargeDate = $('#txtregdate').val();
    objr.PhysicalDischargeDoctorID = '0';
    objr.PhysicalDischargeUserID = '0';
    objr.PhysicalDischargeRemarks = '';
    objr.AdmitBedID = '0';
    objr.CurrentBedID = '0';

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Patientregistration.aspx/Save',
        data: JSON.stringify({ obj: obj, objr: objr }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearRecord();
                $("#txtpatientname").focus();
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
    $('#hdfpatientid').val('0');
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');
    $('#txtuhid').val('');
    $('#ddltitle').val('');
    $('#txtpatientname').val('');
    $('#ddlguardiantitle').val('');
    $('#txtguardianname').val('');
    $('#ddlguardianrelation').val();
    $('#txtmobilenumber').val('');
    $('#txtemail').val('');
    $('#ddlidtype').val('');
    $('#txtidno').val('');
    $('#ddlcaste').val('');
    $('#ddlreligion').val('');
    $('#ddlgender').val('0');
    $('#ddlmartialstatus').val('');
    $('#txtyear').val('');
    $('#txtmonth').val('');
    $('#txtday').val('');
    $('#txtdob').val('');
    $('#ddlbloodgroup').val('');
    $('#ddloccupation').val('');
    $('#txtaddress').val('');
    $('#txtpincode').val('');
    $('#ddlnationality').val('');
    $('#txtremark').val('');
    $('#txtcarename').val('');
    $('#txtemergencymobile').val('');
    $('#txtregdate').val('');
    $("#txtsearchpatient").val('');

    getserverdate1($("#txtregdate"));
    getserverdate1($("#txtdob"));
    CalculateAge();
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Patient");

    $('#btnadd').css('display', 'none');
}

function FillPatientBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Patientregistration.aspx/GetAdvancePatientDetail",
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
        $("#gvpatient").empty();
        if (data.d.length > 0) {
            $("#gvpatient").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Address</th><th>RegDate</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var status = (data.d[i].Active == false) ? 'NotUsed' : 'Used';
                var statuscolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gvpatient").append("<tr><td class='" + statuscolor + "'>" +
                "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].PatientID + "' href='javascript:void();'> Edit</a>" +
                " </div> </li>" +
                //"<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                //"  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].PatientID + "' href='javascript:void();'> Delete</a>" +
                //" </div> </li>" +
                "</ul></div></td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].UHID + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].PatientName + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].Mobile + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].EmailID + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].Address + "</td>" +
                 "<td class='" + statuscolor + "'>" + data.d[i].RegistrationDate.split(' ')[0] + "</td>" +
                
                "<td class='" + statuscolor + "'>" + status + "</td></tr>");
            }
            $('#gvpatient').append("</tbody>");
           PatientInitialize();
        }
        else {
            $("#gvpatient").append("<thead><tr><th>Patient List</th></tr></thead>");
            $("#gvpatient").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function PatientInitialize() {
    $('#gvpatient').dataTable({
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
