
$(document).ready(function () {
    PermissionDetail();

    $(document).on("click", "#btnpermissionaccess", function () {
        SavePermission();
        BindGrid();
    });
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on("change", "#ddlrole", function () {
        BindGrid();
    });
    $(document).on("change", "#ddloption", function () {
        BindCombo($("#ddlrole"), "ddlrole", $('#ddloption').val());
        BindGrid();
    });
 
    $(document).on("change", "#ddltype", function () {
        BindGrid();
    });
    $(document).on('click', '#chkaccess', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "P_Access";
        var TagValue = $(this).is(":checked");
        var NavigationID = $(this).closest("tr").find('td:eq(0)').text()

        UpdatePermission(NavigationID, Tag, TagValue);
    });
    $(document).on('click', '#chkadd', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "P_Save";
        var TagValue = $(this).is(":checked");
        var NavigationID = $(this).closest("tr").find('td:eq(0)').text()

        UpdatePermission(NavigationID, Tag, TagValue);
    });
    $(document).on('click', '#chkupdate', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "P_Update";
        var TagValue = $(this).is(":checked");
        var NavigationID = $(this).closest("tr").find('td:eq(0)').text()
        UpdatePermission(NavigationID, Tag, TagValue);
    });
    $(document).on('click', '#chkdelete', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "P_Delete";
        var TagValue = $(this).is(":checked");
        var NavigationID = $(this).closest("tr").find('td:eq(0)').text()
        UpdatePermission(NavigationID, Tag, TagValue);
    });
    $(document).on('click', '#chkprint', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var Tag = "P_Print";
        var TagValue = $(this).is(":checked");
        var NavigationID = $(this).closest("tr").find('td:eq(0)').text()
        UpdatePermission(NavigationID, Tag, TagValue);
    });
    BindAllComboBox();
    BindGrid();
});
function ClearRecord() {
    BindGrid();
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
        UserID = $('#ddlrole').val();
    }
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NavigationPermission.aspx/SavePermission",
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
function UpdatePermission(NavigationID, Tag, TagValue) {
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
        url: "NavigationPermission.aspx/UpdatePermissionDetail",
        data: JSON.stringify({ RoleID: RoleID, UserID: UserID, NavigationID: NavigationID, Tag: Tag, TagValue: TagValue }),
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
        url: "NavigationPermission.aspx/GetPermissionDetail",
        data: JSON.stringify({ RoleID: RoleID, UserID: UserID, Status: $('#ddltype').val() }),
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
            $("#gv").append("<thead><tr><th style='display:none'></th><th class='center'>Navigation</th><th class='center'>Access </th><th class='center'>Add </th><th class='center'>Modify </th><th class='center'>Delete </th><th class='center'>Print </th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var Access = (data.d[i].Access == true) ? "Access <input type='checkbox' class='form-control' id='chkaccess' checked>" : "Denied <input type='checkbox' class='form-control' id='chkaccess' />";
                var Save = (data.d[i].Save == true) ? "Access <input type='checkbox' class='form-control' id='chkadd' checked>" : "Denied <input type='checkbox' class='form-control' id='chkadd' />";
                var Update = (data.d[i].Update == true) ? "Access <input type='checkbox' class='form-control' id='chkupdate'  checked >" : "Denied <input type='checkbox' class='form-control' id='chkupdate' />";
                var Delete = (data.d[i].Delete == true) ? "Access <input type='checkbox' class='form-control' id='chkdelete' checked />" : "Denied <input type='checkbox' class='form-control' id='chkdelete' />";
                var Print = (data.d[i].Print == true) ? "Access <input type='checkbox' class='form-control' id='chkprint' checked />" : "Denied <input type='checkbox' class='form-control' id='chkprint' >";
                var coloraccess = "danger";
                if (data.d[i].Access == true)
                    coloraccess = "success";
                var colorsave = "danger";
                if (data.d[i].Save == true)
                    colorsave = "success";
                var colorupdate = "danger";
                if (data.d[i].Update == true)
                    colorupdate = "success";
                var colordelete = "danger";
                if (data.d[i].Delete == true)
                    colordelete = "success";
                var colorprint = "danger";
                if (data.d[i].Print == true)
                    colorprint = "success";
                if (data.d[i].MainMenuID == "0") {
                    Save = "<label class='label label-danger' >Main Menu</label>";
                    Update = "<label class='label label-danger' >Main Menu</label>";
                    Delete = "<label class='label label-danger' >Main Menu</label>";
                    Print = "<label class='label label-danger' >Main Menu</label>";
                }

                var status = (data.d[i].ParentID == "0") ? "none" : "";
                $("#gv").append("<tr><td style='display:none'>" + data.d[i].NavigationID + "</td>" +
                    "<td  class='warning' style='font-weight:bold'>" + data.d[i].Navigation + "</td>" +
                    "<td class='" + coloraccess + "'>" + Access + "</td>" +
                    "<td class='" + colorsave + "'> " + Save + "</td>" +
                    "<td class='" + colorupdate + "'>" + Update + "</td>" +
                    "<td class='" + colordelete + "'>" + Delete + "</td>" +
                    "<td class='" + colorprint + "'>" + Print + "</td></tr>");

            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Navigation Permission List</th></tr></thead>");
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
function SavePermission() {
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
        url: "NavigationPermission.aspx/UpdatePermissionAccess",
        data: JSON.stringify({ RoleID: RoleID, UserID: UserID, TypeID: $('#ddlpermission').val(), PType: $('#ddlpermissiontype').val() }),
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