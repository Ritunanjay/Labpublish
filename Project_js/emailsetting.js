
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on('click', "#passwordview", function () {
        if ($("#passwordview").val() == "Show") {
            $('#txtpassword').prop('type', 'text');
            $("#passwordview").val('Hide');
        }
        else {
            $('#txtpassword').prop('type', 'password');
            $("#passwordview").val('Show');
        }
    });
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    //$(document).on('change', '#ddlisdefault', function () {
    //    if ($('#ddlisdefault').val() !=true) {
    //         CodeAvailable();
    //                 }
    //});
    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetEmailByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var settingid = $(this).data("id");
                DeleteEmailSetting(settingid);
                BindGrid();
            }
        }
    });
    BindGrid();
});

function DeleteEmailSetting(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailSetting.aspx/DeleteEmailSetting",
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
function CodeAvailable() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailSetting.aspx/CodeExist",
        data: JSON.stringify({ Code: "" }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $('#ddlisdefault').val('false');
                alertify.error('Sorry ! Default Exists');
            } else
                return "OK";
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
function GetEmailByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailSetting.aspx/GetEmailByID",
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
    $('#hdfemailsetupid').val(response.d.EmailSetupID.toString());
    $('#ddlemailtype').val(response.d.EmailTypeID.toString());
    $('#txtemailid').val(response.d.EmailID.toString());
    $('#txtpassword').val(response.d.Password.toString());
    $('#txtsmtp').val(response.d.SMTP.toString());
    $('#txtport').val(response.d.Port.toString());
    $('#ddlisdefault').val(response.d.IsDefault.toString());
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    $("#btnadd").attr("value", "Modify EmailSetup");
}
function Save() {
    if ($("#txtemailid").val() == "") {
        alertify.log("EmailID is required.");
        $("#txtemailid").focus();
        return false;
    } if ($("#txtpassword").val() == "") {
        alertify.log("Password is required.");
        $("#txtpassword").focus();
        return false;
    } if ($("#txtsmtp").val() == "") {
        alertify.log("SMTP is required.");
        $("#txtsmtp").focus();
        return false;
    } if ($("#txtport").val() == "") {
        alertify.log("Port is required.");
        $("#txtport").focus();
        return false;
    }
    //if ($('#ddlisdefault').val() != true) {
    //    CodeAvailable();
    //}
    var obj = {};
    obj.EmailSetupID = $('#hdfemailsetupid').val();
    obj.EmailTypeID = $('#ddlemailtype').val();
    obj.CentreID = $('#ddlcentre').val();
    obj.EmailID = $('#txtemailid').val();
    obj.Password = $('#txtpassword').val();
    obj.SMTP = $('#txtsmtp').val();
    obj.Port = $('#txtport').val();
    obj.IsDefault = $('#ddlisdefault').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'EmailSetting.aspx/Save',
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
    $('#hdfemailsetupid').val('0');
    $('#txtemailid').val('');
    $('#txtpassword').val('');
    $('#txtsmtp').val('');
    $('#txtport').val('');
    $('#ddlisdefault').val('true');
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add EmailSetup");
    BindAllComboBox();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailSetting.aspx/GetEmailDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Centre</th><th>EmailType</th><th>EmailID</th><th>SMTP</th><th>Port</th><th>IsDefault</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                var defaultemail = (data.d[i].IsDefault == false) ? 'No' : 'Yes';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].EmailSetupID + "' href='javascript:void();'> Edit</a>" +
                    " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].EmailSetupID + "' href='javascript:void();'> Delete</a>" +
                    " </div> </li></ul></div></td>" +
                    "<td class='" + activecolor + "'>" + data.d[i].CentreName + "</td><td class='" + activecolor + "'>" + data.d[i].EmailType + "</td><td class='" + activecolor + "'>" + data.d[i].EmailID + "</td><td class='" + activecolor + "'>" + data.d[i].SMTP + "</td>" +
                    "<td class='" + activecolor + "'>" + data.d[i].Port + "</td><td class='" + activecolor + "'>" + defaultemail + "</td>" +
                    "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>EmailSetup List</th></tr></thead>");
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
    BindCombo($("#ddlemailtype"), "ddlemailtype", 'ET');
}
function BindCombo(ele, ControlName,code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "EmailSetting.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName ,Code:code}),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddlemailtype") {
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