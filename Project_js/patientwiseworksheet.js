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
    cleardetail();
   
    $(document).on('click', '.lnkprint', function () {
        var BillID = $(this).data('billid');
        PrintReport(BillID, 'P');
    }); $(document).on('click', '.lnkprintL', function () {
        var BillID = $(this).data('billid');
        PrintReport(BillID, 'L');
    });
  
});
function PrintReport(id,type) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientWiseWorksheet.aspx/PrintWorkSheet',
        data: JSON.stringify({ ID: id ,Type:type}),
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error("Access Denied!");
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
        url: "PatientWiseWorksheet.aspx/GetWorkloadDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val() }),
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
            $('#gvpathology').append("<thead><tr><th style='width:15px' class='center'>Potrate</th><th style='width:15px' class='center'>Landscape</th><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>TestList</th><th>Booking_Date</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var checkbox = "";
                var statusbill = "";
                var fillreporting = '';
                var printdetail = '';
                var printdetail1 = '';
                var reportvalidate = '';
                var timer;
                timer = data.d[i].TATTimer;
                printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-billid='" + data.d[i].BillID + "' style='font-size: large;' href='javascript:void();'> </a>";
                printdetail1 = " <a class='glyphicon glyphicon-print lnkprintL' data-billid='" + data.d[i].BillID + "' style='font-size: large;' href='javascript:void();'> </a>";
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
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' data-billid='" + data.d[i].BillID + "' style='font-size: large;' href='javascript:void();'></a>";
                checkbox = "<input type='checkbox'  class='form-control' id='chckvalidate' " + reportvalidate + " data-billid='" + data.d[i].BillID + "' />"

                $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                                 "<td>" + printdetail + "</td>" +
                                  "<td>" + printdetail1 + "</td>" +
                                      "<td>" + data.d[i].CentreName + "</td>" +
                                      "<td>" + data.d[i].UHID + "</td>" +
                                      "<td>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                                      "<td>" + data.d[i].Mobile + "</td>" +
                                      "<td>" + data.d[i].EmailID + "</td>" +
                                      "<td>" + data.d[i].BillNo + "</td>" +
                                      "<td>" + data.d[i].TestList + "</td>" +
                                      "<td style='width:100px'>" + data.d[i].BillOpenDate + "</td>" +
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
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');

}