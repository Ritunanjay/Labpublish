
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
        BindGrid();
    });
    $(document).on("change", "#ddlemployee", function () {
        var employeeid = $('#ddlemployee').val();
        GetEmployeeDetailListByID(employeeid);
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetDetailListByID(navid);
    });
    BindGrid();
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteEmployee(id);
                BindGrid();
            }
        }
    });
});

function DeleteEmployee(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeDetail.aspx/DeleteEmployee",
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
        url: "PayrollEmployeeDetail.aspx/GetEmployeeDetailListByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
            if (response.d.EDID != 0)
                setValues(response);
            else
            {
                $('#hdfheadid').val('0');
                $('#txtbasicsalary').val('');
                $('#txtheaddetail').val('');
                $('#txtaccountno').val('');
                $('#txtamount').val('0');
                $('#txtbankname').val('0');
                $('#ddlstatus').val('true');
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
        url: "PayrollEmployeeDetail.aspx/GetEmployeeHeadByID",
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
    $('#txtbasicsalary').val(response.d.BasicSalary);
    $('#ddlhead').val(response.d.PaymentModeID);
    $('#txtamount').val(response.d.Amount);
    $('#txtbankname').val(response.d.BankName);
    $('#txtaccountno').val(response.d.AccountNo);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify EmployeeDetail");
}
function Save() {
    if ($("#txtbasicsalary").val() == "") {
        alertify.log("Basic Salary is required.");
        $("#txtbasicsalary").focus();
        return false;
    } 

    var obj = {};
    obj.EDID = $('#hdfheadid').val();
    obj.EmployeeID = $('#ddlemployee').val();
    obj.BasicSalary = $('#txtbasicsalary').val();
    obj.PaymentModeID = $('#ddlhead').val();
    obj.PaymentMode = $('#ddlhead :selected').text();
    obj.BankName = $('#txtbankname').val();
    obj.AccountNo = $('#txtaccountno').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PayrollEmployeeDetail.aspx/Save',
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
    $('#txtbasicsalary').val('');
    $('#txtheaddetail').val('');
    $('#txtaccountno').val('');
    $('#txtamount').val('0');
    $('#txtbankname').val('0');
     $('#ddlstatus').val('true');
    PermissionDetail();
    $('#txtcode').focus();
    BindAllComboBox();
    $("#btnadd").attr("value", "Add EmployeeDetail");

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeDetail.aspx/GetEmployeeHeadDetail",
        data: JSON.stringify({ }),
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
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].EDID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].EDID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                      //  " <a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].EDID + "' href='javascript:void();'> </a>"+
                      "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].EmployeeName + "</td><td class='" + activecolor + "'>" + data.d[i].PaymentMode + "</td><td class='" + activecolor + "'>" + data.d[i].BasicSalary + "</td><td class='" + activecolor + "'>" + data.d[i].BankName + "</td><td class='" + activecolor + "'>" + data.d[i].AccountNo + "</td><td class='" + activecolor + "'>" + active + "</td></tr>");
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
        url: "PayrollEmployeeDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
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