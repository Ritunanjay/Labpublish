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
    }); getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));

    $(document).on('click', '.lnkprint', function () {
        var BillID = $(this).data('billid');
        PrintReport(BillID);
    });
    $(document).on('click', '#btnadd', function () {
        $('#txtpatientfilter').val('');
        EmailSentSave();

    });
    $(document).on('click', '#btnsms', function () {
        $('#txtpatientfilter').val('');
        SMSSentSave();

    });
    $(document).on('click', '#chkselect', function () {
        var BillID = $(this).data('billid');
        ReportingReport($('#chkselect').is(':checked'), BillID);
    });
    $(document).on('click', '.allchkselect', function (e) {
        var status = $(this).is(':checked');
        var table = $(e.target).closest('table');
        $('td input:checkbox', table).prop('checked', this.checked);
        setreportingvalues(status);
    });
    BindAllComboBox();
    BindGrid();
    $(document).on('change', '#ddlcentre', function () {
        BindGrid();

    });
});
function BindAllComboBox() {
    BindCombo($("#ddlcentre"), "ddlcentre", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReporting.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
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
function setreportingvalues(status)
{
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyReporting.aspx/setreportingvalues',
        data: JSON.stringify({ Status: status }),
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
function SMSSentSave() {
  
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyReporting.aspx/SMSSent',
        data: JSON.stringify({ status: false }),
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.success('SMS Save Success');
                BindGrid();
            }
            else
                alertify.error('Software Error!!!');
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

function EmailSentSave() {
     $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyReporting.aspx/EmailSent',
        data: JSON.stringify({ status: false }),
        async: false,
        success: function (response) {
            if (response.d == "") {
                alertify.success('Email Save Success');
                BindGrid();
            }
            else
                alertify.error('Software Error!!!');
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
function ReportingReport(status, id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyReporting.aspx/PathologyReportingStatus',
        data: JSON.stringify({ Status: status, ID: id }),
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
function PrintReport(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PathologyReporting.aspx/PrintPathologyBillByReport',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "Error")
                alertify.error("Some Error Occured !");
            else
                window.open(response.d, '_blank');
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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReporting.aspx/GetPathologyDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val(),CentreID:$('#ddlcentre').val() }),
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
            $('#gv').append("<thead><tr><th style='width:15px' class='center'><input type='checkbox' class='form-control allchkselect'  data-billid='0' /> Select</th><th style='width:15px' class='center'>Print</th><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>TestList</th><th>BookingDate</th><th>BloodGroup</th><th>DoctorName</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var reportingdetail = "<input type='checkbox' class='form-control' id='chkselect' data-billid='" + data.d[i].BillID + "' />";
                var printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "' style='font-size: large;' href='javascript:void();'> </a>";

                $("#gv").append("<tr style='color:green'><td>" +
                        "" + reportingdetail + "" +
                        "</td><td>" + printdetail + " " +
                        " </td>" +
                        "<td class='center'>" + data.d[i].CentreName + "</td>" +
                         "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                        "<td class='center'>" + data.d[i].Mobile + "</td>" +
                        "<td class='center'>" + data.d[i].EmailID + "</td>" +
                        "<td class='center'>" + data.d[i].BillNo + "</td>" +
                        "<td>" + data.d[i].TestList + "</td>" +
                        "<td class='center'>" + data.d[i].BillOpenDate + "</td>" +
                       "<td class='center'>" + data.d[i].BloodGroup + "</td>" +
                        "<td class='center'>" + data.d[i].DoctorName + "</td>" +
                        "</tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Labourtary List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvpathology').dataTable({
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