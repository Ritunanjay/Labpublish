
$(document).ready(function () {
    PermissionDetail();
    $('#txtregdate,#txtdob,#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));

     FillstudentBindGrid();
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
     BindAllComboBox();
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
                url: "StudentRecordDetail.aspx/Searchstudent",
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
     $(document).on('click', '#btnphotoupload', function () {
        if ($('#hdfstudentid').val() != "0") {
            sendFile($('#hdfstudentid').val());
            //  GetstudentByID($('#hdfstudentid').val());
        } else
            alertify.log('Please Select student First!');
    });
});


function BindAllComboBox() {
//    // BindCombo($("#ddlcentre"), "ddlcentre", '');
//    BindCombo($("#ddltitle"), "ddltitle", 'PTT');
//    BindCombo($("#ddlfathertitle"), "ddlfathertitle", 'PTT');
//    BindCombo($("#ddlmothertitle"), "ddlmothertitle", 'PTT');
//    // BindCombo($("#ddlguardianrelation"), "ddlguardianrelation", 'GR');
//    BindCombo($("#ddlidtype"), "ddlidtype", 'IDT');
//    BindCombo($("#ddlcaste"), "ddlcaste", 'PCST');
//    BindCombo($("#ddlreligion"), "ddlreligion", 'PR');
//    // BindCombo($("#ddlmartialstatus"), "ddlmartialstatus", 'PMS');
//    BindCombo($("#ddlbloodgroup"), "ddlbloodgroup", 'PBG');
//    BindCombo($("#ddloccupation"), "ddloccupation", 'POC');
//    BindCombo($("#ddlstate"), "ddlstate", '');
//    BindCombo($("#ddlnationality"), "ddlnationality", 'PNT');
//    // BindCombo($("#ddlmlctype"), "ddlmlctype", 'MLCT');
//    BindCombo($("#ddlkinrelation"), "ddlkinrelation", 'KR');
//    //BindCombo($("#ddlstudentcategory"), "ddlstudentcategory", 'PT');
//    //  BindCombo($("#ddltpasponser"), "ddltpasponser", '');
   BindCombo($("#ddlclass"), "ddlclass", '');
  BindCombo($("#ddlsection"), "ddlsection", $('#ddlclass').val());

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRecordDetail.aspx/BindComboBox",
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
        url: "StudentRecordDetail.aspx/DeletestudentByID",
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
    if ($('#hdfrecordid').val() == "0") {
        LMSMessage('', 'Please Select Student To Be Updated', 'info');
        return false;
    }
    var obj = {};
    obj.StudentID = $('#hdfstudentid').val();
    obj.StudentRecordID = $('#hdfrecordid').val();
    obj.ClassID = $('#ddlclass').val();
    obj.SectionID = $('#ddlsection').val();
    obj.PromotionTypeID = 0;
    obj.PromotionType = "";
    obj.StudentClassID = 0;
    obj.OtherSourceID = 0;
    obj.Other = "";
    obj.Active = true;
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'StudentRecordDetail.aspx/Save',
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
  
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add student");

}
function FillstudentBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentRecordDetail.aspx/GetStudentRecordDetail",
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
            $("#gvstudent").append("<thead><tr><th style='width:15px;display:none;' class='center'>Action</th><th>UHID</th><th>studentName</th><th>Mobile</th><th>EmailID</th><th>Address</th><th>Class</th><th>Section</th><th>RegDate</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var status = (data.d[i].Active == false) ? 'NotUsed' : 'Used';
                var statuscolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gvstudent").append("<tr><td class='" + statuscolor + "' style=display:none;>" +
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
                "<td class='" + statuscolor + "'>" + data.d[i].ClassName + "</td>" +
                "<td class='" + statuscolor + "'>" + data.d[i].SectionName + "</td>" +
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
        url: "StudentRecordDetail.aspx/GetstudentByID",
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
function setValues(data)
{
    $('#hdfrecordid').val(data.d.StudentRecordID);
    $('#hdfstudentid').val(data.d.StudentID);
}