
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
        GetCouponByID(navid);
    });
    $('#ddlauthority').prop('selectedIndex', 1);
    $("#txtpercentage").keyup(function (e) {

        if ($("#txtpercentage").val() == "" || $("#txtpercentage").val() <= 0 || isNaN($("#txtpercentage").val()))
            $("#txtpercentage").val("0");
        else
            if ($("#txtpercentage").val().substring(0, 1) == '0') $("#txtpercentage").val($("#txtpercentage").val().substring(1));
        if ($("#txtpercentage").val() > 100) {
            alertify.log('Percentage should not be greater than 100');
            $("#txtpercentage").val('0');
        }
    });
    $(document).on('change', '#txtcode', function () {
        if ($('#txtcode').val() != "") {
            var code = $('#txtcode').val();
            var path = "CouponDetail.aspx/CodeExist";
            var status = "";
            CodeAvailable(code, path);
        }
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {
                DeleteCouponByID(navid);
                BindGrid();
            }
        }
    });
    BindGrid();

    $('#txtcode').focus();
});

function DeleteCouponByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CouponDetail.aspx/DeleteCouponByID",
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
function BindAllComboBox() {
    BindCombo($("#ddlauthority"), "ddlauthority");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CouponDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName,Code:'DB' }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlauthority") {
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
function GetCouponByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CouponDetail.aspx/GetCouponByID",
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
    $('#hdfcouponid').val(response.d.CouponID);
    $('#ddlauthority').val(response.d.AuthorityID);
    $('#txtpercentage').val(response.d.DiscountPer);
    $('#txtcode').val(response.d.CouponCode);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Coupon");
}
function Save() {
    if ($('#ddlauthority').val() == "0")
    {
        alertify.log('Please Select Authority');
        $('#ddlauthority').focus();
        return false;
    }
    if ($("#txtcode").val() == "") {
        alertify.log("Code is required.");
        $("#txtcode").focus();
        return false;
    } if ($("#txtpercentage").val() == "") {
        alertify.log("Percentage is required.");
        $("#txtpercentage").focus();
        return false;
    }

    var obj = {};
    obj.CouponID = $('#hdfcouponid').val();
    obj.CouponCode = $('#txtcode').val();
    obj.AuthorityID = $('#ddlauthority').val();
    obj.DiscountPer = $('#txtpercentage').val();
    obj.UserAt = "";
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'CouponDetail.aspx/Save',
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
    $('#hdfcouponid').val('0');
    $('#txtcode').val('');
    $('#txtpercentage').val('');
    BindAllComboBox();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Coupon");
    $('#txtcode').focus();

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CouponDetail.aspx/GetCouponDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Code</th><th>Discount</th><th>Used</th><th>Authority</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var Active = (data.d[i].Active == false) ? "Not Use" : "Use";
                var Activecolor = (data.d[i].Active == false) ? "danger" : "success";
                var usecheck = (data.d[i].IsUsed == false) ? "No" : "Yes";
                var couponused = (data.d[i].IsUsed == false) ? "" : "none";
                $("#gv").append("<tr><td class='" + Activecolor + "'>" +
                                "<div class='input-group-btn' style='display:" + couponused + "'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].CouponID + "' href='javascript:void();'> Edit</a>" +
                                " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                                "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].CouponID + "' href='javascript:void();'> Delete</a>" +
                                " </div> </li></ul></div></td>" +
                                "<td class='" + Activecolor + "'>" + data.d[i].CouponCode + "</td>" +
                                "<td class='" + Activecolor + "'>" + data.d[i].DiscountPer + "</td>" +
                                "<td class='" + Activecolor + "'>" + usecheck + "</td>" +
                                "<td class='" + Activecolor + "'>" + data.d[i].Authority + "</td>" +
                                "<td class='" + Activecolor + "'>" + Active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Coupon Information List</th></tr></thead>");
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
