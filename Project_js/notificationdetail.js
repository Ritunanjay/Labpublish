
$(document).ready(function () {
   BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
      
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    SetCurrentTime($('#txttime'));
    getserverdate1($('#txtdate'));
    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetNotificationByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False")
        {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else
        {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {
                DeleteNotificationByID(navid);
                BindGrid();
            }
        }
    });
    BindGrid();
    PermissionDetail();
    $('#txtnotificationhead').focus();
});

function BindAllComboBox() {
    BindCombo($("#ddlrole"), "ddlrole");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NotificationDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
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
function GetNotificationByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NotificationDetail.aspx/GetNotificationByID",
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

function DeleteNotificationByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NotificationDetail.aspx/DeleteNotificationByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                LMSMessage('', 'Record Delete Done','success');
            }
            else {
                LMSMessage('', 'Record Safe Done', 'info');
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
function setValues(response) {
    $('#hdfnotificationid').val(response.d.NotificationID);
    $('#ddlrole').val(response.d.RoleID);
    $('#txtnotificationhead').val(response.d.NotificationIcon);
    $('#txtnotification').val(response.d.Notification);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Update Notification");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {
    if ($("#txtnotificationhead").val() == "") {
        alertify.log("Notification Head is required.");
        $("#txtnotificationhead").focus();
        return false;
    }
    if ($("#txtnotification").val() == "") {
        alertify.log("Notification is required.");
        $("#txtnotification").focus();
        return false;
    }
   

    var obj = {};
    obj.NotificationID = $('#hdfnotificationid').val();
    obj.RoleID = $('#ddlrole').val();
    obj.Notification = $('#txtnotification').val();
    obj.NotificationDate =$('#txtdate').val();
    obj.NotificationTime = $('#txttime').val();
    obj.Active = $('#ddlstatus').val();
    obj.NotificationIcon = $('#txtnotificationhead').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'NotificationDetail.aspx/Save',
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
    $('#txtnotificationhead').val('');
    SetCurrentTime($('#txttime'));
    getserverdate1($('#txtdate'));
    $('#hdfnotificationid').val('0');
    $('#txtnotification').val('');
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Notification");
    $("#btnadd").attr('AccessKey', 'A');
    $('#txtnotificationhead').focus();
    BindGrid();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NotificationDetail.aspx/GetNotificationDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Designation</th><th>Subject</th><th>Notification</th><th>NotificationDate</th><th>NotificationTime</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var Active = (data.d[i].Active == false) ? "Not Use" : "Use";
                var Activecolor = (data.d[i].Active == false) ? "danger" : "success";

                $("#gv").append("<tr><td class='" + Activecolor + "'>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                     " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                      " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].NotificationID + "' href='javascript:void();'> Edit</a>" +
      " </div> </li><li id='btndelete'> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].NotificationID + "' href='javascript:void();'> Delete</a>" +
      " </div> </li></ul></div></td>" +
        
 "<td class='" + Activecolor + "'>" + data.d[i].RoleName + "</td>" +
 "<td class='" + Activecolor + "'>" + data.d[i].NotificationIcon + "</td>" +
 "<td class='" + Activecolor + "'>" + data.d[i].Notification + "</td>" +
 "<td class='" + Activecolor + "'>" + data.d[i].NotificationDate + "</td>" +
 "<td class='" + Activecolor + "'>" + data.d[i].NotificationTime + "</td>" +
                    "<td class='" + Activecolor + "'>" + Active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Notification Information List</th></tr></thead>");
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
