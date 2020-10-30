
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();

    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid();
    }); $(document).on("click", "#btnclear", function () {
        ClearRecord();
      
    });

    $(document).on("click", ".lnkedit", function () {
        var navid = $(this).data("id");
        GetCentreByID(navid);
    });
  
    BindGrid();
    $(document).on('change', '#ddlstate', function () {
        BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $(document).on('change', '#ddlcity', function () {
        BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    });
    $('#txtestablishmentdate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('focusout', '#txtestablishmentdate', function () {
        getserverdate1($("#txtestablishmentdate"));
    });
    $(document).on('change', '#txtcode', function () {
        if ($('#txtcode').val() != "") {
            var code = $('#txtcode').val();
            var path = "Centreregistration.aspx/CodeExist";
            var status = "";
            CodeAvailable(code, path);

        }
    });
    $("#txtaccountvalue").keyup(function (e) {

        if ($('#ddlaccounttype').val() == "0") {
            if ($("#txtaccountvalue").val() == "" || $("#txtaccountvalue").val() <= 0 || isNaN($("#txtaccountvalue").val()))
                $("#txtaccountvalue").val("0");
            else
                if ($("#txtaccountvalue").val().substring(0, 1) == '0') $("#txtaccountvalue").val($("#txtaccountvalue").val().substring(1));
            if ($("#txtaccountvalue").val() > 100) {
                alertify.log('Percentage should not be greater than 100');
                $("#txtaccountvalue").val('0');
            }
        }
    });
    $(document).on('change', '#ddlcreditlimit', function () {
         if ($('#ddlcreditlimit').val() == "false") {
             $('#txtcreditlimit').attr('disabled', 'disabled');
             $('#txtbalancelimit').attr('disabled', 'disabled');
            $('#txtcreditlimit').val('0');
            $('#txtbalancelimit').val('0');
        }
        else {
             $('#txtcreditlimit').removeAttr('disabled');
             $('#txtbalancelimit').removeAttr('disabled');
            $('#txtcreditlimit').val('0');
            $('#txtbalancelimit').val('0');

        }
    });
    $(document).on('change', '#ddlaccountpost', function () {
        if ($('#ddlaccountpost').val() == "false") {
            $('#ddlaccounttype').attr('disabled', 'disabled');
            $('#txtaccountvalue').attr('disabled', 'disabled');
            $('#txtaccountvalue').val('0');
        }
        else {
            $('#ddlaccounttype').removeAttr('disabled');
            $('#txtaccountvalue').removeAttr('disabled');
            $('#txtaccountvalue').val('0');
       
        }
    });
    $(document).on('change', '#txtemail', function () {

        checkEmailID($('#txtemail'));
    });
    $(document).on('change', '#txtmobile', function () {

        check($('#txtmobile'));
    });
    $(document).on('change', '#txtphone', function () {
        check($('#txtphone'));
    });
    getserverdate1($("#txtestablishmentdate"));
    if ($('#ddlcreditlimit').val() == "false") {
        $('#txtcreditlimit').attr('disabled', 'disabled');
        $('#txtbalancelimit').attr('disabled', 'disabled');
    }
    else {
        $('#txtcreditlimit').removeAttr('disabled');
        $('#txtbalancelimit').removeAttr('disabled');

    } if ($('#ddlaccountpost').val() == "false") {
        $('#ddlaccounttype').attr('disabled', 'disabled');
        $('#txtaccountvalue').attr('disabled', 'disabled');
    }
    else {
        $('#ddlaccounttype').removeAttr('disabled');
        $('#txtaccountvalue').removeAttr('disabled');

    }
    $(document).on("click", ".lnkdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteCentreByID(id);
                BindGrid();
            }
        }
    });
});

function DeleteCentreByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Centreregistration.aspx/DeleteCentreByID",
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
    BindCombo($("#ddlstate"), "ddlstate");
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Centreregistration.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlstate") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.StateID).html(value.StateName));
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
function GetCentreByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Centreregistration.aspx/GetCentreByID",
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
    $('#ddlaccountpost').val(response.d.IsAcPost.toString());
    $('#ddlaccounttype').val(response.d.AcType.toString());
    $('#ddlcentretype').val(response.d.CentreType);
    $('#ddlcreditlimit').val(response.d.IsCreditLimit.toString());
    if ($('#ddlaccounttype').val() == "0") {
        if ($("#txtaccountvalue").val() == "" || $("#txtaccountvalue").val() <= 0 || isNaN($("#txtaccountvalue").val()))
            $("#txtaccountvalue").val("0");
        else
            if ($("#txtaccountvalue").val().substring(0, 1) == '0') $("#txtaccountvalue").val($("#txtaccountvalue").val().substring(1));
        if ($("#txtaccountvalue").val() > 100) {
            alertify.log('Percentage should not be greater than 100');
            $("#txtaccountvalue").val('0');
        }
    }
    if ($('#ddlcreditlimit').val() == "false") {
        $('#txtcreditlimit').attr('disabled', 'disabled');
        $('#txtbalancelimit').attr('disabled', 'disabled');
        $('#txtcreditlimit').val('0');
        $('#txtbalancelimit').val('0');
    }
    else {
        $('#txtcreditlimit').removeAttr('disabled');
        $('#txtbalancelimit').removeAttr('disabled');

    }
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#ddlaccountpost').val() == "false") {
        $('#ddlaccounttype').attr('disabled', 'disabled');
        $('#txtaccountvalue').attr('disabled', 'disabled');
        $('#txtaccountvalue').val('0');
    }
    else {
        $('#ddlaccounttype').removeAttr('disabled');
        $('#txtaccountvalue').removeAttr('disabled');

    } $('#hdfcentreid').val(response.d.CentreID);
    $('#txtcode').val(response.d.Code);
    $('#txtcentrename').val(response.d.CentreName);
    $('#txtaddress').val(response.d.Address);
    $('#txtphone').val(response.d.Phone);
    $('#txtmobile').val(response.d.Mobile);
    $('#txtemail').val(response.d.EmailID);
    $('#txttiming').val(response.d.Timings);
    $('#txtaccountvalue').val(response.d.AcValue);
    $('#txtcreditlimit').val(response.d.CreditLimit);
    $('#txtbalancelimit').val(response.d.BalanceLimit);
    $('#txtreportlimit').val(response.d.ReportLimit);
    $('#ddlstate').val(response.d.StateID);
    BindCity($("#ddlcity"), "ddlcity", $('#ddlstate').val());
    $('#ddlcity').val(response.d.CityID);
    BindArea($("#ddlarea"), "ddlarea", $('#ddlcity').val());
    $('#ddlarea').val(response.d.AreaID);
    $('#txtestablishmentdate').val(response.d.EstablishmentDate);
    $('#txtfirmregno').val(response.d.FirmRegNo);
    $('#txtpan').val(response.d.PAN);
    $('#txttaxdeductionno').val(response.d.TaxDeductionacno);
    $('#txtcontactpersonname').val(response.d.contactPersonname);
    $('#txtdaysdivided').val(response.d.Noofdaystodivide);
    $('#txtminageofjoining').val(response.d.Minageofjoining);
    $('#txtmaxageretirement').val(response.d.Maxageofretirement);
    $('#txtprincipal').val(response.d.principalofficername);
    $('#txtdesignation').val(response.d.Designation);
    $('#ddlratelist').val(response.d.IsRateList.toString());
    $('#txtreportlimit').val(response.d.ReportLimit);
    $('#txtstartcounter').val(response.d.StartCounter);
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

    $("#btnadd").attr("value", "Modify Centre/Franchise");
}
function Save() {
    if ($('#ddlismain').val() == "true")
    {
        if (!confirm("Do You want to Save as Main Centre , Then Software Main Centre Is Change"))
        {
            return false;
        }
    }
    if ($("#txtcode").val() == "") {
        alertify.log("Centre Code is required.");
        $("#txtcode").focus();
        return false;
    } if ($("#txtcentrename").val() == "") {
        alertify.log("Centre is required.");
        $("#txtcentrename").focus();
        return false;
    } if ($("#txtmobile").val() == "") {
        alertify.log("Mobile is required.");
        $("#txtmobile").focus();
        return false;
    } if ($("#txtemail").val() == "") {
        alertify.log("Email is required.");
        $("#txtemail").focus();
        return false;
    } if ($("#txtaddress").val() == "") {
        alertify.log("Address is required.");
        $("#txtaddress").focus();
        return false;
    } if ($("#txtdaysdivided").val() == "") {
        alertify.log("Days Of Divided is required.");
        $("#txtdaysdivided").focus();
        return false;
    } if ($("#txtminageofjoining").val() == "") {
        alertify.log("Age Of Joining is required.");
        $("#txtminageofjoining").focus();
        return false;
    } if ($("#txtmaxageretirement").val() == "") {
        alertify.log("Max Age Of Retirement is required.");
        $("#txtmaxageretirement").focus();
        return false;
    } if ($("#ddlismain").val() == "false" && $("#ddlcentretype").val()=="0") {
        alertify.log("Please Choose Account Type.");
        $("#ddlcentretype").focus();
        return false;
    }

    var obj = {};
    obj.CentreID = $('#hdfcentreid').val();
    obj.Code = $('#txtcode').val();
    obj.CentreName = $('#txtcentrename').val();
    obj.Address = $('#txtaddress').val();
    obj.Phone = $('#txtphone').val();
    obj.Mobile = $('#txtmobile').val();
    obj.EmailID = $('#txtemail').val();
    obj.Timings = $('#txttiming').val();
    obj.IsAcPost = $('#ddlaccountpost').val();
    obj.IsMain = $('#ddlismain').val();
    obj.CentreType = $('#ddlcentretype').val();
    obj.AcType = $('#ddlaccounttype').val();
    obj.AcValue = ($('#txtaccountvalue').val() == "") ? "0" : $('#txtaccountvalue').val();
    obj.IsBranch = (obj.Ismain == "false") ? "true" : "false";
    obj.IsRateList = $('#ddlratelist').val();
    obj.CreditLimit = ($('#txtcreditlimit').val() == "") ? "0" :   $('#txtcreditlimit').val();
    obj.BalanceLimit = ($('#txtbalancelimit').val() == "") ? "0" : $('#txtbalancelimit').val();
    obj.ReportLimit = ($('#txtreportlimit').val() == "") ? "0" :   $('#txtreportlimit').val();
    obj.IsCreditLimit = $('#ddlcreditlimit').val();
    obj.IsReportLimit = "false";
    obj.AllowBalanceReport = "false";
    obj.Active = $('#ddlstatus').val();
    obj.StateID = ($('#ddlstate').val() == "") ? "0" : $('#ddlstate').val();
    obj.CityID = ($('#ddlcity').val() == "") ? "0" : $('#ddlcity').val();
    obj.AreaID = ($('#ddlarea').val() == "") ? "0" : $('#ddlarea').val();
    obj.EstablishmentDate = ($('#txtestablishmentdate').val() == "") ? "01/01/1990" : $('#txtestablishmentdate').val();
    obj.FirmRegNo = $('#txtfirmregno').val();
    obj.PAN = $('#txtpan').val();
    obj.TaxDeductionacno = $('#txttaxdeductionno').val();
    obj.contactPersonname = $('#txtcontactpersonname').val();
    obj.Noofdaystodivide = $('#txtdaysdivided').val();
    obj.Minageofjoining = $('#txtminageofjoining').val();
    obj.Maxageofretirement = $('#txtmaxageretirement').val();
    obj.principalofficername = $('#txtprincipal').val();
    obj.Designation = $('#txtdesignation').val();
    obj.CounterType = $('#ddlcountertype').val();
    obj.StartCounter = $('#txtstartcounter').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'Centreregistration.aspx/Save',
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
    $('#ddlmain').val('false');
    $('#hdfcentreid').val('0');
    $('#txtcode').val('');
    $('#txtcentrename').val('');
    $('#txtaddress').val('');
    $('#txtphone').val('');
    $('#txtmobile').val('');
    $('#txtemail').val('');
    $('#txttiming').val('');
    //  $('#ddlaccountpost').val('0');
    $('#ddlaccounttype').val('0');
    $('#txtaccountvalue').val('');
    $('#txtcreditlimit').val('');
    $('#txtbalancelimit').val('');
    $('#txtreportlimit').val('');
    BindAllComboBox();
    $('#txtfirmregno').val('');
    $('#txtpan').val('');
    $('#txttaxdeductionno').val('');
    $('#txtcontactpersonname').val('');
    $('#txtdaysdivided').val('0');
    $('#txtminageofjoining').val('0');
    $('#txtmaxageretirement').val('0');
    $('#txtprincipal').val('');
    $('#txtdesignation').val('');
    getserverdate1($("#txtestablishmentdate"));
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add New Centre/Franchise");
    $('#txtstartcounter').val('0');

}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "Centreregistration.aspx/GetCentreDetail",
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
            $("#gv").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Centre</th><th>Mobile</th><th>Address</th><th>EmailID</th><th>Timings</th><th>Phone</th><th>CounterType</th><th>StartCounter</th><th>Main</th><th>RateList</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var maincentre = (data.d[i].IsMain == true) ? 'Centre' : 'Franchise';
                var ratelist = (data.d[i].IsRateList == false) ? 'No' : 'Yes';
                var status = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';
                $("#gv").append("<tr><td class='" + activecolor + "'>" +
                "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                "  <a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].CentreID + "' href='javascript:void();'> Edit</a>" +
                " </div> </li>" +
                "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                "  <a class='list_toolbr_btn lnkdelete' data-id='" + data.d[i].CentreID + "' href='javascript:void();'> Delete</a>" +
                " </div> </li>" +
                "</ul></div></td>" +
                "<td class='"+activecolor+"'>" + data.d[i].Code + " | " + data.d[i].CentreName + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].Mobile + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].Address + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].EmailID + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].Timings + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].Phone + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].CounterType + "</td>" +
                "<td class='" + activecolor + "'>" + data.d[i].StartCounter + "</td>" +
                "<td class='" + activecolor + "'>" + maincentre + "</td>" +
                "<td class='" + activecolor + "'>" + ratelist + "</td>" +
                "<td class='" + activecolor + "'>" + status + "</td></tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Centre/Franchise List</th></tr></thead>");
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
