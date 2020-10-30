
$(document).ready(function () {
    PermissionDetail();
    $('#txtregdate,#txtdob,#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
   
    $(document).on('change', '#ddlclass', function () {
        BindCombo($("#ddlsection"), "ddlsection", $('#ddlclass').val());
    });
    $(document).on('keydown', '#txtstudentfilter', function () {
        FillstudentBindGrid();
    });
    $(document).on('change', '#txtfromdate', function () {
        FillstudentBindGrid();
    });
    $(document).on('change', '#txttodate', function () {
        FillstudentBindGrid();
    });
    $("#txtstudentname").focus();
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
    $(document).on("click", ".lnkedit", function () {
        $('#ModalStudentDetail').modal('hide');
        var navid = $(this).data("id");
        GetstudentByID(navid);
    });
    $(document).on("click", "#btndelete", function () {
        var navid = $(this).data("id");
        DeletePatietByID(navid);
    });
    $("#txtsearchstudent").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "StudentRegistrationInfo.aspx/Searchstudent",
                data: "{ 'StudentDetail': '" + request.term + "','Type':'" + $('#ddlfilteration').val() + "'}",
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
                GetstudentByID(i.item.val);
                $('#txtsearchstudent').val('');
            }
        },
        minLength: 1
    });
    $(document).on('change', '#txtmobilenumber', function () {
        check($('#txtmobilenumber'));
    });
    $(document).on('change', '#txtemail', function () {
        checkEmailID($('#txtemail'));
        checkemail();
    });
    $(document).on('change', '#ddltitle', function () {
        getgenderdetail();
    });
    $('#ddltitle').prop('selectedIndex', 1);
    getgenderdetail();
    $(document).on('click', '#btnphotoupload', function () {
        if ($('#hdfstudentid').val() != "0") {
            sendFile($('#hdfstudentid').val());
          //  GetstudentByID($('#hdfstudentid').val());
        } else
            alertify.log('Please Select student First!');
    });
    $(document).on('click', '#btnadvancesearch', function () {
        $('#ModalStudentDetail').modal('show');
        FillstudentBindGrid();
    });
});

function getgenderdetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRegistrationInfo.aspx/GetGenderDetail",
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

function UpdatestudentPic(location) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'StudentRegistrationInfo.aspx/UpdateStudentPic',
        data: JSON.stringify({ logopath: location, StudentID: $('#hdfstudentid').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.error('Software Error');
            }
            else {
                alertify.success('student Picture Upload Successfully');
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
    var fp = $("#filestudentphoto").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', "studentimage/" + $('#hdfstudentid').val());
    formData.append('ID', $('#hdfstudentid').val());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            UpdatestudentPic(status);
        },
        processData: false,
        contentType: false,
        error: function () {
            alertify.error("Whoops something went wrong!");
        }
    });
}

function BindAllComboBox() {
    // BindCombo($("#ddlcentre"), "ddlcentre", '');
    BindCombo($("#ddltitle"), "ddltitle", 'PTT');
    BindCombo($("#ddlfathertitle"), "ddlfathertitle", 'PTT');
    BindCombo($("#ddlmothertitle"), "ddlmothertitle", 'PTT');
   // BindCombo($("#ddlguardianrelation"), "ddlguardianrelation", 'GR');
    BindCombo($("#ddlidtype"), "ddlidtype", 'IDT');
    BindCombo($("#ddlcaste"), "ddlcaste", 'PCST');
    BindCombo($("#ddlreligion"), "ddlreligion", 'PR');
    // BindCombo($("#ddlmartialstatus"), "ddlmartialstatus", 'PMS');
    BindCombo($("#ddlbloodgroup"), "ddlbloodgroup", 'PBG');
    BindCombo($("#ddloccupation"), "ddloccupation", 'POC');
    BindCombo($("#ddlstate"), "ddlstate", '');
    BindCombo($("#ddlnationality"), "ddlnationality", 'PNT');
   // BindCombo($("#ddlmlctype"), "ddlmlctype", 'MLCT');
    BindCombo($("#ddlkinrelation"), "ddlkinrelation", 'KR');
    //BindCombo($("#ddlstudentcategory"), "ddlstudentcategory", 'PT');
  //  BindCombo($("#ddltpasponser"), "ddltpasponser", '');
    BindCombo($("#ddlclass"), "ddlclass", '');
    BindCombo($("#ddlsection"), "ddlsection", $('#ddlclass').val());

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRegistrationInfo.aspx/BindComboBox",
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
            } if (ControlName == "ddlfathertitle" || ControlName == "ddlmothertitle") {
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
            if (ControlName == "ddlclass") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadID).html(value.HeadName));
                });
            }
            if (ControlName == "ddlsection") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadID).html(value.HeadName));
                });
            }
            
            if (ControlName == "ddlkinrelation") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlstudentcategory") {
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

function DeletestudentByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRegistrationInfo.aspx/DeletestudentByID",
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

function Save() {
    if ($('#txtemail').val() == "")
    {
        LMSMessage('', 'Please Fill EmailID', 'info');
        alertify.error('Please Fill EmailID');
        return false;
    }
    var obj = {};
    obj.StudentID = $('#hdfstudentid').val();
    obj.UHID = "";
    obj.Title = $('#ddltitle').val();
    obj.StudentCode = $('#txtstudentname').val();
    obj.StudentFName = $('#txtstudentname').val().split(' ')[0];
    obj.StudentLName = $('#txtstudentname').val().split(' ')[1];
    obj.FatherTitle = $('#ddlfathertitle').val();
    obj.FatherName = $('#txtfathername').val();
    obj.MotherTitle = $('#ddlmothertitle').val();
    obj.MotherName = $('#txtmothername').val();
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
    obj.CityID = $('#ddlcity').val();
    obj.AreaID = $('#ddlarea').val();
    obj.NationalityID = $('#ddlnationality').val();
    obj.Remark = $('#txtremark').val();
    obj.RegistrationDate = $('#txtregdate').val();
    obj.RegistrationTime = $('#txtregdate').val();
    obj.StudentPhoto ="";
    obj.StudentSignature = "";
    obj.Username = "";
    obj.Password = "";
    obj.AgeYear = $('#txtyear').val();
    obj.AgeMonth = $('#txtmonth').val();
    obj.AgeDay = $('#txtday').val();
    obj.DOB = $('#txtdob').val();
    obj.Active = $('#ddlstatus').val();
    obj.ClassID = $('#ddlclass').val();
    obj.SectionID = $('#ddlsection').val();
    obj.PromotionTypeID = 0;
    obj.PromotionType = "";
    obj.StudentClassID = 0;
    obj.OtherSourceID = 0;
    obj.Other = "";
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'StudentRegistrationInfo.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearRecord();
                $("#txtstudentname").focus();
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
    $('#hdfstudentid').val('0');
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkstudentdetail').html('');
    $('#txtuhid').val('');
    $('#ddltitle').val('');
    $('#txtstudentname').val('');
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
    $("#txtsearchstudent").val('');

    getserverdate1($("#txtregdate"));
    getserverdate1($("#txtdob"));
    CalculateAge();
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add student");

}
function FillstudentBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRegistrationInfo.aspx/GetAdvancestudentDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), StudentFilter: $('#txtstudentfilter').val() }),
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
        $("#gvstudent").empty();
        if (data.d.length > 0) {
            $("#gvstudent").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>UHID</th><th>studentName</th><th>Mobile</th><th>EmailID</th><th>Address</th><th>RegDate</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var status = (data.d[i].Active == false) ? 'NotUsed' : 'Used';
                var statuscolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gvstudent").append("<tr><td class='" + statuscolor + "'>" +
                "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].StudentID + "' href='javascript:void();'> Edit</a>" +
                " </div> </li>" +
                //"<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                //"  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].studentID + "' href='javascript:void();'> Delete</a>" +
                //" </div> </li>" +
                "</ul></div></td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].UHID + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].StudentFName + " " + data.d[i].StudentLName + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].Mobile + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].EmailID + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].Address + "</td>" +
                 "<td class='" + statuscolor + "'>" + data.d[i].RegistrationDate.split(' ')[0] + "</td>" +

                "<td class='" + statuscolor + "'>" + status + "</td></tr>");
            }
            $('#gvstudent').append("</tbody>");
            studentInitialize();
        }
        else {
            $("#gvstudent").append("<thead><tr><th>Student List</th></tr></thead>");
            $("#gvstudent").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function studentInitialize() {
    $('#gvstudent').dataTable({
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
        response: true,
        "bDestroy": true
    });
}

function GetstudentByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRegistrationInfo.aspx/GetstudentByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            setValues(response);
            $('#txtsearchstudent').val('');
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
   $('#hdfstudentid').val(response.d.StudentID);
   $('#ddltitle').val(response.d.Title);
   $('#txtstudentname').val(response.d.StudentFName + ' ' + response.d.StudentLName);
   $('#ddlfathertitle').val(response.d.FatherTitle);
   $('#txtfathername').val(response.d.FatherName);
   $('#ddlmothertitle').val(response.d.MotherTitle);
   $('#txtmothername').val(response.d.MotherName);
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
   $('#ddlstate').val(response.d.StateID);
   $('#ddlcity').val(response.d.CityID);
   $('#ddlarea').val(response.d.AreaID);
   $('#ddlnationality').val(response.d.NationalityID);
   $('#txtremark').val(response.d.Remark);
   $('#txtregdate').val(response.d.RegistrationDate);
   $('#txtyear').val(response.d.AgeYear);
   $('#txtmonth').val(response.d.AgeMonth);
   $('#txtday').val(response.d.AgeDay);
   $('#txtdob').val(response.d.DOB);
   $('#ddlclass').val(response.d.ClassID);
   BindCombo($("#ddlsection"), "ddlsection", $('#ddlclass').val());
   $('#ddlsection').val(response.d.SectionID);

    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify student");
    $('#txtsearchstudent').val('');
    if (response.d.studentPhoto != "")
        $('#studentpic').attr('src', '../../' + response.d.StudentPhoto);
}


function checkemail() {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'StudentRegistrationInfo.aspx/CheckEmailExist',
        data: JSON.stringify({ Email: $('#txtemail').val() }),
        async: false,
        success: function (response) {
            if (response.d == "OK") {
                LMSMessage('', "EmailID Already Exist", 'info');
                $('#txtemail').val('')
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