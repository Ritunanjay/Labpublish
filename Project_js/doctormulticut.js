$(document).ready(function () {
    PermissionDetail();
    $(document).on('keydown', '#txtpatientfilter', function () {
        BindGrid();
    });
    $(document).on('change', '#txtfromdate', function () {
        BindGrid();
    });
    $(document).on('change', '#txttodate', function () {
        BindGrid();
    });
    $(document).on('change', '#txtpatientfilter', function () {
        BindGrid();
    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('click', '#btnadd', function () {
        CalculateAmount();
    });
    $(document).on('click', '#btnsavedoccut', function () {
        SaveDoctorCut();
    });
    $(document).on('change', '#ddldoctor', function () {
        BindGrid();
    });
    $(document).on('change', '#ddlcentre', function () {
        BindCombo($("#ddldoctor"), "ddldoctor", $("#ddlcentre").val());
        BindGrid();
    });
    cleardetail();
    $("#txtpercentage").keyup(function (e) {

        if ($("#txtpercentage").val() == '0') {
            $("#txtpercentage").val('0')
            alertify.log('Please Select Discount By First');
            return false;
        }
        if ($("#txtpercentage").val() == "" || $("#txtpercentage").val() <= 0 || isNaN($("#txtpercentage").val()))
            $("#txtpercentage").val("0");
        else
            if ($("#txtpercentage").val().substring(0, 1) == '0') $("#txtpercentage").val($("#txtpercentage").val().substring(1));
        if ($("#txtpercentage").val() > 100) {
            alertify.log('Percentage should not be greater than 100');
            $("#txtpercentage").val('0');
        }

    });
    $(document).on('click', '.lnkallcheckdoctor', function (e) {
        var status = $(this).is(':checked');
        var table = $(e.target).closest('table');
        $('td input:checkbox', table).prop('checked', this.checked);
        savecutstatusDetail(status, -1);
    });
    $(document).on('click', '.lnkcheckdoctor', function (e) {
        var status = $(this).is(':checked');
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        savecutstatusDetail(status, index);
    });

});
function BindAllComboBox() {
    BindCombo($("#ddldoctor"), "ddldoctor", '');
    BindCombo($("#ddlcentre"), "ddlcentre", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DoctorMultiCut.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddldoctor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
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
function SaveDoctorCut() {
    var type = ($('#ddltype').val() == "0") ? "BillAmount" : "PaidAmount";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DoctorMultiCut.aspx/SaveDoctorCut",
        data: JSON.stringify({ DoctorID: $('#ddldoctor').val(), Type: type }),
        dataType: "json",
        async: false,
        success: function (response) {

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
function CalculateAmount() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DoctorMultiCut.aspx/CalculateAmount",
        data: JSON.stringify({ Type: $('#ddltype').val(), Percentage: $('#txtpercentage').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            $("#gvpathology").empty();
            if (response.d.length > 0) {
                $('#gvpathology').append("<thead><tr><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>TestList</th><th>Booking_Date</th><th>Bill_Amount</th><th>Doctor_Amount</th></tr></thead><tbody>");
                for (var i = 0; i < response.d.length; i++) {
                    var checkbox = "";
                    var statusbill = "";
                    var fillreporting = '';
                    var printdetail = '';
                    var reportvalidate = '';
                    var timer;
                    printdetail = "<input type='checkbox' class='lnkcheckdoctor' />";
                    timer = response.d[i].TATTimer;
                    if (response.d[i].Recheck == 'B')
                        fillreporting = '#3be2d359';
                    else if (response.d[i].Recheck == 'I')
                        fillreporting = '#ec39396b';
                    else if (response.d[i].Recheck == 'C') {
                        fillreporting = '#39ec3f6b';
                        timer = 'Test Complete Done';
                    } else if (response.d[i].Recheck == 'V') {
                        fillreporting = '#c839ec6b';
                        reportvalidate = "checked";
                        timer = 'Test Validate Done';
                    } else if (response.d[i].Recheck == 'P') {
                        fillreporting = '#b3851d6b';
                        reportvalidate = "checked";
                        timer = 'Test Validate Done';
                    }
                    $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                                          "<td>" + response.d[i].CentreName + "</td>" +
                                           "<td>" + response.d[i].UHID + "</td>" +
                                           "<td>" + response.d[i].PatientName + ' ' + response.d[i].Age + "</td>" +
                                           "<td>" + response.d[i].Mobile + "</td>" +
                                           "<td>" + response.d[i].EmailID + "</td>" +
                                           "<td>" + response.d[i].BillNo + "</td>" +
                                           "<td>" + response.d[i].TestList + "</td>" +
                                           "<td style='width:100px'>" + response.d[i].BillOpenDate + "</td>" +
                                           "<td>" + response.d[i].BillAmount + "</td>" +
                                           "<td>" + response.d[i].PaidAmount + "</td>" +
                                           "<td>" + response.d[i].DoctorCutPer + "</td>" +
                                           "<td>" + response.d[i].DoctorCutAmount + "</td>" +
                                             "</tr>");
                }
                $('#gvpathology').append("</tbody>");
                Initialize();
            }
            else {
                $("#gvpathology").append("<thead><tr><th>Doctor Billing List</th></tr></thead>");
                $("#gvpathology").append("<tr><td>There is No List</td></tr>");
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    if ($('#hdfupdate').val() == "False")
        $('#btnsavedoccut').css('display', 'none');
    else
        $('#btnsavedoccut').css('display', '');


}
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DoctorMultiCut.aspx/GetWorkloadDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val(), DoctorID: $('#ddldoctor').val(), CentreID: $('#ddlcentre').val() }),
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
        $("#gvpathology").empty();
        if (data.d.length > 0) {
            $('#gvpathology').append("<thead><tr><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>TestList</th><th>Booking_Date</th><th>Bill_Amount</th><th>Doctor_Amount</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var checkbox = "";
                var statusbill = "";
                var fillreporting = '';
                var printdetail = '';
                var reportvalidate = '';
                var timer;
                printdetail = "<input type='checkbox' class='lnkcheckdoctor' />";
                timer = data.d[i].TATTimer;
                if (data.d[i].Recheck == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].Recheck == 'I')
                    fillreporting = '#ec39396b';
                else if (data.d[i].Recheck == 'C') {
                    fillreporting = '#39ec3f6b';
                    timer = 'Test Complete Done';
                } else if (data.d[i].Recheck == 'V') {
                    fillreporting = '#c839ec6b';
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                } else if (data.d[i].Recheck == 'P') {
                    fillreporting = '#b3851d6b';
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                }
                $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                                       "<td>" + data.d[i].CentreName + "</td>" +
                                       "<td>" + data.d[i].UHID + "</td>" +
                                       "<td>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                                       "<td>" + data.d[i].Mobile + "</td>" +
                                       "<td>" + data.d[i].EmailID + "</td>" +
                                       "<td>" + data.d[i].BillNo + "</td>" +
                                       "<td>" + data.d[i].TestList + "</td>" +
                                       "<td style='width:100px'>" + data.d[i].BillOpenDate + "</td>" +
                                       "<td>" + data.d[i].BillAmount + "</td>" +
                                       "<td>" + data.d[i].PaidAmount + "</td>" +
                                         "</tr>");
            }
            $('#gvpathology').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvpathology").append("<thead><tr><th>Doctor Billing List</th></tr></thead>");
            $("#gvpathology").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvpathology').dataTable({
        "iDisplayLength": -1,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": true, "targets": [2] }],
        "searching": true,
        "paging": false,
        "processing": true,
        "bSort": true,
        "info": false,
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
function cleardetail() {
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    BindAllComboBox(); BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');

}

function savecutstatusDetail(status, index) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DoctorMultiCut.aspx/savecutstatusDetail",
        data: JSON.stringify({ index: index, Status: status }),
        dataType: "json",
        async: false,
        success: function (response) {
            //   BindGrid();
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