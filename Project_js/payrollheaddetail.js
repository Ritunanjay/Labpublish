
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    }); $(document).on("change", "#ddlhead", function () {
        BindGrid();
    });
    $(document).on('change', '#txtcode', function () {
        if ($('#txtcode').val() != "") {
            var code = $('#txtcode').val();
            var path = "PayrollHead.aspx/CodeExist";
            var status = "";
            CodeAvailable(code, path);

        }
    });
    $("#txtpercentage").keyup(function (e) {
        if ($("#txtpercentage").val() == "" || $("#txtpercentage").val() <= 0 || isNaN($("#txtpercentage").val()))
            $("#txtpercentage").val("0");
        else
            if ($("#txtpercentage").val().substring(0, 1) == '0') $("#txtpercentage").val($("#txtpercentage").val().substring(1));
        if ($("#txtpercentage").val() > 100) {
            alertify.log('Percentage should not be greater than 100');
            $("#txtpercentage").val('0');
        }
       
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
                DeletePayrollHeadByID(id);
                BindGrid();
            }
        }
    });
    BindGrid();

});

function DeletePayrollHeadByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Payrollhead.aspx/DeletePayrollHeadByID",
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
function GetDetailListByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Payrollhead.aspx/GetPayrollHeadDetailByID",
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
    $('#hdfheaddetailid').val(response.d.WHDID);
    $('#ddlhead').val(response.d.TypeID);
    $('#txtcode').val(response.d.WorkHeadCode);
    $('#txtheaddetail').val(response.d.WorkHeadDetail);
    $('#txtamount').val(response.d.Amount);
    $('#txtpercentage').val(response.d.Percentage);
    $('#txtoption1').val(response.d.Option1);
    $('#txtoption2').val(response.d.Option2);
    $('#txtoption3').val(response.d.Option3);
    $('#txtoption4').val(response.d.Option4);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Head");
}
function Save() {
    if ($("#txtcode").val() == "") {
        alertify.log("Code is required.");
        $("#txtcode").focus();
        return false;
    } if ($("#txtheaddetail").val() == "") {
        alertify.log("Head Detail is required.");
        $("#txtheaddetail").focus();
        return false;
    }

    var obj = {};
    obj.WHDID = $('#hdfheaddetailid').val();
    obj.TypeID = $('#ddlhead').val();
    obj.WorkHeadCode = $('#txtcode').val();
    obj.WorkHeadDetail = $('#txtheaddetail').val();
    obj.Amount = ($('#txtamount').val() == "") ? "0" : $('#txtamount').val();
    obj.Percentage = ($('#txtpercentage').val() == "") ? "0" : $('#txtpercentage').val();
    obj.Option1 = $('#txtoption1').val();
    obj.Option2 = $('#txtoption2').val();
    obj.Option3 = $('#txtoption3').val();
    obj.Option4 = $('#txtoption4').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Payrollhead.aspx/Save',
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
    $('#hdfheaddetailid').val('0');
    $('#txtcode').val('');
    $('#txtheaddetail').val('');
    $('#txtamount').val('0');
    $('#txtpercentage').val('0');
    $('#txtoption1').val('');
    $('#txtoption2').val('');
    $('#txtoption3').val('');
    $('#txtoption4').val('');
    $('#ddlstatus').val('true');
    PermissionDetail();
    $('#txtcode').focus();
    BindAllComboBox();
    $("#btnadd").attr("value", "Add Head");

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Payrollhead.aspx/GetPayrollHeadDetail",
        data: JSON.stringify({ ID: $('#ddlhead').val() }),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th> Head</th><th>Head Detail</th><th>Amount</th><th>Percentage</th><th>Option1</th><th>Option2</th><th>Option3</th><th>Option4</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='"+activecolor+"'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].WHDID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].WHDID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                      //  " <a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].WHDID + "' href='javascript:void();'> </a></td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].WorkHeadCode + "</td><td class='" + activecolor + "'>" + data.d[i].WorkHeadDetail + "</td><td class='" + activecolor + "'>" + data.d[i].Amount + "</td><td class='" + activecolor + "'>" + data.d[i].Percentage + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].Option1 + "</td><td class='" + activecolor + "'>" + data.d[i].Option2 + "</td><td class='" + activecolor + "'>" + data.d[i].Option3 + "</td><td class='" + activecolor + "'>" + data.d[i].Option4 + "</td><td class='" + activecolor + "'>" + active + "</td></tr>");
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
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Payrollhead.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlhead") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadID).html(value.HeadName));
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