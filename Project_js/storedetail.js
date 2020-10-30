
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
        GetStoreDetailByID(navid);
    });
    BindGrid();

});
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetStoreDetailByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StoreDetail.aspx/GetStoreInfoDetailByID",
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
    $('#hdfstoreid').val(response.d.StoreID);
    $('#txtcode').val(response.d.StoreCode);
    $('#txtstorename').val(response.d.StoreName);
    $('#ddldepartment').val(response.d.DepartmentID);
    $('#txtcounter').val(response.d.CounterID);
    $('#txtgstinnumber').val(response.d.GSTINNumber);
    $('#txtdruglicense').val(response.d.DrugLicenseNumber);
    $('#ddlisprescription').val(response.d.IsPrescription.toString());
    $('#ddlstoretype').val(response.d.StoreTypeID);
    $('#ddlstoretype').val(response.d.SaleType);
    $('#ddlstoretarrif').val(response.d.StoreTarrifID);
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
    obj.StoreID           = $('#hdfstoreid').val();
    obj.StoreCode         = $('#txtcode').val();
    obj.StoreName         = $('#txtstorename').val();
    obj.DepartmentID      = $('#ddldepartment').val();
    obj.CounterID         = $('#txtcounter').val();
    obj.GSTINNumber       = $('#txtgstinnumber').val();
    obj.DrugLicenseNumber = $('#txtdruglicense').val();
    obj.IsPrescription    = $('#ddlisprescription').val();
    obj.StoreTypeID       = $('#ddlstoretype').val();
    obj.SaleType          = $('#ddlstoretype').val();
    obj.StoreTarrifID     = $('#ddlstoretarrif').val();
    obj.Active            = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'StoreDetail.aspx/Save',
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
    $('#hdfstoreid').val('0');
    $('#txtcode').val('');
    $('#txtstorename').val('');
  //  $('#ddldepartment').val();
    $('#txtcounter').val('');
    $('#txtgstinnumber').val('');
    $('#txtdruglicense').val('');
    $('#ddlisprescription').val('true');
   // $('#ddlstoretype').val();
   // $('#ddlstoretype').val();
   // $('#ddlstoretarrif').val();
   $('#ddlstatus').val('true');
    BindAllComboBox();
    $("#btnadd").attr("value", "Add");
    $("#btnadd").attr('AccessKey', 'S');

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StoreDetail.aspx/GetStoreInfoDetail",
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
                        "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].StoreID + "' href='javascript:void();'> Edit</a>" +
      " </div> </li></ul></div></td>" +
 "<td class='center'>" + data.d[i].StoreName + "</td>" +
 "<td class='center'>" + data.d[i].GSTINNumber + "</td>" +
 "<td class='center'>" + data.d[i].DrugLicenseNumber + "</td>" +
                    "<td>" + data.d[i].Active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Store List</th></tr></thead>");
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

function BindAllComboBox() {
    BindCombo($("#ddldepartment"), "ddldepartment", '');
    BindCombo($("#ddlstoretype"), "ddlstoretype", 'STY');
    BindCombo($("#ddlstoretarrif"), "ddlstoretarrif", 'STR');
}
function BindCombo(ele, ControlName, status) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StoreDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, status: status }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddldepartment") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DepartmentID).html(value.DepartmentName));
                });
            } if (ControlName == "ddlstoretype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlstoretarrif") {
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