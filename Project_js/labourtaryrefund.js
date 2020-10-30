$(document).ready(function () {
    PermissionDetail();
    $(document).on('keydown', '#txtpatientfilter', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txtfromdate', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txttodate', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txtpatientfilter', function () {
        FillPatientBindGrid();
    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('click', '.lnkprintselect', function () {
        var receiptid = $(this).data('receiptid');
        PrintReceipt(receiptid);
    });
    $(document).on('click', '.lnkselect', function () {
        var uhid = $(this).data('uhid');
        var patientname = $(this).data('patientname');
        var billno = $(this).data('billno');
        var billid = $(this).data('billid');
        $('#lnkname').html('PatientName : ' + patientname);
        $('#lnkuhid').html('UHID : ' + uhid);
        $('#lnkpatientdetail').html('BillNo : ' + billno);
        $('#hdfbillid').val(billid);
        GetPaymentDetail(billid);
    });
    $(document).on('click', '#btnreset', function () {
    });
    $(document).on('click', '.lnkpayment', function () {
        if (parseFloat($('#txtnet').val()) > 0)
            $('#ModalPayment').modal('show');
        else
            alertify.log('Please Select Any Bill To Pay');
    });
    $(document).on('click', '#btnadd', function () {
        SaveReceipt();
    });
    cleardetail();
    $(document).on('click', '.lnkselectprint', function () {
        var billid = $(this).data('billid');
        BindReceiptDetail(billid);
        $('#ModalReceipt').modal('show');
        cleardetail();
    });
});

function PrintReceipt(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'LabourtaryRefund.aspx/PrintPathologyRefund',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            if (response.d == "Error") alertify.error("Some Error Occured !");
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
function BindReceiptDetail(billid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LabourtaryRefund.aspx/BindRefundDetail",
        data: JSON.stringify({ BillID: billid }),
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
        $("#gvrefund").empty();
        if (data.d.length > 0) {
            $('#gvrefund').append("<thead><tr><th style='width:15px' class='center'>Action</th><th style='width:15px' class='center'>BillNo</th><th>ReceiptType</th><th>ReceiptNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>BillAmount</th><th>PaidAmount</th><th>ReceiptDate</th><th>TestList</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var color = "orange";
                if (data.d[i].Status == 'C') {
                    billdetail = "";
                    color = 'black';
                } else {
                    billdetail = "<a class='glyphicon glyphicon-print lnkprintselect' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' data-receiptid='" + data.d[i].ReceiptID + "' href='javascript:void();'></a>";
                    color = 'black';
                }
                $("#gvrefund").append("<tr style='color:" + color + "'><td>" + billdetail + "</td><td class='center'>" + data.d[i].BillNo + "</td>" +
                         "<td class='center'>" + data.d[i].ReceiptType + "</td>" +
                         "<td class='center'>" + data.d[i].ReceiptNo + "</td>" +
                         "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + "</td>" +
                        "<td class='center'>" + data.d[i].Mobile + "</td>" +
                        "<td class='center'>" + data.d[i].NetAmount + "</td>" +
                        "<td class='center'>" + data.d[i].PaidAmount + "</td>" +
                        "<td class='center'>" + data.d[i].ReceiptDate + "</td>" +
                        "<td class='center'>" + data.d[i].TestList + "</td>" +
                        "</tr>");
            }
            $('#gvrefund').append("</tbody>");
        }
        else {
            $("#gvrefund").append("<thead><tr><th>Refund List</th></tr></thead>");
            $("#gvrefund").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function SaveReceipt() {
    var paid = parseFloat($("#txtpaid").val()).toFixed(2);
   
    if (paid <= 0)
    {
        alertify.log('Please Paid Some Amount');
        return false;
    }
    var robj = {};
    robj.ReceiptID = $('#hdfreceiptid').val();
    robj.BillID = $('#hdfbillid').val();
    robj.PayableAmount = $('#txtnet').val();
    robj.PaidAmount = $('#txtpaid').val();
    robj.Paymode = $('#ddlpaymode').val();
    robj.ReceiptType = 'Refund';
    robj.ReceiptNo = '';
    robj.ReceiptDate = $('#txtregdate').val();
    robj.SlipNo = '0';
    robj.IsCash = $('#chckcash').is(':checked');
    robj.IsCard = $('#chckcard').is(':checked');
    robj.IsCheque = $('#chckcheque').is(':checked');
    robj.IsEwallet = $('#chckewallet').is(':checked');
    robj.CashAmount = $('#txtcashamount').val();
    robj.CardAmount = $('#txtcardamount').val();
    robj.CardNumber = $('#txtcardno').val();
    robj.CardHolderName = $('#txtcardholdername').val();
    robj.CardBankID = $('#ddlcardbank').val();
    robj.CardTransactionNo = $('#txtcardtransactionno').val();
    robj.CardDate = $('#txtcarddate').val();
    robj.MachineID = $('#ddlcardmachine').val();
    robj.ChequeAmount = $('#txtchequeamount').val();
    robj.ChequeNumber = $('#txtchequeno').val();
    robj.ChequeHolderName = '';
    robj.ChequeDate = $('#txtchequedate').val();
    robj.ChequeBankID = $('#ddlchequebank').val();
    robj.EwalletAmount = $('#txtewalletamount').val();
    robj.EwalletTypeID = $('#ddlewallettype').val();
    robj.EwalletTransactionNo = $('#txtewallettransactionno').val();
    robj.EwalletDate = $('#txtewalletdate').val();
    robj.Remark = $('#txtremark').val();
    robj.AuthID = $('#ddlauthority').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'LabourtaryRefund.aspx/SaveReceipt',
        data: JSON.stringify({ robj: robj }),
        async: false,
        success: function (response) {
            if (response.d.MessageID > 0) {
                alertify.success(response.d.MessageName);
                cleardetail();
            }
            else
                alertify.error("Some Error Occured !");
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
    BindCombo($("#ddlpaymode"), "ddlpaymode", 'PM');
    BindCombo($("#ddlauthority"), "ddlauthority", 'AZ');
}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LabourtaryRefund.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlpaymode") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlauthority") {
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
function cleardetail() {
    $("#gvrefund").empty();
    SetCurrentTime($('#txttime'));
    getserverdate1($("#txtregdate"));
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    FillPatientBindGrid();
    BindAllComboBox();
    $('#lnkname').html('')
    $('#lnkuhid').html('')
    $('#lnkpatientdetail').html('')
    $('#hdfbillid').val('0');
    $('#txtnet').val('0');
    $('#hdfbillid').val('0');
    $('#txtnet').val('0');
    $('#txtpaid').val('0');
    $('#chckcash').attr('checked', false);
    $('#chckcard').attr('checked', false);
    $('#chckcheque').attr('checked', false);
    $('#chckewallet').attr('checked', false);
    $('#txtcashamount').val('0');
    $('#txtcardamount').val('0');
    $('#txtcardno').val('0');
    $('#txtcardholdername').val('0');
    $('#txtcardtransactionno').val('');
    SetCurrentDate($('#txtcarddate'));
    $('#txtchequeamount').val('0');
    $('#txtchequeno').val('0');
    SetCurrentDate($('#txtchequedate'));
    $('#txtewalletamount').val('0');
    $('#txtewallettransactionno').val('');
    SetCurrentDate($('#txtewalletdate'));
    $('#txtbalance').val('0');
    getserverdate1($("#txtregdate"));
   
}
function setdefaultrate(amount) {
    $('#txtpaid').val(amount);
    $('#txtcashamount').val(amount);
    //  $('#chckcash').attr('checked', true);
    $('#chckcash').prop('checked', 'checked');
    $('.pnlcash').css('display', '');

}
function GetPaymentDetail(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LabourtaryRefund.aspx/GetPaymentDetail",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            $('#txtnet').val(response.d.NetAmount);
            $('#txtpaid').val(response.d.NetAmount);
            $('#txtcashamount').val(response.d.NetAmount);
            setdefaultrate(response.d.NetAmount);
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
function FillPatientBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LabourtaryRefund.aspx/GetBillDetail",
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
        $("#gvbill").empty();
        if (data.d.length > 0) {
            $('#gvbill').append("<thead><tr><th style='width:15px' class='center'>Action</th><th style='width:15px' class='center'>Refund</th><th>BillNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Date</th><th>NetAmount</th><th>TotalPaid</th><th>Balance-Status</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var printreceipt = "";
                var color = failcolor;
                printreceipt = "<a class='fa fa-list-alt lnkselectprint' style='font-size: large;' data-rid='" + data.d[i].RecordID + "' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                if (data.d[i].Statusclear == 'Account Clear') {
                    billdetail = "";
                    color = successcolor;
                } else {
                    billdetail = "<a class='glyphicon glyphicon-check lnkselect' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    color = failcolor;
                }
                $("#gvbill").append("<tr style='background-color:" + color + "'><td>" + billdetail + "</td><td>" + printreceipt + "</td><td class='center'>" + data.d[i].BillNo + "</td>" +
                         "<td >" + data.d[i].UHID + "</td>" +
                        "<td  >" + data.d[i].PatientName + "</td>" +
                        "<td  >" + data.d[i].Mobile + "</td>" +
                        "<td  >" + data.d[i].EmailID + "</td>" +
                        "<td  >" + data.d[i].BillOpenDate + "</td>" +
                        "<td  >" + data.d[i].NetAmount + "</td>" +
                        "<td  >" + data.d[i].TotalPaidAmount + "</td>" +
                        "<td  >" + data.d[i].Statusclear + "</td>" +
                        "</tr>");
            }
            $('#gvbill').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvbill").append("<thead><tr><th>Bill List</th></tr></thead>");
            $("#gvbill").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvbill').dataTable({
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

function calculation() {
    var net = $("#txtnet").val();
    $("#txtnet").val(parseFloat(net).toFixed(2));
    var paid = parseFloat($("#txtpaid").val()).toFixed(2);
    var bal = net - paid;
    if (paid > 0) {
        if (parseFloat(paid) > parseFloat(net)) {
            alertify.log("paid amount can not be greater than net amount !!");
            $('#txtpaid').val('0');
        }
    }
    if (bal > 0)
        $("#txtbalance").css("disabled", "");
    else
        $("#txtbalance").css("disabled", "disabled");
    $("#txtbalance").val(parseFloat(bal).toFixed(2));
}