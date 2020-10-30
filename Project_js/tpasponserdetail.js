$(document).ready(function () {
    PermissionDetail();
  ClearRecord();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetTPASponserByID(navid);
    });
    BindGrid();
    $(document).on('change', '#ddlstate', function () {
        BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#ddlcity', function () {
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#txtmobileno', function () {
        check($('#txtmobileno'));
    }); $(document).on('change', '#txtemailid', function () {
        checkEmailID($('#txtemailid'));
    }); $(document).on('change', '#txtpemail', function () {
        checkEmailID($('#txtpemail'));
    });
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteTPA(id);
                BindGrid();
            }
        }
    });
});

function DeleteTPA(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "TPASponser.aspx/DeleteTPASponser",
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
function GetTPASponserByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "TPASponser.aspx/GetTPASponserByID",
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
    $('#hdftpasponserid').val(response.d.TPASponsorID);
    $('#txtsponsername').val(response.d.SponsorName);
    $('#txtemailid').val(response.d.EmailID);
    $('#txtaddress').val(response.d.Address);
    $('#txtmobileno').val(response.d.MobileNo);
    $('#txtphoneno').val(response.d.PhoneNo);
    $('#txtpostalcode').val(response.d.PostalCode);
    $('#ddlstate').val(response.d.StateID);
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    $('#ddlcity').val(response.d.CityID);
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#ddlarea').val(response.d.AreaID);
    $('#ddlclaimformat').val(response.d.ClaimFormat.toString());
    $('#ddlsponsortype').val(response.d.SponsorTypeID);
    $('#ddlpriorauthorizationmode').val(response.d.PriorAuthorizationMode.toString());
    $('#txtpname').val(response.d.PersonName);
    $('#txtpdesignation').val(response.d.PersonDesignation);
    $('#txtpmobile').val(response.d.PersonMobile);
    $('#txtpemail').val(response.d.PersonEmail);
    $('#ddlratelist').val(response.d.IsRateList.toString());
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    $("#btnadd").attr("value", "Modify TPASponser");
}
function Save() {
    if ($("#txtsponsername").val() == "") {
        alertify.log("TPASponser is required.");
        $("#txtsponsername").focus();
        return false;
    }
    
    if ($("#txtemailid").val() == "") {
        alertify.log("EmailID is required.");
        $("#txtemailid").focus();
        return false;
    }
    if ($("#txtaddress").val() == "") {
        alertify.log("Address is required.");
        $("#txtaddress").focus();
        return false;
    }
    if ($("#txtmobileno").val() == "") {
        alertify.log("Mobile is required.");
        $("#txtmobileno").focus();
        return false;
    }
    var obj = {};
    obj.TPASponsorID = $('#hdftpasponserid').val();
    obj.SponsorName = $('#txtsponsername').val();
    obj.EmailID = $('#txtemailid').val();
    obj.Address = $('#txtaddress').val();
    obj.Fax = $('#txtfax').val();
    obj.MobileNo = $('#txtmobileno').val();
    obj.PhoneNo = $('#txtphoneno').val();
    obj.PostalCode = $('#txtpostalcode').val();
    obj.StateID = $('#ddlstate').val();
    obj.CityID = $('#ddlcity').val();
    obj.AreaID = $('#ddlarea').val();
    obj.ClaimFormat = $('#ddlclaimformat').val();
   obj.SponsorTypeID = $('#ddlsponsortype').val();
    obj.ScannedDocumentRequired = $('#ddlscanneddocument').val();
    obj.PriorAuthorizationMode = $('#ddlpriorauthorization').val();
    obj.PersonName = $('#txtpname').val();
    obj.PersonDesignation = $('#txtpdesignation').val();
    obj.PersonMobile = $('#txtpmobile').val();
    obj.PersonEmail = $('#txtpemail').val();
    obj.IsRateList = $('#ddlratelist').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'TPASponser.aspx/Save',
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
    $('#hdftpasponserid').val('0');
     $('#txtsponsername').val('');
    $('#txtemailid').val('');
    $('#txtaddress').val('');
    $('#txtmobile').val('');
    $('#txtphoneno').val('');
    $('#txtpostalcode').val('');
    $('#txtpname').val('');
    $('#txtpdesignation').val('');
    $('#txtpmobile').val('');
    $('#txtpemail').val('');
    $('#txtmobileno').val('');
    BindAllComboBox();
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());

    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add TPASponser");

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "TPASponser.aspx/GetTPADetailSponser",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>SponserName</th><th>EmailID</th><th>Address</th><th>Mobile</th><th>PostalCode</th><th>Contact Name</th><th>Contact Mobile</th><th>RateList</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var ratelist = (data.d[i].IsRateList == false) ? 'Not Allow' : 'Allow';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].TPASponsorID + "' href='javascript:void();'> Edit</a>" +
                " </div> </li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].TPASponsorID + "' href='javascript:void();'> Delete</a>" +
                " </div> </li></ul></div></td>" +
                "<td class='" + activecolor + "'>" + data.d[i].SponsorName + "</td><td class='" + activecolor + "'>" + data.d[i].EmailID + "</td><td class='" + activecolor + "'>" + data.d[i].Address + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].MobileNo + "</td><td class='" + activecolor + "'>" + data.d[i].PostalCode + "</td><td class='" + activecolor + "'>" + data.d[i].PersonName + "</td><td class='" + activecolor + "'>" + data.d[i].PersonMobile + "</td>" +
                "<td class='" + activecolor + "'>" + ratelist + "</td><td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>TPA Sponser List</th></tr></thead>");
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
    BindCombo($("#ddlstate"), "ddlstate", '');
    BindCombo($("#ddlsponsortype"), "ddlsponsortype", 'ST');
}
function BindCombo(ele, ControlName, status) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "TPASponser.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: status }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlstate") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.StateID).html(value.StateName));
                });
            } if (ControlName == "ddlsponsortype") {
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