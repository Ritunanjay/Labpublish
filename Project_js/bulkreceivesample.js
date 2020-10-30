var sid = 0;
var bilid = 0;
var sample1 = "";
var sampleid = "";
var billid = "";
var patientname1 = "";
var uhid1 = "";
$(document).ready(function () {
    PermissionDetail();
    $(document).on('click', '.lnkrefreshdate', function () {
        SetCurrentDate($('#txtcollectiondate'));
        SetCurrentTime($('#txtcollectiontime'));
  });
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
    $(document).on('change', '#ddlcentre', function () {
        BindGrid();
    });
    $('#txtcollectiondate,#txtreceiveddate,#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        forceParse: false
    });
    $(document).on('click', '.lnkbarcode', function () {
        sample1 = $(this).data('sampleno');
        patientname1 = $(this).data('patientname');
        billid1 = $(this).data('billid');
        uhid1 = $(this).data('uhid');
        sampleid1 = $(this).data('sampleid');
        var barcodecount = $('.lnkbarcodecount').val();

        BarCode(barcodecount, 'B', sample1, patientname1, uhid1,sampleid1,billid1)

    });
    $(document).on('change', '.lnkbarcodecount', function () {
        var barcodecount = $('.lnkbarcodecount').val();
        if (barcodecount == "")
            barcodecount = 1;
        BarCode(barcodecount, 'B', sample1, patientname1, uhid1, sampleid1,billid1)

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
    $(document).on('click', '#btnreset', function () {
        cleardetail();
    });
    $(document).on('click', '#btnadd', function () {
        var billid = $('#hdfbillid').val();
        var id = $('#hdfid').val();
        SaveSampleDetail(true);
        $("#gvsampledetail").empty();
        $('#pnlsampledetail').css('display', 'none');
    });
    cleardetail();
    $(document).on('click', '.lnkselect', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var status = $(this).is(':checked');
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "BulkReceiveSample.aspx/UpdateIsSampleCollect",
            data: JSON.stringify({ Status: status, Condition: 'S', index: index }),
            dataType: "json",
            async: false,
            success: function (data) {

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

    });
    $(document).on('click', '.lnkallselect', function (e) {
        var table = $(e.target).closest('table');
        $('td input:checkbox', table).prop('checked', this.checked);
        var status = $(this).is(':checked');
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "BulkReceiveSample.aspx/UpdateIsSampleCollect",
            data: JSON.stringify({ Status: status, Condition: 'A', index: 0 }),
            dataType: "json",
            async: false,
            success: function (data) {

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
        BindSampleDetail(billid, sampleid);
        if ($('#txtrejectdetail').val() != '')
            RejectSample(false, billid, sampleid);
        else
            alertify.log('Please Mention Rejection Remark');
        BindSampleDetail(billid, sampleid);
    });
    $('#ddldoctor').prop('selectedIndex', 1);

});
function RejectSample(received, billid, sid) {
    var obj = {};
    obj.BillID = billid;
    obj.SampleID = sid;
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
    obj.ContainerNo = 0;
    obj.ContainerRemark = "";
    obj.RejectedDetail = $('#txtrejectdetail').val();
    obj.SampleID = sid;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "BulkReceiveSample.aspx/SaveSampleCollect",
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
    obj.DID1 = 0;
    obj.DID2 = $('#ddldoctor1').val();
    obj.DID3 = $('#ddldoctor2').val();
    obj.DID4 = $('#ddldoctor3').val();
    obj.ContainerNo = $('#txtcontainer').val();
    obj.ContainerRemark = $('#txtcontainerremark').val();
    obj.IsLabTransfer = $('#ddllabtransfer').val();
    obj.IsSampleCollect = $('#ddlsamplecollect').val();
    obj.BillID = bilid;
    obj.SampleID = sid;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "BulkReceiveSample.aspx/SaveSampleCollect",
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
function BindAllComboBox() {
    BindCombo($("#ddlsampleboy"), "ddlsampleboy");
    BindCombo($("#ddldoctor"), "ddldoctor", '');
    BindCombo($("#ddldoctor1"), "ddldoctor1", '');
    BindCombo($("#ddldoctor2"), "ddldoctor2", '');
    BindCombo($("#ddldoctor3"), "ddldoctor3", '');
    BindCombo($("#ddlcentre"), "ddlcentre", '');
}
function BindCombo(ele, ControlName) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "BulkReceiveSample.aspx/BindComboBox",
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
            } if (ControlName == "ddlcentre") {
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
        url: "BulkReceiveSample.aspx/GetSampleReceivedDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val(), CentreID: $('#ddlcentre :selected').val() }),
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
            $('#gvsamplecollection').append("<thead><tr>" +
                "<th style='width:15px' class='center'>Barcode</th>" +
                "<th style='width:15px' class='center'><input type='checkbox' class='lnkallselect' /></th>" +
               "<th style='width:15px' class='center'>Reject</th>" +
                "<th>CentreName</th>" +
                "<th>UHID</th><th>PatientName</th><th>BillNo</th><th>TestList</th><th>Sample</th><th>SampleNo</th><th>ReceivedDate</th>" +
               // "<th>CollectionDate</th>"+
               "<th>RejectedDetail</th><th>Container</th><th>ContainerNo</th><th>ContainerRemark</th><th>Reject_Remark</th>" +//"<th>IsLabTransfer</th>"+
               //"<th>IsSampleCollect</th>"+
               "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var samplereceive = (data.d[i].IsSampleCollect != true) ? 'red' : 'green';
                var rejectdetail = (data.d[i].Received != false) ? "<a class='fa fa-times-circle-o lnkreject' style='font-size: large;' data-billid='" + data.d[i].BillID + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "'  data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'></a>" : "";
                var samplebarcode = (data.d[i].IsSampleCollect != false) ? "<a class='fa fa-barcode lnkbarcode' style='font-size: x-large;' data-billid='" + data.d[i].BillID + "' data-sampleno='" + data.d[i].SampleNo + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "'  data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'></a>" : "";
                var labtransfer = (data.d[i].IsLabTransfer != false) ? "Transfer" : "Not Transfer";
                var samplecollect = (data.d[i].IsSampleCollect != false) ? "Sample Collect" : "Sample Not Collect";
                var sampleselect = (data.d[i].IsSampleCollect != true) ? " <input type='checkbox' class='lnkselect' style='font-size: large;' data-billid='" + data.d[i].BillID + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' data-containerno='" + data.d[i].ContainerNo + "' data-container='" + data.d[i].ContainerRemark + "' data-labtransfer='" + data.d[i].IsLabTransfer + "' data-samplecollect='" + data.d[i].IsSampleCollect + "' />" : "";
                var reject = (data.d[i].Rejected != false) ? "orange" : "orange";
                if (data.d[i].IsLabTransfer != false) {
                    $("#gvsamplecollection").append("<tr style='color:" + samplereceive + ";'>" +
                  "<td>" + samplebarcode + "</td>" +
                 "<td> " + sampleselect + "  </td>" +
                      "<td>" + rejectdetail + "</td>" +
                        "<td class='center'>" + data.d[i].CentreCode + " | " + data.d[i].CentreName + "</td>" +
                         "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + "</td>" +
                        "<td class='center'>" + data.d[i].TestName + "</td>" +
                        "<td>" + data.d[i].TestCode + "</td>" +
                        "<td class='center'>" + data.d[i].SampleName + "</td>" +
                        "<td class='center'>" + data.d[i].SampleNo + "</td>" +
                        "<td class='center'>" + data.d[i].ReceivedDate + "</td>" +
                       // "<td class='center'>" + data.d[i].CollectionDate + "</td>" +
                        "<td class='center'>" + data.d[i].RejectedDetail + "</td>" +
                        "<td class='center'>" + data.d[i].Container + "</td>" +
                         "<td class='center'>" + data.d[i].ContainerNo + "</td>" +
                       "<td class='center'>" + data.d[i].ContainerRemark + "</td>" +
                      //  "<td class='center'>" + labtransfer + "</td>" +
                       // "<td class='center'>" + samplecollect + "</td>" +
                       "<td style='color:white; background-color:" + reject + "'>" + data.d[i].RejectedDetail + "</td>" +
                        "</tr>");
                }
            }
            $('#gvsamplecollection').append("</tbody>");
            //Initialize();
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
    $('#txtcontainer').val('0');
    $('#txtcontainerremark').val('');
    $('#ddllabtransfer').val('true');
    $('#ddlsamplecollect').val('true');
    $('#txtsampleno').val('');
    SetCurrentDate($('#txtfromdate'));
    SetCurrentDate($('#txttodate'));
    SetCurrentDate($('#txtcollectiondate'));
    SetCurrentTime($('#txtcollectiontime'));
    SetCurrentDate($('#txtreceiveddate'));
    SetCurrentTime($('#txtreceivedtime'));
    $('#txtrejectdetail').val('');
    BindAllComboBox();
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');
    $('#pnldoctor').css('display', 'none');
    $("#gvsampledetail").empty();
    $('#pnlsampledetail').css('display', 'none');
    $('#chckdoctor').attr('checked', false);

}
function BindSampleDetail(billid, sampleid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "BulkReceiveSample.aspx/BindSampleDetail",
        data: JSON.stringify({ BillID: billid, SampleID: sampleid }),
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
        $("#gvsampledetail").empty();
        if (data.d.length > 0) {
            $('#txtcontainer').val(data.d[0].ContainerNo);

            $('#gvsampledetail').append("<thead><tr>" +
              //  "<th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Reject</th>"+
                "<th>UHID</th><th>PatientName</th><th>OrderNo</th><th>TestName</th><th>Sample</th><th>Container</th><th>SampleNo</th><th>ReceivedDate</th>" +
               // "<th>CollectionDate</th>"+
                "<th>RejectedDetail</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var samplereceive = (data.d[i].Received == 0) ? 'red' : 'green';
                var rejectdetail = (data.d[i].Received != false) ? "<a class='fa fa-times-circle-o lnkreject' style='font-size: large;' data-billid='" + data.d[i].BillID + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "'  data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'></a>" : "";

                $("#gvsampledetail").append("<tr style='color:" + samplereceive + "'>" +
                       // " <td> <a class='fa fa-check-circle-o lnkselect' style='font-size: large;' data-billid='" + data.d[i].BillID + "'  data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].SCID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'> </a>" +
                        //"</td><td>" + rejectdetail + " </td> " +
                        "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + "</td>" +
                        "<td class='center'>" + data.d[i].OrderNo + "</td>" +
                        "<td>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                        "<td class='center'>" + data.d[i].SampleName + "</td>" +
                        "<td class='center'>" + data.d[i].Container + "</td>" +
                        "<td class='center'>" + data.d[i].SampleNo + "</td>" +
                        "<td class='center'>" + data.d[i].ReceivedDate + "</td>" +
                      //  "<td class='center'>" + data.d[i].CollectionDate + "</td>" +
                        "<td class='center'>" + data.d[i].RejectedDetail + "</td>" +
                        "</tr>");
            }
            $('#gvsampledetail').append("</tbody>");
            //  Initialize();
            $('#ddlsamplecollect').val('true');
        }
        else {
            $("#gvsampledetail").append("<thead><tr><th>Sample Collection List</th></tr></thead>");
            $("#gvsampledetail").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function BarCode(number, type, sampleno, patientdetail, uhidinfo,sampleid,billid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "BulkReceiveSample.aspx/Barcode",
        data: JSON.stringify({ Number: number, type: type, barcode: sampleno,SID:sampleid,BID:billid }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#img").empty();
            $('#ModalBarcode').modal('show');
            $("#img").append("<table class=MsoTableGrid border=1 cellspacing=0 cellpadding=0 style='border-collapse:collapse;border:none'><tr>");
            var barcodeprint = '';
            for (var i = 0; i < number; i++) {
                $("#img").append(" <td width=180 valign=top style='width:175.1pt;border:solid windowtext 1.0pt;  padding:0in 5.4pt 0in 5.4pt'> " +
                "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height: normal'>UHID : " + uhidinfo + " </p>      " +
                "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:   normal'>" + patientdetail + "</p>    " +
            " <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height:     normal'>" + response.d.MessageInfoDetail + "</p>  " +
                "      <p class=MsoNormal style='margin-bottom:0in;margin-bottom:.0001pt;line-height: normal'><img id='qrimg' class='img img-responsive img-thumbnail' alt='' src='" + response.d.MessageName + "' /></p> </td>");
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
