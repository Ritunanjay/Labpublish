$(document).ready(function () {
    PermissionDetail();
    $("#txtsearchpatient").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "DigitalCardDetail.aspx/SearchPatient",
                data: "{ 'PatientDetail': '" + request.term + "', 'Type': '" + $('#ddlfilteration').val() + "'}",
                dataType: "json",

                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('-')[0],
                            val: item.split('-')[1]
                        }
                    }))
                },
                error: function (response) {
                    jQuery.toast('E' + response.responseText);
                },
                failure: function (response) {
                    jQuery.toast('fa' + response.responseText);
                }
            });
        },
        select: function (e, i) {
            if (i.item.val != "#") {
                GetPatientByID(i.item.val);
                $('#txtsearchpatient').val('');
            }
        },
        minLength: 1
    });
    $(document).on('click', '.lnkpayment', function () {
        if ($('#hdfrecordid').val() == "0")
            alertify.log('Please Select Patient First');
        else
            $('#ModalPayment').modal('show');
    });
    $(document).on('click', '.lnkprint', function () {
        var VoucherID = $(this).data('id');
        PrintBill(VoucherID);
    });
    $(document).on('click', '#btnadd', function () {
        SaveDigital();
        cleardetail();
    });
    $(document).on('click', '#btnclear', function () {
        cleardetail();
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
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    cleardetail();
    $("#txtsearchpatient").focus();
    
});
 function calculation() {
}
 function cleardetail() {
     getserverdate1($("#txtregdate"));
     SetCurrentTime($('#txtregtime'));
     getserverdate1($("#txtfromdate"));
     getserverdate1($("#txttodate"));
     $("#txtmobile").val('');
     $("#txtsearchpatient").val('');
     $('#txtpatientname').val('');
     $('#txtuhid').val('');
     $('#hdfpatientid').val('');
     $('#txtsearchpatient').val('');
     $('#hdfrecordid').val('0');
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
    SetCurrentTime($('#txtregtime'));
    $('#txtchequeamount').val('0');
    $('#txtchequeno').val('0');
    SetCurrentDate($('#txtchequedate'));
    $('#txtewalletamount').val('0');
    $('#txtewallettransactionno').val('');
    SetCurrentDate($('#txtewalletdate'));
    $('#hdfdigitalid').val('0');
    getserverdate1($("#txtregdate"));
    BindGrid();
}
function GetPatientByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "DigitalCardDetail.aspx/GetPatientByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            setValues(response);
            $('#txtsearchpatient').val('');
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
function setValues(response) {
    $("#txtsearchpatient").val('');
    $('#txtpatientname').val(response.d.PatientName.toString());
    $('#txtuhid').val(response.d.UHID);
    $('#hdfpatientid').val(response.d.PatientID.toString());
    $('#txtmobile').val(response.d.Mobile);
    $('#txtsearchpatient').val('');
     $('#hdfrecordid').val(response.d.RecordID);
}
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function PrintBill(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'DigitalCardDetail.aspx/PrintDigitalDetail',
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
        url: "DigitalCardDetail.aspx/GetDigitalCardDetail",
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
        $("#gv").empty();
        if (data.d.length > 0) {
            $('#gv').append("<thead><tr><th style='display:none' class='center'>Select</th><th style='' class='center'>Print</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Cash</th><th>Card</th><th>Cheque</th><th>E-Wallet</th><th>Narration</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {

                $("#gv").append("<tr><td style='display:none'><a class='glyphicon glyphicon-check lnkselect' style='font-size: large;' href='javascript:void();'></a></td>" +
                    "<td><a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-id='" + data.d[i].DCBID + "' href='javascript:void();'></a></td>" +
                    "<td class='danger'>" + data.d[i].UHID + "</td>" +
                         "<td class='danger'>" + data.d[i].PatientName + "</td>" +
                        "<td class='danger'>" + data.d[i].Mobile + "</td>" +
                        "<td class='center'>" + data.d[i].EmailID + "</td>" +
                        "<td class='center'>" + data.d[i].CashAmount + "</td>" +
                          "<td class='danger'>" + data.d[i].CardAmount + "</td>" +
                          "<td class='danger'>" + data.d[i].ChequeAmount + "</td>" +
                          "<td class='danger'>" + data.d[i].EwalletAmount + "</td>" +
                      "<td class='center'>" + data.d[i].Narration + "</td>" +
                        "</tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Voucher List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gv').dataTable({
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
function SaveDigital() {
    var paid = parseFloat($("#txtpaid").val()).toFixed(2);

    if (paid <= 0) {
        alertify.log('Please Paid Some Amount');
        return false;
    }
    var dobj = {};
    dobj.DCBID = $('#hdfvoucherid').val();
    dobj.RefID = $('#hdfrecordid').val();
    dobj.BillID = '0';
    dobj.DigitalDate = $('#txtregdate').val();
    dobj.DigitalTime = $('#txtregtime').val();
    dobj.PaidType = 'Credit';
    dobj.AdvanceNo = '';
    dobj.Narration = 'Digital Card Receipt';
    dobj.PayableAmount = $('#txtpaid').val();
    dobj.PaidAmount = $('#txtpaid').val();
    dobj.Paymode = $('#ddlpaymode').val();
    dobj.IsCash = $('#chckcash').is(':checked');
    dobj.IsCard = $('#chckcard').is(':checked');
    dobj.IsCheque = $('#chckcheque').is(':checked');
    dobj.IsEwallet = $('#chckewallet').is(':checked');
    dobj.CashAmount = $('#txtcashamount').val();
    dobj.CardAmount = $('#txtcardamount').val();
    dobj.CardNumber = $('#txtcardno').val();
    dobj.CardHolderName = $('#txtcardholdername').val();
    dobj.CardBankID = $('#ddlcardbank').val();
    dobj.CardTransactionNo = $('#txtcardtransactionno').val();
    dobj.CardDate = $('#txtcarddate').val();
    dobj.MachineID = $('#ddlcardmachine').val();
    dobj.ChequeAmount = $('#txtchequeamount').val();
    dobj.ChequeNumber = $('#txtchequeno').val();
    dobj.ChequeHolderName = '';
    dobj.ChequeDate = $('#txtchequedate').val();
    dobj.ChequeBankID = $('#ddlchequebank').val();
    dobj.EwalletAmount = $('#txtewalletamount').val();
    dobj.EwalletTypeID = $('#ddlewallettype').val();
    dobj.EwalletTransactionNo = $('#txtewallettransactionno').val();
    dobj.EwalletDate = $('#txtewalletdate').val();

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'DigitalCardDetail.aspx/SaveDigitalCard',
        data: JSON.stringify({ dobj: dobj }),
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