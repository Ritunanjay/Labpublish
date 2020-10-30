var sid = 0;
var billid = 0;
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
    $('#txtcollectiondate,#txtreceiveddate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        forceParse: false
    });

    $(document).on('click', '#btnadd', function () {
        var orderid = $('#hdforderid').val();
        var id = $('#hdfid').val();
        debugger;
        if (orderid > 0)
            SaveSampleDetail(true);
        else
            alertify.log('Please Select Patient To Modility Arrive');
    });
    $(document).on('click', '#btnreset', function () {
        cleardetail();
    });
    $(document).on('click', '.lnkselect', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        var bid = $(this).data("billid");
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        GetModilityDetail(id, orderid);
        $('#hdforderid').val(orderid);
        $('#hdfid').val(id);
        billid = bid;
    });
    $(document).on('click', '.lnkreject', function () {
        var id = $(this).data("id");
        var orderid = $(this).data("orderid");
        $('#hdforderid').val(orderid);
        $('#hdfid').val(id);
        var uhid = $(this).data("uhid");
        var patientname = $(this).data("patientname");
        var orderno = $(this).data("ordernumber");
        $('#lnkname').html('Patient Name: ' + patientname);
        $('#lnkuhid').html('Patient UHID: ' + uhid);
        $('#lnkpatientdetail').html('OrderNumber: ' + orderno);
        if ($('#txtrejectdetail').val() != '')
            RejectSample(false);
        else
            alertify.log('Please Mention Rejected Remark');
    });
    cleardetail();
    $('#ddldoctor').prop('selectedIndex', 1);

});


function RejectSample(received) {
    var obj = {};
    obj.Arrived = received;
    obj.RRID = $('#hdfid').val();
    obj.OrderID = $('#hdforderid').val();
    obj.ModilityNo = '';
    obj.RejectedDetail = $('#txtrejectdetail').val();
    obj.SampleID = sid;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyModilityArrive.aspx/SaveModilityCollect",
        data: JSON.stringify({ obj: obj, Action: 'R', DID: $('#ddldoctor').val(), DID1: $('#ddldoctor1').val(), DID2: $('#ddldoctor2').val(), DID3: $('#ddldoctor3').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            alertify.success(' Modility Arrive Rejected Success');
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
    if ($('#ddldoctor').val() == $('#ddldoctor1').val()) {
        alertify.log('Please Select Different Reporting Doctor');
        return;

    }
    var obj = {};
    obj.Arrived = received;
    obj.RRID = $('#hdfid').val();
    obj.OrderID = $('#hdforderid').val();
    obj.ModilityNo = '';
    obj.RejectedDetail = $('#txtrejectdetail').val();
    obj.SampleID = sid;
    obj.BillID = billid;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyModilityArrive.aspx/SaveModilityCollect",
        data: JSON.stringify({ obj: obj, Action: 'S', DID: $('#ddldoctor').val(), DID1: $('#ddldoctor1').val(), DID2: $('#ddldoctor2').val(), DID3: $('#ddldoctor3').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            alertify.success(' Modility Arrive Success');
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
function GetModilityDetail(id, orderid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyModilityArrive.aspx/GetModilityDetail",
        data: JSON.stringify({ ID: id, OrderID: orderid }),
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
        url: "RadiologyModilityArrive.aspx/GetModilityReceivedDetail",
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
            $('#gvsamplecollection').append("<thead><tr><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Reject</th><th>UHID</th><th>PatientName</th><th>OrderNo</th><th>TestName</th><th>ModilityNo</th><th>RejectedDetail</th><th>Urgent</th><th>DoctorName</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var samplereceive = (data.d[i].Arrived == 0) ? '#ec39396b' : '#39ec3f6b';
                var rejectdetail = (data.d[i].Arrived != false) ? "<a class='fa fa-times-circle-o lnkreject' style='font-size: large;' data-billid='" + data.d[i].BillID + "'   data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'></a>" : "";
                var arrivedetail = (data.d[i].Arrived != true) ? " <a class='fa fa-check-circle-o lnkselect' style='font-size: large;' data-billid='" + data.d[i].BillID + "'   data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' href='javascript:void();'> </a>" : "";
                var color = (data.d[i].Urgent == true) ? 'yellow' : '';
                var urgent = (data.d[i].Urgent == true) ? 'Yes' : 'No';
                $("#gvsamplecollection").append("<tr style='color:black;background-color:" + samplereceive + "'><td>" +
                        "" + arrivedetail + "" +
                        "</td><td>" + rejectdetail + " " +
                        " </td>" +
                        "<td>" + data.d[i].UHID + "</td>" +
                        "<td>" + data.d[i].PatientName + "</td>" +
                        "<td>" + data.d[i].OrderNo + "</td>" +
                        "<td>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                        "<td>" + data.d[i].ModilityNo + "</td>" +
                        "<td>" + data.d[i].RejectedDetail + "</td>" +
                        "<td style='color:" + color + "'>" + urgent + "</td>" +
                        "<td>" + data.d[i].DoctorName + "</td>" +
                        "</tr>");
            }
            $('#gvsamplecollection').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvsamplecollection").append("<thead><tr><th>Radiology List</th></tr></thead>");
            $("#gvsamplecollection").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvsamplecollection').dataTable({
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
function setdata(data) {
    $('#txtsampleno').val(data.SampleNo);
    $('#txtcollectiondate').val(data.CollectionDate);
    $('#txtcollectiontime').val(data.CollectionTime);
    $('#txtreceiveddate').val(data.ReceivedDate);
    $('#txtreceivedtime').val(data.ReceivedTime);
    $('#txtrejectdetail').val(data.RejectedDetail);
    $('#ddldoctor').prop('selectedIndex', 1);
}
function cleardetail() {
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    BindAllComboBox();
    BindGrid();
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    $('#txtsampleno').val('');
    SetCurrentDate($('#txtcollectiondate'));
    SetCurrentDate($('#txtcollectiontime'));
    SetCurrentDate($('#txtreceiveddate'));
    SetCurrentDate($('#txtreceivedtime'));
    $('#txtrejectdetail').val('');
    BindGrid();

    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');
}

function BindAllComboBox() {
    BindCombo($("#ddldoctor"), "ddldoctor", '');
    BindCombo($("#ddldoctor1"), "ddldoctor1", '');
    BindCombo($("#ddldoctor2"), "ddldoctor2", '');
    BindCombo($("#ddldoctor3"), "ddldoctor3", '');
}

function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "RadiologyModilityArrive.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
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