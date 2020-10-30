
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
        if ($('#ddlnavigationType').val() == "0") {
            BindGrid("#");
        } else {
            BindGrid("");
        }
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetNavigationByID(navid);
    });
    $(document).on("change", "#ddlnavigationType", function () {
        if ($('#ddlnavigationType').val() == "0")
            BindGrid("#");
        else
            BindGrid("");

    });
    $("#txtnavigation").focus();
    BindGrid("#");
});
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetNavigationByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NavigationDetail.aspx/GetNavigationByID",
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
    debugger;
    $('#hdfnavigationid').val(response.d.NavigationID);
    $('#txtnavigation').val(response.d.Navigation);
    $('#ddlicon').val(response.d.Icon);
    $('#txtpath').val(response.d.Path);
    if (response.d.Path == '#') {
        $('#ddlnavigationType').prop('selectedIndex', 0);
        $('#ddlicon').val(response.d.Icon);
    } if (response.d.Path != '#') {
        $('#ddlicon').prop('selectedIndex', 0);
        $('#ddlnavigationType').prop('selectedIndex', 1);
    }
    $('#txttitle').val(response.d.Title);
    $('#ddlstatus').val(response.d.Active.toString());
   $('#txtorder').val(response.d.OrderNo);
    $('#ddlmainmenu').val(response.d.MainMenuID.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    $("#btnadd").attr("value", "Modify Navigation");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {
    if ($("#txtnavigation").val() == "") {
        alertify.log("Navigation Name is required.");
        $("#txtnavigation").focus();
        return false;
    }
    if ($("#txtpath").val() == "") {
        alertify.log("Navigation Path is required.");
        $("#txtpath").focus();
        return false;
    }
    if ($("#txttitle").val() == "") {
        alertify.log("Title is required.");
        $("#txttitle").focus();
        return false;
    } if ($("#txtorder").val() == "") {
        alertify.log("Navigation Order is required.");
        $("#txtorder").focus();
        return false;
    }

    if ($("#ddlnavigationType").val() == "1" && $('#ddlmainmenu').val()=="0") {
        alertify.log("Please Select Main Navigation Detail First.");
        $("#txtorder").focus();
        return false;
    }

    var obj = {};
    obj.NavigationID = $('#hdfnavigationid').val();
    obj.Navigation = $('#txtnavigation').val();
    obj.Icon = $('#ddlicon').val();
    obj.Path = $('#txtpath').val();
    obj.Title = $('#txttitle').val();
    obj.OrderNo = $('#txtorder').val();
    obj.Active = $('#ddlstatus').val();
    if ($('#ddlnavigationType').val() == "0")
        obj.MainMenuID = 0;
    else
        obj.MainMenuID = $('#ddlmainmenu').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'NavigationDetail.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearRecord();
            }
            else
                alertify.error("Software Damage");
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
    $('#hdfnavigationid').val('0');
    $('#txtnavigation').val('');
    $('#txtpath').val('');
    $('#ddlstatus').val('true');
    $('#ddlnavigationType').val('0');
    BindAllComboBox();
    BindGrid("#");
    $('#txtorder').val('0');
    $("#btnadd").attr("value", "Add Navigation");
    $("#btnadd").attr('AccessKey', 'A');
}
function BindAllComboBox() {
    BindCombo($("#ddlmainmenu"), "ddlmainmenu");
    BindCombo($("#ddlicon"), "ddlicon");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NavigationDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlmainmenu") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.NavigationID).html(value.Navigation));
                });
            }
            if (ControlName == "ddlicon") {
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

function BindGrid(filter) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "NavigationDetail.aspx/GetMenuDetail",
        data: JSON.stringify({ filter: filter }),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Order No</th><th>Head Navigation</th><th>Navigation</th><th>Icon</th><th>Title</th><th>Path</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var Active = (data.d[i].Active == false) ? "Not Use" : "Use";
                var Activecolor = (data.d[i].Active == false) ? "danger" : "success";
                if (data.d[i].Path == "#") {
                    $("#gv").append("<tr><td>" +
                               //              "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                               //               " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                               //                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                               //              "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                               //                  "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].NavigationID + "' href='javascript:void();'> Edit</a>" +
                               //" </div> </li></ul></div>"+
                               "<a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].NavigationID + "' href='javascript:void();'> </a></td>" +
                               "<td class='" + Activecolor + "'>" + data.d[i].OrderNo + "</td><td class='" + Activecolor + "'>Main Navigation</td><td class='" + Activecolor + "'>" + data.d[i].Navigation + "</td>" +
                               "<td class='" + Activecolor + "'>" + data.d[i].Icon + "</td><td class='" + Activecolor + "'>" + data.d[i].Title + "</td><td class='" + Activecolor + "'>" + data.d[i].Path + "</td><td class='" + Activecolor + "'>" + Active + "</td></tr>");
                }
                else {
                    $("#gv").append("<tr><td>" +
                                //              "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                                //               " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                                //                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                                //              "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                //                  "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].NavigationID + "' href='javascript:void();'> Edit</a>" +
                                //" </div> </li></ul></div>"+
                                "<a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].NavigationID + "' href='javascript:void();'> </a></td>" +
                                "<td class='" + Activecolor + "'>" + data.d[i].OrderNo + "</td><td class='" + Activecolor + "'>" + data.d[i].MainMenu + "</td><td class='" + Activecolor + "'>" + data.d[i].Navigation + "</td>" +
                                "<td class='" + Activecolor + "'>Arrow</td><td class='" + Activecolor + "'>" + data.d[i].Title + "</td><td class='" + Activecolor + "'>" + data.d[i].Path + "</td><td class='" + Activecolor + "'>" + Active + "</td></tr>");
                }
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Navigation List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gv').dataTable({
        "iDisplayLength": 15,
        "aLengthMenu": [[15, 25, 50, 100, -1], [15, 25, 50, 100, "All"]],
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
