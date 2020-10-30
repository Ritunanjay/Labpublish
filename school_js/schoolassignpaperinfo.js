
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();

    $(document).on("click", ".lnkclassrefresh", function () {
        BindAllComboBox();
    }); $(document).on("click", "#ddlstudent", function () {
        if ($('#ddlstudent').val() != "0") {

            BindCombo($("#ddlpaperset"), "ddlpaperset");
        }
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
    $(document).on('change', '#ddlpaperset', function () {
        if ($('#ddlstudent').val() != "0") {
            var path = "SchoolAssignPaperDetail.aspx/CodeExist";
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

function CheckCodeAvailable( path) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: path,
        data: JSON.stringify({ StudentID: $('#ddlstudent').val(), PaperSetID: $('#ddlpaperset').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $("#ddlpaperset").val('0');
                alertify.error('Sorry ! Set Already Assign');
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
        url: "SchoolAssignPaperDetail.aspx/DeleteDetailListByID",
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
        url: "SchoolAssignPaperDetail.aspx/GetAssignPaperByID",
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
    $('#hdfassignpaperid').val(response.d.SetAssignID);
    $('#ddlstudent').val(response.d.StudentID);
    if ($('#ddlstudent').val() != "0") {

        BindCombo($("#ddlpaperset"), "ddlpaperset");
    }
    $('#ddlpaperset').val(response.d.PaperSetID);
    $('#txtpapertime').val(response.d.PaperTiming);
    $('#ddlexamdetail').val(response.d.ExamDetail.toString());
     $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Section");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {
    var obj = {};
    obj.SetAssignID = $('#hdfassignpaperid').val();
    obj.StudentID = $('#ddlstudent').val();
    obj.PaperSetID = $('#ddlpaperset').val();
    obj.ExamHour = $('#txtpapertime').val().split(':')[0];
    obj.ExamMinutes = $('#txtpapertime').val().split(':')[1];
    obj.ExamSecond = $('#txtpapertime').val().split(':')[2];
    obj.StartDetail= "";
    obj.ExamFinish = $('#ddlexamdetail').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'SchoolAssignPaperDetail.aspx/Save',
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
    $('#hdfassignpaperid').val('0');
    $('#txtcode').val('');
    $('#txtsection').val('');
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
        url: "SchoolAssignPaperDetail.aspx/GetAssignPaperDetail",
        data: JSON.stringify({  }),
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>StudentName</th><th>Class</th><th>Section</th><th>Subject</th><th>PaperSet</th><th>ExamTiming</th><th>PaperStart</th><th>ExamStatus</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var examdetail = (data.d[i].ExamDetail == true) ? 'Finish' : 'Running';
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].SetAssignID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].SetAssignID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div>" +
                       "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].StudentName + "</td><td class='" + activecolor + "'>" + data.d[i].ClassName + "</td><td class='" + activecolor + "'>" + data.d[i].SectionName + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].SubjectName + "</td><td class='" + activecolor + "'>" + data.d[i].PaperSetName + "</td><td class='" + activecolor + "'>" + data.d[i].PaperTiming + "</td>"+
                        "<td class='" + activecolor + "'>" + data.d[i].PaperStartTiming + "</td><td class='" + activecolor + "'>" + examdetail + "</td><td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Section Detail List</th></tr></thead>");
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
    BindCombo($("#ddlstudent"), "ddlstudent");
    BindCombo($("#ddlpaperset"), "ddlpaperset");
}
function BindCombo(ele, ControlName) {
    var studentid=($('#ddlstudent').val()==undefined)?'0':$('#ddlstudent').val();
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SchoolAssignPaperDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName,SID:studentid }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlstudent") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadID).html(value.HeadName));
                });
            } if (ControlName == "ddlpaperset") {
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