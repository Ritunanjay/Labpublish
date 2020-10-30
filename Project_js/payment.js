
var ispaid = true;
$(document).ready(function () {
    BindAllComboBoxPayment();
    $(document).on('click', '#chckcash', function () {
        if ($('#chckcash').is(':checked'))
            $('.pnlcash').css('display', '');
        else
            $('.pnlcash').css('display', 'none');
        CheckPaymentMethod();
    });
    $(document).on('click', '#chckcard', function () {
        if ($('#chckcard').is(':checked'))
            $('.pnlcard').css('display', '');
        else
            $('.pnlcard').css('display', 'none');
        CheckPaymentMethod();
    });
    $(document).on('click', '#chckcheque', function () {
        if ($('#chckcheque').is(':checked'))
            $('.pnlcheque').css('display', '');
        else
            $('.pnlcheque').css('display', 'none');
        CheckPaymentMethod();
    });
    $(document).on('click', '#chckewallet', function () {
        if ($('#chckewallet').is(':checked'))
            $('.pnlewallet').css('display', '');
        else
            $('.pnlewallet').css('display', 'none');
        CheckPaymentMethod();
    });
    $("#txtcashamount").change(function (e) {
        if ($("#txtcashamount").val() == "" || $("#txtcashamount").val() <= 0)
            $("#txtcashamount").val("0");
        else
            if ($("#txtcashamount").val().substring(0, 1) == '0') $("#txtcashamount").val($("#txtcashamount").val().substring(1));
        if ($("#txtdiscount").val() == "")
            $("#txtdiscount").val("0");
        if ($("#txtdiscountper").val() == "")
            $("#txtdiscountper").val("0");
        TotalPaidAmount();
        calculation();

    });
    $("#txtchequeamount").change(function (e) {
        if ($("#txtchequeamount").val() == "" || $("#txtchequeamount").val() <= 0)
            $("#txtchequeamount").val("0");
        else
            if ($("#txtchequeamount").val().substring(0, 1) == '0') $("#txtchequeamount").val($("#txtchequeamount").val().substring(1));
        if ($("#txtdiscount").val() == "")
            $("#txtdiscount").val("0");
        if ($("#txtdiscountper").val() == "")
            $("#txtdiscountper").val("0");
        TotalPaidAmount();
        calculation();

    });
    $("#txtcardamount").change(function (e) {
        if ($("#txtcardamount").val() == "" || $("#txtcardamount").val() <= 0)
            $("#txtcardamount").val("0");
        else
            if ($("#txtcardamount").val().substring(0, 1) == '0') $("#txtcardamount").val($("#txtcardamount").val().substring(1));
        if ($("#txtdiscount").val() == "")
            $("#txtdiscount").val("0");
        if ($("#txtdiscountper").val() == "")
            $("#txtdiscountper").val("0");
        TotalPaidAmount();
        calculation();

    });

    $("#txtewalletamount").change(function (e) {
        if ($("#txtewalletamount").val() == "" || $("#txtewalletamount").val() <= 0)
            $("#txtewalletamount").val("0");
        else
            if ($("#txtewalletamount").val().substring(0, 1) == '0') $("#txtewalletamount").val($("#txtewalletamount").val().substring(1));
        if ($("#txtdiscount").val() == "")
            $("#txtdiscount").val("0");
        if ($("#txtdiscountper").val() == "")
            $("#txtdiscountper").val("0");
        TotalPaidAmount();
        calculation();

    });
    $('#txtcarddate,#txtchequedate,#txtewalletdate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
        forceParse: false
    });
    SetCurrentDate($("#txtcarddate"));
    SetCurrentDate($("#txtchequedate"));
    SetCurrentDate($("#txtewalletdate"));
    $("#txtcarddate").focusout(function () {
        if (DateCheck($("#txtcarddate").val()))
            getserverdate($("#txtcarddate"));

    });
    $("#txtchequedate").focusout(function () {
        if (DateCheck($("#txtchequedate").val()))
            getserverdate($("#txtchequedate"));

    });
    $("#txtewalletdate").focusout(function () {
        if (DateCheck($("#txtewalletdate").val()))
            getserverdate($("#txtewalletdate"));

    });

    $("#btnpaymentcheck").click(function () {
        if ($("#chckcash").is(':checked') && parseFloat(($('#txtcashamount').val() == '') ? '0' : $('#txtcashamount').val()) <= 0) {
            alertify.log('Please Fill Cash Amount !!!');
            $("#txtcashamount").focus();
            return false;
        }
        if ($("#chckcard").is(':checked') && ($('#txtcardholdername').val() == '' || $('#txtcardtransactionno').val() == '' || $('#txtcardno').val() == '' || $('#ddlcardbank').val() == '0' || parseFloat(($('#txtcardamount').val() == '') ? '0' : $('#txtcardamount').val()) <= 0)) {
            alertify.log('Please Fill Card Detail Properly !!!');
            if (parseFloat(($('#txtcardamount').val() == '') ? '0' : $('#txtcardamount').val()) <= 0)
                $("#txtcardamount").focus();
            else if ($('#txtcarddate').val() == '')
                $("#txtcarddate").focus();
            else if ($('#ddlcardbank').val() == '0')
                $("#ddlcardbank").focus();
            else if ($('#txtcardholdername').val() == '')
                $("#txtcardholdername").focus();
            else if ($('#txtcardno').val() == '')
                $("#txtcardno").focus();
            else if ($('#txtcardtransactionno').val() == '')
                $("#txtcardtransactionno").focus();
            return false;
        }
        if ($("#chckcheque").is(':checked') && ($('#txtchequedate').val() == '' || $('#txtchequeno').val() == '' || $('#ddlchequebank').val() == '0' || parseFloat(($('#txtchequeamount').val() == '') ? '0' : $('#txtchequeamount').val()) <= 0)) {
            alertify.log('Please Fill Cheque Detail Properly !!!');
            if (parseFloat(($('#txtchequeamount').val() == '') ? '0' : $('#txtchequeamount').val()) <= 0)
                $("#txtchequeamount").focus();
            else if ($('#ddlchequebank').val() == '0')
                $("#ddlchequebank").focus();
            else if ($('#txtchequedate').val() == '')
                $("#txtchequedate").focus();
            else if ($('#txtchequeno').val() == '')
                $("#txtchequeno").focus();
            return false;
        }
        if ($("#chckewallet").is(':checked') && ($('#txtewalletdate').val() == '' || $('#txtewallettransactionno').val() == '' || parseFloat(($('#txtewalletamount').val() == '') ? '0' : $('#txtewalletamount').val()) <= 0)) {
            alertify.log('Please Fill e-Wallet Detail Properly !!!');
            if (parseFloat(($('#txtewalletamount').val() == '') ? '0' : $('#txtewalletamount').val()) <= 0)
                $("#txtewalletamount").focus();
            else if ($('#txtdetail').val() == '')
                $("#txtdetail").focus();
            else if ($('#txtewallettransactionno').val() == '')
                $("#txtewallettransactionno").focus();
            else if ($('#txtewalletdate').val() == '')
                $("#txtewalletdate").focus();
            return false;
        }
        if (ispaid == false) {
            alertify.log('Please Check Amount Detail');
            return false;
        } else
            $('#ModalPayment').modal('hide');
    });

});

function TotalPaidAmount() {
    TotalPaid = 0;
    TotalPaid = parseFloat($("#txtcashamount").val()).toFixed(2);
    TotalPaid = parseFloat(parseFloat(TotalPaid) + parseFloat($("#txtcardamount").val())).toFixed(2);
    TotalPaid = parseFloat(parseFloat(TotalPaid) + parseFloat($("#txtchequeamount").val())).toFixed(2);
    TotalPaid = parseFloat(parseFloat(TotalPaid) + parseFloat($("#txtewalletamount").val())).toFixed(2);
    $('#txtpaid').val(TotalPaid);
    //   $('#lblTotalPaid').text(TotalPaid);
    //if (TotalPaid > 0)
    //    $('#lblTPaid').attr('class', 'label label-success');
    //else
    //    $('#lblTotalPaid').attr('class', 'label label-danger');
}
function BindAllComboBoxPayment() {
    BindComboPayment($("#ddlewallettype"), "ddlewallettype", 'EW');
    BindComboPayment($("#ddlchequebank"), "ddlchequebank", 'B');
    BindComboPayment($("#ddlcardbank"), "ddlcardbank", 'B');
    BindComboPayment($("#ddlcardmachine"), "ddlcardmachine", 'CM');

}

function BindComboPayment(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../MainHelper.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlewallettype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlchequebank") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlcardbank") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlcardmachine") {
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

function CheckPaymentMethod() {
    if (!$("#chckcash").is(':checked')) {
        $("#txtcashamount").val('0');
    }
    if (!$("#chckcard").is(':checked')) {
        $("#txtcardamount").val('0');
        $("#txtcardholdername").val('');
        $("#txtcardno").val('0');
        $("#txtcardtransactionno").val('0');

    }
    if (!$("#chckcheque").is(':checked')) {
        $("#txtchequeamount").val('0');
        $("#txtchequeno").val('0');
    }
    if (!$("#chckewallet").is(':checked')) {
        $("#txtewalletamount").val('0');
        $("#txtdetail").val('');
        $("#txtewallettransactionno").val('');

    }
    TotalPaidAmount();
    calculation();
}