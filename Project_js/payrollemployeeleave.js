
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on("change", "#ddlhead", function () {
        var employeeid = $('#ddlemployee').val();
        var headid = $('#ddlhead').val();
        BindEmployeeHeadGrid(employeeid, headid);
        if (employeeid != 0 && headid != 0)
            GetEmployeeLeaveByID(employeeid, headid);

    });
    $(document).on("change", "#ddlemployee", function () {
        var employeeid = $('#ddlemployee').val();
        BindEmployeeGrid(employeeid);
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetDetailListByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteEmployeeleaveDetail(id);
                BindGrid();
            }
        }
    });
    BindGrid();

});

function DeleteEmployeeleaveDetail(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/DeleteEmployeeleaveDetail",
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}

function GetEmployeeDetailListByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/GetEmployeeDetailListByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
            if (response.d.EDID != 0)
                setValues(response);
            else {
                clearemployee();
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
function clearemployee() {
    $('#hdfwdid').val('0');
    $('#txtpresent').val('0');
    $('#txtweeklyoff').val('0');
    $('#txtholidays').val('0');
    $('#txtonduty').val('0');
    $('#txtabsent').val('0');
    $('#txtunpaid').val('0');
    $('#txtcasualleave').val('0');
    $('#txtearnedleave').val('0');
    $('#txtsickleave').val('0');
    $('#txtmaternityleave').val('0');
    $('#txtrestricted').val('0');
    $('#txtextraworking').val('0');
    $('#txtcompoffearned').val('0');
    $('#txtcompoffavailed').val('0');
    $('#txtbereavementleave').val('0');

    $('#ddlstatus').val('true');
}
function GetDetailListByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/GetPayrollWorkingDetailByID",
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

function GetEmployeeLeaveByID(empid, headid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/GetEmployeeLeaveDetailByID",
        data: JSON.stringify({ EmpID: empid, SlipID: headid }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.WDID != "0")
                setValues(response);
            else
                clearemployee();
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
    $('#hdfwdid').val(response.d.WDID);
    $('#ddlemployee').val(response.d.EmployeeID);
    $('#ddlhead').val(response.d.SlipID);
    $('#txtpresent').val(response.d.Present);
    $('#txtweeklyoff').val(response.d.WeeklyOff);
    $('#txtholidays').val(response.d.Holidays);
    $('#txtonduty').val(response.d.OnDuty);
    $('#txtabsent').val(response.d.Absent);
    $('#txtunpaid').val(response.d.Unpaid);
    $('#txtcasualleave').val(response.d.Casualleave);
    $('#txtearnedleave').val(response.d.EarnedLeave);
    $('#txtsickleave').val(response.d.SickLeave);
    $('#txtmaternityleave').val(response.d.MaternityLeave);
    $('#txtrestricted').val(response.d.Restricted);
    $('#txtextraworking').val(response.d.ExtraWorking);
    $('#txtcompoffearned').val(response.d.CompoffEarned);
    $('#txtcompoffavailed').val(response.d.CompoffAvailed);
    $('#txtbereavementleave').val(response.d.Bereavementleave);

    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify EmployeeLeave");
}
function Save() {
    if ($("#ddlemployee").val() == "0") {
        LMSMessage('', 'Employee is required.', 'info');
        $("#ddlemployee").focus();
        return false;
    } if ($("#ddlhead").val() == "0") {
        LMSMessage('', 'Slip Month is required.', 'info');
        $("#ddlhead").focus();
        return false;
    } if ($("#txtpresent").val() == "") {
        LMSMessage('', 'Present Days is required.', 'info');
        $("#txtpresent").focus();
        return false;
    }
    var present = ($('#txtpresent').val() == "") ? "0" : $('#txtpresent').val();
    var absent = ($('#txtabsent').val() == "") ? "0" : $('#txtabsent').val();
    var totaldays = parseFloat(present) + parseFloat(absent);
    //if (totaldays < 30)
    //{
    //    LMSMessage('', 'Please Check Days', 'info');
    //    return;
    //}
    var obj = {};
    obj.WDID = $('#hdfwdid').val();
    obj.EmployeeID = $('#ddlemployee').val();
    obj.SlipID = $('#ddlhead').val();
    obj.Present = ($('#txtpresent').val() == "") ? "0" : $('#txtpresent').val();
    obj.WeeklyOff = ($('#txtweeklyoff').val() == "") ? "0" : $('#txtweeklyoff').val();
    obj.Holidays = ($('#txtholidays').val() == "") ? "0" : $('#txtholidays').val();
    obj.OnDuty = ($('#txtonduty').val() == "") ? "0" : $('#txtonduty').val();
    obj.Absent = ($('#txtabsent').val() == "") ? "0" : $('#txtabsent').val();
    obj.Unpaid = ($('#txtunpaid').val() == "") ? "0" : $('#txtunpaid').val();
    obj.Casualleave = ($('#txtcasualleave').val() == "") ? "0" : $('#txtcasualleave').val();
    obj.EarnedLeave = ($('#txtearnedleave').val() == "") ? "0" : $('#txtearnedleave').val();
    obj.SickLeave = ($('#txtsickleave').val() == "") ? "0" : $('#txtsickleave').val();
    obj.MaternityLeave = ($('#txtmaternityleave').val() == "") ? "0" : $('#txtmaternityleave').val();
    obj.Restricted = ($('#txtrestricted').val() == "") ? "0" : $('#txtrestricted').val();
    obj.ExtraWorking = ($('#txtextraworking').val() == "") ? "0" : $('#txtextraworking').val();
    obj.CompoffEarned = ($('#txtcompoffearned').val() == "") ? "0" : $('#txtcompoffearned').val();
    obj.CompoffAvailed = ($('#txtcompoffavailed').val() == "") ? "0" : $('#txtcompoffavailed').val();
    obj.Bereavementleave = ($('#txtbereavementleave').val() == "") ? "0" : $('#txtbereavementleave').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PayrollEmployeeLeave.aspx/Save',
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
    $('#hdfwdid').val('0');
    $('#txtpresent').val('0');
    $('#txtweeklyoff').val('0');
    $('#txtholidays').val('0');
    $('#txtonduty').val('0');
    $('#txtabsent').val('0');
    $('#txtunpaid').val('0');
    $('#txtcasualleave').val('0');
    $('#txtearnedleave').val('0');
    $('#txtsickleave').val('0');
    $('#txtmaternityleave').val('0');
    $('#txtrestricted').val('0');
    $('#txtextraworking').val('0');
    $('#txtcompoffearned').val('0');
    $('#txtcompoffavailed').val('0');
    $('#txtbereavementleave').val('0');
    $('#ddlstatus').val('true');
    PermissionDetail();
    $('#txtPresent').focus();
    BindAllComboBox();
    $("#btnadd").attr("value", "Add EmployeeLeave");

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/GetEmployeeLeaveDetail",
        data: JSON.stringify({}),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th> Employee Name</th><th> MonthDatail</th><th>Present</th><th>Unpaid</th><th>WeeklyOff</th><th>CL</th><th>EL</th><th>Comp.</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].WDID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].SlipID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                      //  " <a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].WDID + "' href='javascript:void();'> </a>"+
                      "</td>" +
                        "<td  class='" + activecolor + "'>" + data.d[i].EmployeeName + "</td><td class='" + activecolor + "'>" + data.d[i].MonthDetail + "</td><td class='" + activecolor + "'>" + data.d[i].Present + "</td><td class='" + activecolor + "'>" + data.d[i].Unpaid + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].WeeklyOff + "</td><td class='" + activecolor + "'>" + data.d[i].Casualleave + "</td><td class='" + activecolor + "'>" + data.d[i].EarnedLeave + "</td><td class='" + activecolor + "'>" + data.d[i].CompoffEarned + "</td>"+
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>EmployeeLeave Detail List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function BindEmployeeGrid(empID) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/GetEmployeeLeaveDetailByEmployeeID",
        data: JSON.stringify({ ID: empID }),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th> Employee Name</th><th> PaymentMode</th><th>Basic Salary</th><th>Bank Name</th><th>Account No</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].WDID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].SlipID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                      //  " <a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].WDID + "' href='javascript:void();'> </a>"+
                      "</td>" +
                        "<td  class='" + activecolor + "'>" + data.d[i].EmployeeName + "</td><td class='" + activecolor + "'>" + data.d[i].MonthDetail + "</td><td class='" + activecolor + "'>" + data.d[i].Present + "</td><td class='" + activecolor + "'>" + data.d[i].Unpaid + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].WeeklyOff + "</td><td class='" + activecolor + "'>" + data.d[i].Casualleave + "</td><td class='" + activecolor + "'>" + data.d[i].EarnedLeave + "</td><td class='" + activecolor + "'>" + data.d[i].CompoffEarned + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Employee Detail List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function BindEmployeeHeadGrid(empID, headid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/GetEmployeeLeaveDetailByEmployeeHeadID",
        data: JSON.stringify({ ID: empID, SlipID: headid }),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th> Employee Name</th><th> PaymentMode</th><th>Basic Salary</th><th>Bank Name</th><th>Account No</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].WDID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].SlipID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                      //  " <a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].WDID + "' href='javascript:void();'> </a>"+
                      "</td>" +
                        "<td  class='" + activecolor + "'>" + data.d[i].EmployeeName + "</td><td class='" + activecolor + "'>" + data.d[i].MonthDetail + "</td><td class='" + activecolor + "'>" + data.d[i].Present + "</td><td class='" + activecolor + "'>" + data.d[i].Unpaid + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].WeeklyOff + "</td><td class='" + activecolor + "'>" + data.d[i].Casualleave + "</td><td class='" + activecolor + "'>" + data.d[i].EarnedLeave + "</td><td class='" + activecolor + "'>" + data.d[i].CompoffEarned + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Employee Detail List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gv').dataTable({
        "iDisplayLength": -1,
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

function BindAllComboBox() {
    BindCombo($("#ddlhead"), "ddlhead");
    BindCombo($("#ddlemployee"), "ddlemployee");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeLeave.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: "PMSD" }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlhead") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlemployee") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.UserID).html(value.UserName));
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