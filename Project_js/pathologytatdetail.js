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
    $(document).on('click', '.lnkrefreshworkload', function () {
        BindGrid();

    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    cleardetail();
     window.setInterval(function () {
        BindGrid();
    }, 40000);
  
});

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
        url: "PathologyTATDetail.aspx/GetWorkloadDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val(), groupid: $('#ddlgroup').val(), status: $('#ddlstatus').val() }),
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
            $('#gvpathology').append("<thead><tr><th>Centre</th><th>UHID</th><th>Patient_Detail</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>Test_Group</th><th>TestList</th><th>Booking_Date</th><th>SampleCollection</th><th>SampleReceiving</th><th>ResultDate</th><th>ResultCompleteDate</th><th>ResultValidateDate</th><th>ResultPrintDate</th><th>TATTimer</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var checkbox = "";
                var statusbill = "";
                var fillreporting = '';
                var printdetail = '';
                var reportvalidate = '';

                var timer;
                timer = data.d[i].TATTimer;
                if (data.d[i].Recheck == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].Recheck == 'I') {
                    fillreporting = '#ec39396b';
                 } else if (data.d[i].Recheck == 'C') {
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
                if (data.d[i].Collect == false) {
                    reportingdetail = "";
                    checkbox = "";
                    timer = "Sample Not Collect";
                    printdetail = "";
                }
               $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                                      "<td>" + data.d[i].CentreName + "</td>" +
                                      "<td>" + data.d[i].UHID + "</td>" +
                                      "<td>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                                      "<td>" + data.d[i].Mobile + "</td>" +
                                      "<td>" + data.d[i].EmailID + "</td>" +
                                      "<td>" + data.d[i].BillNo + "</td>" +
                                      "<td>" + data.d[i].TestGroup + "</td>" +
                                       "<td>" + data.d[i].TestList + "</td>" +
                                      "<td>" + data.d[i].BillOpenDate + "</td>" +
                                      "<td>" + data.d[i].CollectionDate + "</td><td>" + data.d[i].ReceiveDate + "</td><td>" + data.d[i].ResultingDate + "</td><td>" + data.d[i].ResultCompleteDate + "</td><td>" + data.d[i].ResultValidateDate + "</td><td>" + data.d[i].ResultPrintDate + "</td>" +
                                 "<td><i class='fa fa-clock-o' style='background-color:white;font-size:large' >" + timer + "</i></td>" +
                                      
                            "</tr>");
            }
            $('#gvpathology').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvpathology").append("<thead><tr><th>Labourtary List</th></tr></thead>");
            $("#gvpathology").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvpathology').dataTable({
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": false, "targets": [2] }],
        "searching": true,
        "paging": true,
        "processing": true,
        "bSort": false,
        "info": true,
        order: [[1, "desc"]],
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
    BindAllComboBox();
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');

}
function BindAllComboBox() {
    BindCombo($("#ddlgroup"), "ddlgroup", '');

}
function BindCombo(ele, ControlName, status) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyTATDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, status: status }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlgroup") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.GroupID).html(value.Groupname));
                });
            } if (ControlName == "ddlmethod") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.MethodID).html(value.MethodName));
                });
            } if (ControlName == "ddlcommentHead") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CommentID).html(value.CommentHead));
                });
            } if (ControlName == "ddlmachine") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.MachineID).html(value.MachineName));
                });
            } if (ControlName == "ddlsample") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.SampleID).html(value.SampleName));
                });
            } if (ControlName == "ddlreporttype") {
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