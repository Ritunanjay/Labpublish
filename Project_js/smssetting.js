
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on("click", ".lnkedit", function () {
        var id = $(this).data("id");
        GetSMSByID(id);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var settingid = $(this).data("id");
                DeleteSMSSetting(settingid);
                BindGrid();
            }
        }
    });
    BindGrid();
    $('#txtsenderid').focus();
});

function DeleteSMSSetting(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SMSSetting.aspx/DeleteSMSSetting",
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
function GetSMSByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SMSsetting.aspx/GetSMSByID",
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
    $('#hdfsmssettingid').val(response.d.SMSSettingID);
    $('#txtsenderid').val(response.d.SenderID);
    $('#txtusername').val(response.d.APIUserName);
    $('#txtpassword').val(response.d.APIPassword);
    $('#txturl').val(response.d.URL);
    $('#txturlparameter').val(response.d.URLParameter);
    $('#txtpsplit').val(response.d.PSplit);
    $('#txtsuccesscode').val(response.d.SuccessCode);
    $('#ddlcentre').val(response.d.CentreID);

    $('#ddlisdefault').val(response.d.IsDefault.toString());
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    $("#btnadd").attr("value", "Modify SMSSetup");
}
function Save() {
    if ($("#txtsenderid").val() == "") {
        alertify.log("SenderID is required.");
        $("#txtsenderid").focus();
        return false;
    } if ($("#txtpassword").val() == "") {
        alertify.log("Password is required.");
        $("#txtpassword").focus();
        return false;
    } if ($("#txtusername").val() == "") {
        alertify.log("Username is required.");
        $("#txtusername").focus();
        return false;
    } if ($("#txturl").val() == "") {
        alertify.log("Url is required.");
        $("#txturl").focus();
        return false;
    } if ($("#txturlparameter").val() == "") {
        alertify.log("Url Detail is required.");
        $("#txturlparameter").focus();
        return false;
    }

    var obj = {};
    obj.SMSSettingID = $('#hdfsmssettingid').val();
    obj.SenderID = $('#txtsenderid').val();
    obj.APIUserName = $('#txtusername').val();
    obj.APIPassword = $('#txtpassword').val();
    obj.URL = $('#txturl').val();
    obj.URLParameter = $('#txturlparameter').val();
    obj.PSplit = $('#txtpsplit').val();
    obj.SuccessCode = $('#txtsuccesscode').val();
    obj.CentreID = $('#ddlcentre').val();

    obj.IsDefault = $('#ddlisdefault').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'SMSsetting.aspx/Save',
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
    $('#hdfsmssettingid').val('0');
    $('#txtsenderid').val('');
    $('#txtpassword').val('');
    $('#txturl').val('');
    $('#txturlparameter').val('');
    $('#txtpsplit').val('');
    $('#txtsuccesscode').val('');
    $('#ddlisdefault').val('true');
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add SMSSetup");
    BindAllComboBox();
    $('#txtsenderid').focus();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SMSsetting.aspx/GetSMSDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Centre</th><th>SenderID</th><th>URL</th><th>URLParameter</th><th>PSplit</th><th>Success Code</th><th>IsDefault</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                var defaultSMS = (data.d[i].IsDefault == false) ? 'No' : 'Yes';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].SMSSettingID + "' href='javascript:void();'> Edit</a>" +
                    " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].SMSSettingID + "' href='javascript:void();'> Delete</a>" +
                    " </div> </li></ul></div></td>" +
                    "<td class='" + activecolor + "'>" + data.d[i].CentreName + "</td><td class='" + activecolor + "'>" + data.d[i].SenderID + "</td><td class='" + activecolor + "'>" + data.d[i].URL + "</td><td class='" + activecolor + "'>" + data.d[i].URLParameter + "</td><td class='" + activecolor + "'>" + data.d[i].PSplit + "</td>" +
                    "<td class='" + activecolor + "'>" + data.d[i].SuccessCode + "</td><td class='" + activecolor + "'>" + defaultSMS + "</td>" +
                    "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>SMSSetup List</th></tr></thead>");
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

function BindAllComboBox() {
    BindCombo($("#ddlcentre"), "ddlcentre", '');
    BindCombo($("#ddlSMStype"), "ddlSMStype", 'ET');
}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SMSsetting.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddlSMStype") {
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