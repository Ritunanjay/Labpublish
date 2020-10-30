
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    BindGrid();
    getserverdate1($("#txtvoucherdate"));
    SetCurrentTime($('#txttime'));
    $(document).on('click', '#btnclear', function () {
        cleardetail();
    });
    $(document).on('click', '.lnkpayment', function () {
        $('#ModalPayment').modal('show');
    });
    $(document).on('click', '#btnadd', function () {
        SaveVoucher();
        BindGrid();
    });
    $(document).on('click', '.lnkprint', function () {
        var VoucherID = $(this).data('id');
        PrintBill(VoucherID);
    });
});

function PrintBill(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'VoucherReturnDetail.aspx/PrintVoucherDetail',
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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "VoucherReturnDetail.aspx/GetVoucherDetail",
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
        $("#gvvoucher").empty();
        if (data.d.length > 0) {
            $('#gvvoucher').append("<thead><tr><th style='display:none' class='center'>Select</th><th style='' class='center'>Delete</th><th>Centre</th>" +
                "<th>Type</th><th>Date</th><th>Time</th><th>VoucherNo</th><th>Amount</th><th>Narration</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == false) ? 'Not Use' : 'Use';
                var activecolor = (data.d[i].Active == false) ? 'danger' : 'success';

                $("#gvvoucher").append("<tr><td style='display:none'><a class='glyphicon glyphicon-check lnkselect' style='font-size: large;' href='javascript:void();'></a></td>" +
                    "<td class='" + activecolor + "'><a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-id='" + data.d[i].VoucherID + "' href='javascript:void();'></a></td>" +
                    "<td  class='" + activecolor + "'>" + data.d[i].CentreName + "</td>" +
                         "<td  class='" + activecolor + "'>" + data.d[i].VoucherType + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].VoucherDate + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].VoucherTime + "</td>" +
                        "<td class='" + activecolor + "'>" + data.d[i].VoucherNo + "</td>" +
                          "<td class='" + activecolor + "'>" + data.d[i].PaidAmount + "</td>" +
                      "<td class='" + activecolor + "'>" + data.d[i].Narration + "</td>" +
                        "</tr>");
            }
            $('#gvvoucher').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvvoucher").append("<thead><tr><th>Voucher List</th></tr></thead>");
            $("#gvvoucher").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gvvoucher').dataTable({
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
}
function SaveVoucher() {
    var paid = parseFloat($("#txtpaid").val()).toFixed(2);

    if (paid <= 0) {
        alertify.log('Please Paid Some Amount');
        return false;
    }
    var robj = {};
    robj.VoucherID = $('#hdfvoucherid').val();
    robj.CentreID = $('#ddlcentre').val();
    robj.RefCentreID = $('#ddlrefcentre').val();
    robj.VoucherDate = $('#txtvoucherdate').val();
    robj.VoucherTime = $('#txttime').val();
    robj.VoucherTypeID = $('#ddlvouchertype').val();
    robj.ApprovedBy = $('#ddlauthorizedby').val();
    robj.VoucherNo = '';
    robj.Narration = 'Voucher Return';
    robj.PayableAmount = $('#txtpaid').val();
    robj.PaidAmount = $('#txtpaid').val();
    robj.Paymode = $('#ddlpaymode').val();
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
    robj.Active = $('#ddlstatus').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'VoucherReturnDetail.aspx/SaveVoucher',
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
function cleardetail() {
    BindAllComboBox();
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
    $('#hdfvoucherid').val('0');
    getserverdate1($("#txtvoucherdate"));
    SetCurrentTime($('#txttime'));

}
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function BindAllComboBox() {
    BindCombo($("#ddlcentre"), "ddlcentre", '');
    BindCombo($("#ddlvouchertype"), "ddlvouchertype", 'VT');
    BindCombo($("#ddlauthorizedby"), "ddlauthorizedby", 'AZ');
    BindCombo($("#ddlrefcentre"), "ddlrefcentre", '');

} function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "VoucherReturnDetail.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlvouchertype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlauthorizedby") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddlrefcentre") {
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