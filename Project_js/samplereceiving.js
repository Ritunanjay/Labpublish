var sid = 0;
var bilid = 0;
$(document).ready(function () {
    PermissionDetail();
    cleardetail();
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
    $('#txtcollectiondate,#txtreceiveddate,#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        forceParse: false
    });

    $(document).on('click', '.lnkbarcode', function () {
        var sample = $(this).data('sampleno');
        var patientname = $(this).data('patientname');
        var uhid = $(this).data('uhid');
        BarCode(1, 'B', sample, patientname, uhid)

    });
    $(document).on('click', '#img', function () {
        PrintDiv();
    })

    $(document).on('click', '#chckdoctor', function () {
        var doctor = $('#chckdoctor').is(':checked');
        if (doctor == true) {
            $('#pnldoctor').css('display', '');
        }
        else {
            $('#pnldoctor').css('display', 'none');
        }
    });
    $(document).on('click', '#btnadd', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        debugger;
        if (orderid > 0)
            SaveSampleDetail(true);
        else
            alertify.log('Please Select Patient To Collect Sample');
    });
    $(document).on('click', '.lnkselect', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        var sampleid = $(this).data("sampleid");
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        var billid = $(this).data("billid");
        bilid = billid;
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        sid = sampleid;
        GetSampleDetail(id, orderid, sampleid);
        $('#hdforderid').val(orderid);
        $('#hdfid').val(id);
    });
    $(document).on('click', '.lnkreject', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        var sampleid = $(this).data("sampleid");
        $('#hdforderid').val(orderid);
        $('#hdfid').val(id);
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        var billid = $(this).data("billid");
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        if ($('#txtrejectdetail').val() != '')
            RejectSample(false);
        else
            alertify.log('Please Mention Rejection Remark');
    });
    $('#ddldoctor').prop('selectedIndex', 1);

});
function RejectSample(received) {
    var obj = {};
    obj.Received = received;
    obj.SCID = $('#hdfid').val();
    obj.SampleBoyID = $('#ddlsampleboy').val();
    obj.OrderID = $('#hdforderid').val();
    obj.SampleNo = $('#txtsampleno').val();
    obj.CollectionDate = $('#txtcollectiondate').val();
    obj.CollectionTime = $('#txtcollectiontime').val();
    obj.ReceivedDate = $('#txtreceiveddate').val();
    obj.ReceivedTime = $('#txtreceivedtime').val();
    obj.RejectedDetail = $('#txtrejectdetail').val();
    obj.Rejected = true;
    obj.RejectedDetail = $('#txtrejectdetail').val();
    obj.SampleID = sid;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleReceiving.aspx/SaveSampleCollect",
        data: JSON.stringify({ obj: obj, Action: 'R' }),
        dataType: "json",
        async: false,
        success: function (data) {
            alertify.success('Sample Rejected Success');
            cleardetail();

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
function SaveSampleDetail(received) {
    var obj = {};
    obj.Received = received;
    obj.SCID = $('#hdfid').val();
    obj.OrderID = $('#hdforderid').val();
    obj.SampleNo = $('#txtsampleno').val();
    obj.CollectionDate = $('#txtcollectiondate').val();
    obj.CollectionTime = $('#txtcollectiontime').val();
    obj.ReceivedDate = $('#txtreceiveddate').val();
    obj.ReceivedTime = $('#txtreceivedtime').val();
    obj.RejectedDetail = $('#txtrejectdetail').val();
    obj.DID1 = $('#ddldoctor').val();
    obj.DID2 = $('#ddldoctor1').val();
    obj.DID3 = $('#ddldoctor2').val();
    obj.DID4 = $('#ddldoctor3').val();
    obj.BillID = bilid;
    obj.SampleID = sid;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleReceiving.aspx/SaveSampleCollect",
        data: JSON.stringify({ obj: obj, Action: 'S' }),
        dataType: "json",
        async: false,
        success: function (data) {
            alertify.success('Sample Receive Success');
            cleardetail();

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
function GetSampleDetail(id, orderid, sampleid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleReceiving.aspx/GetSampleDetail",
        data: JSON.stringify({ ID: id, OrderID: orderid, SampleID: sampleid }),
        dataType: "json",
        async: false,
        success: function (data) {
            setdata(data.d);
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
    BindCombo($("#ddlsampleboy"), "ddlsampleboy");
    BindCombo($("#ddldoctor"), "ddldoctor", '');
    BindCombo($("#ddldoctor1"), "ddldoctor1", '');
    BindCombo($("#ddldoctor2"), "ddldoctor2", '');
    BindCombo($("#ddldoctor3"), "ddldoctor3", '');
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "SampleReceiving.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: '' }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlsampleboy") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.UserID).html(value.UserName));
                });
            }
            if (ControlName == "ddldoctor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
                });
            } if (ControlName == "ddldoctor1") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
                });
            } if (ControlName == "ddldoctor2") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
                });
            } if (ControlName == "ddldoctor3") {
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
        url: "SampleReceiving.aspx/GetSampleReceivedDetail",
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
        $("#gvsamplecollection").empty();
        if (data.d.length > 0) {
            $('#gvsamplecollection').append("<thead><tr><th style='width:15px' class='center'>Barcode</th><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Reject</th><th>UHID</th><th style='width:50%'>Patient Name</th><th>OrderNo</th><th style='width:100%'>TestName</th><th>Sample</th><th>SampleNo</th><th>Collect Date</th><th>Received Date</th><th>RejectedDetail</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var samplereceive = (data.d[i].Received == 0) ? 'red' : 'green';
                var classcolor = (data.d[i].Received == 0) ? 'danger' : 'success';
                var rejectdetail = (data.d[i].Received != false) ? "<a class='fa fa-times-circle-o lnkreject' style='font-size: large;' data-billid='" + data.d[i].BillID + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "'  data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'></a>" : "";
                var samplebarcode = (data.d[i].Received != false) ? "<a class='fa fa-barcode lnkbarcode' style='font-size: x-large;' data-sampleno='" + data.d[i].SampleNo + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "'  data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'></a>" : "";

                $("#gvsamplecollection").append("<tr style='color:" + samplereceive + "'><td  class='" + classcolor + "'>" + samplebarcode + "</td><td  class='" + classcolor + "'>" +
                        "  <a class='fa fa-check-circle-o lnkselect' style='font-size: large;' data-billid='" + data.d[i].BillID + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'> </a>" +
                        "</td><td class='" + classcolor + "'>" + rejectdetail + " </td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].UHID + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].PatientName + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].OrderNo + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].SampleName + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].SampleNo + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].CollectionDate + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].ReceivedDate + "</td>" +
                        "<td class='" + classcolor + "'>" + data.d[i].RejectedDetail + "</td>" +
                        "</tr>");
            }
            $('#gvsamplecollection').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvsamplecollection").append("<thead><tr><th>Sample Collection List</th></tr></thead>");
            $("#gvsamplecollection").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gvsamplecollection').dataTable({
        "iDisplayLength": -1,
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
function setdata(data) {
    $('#txtsampleno').val(data.SampleNo);
    $('#txtcollectiondate').val(data.CollectionDate);
    $('#txtcollectiontime').val(data.CollectionTime);
    $('#txtreceiveddate').val(data.ReceivedDate);
    $('#txtreceivedtime').val(data.ReceivedTime);
    $('#txtrejectdetail').val(data.RejectedDetail);
}
function cleardetail() {
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    $('#txtsampleno').val('');
    SetCurrentDate($('#txtfromdate'));
    SetCurrentDate($('#txttodate'));
    SetCurrentDate($('#txtcollectiondate'));
    SetCurrentDate($('#txtreceiveddate'));
    SetCurrentTime($('#txtcollectiontime'));
    SetCurrentTime($('#txtreceivedtime'));
    $('#txtrejectdetail').val('');
    BindGrid();
    BindAllComboBox();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');

}
function BarCode(number, type, sampleno, patientdetail, uhidinfo) {
    $.ajax({
        type: "POST",
        url: "ReceiveSample.aspx/Barcode",
        data: JSON.stringify({ Number: number, type: type, barcode: sampleno }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#img").empty();
            $('#ModalBarcode').modal('show');
            $("#img").append("<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none'><tr>");
            var barcodeprint = '';
            for (var i = 0; i < 6; i++) {
                $("#img").append(" <td width=233 valign=top style='width:175.1pt;border:solid windowtext 1.0pt;  padding:0in 5.4pt 0in 5.4pt'> " +
                "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height: normal'>UHID                  : " + uhidinfo + " </p>      " +
                "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:   normal'>Patient Name: " + patientdetail + "</p>    " +
             //   "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:     normal'>Bill No               : 6547fd65dsf7d6s</p>  "+
                "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height: normal'><img id='qrimg' class='img img-responsive' alt='' src='" + response.d + "' /></p> </td>");
            }

            $("#img").append("</tr>  </table>");
            //    $("#img").append("<div style='display: inline;'> </div>");

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
