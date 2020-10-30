
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
        GetSampleByID(navid);
  });
  $(document).on('change', '#txtsample', function () {
      CodeAvailable($('#txtsample').val());
  });
  $(document).on("click", ".lnkdelete", function () {
      if ($('#hdfdelete').val() == "False") {
          LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
      }
      else {
          var navid = $(this).data("id");
          if (confirm('Do You Want To Delete ?')) {

              var sampleid = $(this).data("id");
              DeleteSampleByID(sampleid);
              BindGrid();
          }
      }
  });
    BindGrid(); 
    $('#txtsample').focus();

});

function DeleteSampleByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleDetail.aspx/DeleteSampleInfoByID",
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
function CodeAvailable(code) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleDetail.aspx/CodeAvailable",
        data: JSON.stringify({ Code: code }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $('#txtsample').val('');
                $('#txtsample').focus();
                alertify.error('Sorry ! Detail Exists');
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');  
}
function GetSampleByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleDetail.aspx/GetSampleInfoByID",
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
    $('#hdfsampleid').val(response.d.SampleID);
    $('#txtsample').val(response.d.SampleName);
    $('#txtcontainer').val(response.d.Container);
    $('#txtprefix').val(response.d.Prefix);
    $('#txtstartnumber').val(response.d.StartNumber);
    $('#txtformat').val(response.d.Format);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Sample");
    $("#btnadd").attr('AccessKey', 'A');
}
function Save() {
    if ($("#txtsample").val() == "") {
        alertify.log("Sample Name is required.");
        $("#txtsample").focus();
        return false;
    } if ($("#txtcontainer").val() == "") {
        alertify.log("Container is required.");
        $("#txtcontainer").focus();
        return false;
    } if ($("#txtprefix").val() == "") {
        alertify.log("Prefix is required.");
        $("#txtprefix").focus();
        return false;
    } if ($("#txtstartnumber").val() == "") {
        alertify.log("Start Number is required.");
        $("#txtstartnumber").focus();
        return false;
    } if ($("#txtformat").val() == "") {
        alertify.log("Format is required.");
        $("#txtformat").focus();
        return false;
    }

    var obj = {};
    obj.SampleID = $('#hdfsampleid').val();
    obj.SampleName = $('#txtsample').val();
    obj.Container = $('#txtcontainer').val();
    obj.Prefix = $('#txtprefix').val();
    obj.StartNumber = $('#txtstartnumber').val();
    obj.Format = $('#txtformat').val(); 
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'SampleDetail.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                LMSMessage('',response.d.MessageName,'success');
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
    $('#hdfsampleid').val('0');
    $('#txtsample').val('');
    $('#txtcontainer').val('');
    $('#txtprefix').val('');
    $('#txtstartnumber').val('0');
    $('#txtformat').val('0000');

    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Sample");
    $("#btnadd").attr('AccessKey', 'A');
    $('#txtsample').focus();

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleDetail.aspx/GetSampleInfoDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>SampleName</th><th>Container</th><th>Prefix</th><th>StartNumber</th><th>Format</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                        "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                        " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                        " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                        "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].SampleID + "' href='javascript:void();'> Edit</a>" +
                        " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                        "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].SampleID + "' href='javascript:void();'> Delete</a>" +
                        " </div> </li></ul></div></td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].SampleName + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].Container + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].Prefix + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].StartNumber + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].Format + "</td>" +
                        "<td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Sample List</th></tr></thead>");
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
