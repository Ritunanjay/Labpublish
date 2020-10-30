
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
        GetMachineByID(navid);
  });
  $(document).on("click", ".lnkdelete", function () {
      if ($('#hdfdelete').val() == "False") {
          LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
      }
      else {
          var navid = $(this).data("id");
          if (confirm('Do You Want To Delete ?')) {

              var machineid = $(this).data("id");
              DeleteMachine(machineid);
              BindGrid();
          }
      }
  });
  BindGrid();
  $('#txtmachinenumber').focus();
 });

function DeleteMachine(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MachineDetail.aspx/DeleteMachine",
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetMachineByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MachineDetail.aspx/GetMachineByID",
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
    $('#hdfmachineid').val(response.d.MachineID);
    $('#txtmachinenumber').val(response.d.MachineNumber);
    $('#txtmachinecode').val(response.d.MachineCode);
    $('#txtmachinename').val(response.d.MachineName);
    $('#txtmachineport').val(response.d.MachinePort);
    $('#ddlbaurdrate').val(response.d.BaurdRate);
    $('#ddldatabits').val(response.d.Databits);
    $('#ddlstopbits').val(response.d.Stopbits);
    $('#ddlhandshake').val(response.d.Handshake);
    $('#ddlparity').val(response.d.Parity);
    $('#txtipaddress').val(response.d.IPAddressNo);
    $('#txtport').val(response.d.IPPort);
    $('#ddlmachineport').val(response.d.IsMachinePort.toString());
    $('#ddltransfertype').val(response.d.TransferType);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    $("#btnadd").attr("value", "Modify Machine");
}
function Save() {
    if ($("#txtmachinenumber").val() == "") {
        alertify.log("Machine Number is required.");
        $("#txtmachinenumber").focus();
        return false;
    }
    if ($("#txtmachinecode").val() == "") {
        alertify.log("Machine Code is required.");
        $("#txtmachinecode").focus();
        return false;
    } if ($("#txtmachinename").val() == "") {
        alertify.log("Machine Name is required.");
        $("#txtmachinename").focus();
        return false;
    }

    var obj = {};
    obj.MachineID = $('#hdfmachineid').val();
    obj.MachineNumber = ($('#txtmachinenumber').val() == "") ? "0" : $('#txtmachinenumber').val();
    obj.MachineCode = $('#txtmachinecode').val();
    obj.MachineName = $('#txtmachinename').val();
    obj.MachinePort = $('#txtmachineport').val();
    obj.BaurdRate = $('#ddlbaurdrate').val();
    obj.Databits = $('#ddldatabits').val();
    obj.Stopbits = $('#ddlstopbits').val();
    obj.Handshake = $('#ddlhandshake').val();
    obj.Parity = $('#ddlparity').val();
    obj.IPAddressNo = $('#txtipaddress').val();
    obj.IPPort = $('#txtport').val();
    obj.IsMachinePort = $('#ddlmachineport').val();
    obj.TransferType = $('#ddltransfertype').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'MachineDetail.aspx/Save',
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
    $('#hdfmachineid').val('0');
    $('#txtmachinenumber').val('');
    $('#txtmachinecode').val('');
    $('#txtmachinename').val('');
    $('#txtmachineport').val('');
    $('#txtipaddress').val('');
    $('#txtport').val('');
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Machine");
    $('#txtmachinenumber').focus();
}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MachineDetail.aspx/GetMachineDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Number</th><th>Name</th><th>Port</th><th>BaurdRate</th><th>Databits</th><th>Stopbits</th><th>IPAddress</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].MachineID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].MachineID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div></td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].MachineNumber + "</td><td class='" + activecolor + "'>" + data.d[i].MachineName + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].MachinePort + "</td><td class='" + activecolor + "'>" + data.d[i].BaurdRate + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].Databits + "</td><td class='" + activecolor + "'>" + data.d[i].Stopbits + "</td><td class='" + activecolor + "'>" + data.d[i].IPAddressNo + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Machine List</th></tr></thead>");
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
