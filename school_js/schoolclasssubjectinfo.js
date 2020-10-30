
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();

    $(document).on("change", "#ddlclass", function () {
        BindCombo($("#ddlsection"), "ddlsection");
        BindCombo($("#ddlsubject"), "ddlsubject");
    }); $(document).on("change", "#ddlsection", function () {
        BindCombo($("#ddlsubject"), "ddlsubject");
    }); $(document).on("click", ".lnkclassrefresh", function () {
        BindAllComboBox();
    }); $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    }); $(document).on("change", "#ddlclass", function () {
        BindGrid();
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetDetailListByID(navid);
    });
    $(document).on('change', '#ddlsubject', function () {
        if ($('#ddlsubject').val() != "0") {
           var path = "SchoolClassSubjectDetail.aspx/CodeExist";
            var status = "";
            CheckCodeAvailable( path);
        }
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {
                DeleteDetailListByID(navid);
                BindGrid();
            }
        }
    });
    BindGrid();
    $('#txtcode').focus();
});

function CheckCodeAvailable(path) {
    var classid = ($('#ddlclass').val() == undefined) ? "0" : $('#ddlclass').val();
    var sectionid = ($('#ddlsection').val() == undefined) ? "0" : $('#ddlsection').val();
    var subjectid = ($('#ddlsubject').val() == undefined) ? "0" : $('#ddlsubject').val();

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: path,
        data: JSON.stringify({ ClassID: classid, SectionID: sectionid,SubjectID:subjectid}),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $('#ddlsubject').val('0');
                alertify.error('Sorry ! Subject Already Assign ');
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
function DeleteDetailListByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassSubjectDetail.aspx/DeleteDetailListByID",
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
function GetDetailListByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassSubjectDetail.aspx/GetSectionDetailByID",
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
    $('#hdfpapersetid').val(response.d.PaperSetID);
    $('#ddlclass').val(response.d.ClassID);
    $('#ddlsection').val(response.d.ClassSectionID);
    $('#ddlsubject').val(response.d.SubjectID);
    $('#txtcode').val(response.d.PaperSetCode);
    $('#txtpaperset').val(response.d.PaperSetName);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify PaperSet");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {
  
    var obj = {};
    obj.ClassSubjectID = $('#hdfclasssubjectid').val();
    obj.ClassID = $('#ddlclass').val();
    obj.ClassSectionID = $('#ddlsection').val();
    obj.SubjectID = $('#ddlsubject').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'SchoolClassSubjectDetail.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearRecord();
                $('#txtcode').focus();
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
    $('#hdfpapersetid').val('0');
    $('#txtcode').val('');
    $('#txtpaperset').val('');
    $('#ddlstatus').val('true');
    PermissionDetail();
    $('#txtcode').focus();
    //  BindAllComboBox();
    $("#btnadd").attr("value", "Add Section");
    $("#btnadd").attr('AccessKey', 'A');
    $('#txtcode').focus();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassSubjectDetail.aspx/GetPaperSetDetail",
        data: JSON.stringify({}),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Class</th><th>Section</th><th>Subject</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].ClassSubjectID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].ClassSubjectID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                       "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].ClassName + "</td><td class='" + activecolor + "'>" + data.d[i].SectionName + "</td><td class='" + activecolor + "'>" + data.d[i].SubjectName + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Class Subject Detail List</th></tr></thead>");
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
    BindCombo($("#ddlclass"), "ddlclass");
    BindCombo($("#ddlsection"), "ddlsection");
    BindCombo($("#ddlsubject"), "ddlsubject");
}
function BindCombo(ele, ControlName) {
    var classid = ($('#ddlclass').val() == undefined) ? "0" : $('#ddlclass').val();
    var sectionid = ($('#ddlsection').val() == undefined) ? "0" : $('#ddlsection').val();
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolClassSubjectDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, ClassID: classid, SectionID: sectionid }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlclass") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadID).html(value.HeadName));
                });
            } if (ControlName == "ddlsection") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadID).html(value.HeadName));
                });
            } if (ControlName == "ddlsubject") {
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