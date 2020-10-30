
$(document).ready(function () {
    PermissionDetail();
    $(document).on('click', '#chkaccess', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "Active";
        var TagValue = $(this).is(":checked");
        var SID = $(this).data('id')
          UpdatePermission(SID, Tag, TagValue);
        BindGrid();
    }); $(document).on('change', '#lnkdefaultvalue', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "Default Value";
        var TagValue = $(this).val();
        var SID = $(this).data('id')

        UpdatePermission(SID, Tag, TagValue);
        BindGrid();
    });
    $(document).on("change", "#ddloption", function () {
        BindCombo($("#ddlrole"), "ddlrole", $('#ddloption').val());
        BindGrid();
    });
    $(document).on("change", "#ddlrole", function () {
        BindGrid();
    });
    $(document).on("click", "#btnadd", function () {
        SaveSetting();
        BindGrid();
    });
    $(document).on("click", "#btnclear", function () {
     
        BindGrid();
    });
    
    BindAllComboBox();
    BindGrid();
});

function SaveSetting() {
    var RoleID;
    var UserID;
    if ($('#ddloption').val() == "role") {
        RoleID = $('#ddlrole').val();
        UserID = "0";
    }
    else {
        RoleID = "0";
        UserID = $('#ddlrole').val();
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SoftwareSetting.aspx/SavePermission",
        data: JSON.stringify({ RoleID: RoleID, UserID: UserID }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageName != "")
                alertify.success(response.d.MessageName)
            else
                alertify.danger(response.d.MessageName)

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
function BindAllComboBox() {
    BindCombo($("#ddlrole"), "ddlrole", $('#ddloption').val());
}
function BindCombo(ele, ControlName, type) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NavigationPermission.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, type: type }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlrole") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.RoleID).html(value.RoleName));
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
function Save() {
    var RoleID;
    var UserID;
    if ($('#ddloption').val() == "role") {
        RoleID = $('#ddlrole').val();
        UserID = "0";
    }
    else {
        RoleID = "0";
        UserID = $('#ddluser').val();
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SoftwareSetting.aspx/SavePermission",
        data: JSON.stringify({ RoleID: RoleID, UserID: UserID }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageName != "")
                alertify.success(response.d.MessageName)
            else
                alertify.danger(response.d.MessageName)

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
function UpdatePermission(SID, Tag, TagValue) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SoftwareSetting.aspx/UpdatePermissionDetail",
        data: JSON.stringify({ SID: SID, Tag: Tag, TagValue: TagValue }),
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
            if (response.d.MessageName == "" || response.d.MessageName == null)
                LMSMessage("", "Setting Change Done", "success")
            else
                LMSMessage("", response.d.MessageName, "info")

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
function BindGrid() {
    var RoleID;
    var UserID;
    if ($('#ddloption').val() == "role") {
        RoleID = $('#ddlrole').val();
        UserID = "0";
    }
    else {
        RoleID = "0";
        UserID = $('#ddlrole').val();
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SoftwareSetting.aspx/GetPermissionDetail",
        data: JSON.stringify({ RoleID: RoleID, UserID: UserID }),
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
            $("#gv").append("<thead><tr><th style='display:none'>SNo.</th><th>Setting Code</th><th>Setting Detail </th><th style='display:none'>Status</th><th>On/Off </th><th>Information </th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var Access = (data.d[i].Active == true) ? 'checked' : '';
                var coloraccess = (data.d[i].Active == true) ? 'success' : 'danger';
                $("#gv").append("<tr><td style='display:none'>" + data.d[i].SettingPermissionID + "</td>" +
                    "<td  class='" + coloraccess + "'>" + data.d[i].SettingCode + "</td>" +
                    "<td  class='" + coloraccess + "'>" + data.d[i].SettingDetail + "</td>" +
                    "<td style='display:none'>" + data.d[i].Active + "</td>" +
                    "<td class='" + coloraccess + "'><input type='checkbox' class='form-control' id='chkaccess' " + Access + " data-id=" + data.d[i].SettingPermissionID + "></td>" +
                    "<td  class='" + coloraccess + "' style='width:20%'><input type='text' value='" + data.d[i].DefaultValue + "' class='form-control' id='lnkdefaultvalue' data-id=" + data.d[i].SettingPermissionID + " /></td>" +
                    "</tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Setting List</th></tr></thead>");
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
