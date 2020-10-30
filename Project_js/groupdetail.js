
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
        var navid = $(this).data("id");
        GetGroupByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var Groupid = $(this).data("id");
                DeleteGroup(Groupid);
                BindGrid();
            }
        }
    });
    $(document).on('change', '#txtcode', function () {
        if ($('#txtcode').val() != "") {
            var code = $('#txtcode').val();
            var path = "GroupDetail.aspx/CodeExist";
            var status = "";
            CodeAvailable(code, path);
        }
    });
    BindGrid();
    $('#txtcode').focus();
});

function DeleteGroup(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "GroupDetail.aspx/DeleteGroupByID",
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
function BindAllComboBox() {
    BindCombo($("#ddldepartment"), "ddldepartment");
    BindCombo($("#ddlgrouptype"), "ddlgrouptype");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "GroupDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddldepartment") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DepartmentID).html(value.DepartmentName));
                });
            } if (ControlName == "ddlgrouptype") {
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetGroupByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "GroupDetail.aspx/GetGroupByID",
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
    $('#hdfgroupid').val(response.d.GroupID);
    $('#txtcode').val(response.d.GroupCode);
    $('#txtgroup').val(response.d.Groupname);
    $('#ddldepartment').val(response.d.DepartmentID);
    $('#txtorderno').val(response.d.OrderNo);
    $('#ddlgrouptype').val(response.d.GroupType);
    $('#ddlsamplerequired').val(response.d.SampleRequired.toString());
    $('#ddlresulttype').val(response.d.ResultType);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Department Group");
}
function Save() {
    if ($("#txtcode").val() == "") {
        alertify.log("Code is required.");
        $("#txtcode").focus();
        return false;
    } if ($("#txtgroup").val() == "") {
        alertify.log("Group Name is required.");
        $("#txtgroup").focus();
        return false;
    } if ($("#txtorderno").val() == "") {
        alertify.log("Orderno is required.");
        $("#txtorderno").focus();
        return false;
    }

    var obj = {};
    obj.GroupID = $('#hdfgroupid').val();
    obj.GroupCode = $('#txtcode').val();
    obj.Groupname = $('#txtgroup').val();
    obj.DepartmentID = ($('#ddldepartment').val() == '') ? '0' : $('#ddldepartment').val();
    obj.OrderNo = ($('#txtorderno').val() == '') ? '0' : $('#txtorderno').val();
    obj.GroupType = ($('#ddlgrouptype').val() == null) ? '0' : $('#ddlgrouptype').val();
    obj.SampleRequired = ($('#ddlsamplerequired').val() == '') ? 'false' : $('#ddlsamplerequired').val(); 
    obj.ResultType = ($('#ddlresulttype').val() == null) ? '0' : $('#ddlresulttype').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'GroupDetail.aspx/Save',
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
    $('#hdfgroupid').val('0');
    $('#txtgroup').val('');
    $('#txtcode').val('');
    $('#ddlsamplerequired').val('false');
    $('#ddlresulttype').val('0');
    $('#txtorderno').val('');
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Department Group");

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "GroupDetail.aspx/GetGroupDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Code</th><th>Group</th><th>Department</th><th>ResultType</th><th>Order No</th><th>Sample Required</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var samplerequire = (data.d[i].SampleRequired == false) ? 'No' : 'Yes';
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';

                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                                "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].GroupID + "' href='javascript:void();'> Edit</a>" +
                                " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].GroupID + "' href='javascript:void();'> Delete</a>" +
                                " </div> </li></ul></div></td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].GroupCode + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].Groupname + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].DepartmentName + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].ResultType + "</td>" +
                                "<td class='" + activecolor + "'>" + data.d[i].OrderNo + "</td>" +
                                "<td class='"+ activecolor+"'>" + samplerequire + "</td>" +
                                "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th> Department Group List</th></tr></thead>");
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
