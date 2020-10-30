$(document).ready(function () {
    //PermissionDetail();
    BindAllComboBox();
    //$(document).on("click", "#btnadd", function () {
    //    Save();
    //    BindGrid();
    //}); $(document).on("click", "#btnclear", function () {
    //    ClearRecord();
    //});
    $(document).on('mouseover', '.btnmisreport', function () {
        var grid = $(this).closest("div");
        $(".btnmisreport", grid).each(function () {
            $(".btnmisreport").css('box-shadow', '');
        }); $(this).css('box-shadow', '0 0 5px 3px black');
    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));

    $(document).on("click", ".btnmisreport", function () {
        var navid = $(this).data("id");
        ViewReporting(navid);
    });
    BindGrid();

});
function ViewReporting(navid) {
    var centreid = $('#ddlcentre').val();
    var userid = $('#ddluser').val();
    var patientcategory = $('#ddlpatientcategory').val();
    var doctorid = $('#ddldoctor').val();
    var fromdate = $('#txtfromdate').val();
    var todate = $('#txttodate').val();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MISReporting.aspx/MISReportingDetail",
        data: JSON.stringify({ ID: navid, CentreID: centreid, UserID: userid, PatientCategoryID: patientcategory, DoctorID: doctorid, FromDate: fromdate, ToDate: todate, ReceiptType: $('#ddlreceipttype').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            debugger;
            if (data.d == "Error")
                alertify.error("Some Error Occured !");
            else
                window.open(data.d, '_blank');
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
function BindAllComboBox() {
    BindCombo($("#ddlcentre"), "ddlcentre", '');
    BindCombo($("#ddldoctor"), "ddldoctor", '');
    BindCombo($("#ddluser"), "ddluser", '');
    BindCombo($("#ddlpaymode"), "ddlpaymode", 'PM');
    BindCombo($("#ddlpatientcategory"), "ddlpatientcategory", 'PT');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MISReporting.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddldoctor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
                });
            }
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddluser") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.UserID).html(value.UserName));
                });
            }
            if (ControlName == "ddlpatientcategory") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            }
            if (ControlName == "ddlpaymode") {
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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MISReporting.aspx/GetReportingDetail",
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
        $("#reportingdetail").empty();
        if (data.d.length > 0) {
            $("#reportingdetail").append("<div class='button-list mt-25'>");
            for (var i = 0; i < data.d.length; i++) {
               if (i % 2 == 0) {
                   $("#reportingdetail").append("<input type='button' id='" + data.d[i].ButtonID + "' data-id='" + data.d[i].ButtonID + "' value='" + data.d[i].ButtonName + "' class='btn btn-success btn-outline btnmisreport' />");
               }
               else if (i % 3 == 0) {
                   $("#reportingdetail").append("<input type='button' id='" + data.d[i].ButtonID + "' data-id='" + data.d[i].ButtonID + "' value='" + data.d[i].ButtonName + "' class='btn btn-info btn-outline btnmisreport' />");
               } else if (i % 4 == 0) {
                   $("#reportingdetail").append("<input type='button' id='" + data.d[i].ButtonID + "' data-id='" + data.d[i].ButtonID + "' value='" + data.d[i].ButtonName + "' class='btn btn-danger btn-outline btnmisreport' />");
               }
                else {
                   $("#reportingdetail").append("<input type='button' id='" + data.d[i].ButtonID + "' data-id='" + data.d[i].ButtonID + "' value='" + data.d[i].ButtonName + "' class='btn btn-warning btn-outline btnmisreport' />");
                }
            }
            $("#reportingdetail").append("</div>");

        }
        else {
            $("#reportingdetail").append("<b>No Reporting Found</b>");
        }
    }
}