
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        SaveFile('sushil');
    });
    BindGrid();
    $(document).on('change', '#ddlmasterfilling', function () {
        BindGrid();
    });
});

function BindAllComboBox() {
    BindCombo($("#ddlmasterfilling"), "ddlmasterfilling");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MasterFilling.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName,Code:"MFD" }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlmasterfilling") {
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


function SaveFile(uhid) {
    var fp = $("#excelfile").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', 'UploadDataFromExcel');
    formData.append('ID', $('#ddlpaperset').val());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            SaveData(status);
            //   alertify.success(status + ' Upload Profile Success');
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}

function SaveData(filename) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'MasterFilling.aspx/SaveData',
        data: JSON.stringify({ FileName: filename, tablename: "Sheet1$", SetID: $('#ddlmasterfilling').val() }),
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0") {
                alertify.success("Upload Question Successfully");

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


function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MasterFilling.aspx/GetQuestionDetail",
        data: JSON.stringify({ SetID: $('#ddlpaperset').val() }),
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
            $("#gv").append("<thead><tr><th>SNo</th><th>Question</th><th>OptionA</th><th>OptionB</th><th>OptionC</th><th>OptionD</th><th>OptionE</th><th>Answer</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Used' : 'Used';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr>" +
                        "<td  class='" + activecolor + "'>" + data.d[i].SNO + "</td><td  class='" + activecolor + "'>" + data.d[i].Question + "</td><td  class='" + activecolor + "'>" + data.d[i].Option1 + "</td><td  class='" + activecolor + "'>" + data.d[i].Option2 + "</td><td  class='" + activecolor + "'>" + data.d[i].Option3 + "</td>" +
                        "<td  class='" + activecolor + "'>" + data.d[i].Option4 + "</td><td  class='" + activecolor + "'>" + data.d[i].Option5 + "</td><td  class='" + activecolor + "'>" + data.d[i].Answer + "</td>" +
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
