
$(document).ready(function () {
    PermissionDetail();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetHSNByID(navid);
    });
    BindGrid();
    $("#txtcgst").change(function (e) {
        debugger;
        if ($("#txtcgst").val() == "")
            $("#txtcgst").val("0");
        if ($("#txtcgst").val() == "" || $("#txtcgst").val() <= 0 || isNaN($("#txtcgst").val()))
            $("#txtcgst").val("0");
        else
            if ($("#txtcgst").val().substring(0, 1) == '0') $("#txtcgst").val($("#txtcgst").val().substring(1));
        if ($("#txtcgst").val() > 50) {
            alertify.log('IGST Percentage should not be greater than 100');
            $("#txtcgst").val('0');
        }
        if ($("#txtcgst").val() == "")
            $("#txtcgst").val("0");


        cgst = $("#txtcgst").val();
        $("#txtsgst").val(parseFloat(cgst));
        $("#txtigst").val((parseFloat(cgst) * 2));
    })
    $("#txtsgst").change(function (e) {
        debugger;
        if ($("#txtsgst").val() == "")
            $("#txtsgst").val("0");
        if ($("#txtsgst").val() == "" || $("#txtsgst").val() <= 0 || isNaN($("#txtsgst").val()))
            $("#txtsgst").val("0");
        else
            if ($("#txtsgst").val().substring(0, 1) == '0') $("#txtsgst").val($("#txtsgst").val().substring(1));
        if ($("#txtsgst").val() > 50) {
            alertify.log('IGST Percentage should not be greater than 100');
            $("#txtsgst").val('0');
        }
        if ($("#txtsgst").val() == "")
            $("#txtsgst").val("0");

        sgst = $("#txtsgst").val();
        $("#txtcgst").val(parseFloat(sgst));
        $("#txtigst").val(parseFloat(sgst) * 2);

    })
    $("#txtigst").change(function (e) {
        debugger;
        if ($("#txtigst").val() == "")
            $("#txtigst").val("0");
        if ($("#txtigst").val() == "" || $("#txtigst").val() <= 0 || isNaN($("#txtigst").val()))
            $("#txtigst").val("0");
        else
            if ($("#txtigst").val().substring(0, 1) == '0') $("#txtigst").val($("#txtigst").val().substring(1));
        if ($("#txtigst").val() > 100) {
            alertify.log('IGST Percentage should not be greater than 100');
            $("#txtigst").val('0');
        }
        if ($("#txtigst").val() == "")
            $("#txtigst").val("0");

        igst = $("#txtigst").val();
        
        $("#txtsgst").val(parseFloat(igst) / 2);
        $("#txtcgst").val(parseFloat(igst) / 2);

    })
});
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetHSNByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "HSNMaster.aspx/GetHSNDetailByID",
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
    $('#hdfhsnid').val(response.d.HSNID);
    $('#txtcode').val(response.d.HSN);
    $('#txtsname').val(response.d.SName);
    $('#txtsgst').val(response.d.SGST);
    $('#txtcgst').val(response.d.CGST);
    $('#txtigst').val(response.d.IGST);
    $('#ddltype').val(response.d.HSNType);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Update");
    $("#btnadd").attr('AccessKey', 'U');
}
function Save() {
    if ($("#txtcode").val() == "") {
        alertify.log("Code is required.");
        $("#txtcode").focus();
        return false;
    }

    var obj = {};
    obj.HSNID = $('#hdfhsnid').val();
    obj.HSN = $('#txtcode').val();
    obj.SName = $('#txtsname').val();
    obj.SGST = $('#txtsgst').val();
    obj.CGST = $('#txtcgst').val();
    obj.IGST = $('#txtigst').val();
    obj.HSNType = $('#ddltype').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'HSNMaster.aspx/Save',
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
    $('#hdfhsnid').val('0');
    $('#txtcode').val('');
    $('#txtsname').val('');
    $('#txtsgst').val('0');
    $('#txtcgst').val('0');
    $('#txtigst').val('0');
    $('#ddltype').val('Goods');
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add");
    $("#btnadd").attr('AccessKey', 'S');

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "HSNMaster.aspx/GetHSNDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>HSN Code</th><th>Type</th><th>GST</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gv").append("<tr><td>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                     " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                      " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].HSNID + "' href='javascript:void();'> Edit</a>" +
      " </div> </li></ul></div></td>" +
 "<td class='center'>" + data.d[i].HSN + "</td>" +
 "<td class='center'>" + data.d[i].HSNType + "</td>" +
 "<td class='center'>" + data.d[i].IGST + "</td>" +
                    "<td>" + data.d[i].Active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>City List</th></tr></thead>");
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
