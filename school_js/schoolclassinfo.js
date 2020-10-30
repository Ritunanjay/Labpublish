
$(document).ready(function () {
    PermissionDetail();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on('change', '#txtcode', function () {
        if ($('#txtcode').val() != "") {
            var code = $('#txtcode').val();
            var path = "SchoolClassDetail.aspx/CodeExist";
            var status = "";
            CodeAvailable(code, path);
        }
    });
    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetClassByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {
                DeleteClassByID(navid);
                BindGrid();
            }
        }
    });
    BindGrid();
    $('#txtcode').focus();
});

function DeleteClassByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassDetail.aspx/DeleteClassByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                LMSMessage('', 'Record Delete Done', 'success');
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetClassByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassDetail.aspx/GetClassByID",
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
    alertify.log(response.d.ClassID);
    $('#hdfclassid').val(response.d.ClassID);
    $('#txtcode').val(response.d.ClassCode);
    $('#txtclass').val(response.d.ClassName);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Class");
}
function Save() {
    if ($("#txtcode").val() == "") {
        alertify.log("Code is required.");
        $("#txtcode").focus();
        return false;
    } if ($("#txtclass").val() == "") {
        alertify.log("Class is required.");
        $("#txtclass").focus();
        return false;
    }

    var obj = {};
    obj.ClassID = $('#hdfclassid').val();
    obj.ClassCode = $('#txtcode').val();
    obj.ClassName = $('#txtclass').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'SchoolClassDetail.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                LMSMessage('', response.d.MessageName, 'success');
                ClearRecord();
            }
            else
                LMSMessage('', response.d.MessageName, 'info');
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
    $('#hdfclassid').val('0');
    $('#txtcode').val('');
    $('#txtclass').val('');
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Class");
    $("#btnadd").attr('AccessKey', 'A');
    $('#txtcode').focus();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassDetail.aspx/GetClassDetail",
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
            $("#gv").append("<thead><tr><th>Action</th><th>Class Code</th><th>Class Name</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Used' : 'Used';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].ClassID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li>" +
                         "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].ClassID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                       "</td>" +
                        "<td  class='" + activecolor + "'>" + data.d[i].ClassCode + "</td><td  class='" + activecolor + "'>" + data.d[i].ClassName + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>School Class List</th></tr></thead>");
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
