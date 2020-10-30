
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
        GetCityByID(navid);
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var areaid = $(this).data("id");
                DeleteAreaByID(areaid);
                BindGrid();
            }
        }
    });
    BindGrid();
    $('#txtarea').focus();
});

function DeleteAreaByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AreaInfoDetail.aspx/DeleteAreaByID",
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
    BindCombo($("#ddlcity"), "ddlcity");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AreaInfoDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcity") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CityID).html(value.CityName));
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
function GetCityByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AreaInfoDetail.aspx/GetAreaByID",
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
    $('#hdfareaid').val(response.d.AreaID);
    $('#ddlcity').val(response.d.CityID);
    $('#txtarea').val(response.d.AreaName);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Area");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {
    if ($("#txtarea").val() == "") {
        alertify.log("Area Name is required.");
        $("#txtarea").focus();
        return false;
    }

    var obj = {};
    obj.AreaID = $('#hdfareaid').val();
    obj.AreaName = $('#txtarea').val();
    obj.CityID = $('#ddlcity').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'AreaInfoDetail.aspx/Save',
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
    $('#hdfareaid').val('0');
    $('#txtarea').val('');
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Area");
    $("#btnadd").attr('AccessKey', 'A');
    $('#txtarea').focus();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AreaInfoDetail.aspx/GetAreaDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>City</th><th>Area</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].AreaID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].AreaID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div></td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].CityName + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].AreaName + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Area List</th></tr></thead>");
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
