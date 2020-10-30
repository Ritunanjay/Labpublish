
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        if ($('#ddlhead').val() != "0") {
            var slipid = $('#ddlhead').val();
            GeneratePaySlipForEmployee(slipid);
            var id = $('#ddlhead').val();
            BindGrid(id);
        }
        else {
        alertify.log('Please Select Slip Detail!')}
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });


    $(document).on("change", "#ddlhead", function () {
        var id = $(this).val();
        BindGrid(id);
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        var status = $(this).is(':checked');
        UpdateEmployeeSlipDetail(navid,status);
    });
    //BindGrid();

});
function UpdateEmployeeSlipDetail(id,status)
{
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeWorkingGeneration.aspx/UpdateEmployeeSlipDetail",
        data: JSON.stringify({ ID: id, Status: status }),
        dataType: "json",
        async: false,
        success: function (response) {
            
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

function GeneratePaySlipForEmployee(slipid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeWorkingGeneration.aspx/GeneratePaySlipForEmployee",
        data: JSON.stringify({ SlipID:slipid }),
        dataType: "json",
        async: false,
        success: function (response) {
          
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
function GetEmployeeDetailListByID(empid, id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeWorkingGeneration.aspx/GetEmployeeDetailListByID",
        data: JSON.stringify({ EMPID: empid, ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.EDID != 0)
                setValues(response);
            else {
                $('#hdfheadid').val('0');
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
function GetDetailListByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeWorkingGeneration.aspx/GetPayrollHeadDetailByID",
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
function setValues(response) {
    $('#hdfheadid').val(response.d.EDID);
    $('#ddlemployee').val(response.d.EmployeeID);
    $('#ddlhead').val(response.d.WDID);
    $('#txtamount').val(response.d.Amount);
    $('#txtpercentage').val(response.d.Percentage);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Update");
    $("#btnadd").attr('AccessKey', 'U');
}
function Save() {


    var obj = {};
    obj.EDID = $('#hdfheadid').val();
    obj.EmployeeID = $('#ddlemployee').val();
    obj.WDID = $('#ddlhead').val();
    obj.Amount = $('#txtamount').val();
    obj.Percentage = $('#txtpercentage').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PayrollEmployeeWorkingGeneration.aspx/Save',
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
    $('#hdfheadid').val('0');
    $('#txtamount').val('0');
    $('#txtpercentage').val('0');
    $('#ddlstatus').val('true');
    PermissionDetail();
    $('#ddlemployee').focus();
    BindAllComboBox();
    $("#btnadd").attr("value", "Add");
    var id = $('#ddlhead').val();
    BindGrid(id);
}
function BindGrid(id) {
    var empid = $('#ddlemployee').val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeWorkingGeneration.aspx/GetPayrollEmployeeDetail",
        data: JSON.stringify({ID:id }),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Slip</th><th> Employee Name</th><th>Mobile</th><th>EmailID</th><th>Basic Salary</th><th>Address</th><th>DOJ</th><th>FatherName</th><th>MotherName</th><th>PaymentMode</th><th>BankName</th><th>AccountNo</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? '' : 'checked';
                var slipstatus = (data.d[i].GenerateSlip == false) ? '' : 'none';
                var slipcolor = (data.d[i].GenerateSlip == false) ? 'danger' : 'success';
                var slip = (data.d[i].GenerateSlip == false) ? 'Not Generated' : 'Generated';
                $("#gv").append("<tr><td class='" + slipcolor + "'>" +
                        //"<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        //" <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        //" <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        //"<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        //"  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].HeadDetailID + "' href='javascript:void();'> Edit</a>" +
                        //" </div> </li></ul></div>"+
                        "<input type='checkbox' class='form-control lnkedit' " + active + " style='font-size:large;display:"+slipstatus+"' data-id='" + data.d[i].UserID + "' href='javascript:void();' /></td>" +
                        "<td  class='" + slipcolor + "'>" + slip + "</td><td  class='" + slipcolor + "'>" + data.d[i].FullName + "</td><td  class='" + slipcolor + "'>" + data.d[i].Mobile + "</td><td  class='" + slipcolor + "'>" + data.d[i].EmailID + "</td><td class='" + slipcolor + "'>" + data.d[i].BasicSalary + "</td><td class='" + slipcolor + "'>" + data.d[i].Address + "</td><td class='" + slipcolor + "'>" + data.d[i].DOJ + "</td>" +
                        "<td class='" + slipcolor + "'>" + data.d[i].FatherName + "</td><td class='" + slipcolor + "'>" + data.d[i].MotherName + "</td>" +
                        "<td class='" + slipcolor + "'>" + data.d[i].PaymentMode + "</td><td class='" + slipcolor + "'>" + data.d[i].BankName + "</td><td  class='" + slipcolor + "'>" + data.d[i].AccountNo + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Head Detail List</th></tr></thead>");
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
        url: "PayrollEmployeeWorkingGeneration.aspx/BindComboBox",
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