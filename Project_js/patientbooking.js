var investigation = 0;
var coupon = 0;
var ismobile = 0;
$(document).ready(function () {
    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            alertify.error('Action Not Allow');
            return false;
        }
    });
    PermissionDetail();
    $(document).on('change', '#ddlcentre', function () {
        GetCentreRegistrationNo($('#ddlcentre').val());
        BindCombo($("#ddlclient"), "ddlclient", $('#ddlcentre').val());
        BindCombo($("#ddlsampleBoy"), "ddlsampleBoy", $('#ddlcentre').val());

        BindCombo($("#ddldoctor"), "ddldoctor", $('#ddlcentre').val());
    });
    $(document).on('click', '#adddoctor', function () {
        savedoctor();
    });
    $('#txtyear,#txtmonth,#txtday').change(function () {
        CalculateDOB();
        if ($("#txtmonth").val() == '')
            $("#txtmonth").val('0');
        if ($("#txtday").val() == '')
            $("#txtday").val('0');
    });
    $(document).on('click', '.lnkadddoc', function () {
        $('#ModalDocetail').modal('show');
    });
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    $(document).on('keydown', '#txtpatientfilter', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txtfromdate', function () {
        FillPatientBindGrid();
    });
    $(document).on('change', '#txttodate', function () {
        FillPatientBindGrid();
    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    $(document).on('focusout', '#txtcouponcode', function () {
        $("#txtitemsearch").focus();
    });
    $('#txtdob').change(function () {
        CalculateAge();
    });
    $(document).on('click', '#btnbookingsearch', function () {
        $('#ModalPatientBookingDetail').modal('show');
        FillPatientBindGrid();
    });
    $(document).on('change', '#ddlpaymode', function () {
        var paymode = $('#ddlpaymode').val();
        if (paymode == "39") {
            if ($('#hdfrecordid').val() == "0") {
                alertify.error('Please Select Digital Card Patient To Pay by Digital Card');
                $('#ddlpaymode').val('38');
                $('#txtpaid').val('0');
                $('#txtcashamount').val('0');
                $('#chckcash').attr('checked', false);
                $('.pnlcash').css('display', 'none');
            }
            else {
                GetDigitalCardBalance();
            }
        } else {
            var netamount = $('#txtnet').val();
            setdefaultrate(netamount);
            $('#chckcash').prop('checked', true);
            $('#txtdigitalcardbalance').val('0');
        }
    });
    $(document).on('click', '#btnsaveitem', function () {
        if ($("#txtitemsearch").val() == "") {
            return false;
        }
        var doctorid = '0';
        var centreid = '0';
        var patientcategory = '0';
        var tpa = '0';
        if ($('#hdfpatientid').val() == "0") {
            doctorid = $('#ddldoctor').val();
            $('#hdfdoctorid').val(doctorid);
            centreid = $('#ddlcentre').val();
            $('#hdfcentreid').val(centreid);
            patientcategory = $('#ddlpatientcategory').val();
            $('#hdfcategoryid').val(patientcategory);
            tpa = $('#ddltpasponser').val();
            $('#hdftpasponserid').val(tpa);
        }
        if (investigation == 0) {
            alertify.error('Please Select Investigation');
            return;
        }
        else {
            var itemid = investigation;
            var qty = $('#txtqty').val();
            SaveInvestigation(itemid, qty);
            investigation = 0;
        }
        $("#txtitemsearch").val('');
        $("#txtitemsearch").focus();
    });
    $(document).on('click', '.lnkpayment', function () {
        if (parseFloat($('#txtnet').val()) > 0)
            $('#ModalPayment').modal('show');
        else
            alertify.log('Please Create Some Net Amount');
    });
    $(document).on('click', '.lnkdelete', function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        DeleteRow(rowindex);
        CalculateTotal();
    });
    $("#txtsearchpatient").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PatientBooking.aspx/SearchPatient",
                data: "{ 'PatientDetail': '" + request.term + "','Type': '" + $('#ddlfilteration').val() + "'}",
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
                $("#txtitemsearch").focus();
            }
        },
        minLength: 0
    });
    $("#txtdiscountper").keyup(function (e) {
        if ($("#ddldiscountby").val() == '0') {
            $("#txtdiscountper").val('0')
            alertify.log('Please Select Discount By First');
            return false;
        }
        if ($("#txtextra").val() == "")
            $("#txtextra").val("0");
        if ($("#txtdiscountper").val() == "" || $("#txtdiscountper").val() <= 0 || isNaN($("#txtdiscountper").val()))
            $("#txtdiscountper").val("0");
        else
            if ($("#txtdiscountper").val().substring(0, 1) == '0') $("#txtdiscountper").val($("#txtdiscountper").val().substring(1));
        if ($("#txtdiscountper").val() > 100) {
            alertify.log('Percentage should not be greater than 100');
            $("#txtdiscountper").val('0');
        }
        if ($("#txtdiscount").val() == "")
            $("#txtdiscount").val("0");
        //    $("#txtdiscountper").val( parseFloat($("#txtdiscountper").val()).toFixed(2));
        var total = $("#txttotal").val();
        var disper = $("#txtdiscountper").val();
        var disamt = (total * disper) / 100;
        $("#txtdiscount").val(parseFloat(disamt).toFixed(2));
        calculation();
    });
    $("#txtdiscount").keyup(function (e) {
        if ($("#ddldiscountby").val() == '0') {
            $("#txtdiscount").val('0')
            alertify.log('Please Select Discount By First');
            return false;
        }
        if ($("#txtextra").val() == "")
            $("#txtextra").val("0");
        if ($("#txtdiscount").val() == "" || $("#txtdiscount").val() <= 0 || isNaN($("#txtdiscount").val()))
            $("#txtdiscount").val("0");
        else
            if ($("#txtdiscount").val().substring(0, 1) == '0') $("#txtdiscount").val($("#txtdiscount").val().substring(1));
        if (parseFloat($("#txtdiscount").val()) > parseFloat($("#txtAmount").val())) {
            alertify.log('discount should not be greater than total amount');
            $("#txtdiscount").val('0');
        }
        if ($("#txtdiscountper").val() == "" || $("#txtdiscountper").val() <= 0 || isNaN($("#txtdiscountper").val()))
            $("#txtdiscountper").val("0");
        var total = $("#txttotal").val();
        var disamt = $("#txtdiscount").val();
        var disper = (disamt / total) * 100;
        if (disper == "" || disper <= 0 || isNaN(disper))
            $("#txtdiscountper").val("0");
        else
            $("#txtdiscountper").val(parseFloat(disper).toFixed(2));
        calculation();

    });
    $(document).on('change', '#txtextra', function () {
        AccepttotalPayment();
    });
    $(document).on('change', '#txtdiscountper', function () {
        AccepttotalPayment();
    });
    $(document).on('change', '#txtdiscount', function () {
        AccepttotalPayment();
    });
    $("#txtextra").keyup(function (e) {

        if ($("#txtextra").val() == "" || $("#txtextra").val() <= 0)
            $("#txtextra").val("0");
        else
            if ($("#txtextra").val().substring(0, 1) == '0') $("#txtextra").val($("#txtextra").val().substring(1));
        if ($("#txtdiscount").val() == "")
            $("#txtdiscount").val("0");
        if ($("#txtdiscountper").val() == "")
            $("#txtdiscountper").val("0");
        calculation();

    });
    $("#txtitemsearch").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PatientBooking.aspx/SearchInvestigation",
                data: "{ 'InvestigationDetail': '" + request.term + "','PID':'" + $('#hdfpatientid').val() + "','Gender':'" + $('#ddlgender').val() + "'}",
                dataType: "json",

                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('*')[0],
                            val: item.split('*')[1]
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
                if ($('#hdfpatientid').val() == '0' && $('#txtpatientname').val() == '')
                    alertify.log('Please Select Patient First !!!');
                else {
                    investigation = i.item.val;
                    // saveinvestigationdetail();
                }
                $("#txtitemsearch").val('');
            }
        },
        minLength: 1
    });
    $(document).on('click', '#btnadd', function () {
        if(confirm("Do You Want Save Booking! With Paid Amount Rs. "+$('#txtpaid').val()))
            SaveBooking();
    });
    $(document).on('change', '#ddltitle', function () {
        getgenderdetail();
    })
    $(document).on('click', '#btnreset', function () {
        ClearRecord();
    });
    $(document).on('change', '#ddlextraby', function () {
        var extraid = $('#ddlextraby').val();
        getFixedvalue(extraid, 'E');
        if ($('#ddlextraby').val() == "0") {
            $('#txtextra').attr('disabled', 'disabled');
            $('#txtextra').val('0');
        }
        else {
            $('#txtextra').attr('disabled', 'disabled');
            //$('#txtextra').removeAttr('disabled');

        }
        calculation();
    });
    $(document).on('change', '#ddldiscountby', function () {
        var discountid = $('#ddldiscountby').val();
        getFixedvalue(discountid, 'D');
        if ($('#ddldiscountby').val() == "0") {
            $('#txtdiscountper').attr('disabled', 'disabled');
            $('#txtdiscount').attr('disabled', 'disabled');
        }
        else {
            $('#txtdiscountper').attr('disabled', 'disabled');
            $('#txtdiscount').attr('disabled', 'disabled');
            //$('#txtdiscountper').removeAttr('disabled');
            //$('#txtdiscount').removeAttr('disabled');

        }
        calculation();

    });
    $(document).on('change', '#txtcouponcode', function () {
        if (coupon > 5) {
            $('#txtcouponcode').val('');
            alertify.error('Your Attempt Exceed');
            $('#txtcouponcode').prop('disabled', 'disabled');
        } else {
            var couponcode = $('#txtcouponcode').val();
            CheckCouponCode(couponcode);
        }
    });
    ClearRecord();
    $(document).on('click', '.lnkbookingprint', function () {
        var BillID = $(this).data('billid');
        PrintBooking(BillID);
    });
    $("#txtsearchpatient").focus();
    $(document).on('change', '#txtmobilenumber', function () {
        check($('#txtmobilenumber'));
    });
    $(document).on('keydown', '#txtmobilenumber', function () {
        var mobile = $('#txtmobilenumber').val();
        CheckMobile(mobile);
    });
    $(document).on('change', '#txtemailid', function () {
        checkEmailID($('#txtemailid'));
    });
    $(document).on('click', '.lnkbookingdelete', function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var BillID = $(this).data('billid');
                DeleteBooking(BillID);
                FillPatientBindGrid();
            }
        }
    });

});
function getFixedvalue(id, type) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/getFixedvalue',
        data: JSON.stringify({ FID: id, Type: type }),
        async: false,
        success: function (response) {
            if (type == "E")
                $('#txtextra').val(response.d);
            else {
                $('#txtdiscountper').val(response.d);
                var total = $("#txttotal").val();
                var disper = $("#txtdiscountper").val();
                var disamt = (total * disper) / 100;
                $("#txtdiscount").val(parseFloat(disamt).toFixed(2));
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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function addsaveitem() {
    saveinvestigationdetail();
}
function saveinvestigationdetail() {
    if ($("#txtitemsearch").val() == "") {
        return false;
    }
    var doctorid = '0';
    var centreid = '0';
    var patientcategory = '0';
    var tpa = '0';
    if ($('#hdfpatientid').val() == "0") {
        doctorid = $('#ddldoctor').val();
        $('#hdfdoctorid').val(doctorid);
        centreid = $('#ddlcentre').val();
        $('#hdfcentreid').val(centreid);
        patientcategory = $('#ddlpatientcategory').val();
        $('#hdfcategoryid').val(patientcategory);
        tpa = $('#ddltpasponser').val();
        $('#hdftpasponserid').val(tpa);
    }
    if (investigation == 0) {
        alertify.error('Please Select Investigation');
        return;
    }
    else {
        var itemid = investigation;
        var qty = $('#txtqty').val();
        SaveInvestigation(itemid, qty);
        investigation = 0;
    }
    $("#txtitemsearch").val('');
    $("#txtitemsearch").focus();
}
function DeleteBooking(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/DeleteBooking",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
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
function DiscountInvestigation() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/DiscountInvestigation",
        data: JSON.stringify({ Discount: $('#txtdiscount').val(), AuthID: $('#ddldiscountby').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            $("#gvlaborder").empty();
            if (response.d.length > 0) {
                //   $("#gvlaborder").append("");
                for (var i = 0; i < response.d.length; i++) {
                    $("#gvlaborder").append("<tr><td>" +
                        "<a class='fa fa-times-circle-o lnkdelete' data-id='" + response.d[i].ItemID + "' href='javascript:void();' style='font-size: x-large;'></a>" +
                       "</td>" +
                        "<td class='center'>" + response.d[i].TestCode + "</td><td class='center'>" + response.d[i].TestName + "</td><td><i class='lnkrate'>" + response.d[i].ItemRate + "</i></td><td><i class='lnkqty'>" + response.d[i].ItemQty + "</i></td>" +
                        "<td><i class='lnkamount'>" + response.d[i].ItemNetAmount + "</i></td></tr>");
                }
                $('#gvlaborder').append("</tbody>");

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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });
}
function PrintBooking(id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/PrintPathologyBill',
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
function CheckCouponCode(code) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/CheckCouponCode",
        data: JSON.stringify({ Code: code }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $("#txtdiscountper").val(response.d.split('*')[1]);
                $('#ddldiscountby').val(response.d.split('*')[0]);
                var total = $("#txttotal").val();
                var disper = $("#txtdiscountper").val();
                var disamt = (total * disper) / 100;
                $("#txtdiscount").val(parseFloat(disamt).toFixed(2));
                $('#txtbalance').val('0');
                setdefaultrate($('#txtnet').val());
                $('#txtcouponcode').prop('disabled', 'disabled');
                calculation();
                DiscountInvestigation();
            }
            else {
                $('#txtcouponcode').val('');
                alertify.error('Sorry Coupon Not Available ');
                coupon = coupon + 1;
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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function GetPayment(paid) {
    $('#txtpaid').val(paid);
}
function GetDigitalCardBalance() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/GetDigitalCardBalance",
        data: JSON.stringify({ ID: $('#hdfrecordid').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            var netamount = $('#txtnet').val();
            if (parseFloat(response.d) < parseFloat(netamount)) {
                alertify.error("Your Digital Card Does't Have Balance");
                $('#ddlpaymode').val('38');
                $('#txtdigitalcardbalance').val(response.d);
                setdefaultrate(netamount);
            }
            else {
                ClearPaymentDetail();
                GetPayment(netamount);
                $('#txtdigitalcardbalance').val(parseFloat(response.d) - parseFloat(netamount));
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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function getgenderdetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/GetGenderDetail",
        data: JSON.stringify({ ID: $('#ddltitle').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d != "") {
                var detail = data.d.split('*');
                if (detail[0] != "")
                    $('#ddlgender').val(detail[0]);
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
function CalculateDOB() {
    var yr = $('#txtyear').val().replace(/^\s+|\s+$/g, "");
    var mn = $('#txtmonth').val().replace(/^\s+|\s+$/g, "");
    var dy = $('#txtday').val().replace(/^\s+|\s+$/g, "");
    if (dy < 10) { dy = '0' + dy } if (mn < 10) { mn = '0' + mn }
    var dated = new Date(new Date().getFullYear() - yr, new Date().getMonth() - mn, (new Date().getDate() - dy));
    var dd = dated.getDate();
    var mm = dated.getMonth() + 1;
    var yy = dated.getFullYear();
    if (dd < 10) dd = "0" + dd; if (mm < 10) mm = "0" + mm;
    var dob = dd + "/" + mm + "/" + yy;
    $('#txtdob').val(dob);
}
function CalculateAge() {
    var today = new Date();
    var curr_date = today.getDate();
    var curr_month = today.getMonth() + 1;
    var curr_year = today.getFullYear();

    var pieces = $('#txtdob').val().split('/');
    var birth_date = pieces[0];
    var birth_month = pieces[1];
    var birth_year = pieces[2];

    if (curr_month == birth_month && curr_date >= birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year));
        $('#txtmonth').val(0);
        $('#txtday').val(parseInt(curr_date - birth_date));
    }
    if (curr_month == birth_month && curr_date < birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year - 1));
        $('#txtmonth').val(parseInt(12 - 1));
        $('#txtday').val(parseInt(curr_date - birth_date + 30));
    }
    if (curr_month > birth_month && curr_date >= birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year));
        $('#txtmonth').val(curr_month - birth_month);
        $('#txtday').val(parseInt(curr_date - birth_date));
    }
    if (curr_month > birth_month && curr_date < birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year));
        $('#txtmonth').val(curr_month - birth_month - 1);
        $('#txtday').val(parseInt(curr_date - birth_date + 30));
    }
    if (curr_month < birth_month && curr_date >= birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year - 1));
        $('#txtmonth').val(curr_month - birth_month + 12);
        alert(parseInt(curr_date - birth_date));
    }
    if (curr_month < birth_month && curr_date < birth_date) {
        $('#txtyear').val(parseInt(curr_year - birth_year - 1));
        $('#txtmonth').val(curr_month - birth_month + 11);
        $('#txtday').val(parseInt(curr_date - birth_date + 30));
    }
}
function setdefaultrate(amount) {
    $('#txtpaid').val(amount);
    $('#txtcashamount').val(amount);
    $('#chckcash').prop('checked', true);
    $('.pnlcash').css('display', '');

}
function SaveInvestigation(itemid, qty) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/SaveInvestigation",
        data: JSON.stringify({ ID: itemid, Quantity: qty, PID: $('#hdfpatientid').val(), CID: $('#hdfcentreid').val(), DID: $('#hdfdoctorid').val(), PCID: $('#hdfcategoryid').val(), TPAID: $('#hdftpasponserid').val(), Urgent: $('#chckurgent').is(':checked') }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d == null) {
                alertify.error('Test Already Exist');
                return;
            }
            $("#gvlaborder").empty();
            if (response.d.length > 0) {
                //   $("#gvlaborder").append("");
                for (var i = 0; i < response.d.length; i++) {
                    $("#gvlaborder").append("<tr><td>" +
                        "<a class='fa fa-times-circle-o lnkdelete' data-id='" + response.d[i].ItemID + "' href='javascript:void();' style='font-size: x-large;'></a>" +
                       "</td>" +
                        "<td class='center'>" + response.d[i].ProfileInfo + "</td><td class='center'>" + response.d[i].TestCode + "</td><td class='center'>" + response.d[i].TestName + "</td><td><i class='lnkrate'>" + response.d[i].ItemRate + "</i></td><td><i class='lnkqty'>" + response.d[i].ItemQty + "</i></td>" +
                        "<td><i class='lnkamount'>" + response.d[i].ItemNetAmount + "</i></td></tr>");
                }
                $('#gvlaborder').append("</tbody>");
                CalculateTotal();
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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });
}
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').detach();
    else
        $('#btnadd').css('display', '');

}
function GetPatientByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/GetPatientByID",
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
    $('#lnkname').html('Patient Name: [' + response.d.PatientName + ']');
    $('#lnkuhid').html('Patient UHID: [ ' + response.d.UHID + ']');
    $('#lnkpatientdetail').html('Other Detail:  [ ' + response.d.AgeYear + 'Y/ ' + response.d.AgeMonth + 'M/ ' + response.d.AgeDay + 'D/ ' + ' Gender :' + response.d.GenderID + ']');
    $('#hdfpatientid').val(response.d.PatientID.toString());
    $('#txtsearchpatient').val('');
    $('#hdfcentreid').val(response.d.CentreID);
    $('#hdfdoctorid').val(response.d.DoctorID);
    $('#hdfcategoryid').val(response.d.PatientCategoryID);
    $('#hdfrecordid').val(response.d.RecordID);
    $('#hdftpasponserid').val(response.d.TPASponserID);
    GetCentreRegistrationNo($('#ddlcentre').val());
    BindCombo($("#ddlclient"), "ddlclient", $('#ddlcentre').val());

    BindCombo($("#ddldoctor"), "ddldoctor", $('#ddlcentre').val());
}
function calculation() {
    var total = $("#txttotal").val();
    var disamt = $("#txtdiscount").val();
    var extra = $("#txtextra").val();
    var net = ((parseFloat(total) - parseFloat(disamt)) + parseFloat(extra)).toFixed(2);

    $("#txtnet").val(parseFloat(net).toFixed(2));
    var paid = parseFloat($("#txtpaid").val()).toFixed(2);
    var bal = net - paid;
    if (paid > 0) {
        if (parseFloat(paid) > parseFloat(net)) {
            alertify.log("paid amount can not be greater than net amount !!");
            $('#txtpaid').val(parseFloat(net).toFixed(2));
        }
    }
    if (bal > 0)
        $("#txtbalance").css("disabled", "");
    else
        $("#txtbalance").css("disabled", "disabled");
    $("#txtbalance").val(parseFloat(bal).toFixed(2));
}
function BindAllComboBox() {
    BindCombo($("#ddlsampleBoy"), "ddlsampleBoy", '0');
    BindCombo($("#ddlextraby"), "ddlextraby", 'EB');
    BindCombo($("#ddldiscountby"), "ddldiscountby", 'DB');
    BindCombo($("#ddlpaymode"), "ddlpaymode", 'PM');
    BindCombo($("#ddltitle"), "ddltitle", 'PTT');
    BindCombo($("#ddldoctor"), "ddldoctor", '0');
    BindCombo($("#ddlcentre"), "ddlcentre", '');
    BindCombo($("#ddlpatientcategory"), "ddlpatientcategory", 'PT');
    BindCombo($("#ddltpasponser"), "ddltpasponser", '');
    BindCombo($("#ddlcreditor"), "ddlcreditor", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlpatientcategory") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlsampleBoy") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.UserID).html(value.UserName));
                });
            } if (ControlName == "ddlcreditor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.UserID).html(value.UserName));
                });
            } if (ControlName == "ddlcentre") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CentreID).html(value.CentreName));
                });
            } if (ControlName == "ddldoctor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
                });
            } if (ControlName == "ddlextraby") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddltitle") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddldiscountby") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            }
            if (ControlName == "ddlpaymode") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            }
            if (ControlName == "ddltpasponser") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.TPASponsorID).html(value.SponsorName));
                });
            } if (ControlName == "ddlclient") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.ClientID).html(value.ClientName));
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
function CalculateTotal() {
    var total = 0;
    var length = $("#gvlaborder tr").length;
    for (var i = 0; i < length; i++) {
        var amt = parseFloat($("#gvlaborder tr").eq(i).find(".lnkamount").text());
        total += parseFloat(amt);
    }

    $("#txttotal").val(total);
    setdefaultrate(total);
    calculation();
}
function CheckMobile(Mobile) {
     $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/CheckMobile",
        data: JSON.stringify({ Mobile: Mobile }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
         success: function (response) {
             if (response.d == true)
             {
                 alertify.error('Mobile Number Already Registered !!!');
                 $('#txtpatientname').val('');
                 $('#txtmobilenumber').val('');
                 $('#txtemailid').val('');
                 $('#txtaddress').val('');
                 $('#txtsearchpatient').focus();
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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });

}
function DeleteRow(RowIndex) {
    debugger; $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/DeleteRow",
        data: JSON.stringify({ RowIndex: RowIndex }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {

            $("#gvlaborder").empty();
            if (response.d.length > 0) {
                //   $("#gvlaborder").append("");
                for (var i = 0; i < response.d.length; i++) {
                    $("#gvlaborder").append("<tr><td>" +
                        "<a class='fa fa-times-circle-o lnkdelete' data-id='" + response.d[i].ItemID + "' href='javascript:void();' style='font-size: x-large;'></a>" +
                       "</td>" +
                        "<td class='center'>" + response.d[i].ProfileInfo + "</td><td class='center'>" + response.d[i].TestCode + "</td><td class='center'>" + response.d[i].TestName + "</td><td><i class='lnkrate'>" + response.d[i].ItemRate + "</i></td><td><i class='lnkqty'>" + response.d[i].ItemQty + "</i></td>" +
                        "<td><i class='lnkamount'>" + response.d[i].ItemNetAmount + "</i></td></tr>");
                }
                $('#gvlaborder').append("</tbody>");
                CalculateTotal();
            }
            //if (response.d == "1") {
            //    $("#gvlaborder tr:eq(" + (RowIndex) + ")").remove();
            //}
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
function Validate() {
    if ($('#hdfpatientid').val() == '0' && $('#txtpatientname').val() == '') {
        alertify.log('Please Select Patient Detail First');
        $("#txtsearchpatient").focus();
        return false;
    } if ($('#ddlpaymode').val() == '0') {
        alertify.log('Please Select Paymode First');
        $("#ddlpaymode").focus();
        return false;
    }

    if ($('#hdfpatientid').val() == '0' && $('#txtpatientname').val() != '') {
        if ($('#ddlcentre').val() == "0") {
            alertify.log('Please Select Centre');
            $("#ddlcentre").focus();
            return false;
        } if ($('#txtmobilenumber').val() == "") {
            alertify.log('Mobile Number Required');
            $("#txtmobilenumber").focus();
            return false;
        } if ($('#ddldoctor').val() == "0") {
            alertify.log('Doctor Required');
            $('#ddldoctor').focus();
            return false;
        }
        if ($('#txtyear').val() == "0" && $('#txtmonth').val() == "0" && $('#txtday').val() == "0") {
            alertify.log('Age Required');
            $('#ddldoctor').focus();
            return false;
        }
    }
    if ($('#txtpaid').val() == "0") {
        alertify.log('Please Paid Some Amount');
        $("#txtpaid").focus();
        return false;
    }
    return true;
}
function SaveBooking() {
    if ($('#ddlcentre').val() == null) {
        alertify.error("You Don't Have Permission Any Centre ! Please Contact Admin.");
        return false;
    } if ($('#ddlcentre').val() == "0" && $('#txtpatientname').val() != '') {
        alertify.log('Please Select Centre First!');
        $('#ddlcentre').focus();
        return false;
    }
    if ($('#ddldiscountby').val() != "0" || $('#ddlcreditor').val() != "0") {
        if ($('#txtremark').val() == "") {
            alertify.log('Please Fill Remark!');
            $('#txtremark').focus();
            return false;
        }
    }
    calculation();
    if (Validate()) {
        var pobj = {};
        pobj.PatientID = $('#hdfpatientid').val();
        pobj.CentreID = $('#ddlcentre').val();
        pobj.UHID = '';
        pobj.Title = $('#ddltitle').val();
        pobj.PatientName = $('#txtpatientname').val();
        pobj.GTitle = '0';
        pobj.GuardianName = '';
        pobj.GuardianRelationID = '0';
        pobj.Mobile = $('#txtmobilenumber').val();
        pobj.EmailID = $('#txtemailid').val();
        pobj.IDTypeID = '0';
        pobj.IDTypeNo = '';
        pobj.CasteID = '0';
        pobj.ReligionID = '0';
        pobj.GenderID = $('#ddlgender').val();
        pobj.MartialStatusID = '0';
        pobj.AgeYear = $('#txtyear').val();
        pobj.AgeMonth = $('#txtmonth').val();
        pobj.AgeDay = $('#txtday').val();
        pobj.DOB = $('#txtdob').val();
        pobj.BloodGroupID = '0';
        pobj.OccupationID = '0';
        pobj.Address = $('#txtaddress').val();
        pobj.PinCode = '';
        pobj.StateID = '0';
        pobj.CityID = '0';
        pobj.AreaID = '0';
        pobj.NationalityID = '0';
        pobj.Remark = $('#txtremark').val();
        pobj.EPersonName = '';
        pobj.EMobileNo = '';
        if ($('#hdfpatientid').val() == "0")
            pobj.DoctorID = $('#ddldoctor').val();
        else
            pobj.DoctorID = $('#hdfdoctorid').val();
        pobj.DoctorName = '';
        pobj.RegistrationDate = $('#txtregdate').val();
        pobj.RegistrationTime = $('#txtregdate').val();
        pobj.PatientPhoto = '';
        pobj.Active = true;
        var objr = {};
        objr.RecordID = $('#hdfrecordid').val();
        objr.PID = $('#hdfpatientid').val();
        objr.Type = '0';
        objr.VisitNo = '';
        objr.IsMLC = false;
        objr.MLCID = '0';
        objr.MLCType = '0';
        objr.MCLAccidentPlace = '';
        objr.MLCPoliceStation = '';
        objr.MLCRemarks = '';
        objr.MLCCertificateStatus = '';
        objr.AgeYear = $('#txtyear').val();
        objr.AgeMonth = $('#txtmonth').val();
        objr.AgeDay = $('#txtday').val();
        objr.DOB = $('#txtdob').val();
        objr.Mobile = $('#txtmobilenumber').val();
        objr.KinRelationID = '0';
        objr.KinName = '';
        objr.KinMobile = '';
        objr.KinAddress = '';
        objr.PatientCategoryID = $('#ddlpatientcategory').val();
        objr.IsVIP = false;
        objr.IsPoor = false;
        objr.GuardianRelationID = '0';
        objr.GuardianName = '';
        objr.GuardianMobile = '';
        objr.TPASponsorID = $('#ddltpasponser').val();
        objr.ConsultationDate = $('#txtregdate').val();
        objr.Remark = $('#txtremark').val();
        objr.DutyDoctorID = $('#ddldoctor').val();
        objr.ReferredDoctorID = $('#ddldoctor').val();
        objr.Active = true;
        objr.InitiateDischargeDate = $('#txtregdate').val();
        objr.InitiateDischargeDoctorID = '0';
        objr.InitiateDischargeUserID = '0';
        objr.InitiateDischargeRemarks = '';
        objr.FinalizebedDischargeDate = $('#txtregdate').val();
        objr.FinalizebedDischargeUserID = '0';
        objr.FinalizebedDischargeRemarks = '';
        objr.PhysicalDischType = '0';
        objr.PhysicalDischargeDate = $('#txtregdate').val();
        objr.PhysicalDischargeDoctorID = '0';
        objr.PhysicalDischargeUserID = '0';
        objr.PhysicalDischargeRemarks = '';
        objr.AdmitBedID = '0';
        objr.CurrentBedID = '0';
        var bobj = {};
        bobj.CentreID = $('#ddlcentre').val();
        bobj.BillID = $('#hdfbookingid').val();
        bobj.RefID = $('#hdfpatientid').val();
        bobj.BillType = 'N';
        bobj.BillNo = '';
        bobj.CreditorID = $('#ddlcreditor').val();
        bobj.BillOpenDate = $('#txtregdate').val();
        bobj.BillAmount = $('#txttotal').val();
        bobj.DiscountAmount = $('#txtdiscount').val();
        bobj.TaxAmount = $('#txtextra').val();
        bobj.NetAmount = $('#txtnet').val();
        bobj.BillStatus = '1';
        bobj.DischargeNo = '';
        bobj.ExtraBy = $('#ddlextraby').val();
        bobj.DiscountBy = $('#ddldiscountby').val();
        bobj.ClientID = $('#ddlclient').val();

        var robj = {};
        robj.ReceiptID = $('#hdfreceiptid').val();
        robj.BillID = '0';
        robj.PayableAmount = $('#txtnet').val();
        robj.PaidAmount = $('#txtpaid').val();
        robj.Paymode = $('#ddlpaymode').val();
        robj.ReceiptType = 'Receipt';
        robj.ReceiptNo = '';
        robj.ReceiptDate = $('#txtregdate').val();
        robj.SlipNo = '1';
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
        robj.Active = $('#ddlstatus').val();

        //CheckCreditAmount($('#ddlcentre').val(), $('#hdfrecordid').val())
        var centreid = $('#ddlcentre').val();
        var recid = $('#hdfrecordid').val();
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            url: 'PatientBooking.aspx/CheckCreditAmount',
            data: JSON.stringify({ CentreID: centreid, RecID: recid }),
            async: false,
            success: function (response) {
                if (response.d.MessageName != "") {
                    alertify.error(response.d.MessageName);
                    return;
                }
                else {
                    SavebookingDetail(pobj, objr, bobj, robj);

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
            },
            failure: function (response) {
                alertify.alert(response.d);
            }
        });

    }
    else {
    }
}
function ClearRecord() {
    BindAllComboBox();
    $('#txtcouponcode').prop('disabled', '');
    $('#txtcouponcode').val('');
    $('#txtdigitalcardbalance').val('0');
    $('#hdfbookingid').val('0');
    coupon = 0;
    $('#txttotal').val('0');
    $('#txtdiscount').val('0');
    $('#txtextra').val('0');
    $('#txtnet').val('0');
    $('#hdfreceiptid').val('0');
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
    $("#gvlaborder").empty();
    $('#txtbalance').val('0');
    $("#txtitemsearch").val('');
    $("#txtsearchpatient").val('');
    $('#lnkname').html('No Patient Selected');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');
    $('#hdfrecordid').val('0');
    $('#hdfpatientid').val('0');
    $('#hdfdoctorid').val('0');
    $('#hdfcentreid').val('0');
    $('#hdfcategoryid').val('0');
    $('#txtsearchpatient').val('');
    $('#txtpatientname').val('');
    $('#txtmobilenumber').val('');
    $('#txtemailid').val('');
    $('#txtaddress').val('');
    getserverdate1($("#txtdob"));
    CalculateAge();
    getserverdate1($('#txtregdate'));
    getgenderdetail();
    if ($('#ddlextraby').val() == "0") {
        $('#txtextra').attr('disabled', 'disabled');
        $('#txtextra').val('0');
    }
    if ($('#ddldiscountby').val() == "0") {
        $('#txtdiscountper').attr('disabled', 'disabled');
        $('#txtdiscount').attr('disabled', 'disabled');
        $('#txtdiscountper').val('0');
        $('#txtdiscount').val('0');
    }
    ClearBookingItem();
    $('#ddltitle').prop('selectedIndex', 1);
    $('#ddldoctor').prop('selectedIndex', 1);
    $('#ddlcentre').prop('selectedIndex', 1);
    $('#ddlpatientcategory').prop('selectedIndex', 1);
    $('#ddlpaymode').prop('selectedIndex', 1);
    getgenderdetail();
    GetCentreRegistrationNo($('#ddlcentre').val());
    BindCombo($("#ddlclient"), "ddlclient", $('#ddlcentre').val());
    BindCombo($("#ddlsampleBoy"), "ddlsampleBoy", $('#ddlcentre').val());
    BindCombo($("#ddldoctor"), "ddldoctor", $('#ddlcentre').val());
}
function CheckCreditAmount(centreid, recid) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/CheckCreditAmount',
        data: JSON.stringify({ CentreID: centreid, RecID: recid }),
        async: false,
        success: function (response) {

            if (response.d.MessageName != "") {
                alertify.error(response.d.MessageName);
                return;
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
        },
        failure: function (response) {
            alertify.alert(response.d);
        }
    });
}
function SavebookingDetail(pobj, objr, bobj, robj) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/SaveBooking',
        data: JSON.stringify({ pobj: pobj, objr: objr, bobj: bobj, robj: robj, CouponCode: $('#txtcouponcode').val() }),
        async: false,

        success: function (response) {
            if (response.d.MessageName != "") {
                PrintBooking(response.d.MessageName);
                alertify.success("Booking Save Success");
                ClearRecord();
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
function ClearPaymentDetail() {
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
}
function FillPatientBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PatientBooking.aspx/GetBookingPatientDetail",
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
        $("#gvbooking").empty();
        if (data.d.length > 0) {
            $("#gvbooking").append("<thead><tr><th style='width:15px' class='center'>Action</th><th style='width:15px' class='center'>Print</th><th style='width:15px' class='center'>BillNo</th><th>UHID</th>" +
                "<th>PatientName</th><th>Mobile</th><th>EmailID</th><th>Date</th><th>NetAmount</th><th>TotalPaid</th><th>Balance-Status</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var billdetail = "";
                var billdelete = "";
                var color = "warning";
                debugger;
                billdelete = "<a class='fa fa-times-circle-o lnkbookingdelete' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                if (data.d[i].Status == 'C') {
                    billdetail = "<a class='glyphicon glyphicon-print lnkbookingprint' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    if (print == 'False')
                        billdetail = '';
                    color = 'success';
                    $("#gvbooking").append("<tr><td class='" + color + "'>" + billdelete + "</td><td class='" + color + "'>" + billdetail + "</td><td class='" + color + "'>" + data.d[i].BillNo + "</td>" +
                              "<td  class='" + color + "'>" + data.d[i].UHID + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].PatientName + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].Mobile + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].EmailID + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].BillOpenDate + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].NetAmount + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].TotalPaidAmount + "</td>" +
                             "<td class='" + color + "'>" + data.d[i].Statusclear + "</td>" +
                             "</tr>");
                } else {

                    billdetail = "";
                    color = 'red';
                    billdetail = "<a class='glyphicon glyphicon-print lnkbookingprint' style='font-size: large;' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-billno='" + data.d[i].BillNo + "' data-billid='" + data.d[i].BillID + "' href='javascript:void();'></a>";
                    if (print == 'False')
                        billdetail = '';
                    color = 'red';
                    $("#gvbooking").append("<tr><td class='" + color + "'>" + billdelete + "</td><td class='" + color + "'>" + billdetail + "</td><td class='" + color + "'>" + data.d[i].BillNo + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].UHID + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].PatientName + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].Mobile + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].EmailID + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].BillOpenDate + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].NetAmount + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].TotalPaidAmount + "</td>" +
                             "<td  class='" + color + "'>" + data.d[i].Statusclear + "</td>" +
                             "</tr>");
                }
            }
            $('#gvbooking').append("</tbody>");
            PatientInitialize();
        }
        else {
            $("#gvbooking").append("<thead><tr><th>Booking List</th></tr></thead>");
            $("#gvbooking").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function PatientInitialize() {
    $('#gvbooking').dataTable({
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
function AccepttotalPayment() {
    var total = $('#txtnet').val();
    setdefaultrate(total);
    calculation();
}
function ClearBookingItem() {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/EmptyBookingTestList',
        data: JSON.stringify({}),
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
function savedoctor() {
    var obj = {};
    obj.DoctorID = 0;
    obj.DoctorCode = $('#txtdoctorcode').val();
    obj.DoctorName = $('#txtdoctorname').val();
    obj.DepartmentID = 0;
    obj.DoctorTypeID = 0;
    obj.CentreID = 0;
    obj.Qualification = '';
    obj.SpecializationID = 0;
    obj.ClinicPhone = $('#txtclinicnumber').val();
    obj.Mobile = $('#txtdoctormobile').val();
    obj.ResidensePhone = '';
    obj.LicenseNo = '';
    obj.Address = $('#txtdocaddress').val();
    obj.EmailID = $('#txtdoctoremailid').val();
    obj.IsOTDoctor = false;
    obj.IsOPD = false;
    obj.IsIPD = false;
    obj.IsRateList = false;
    obj.ValidityDays = 0;
    obj.NoVisit = 0;
    obj.OPDRoomId = 0;
    obj.OPDLimit = 0;
    obj.IPDShowOnBill = false;
    obj.StateID = 0;
    obj.CityID = 0;
    obj.AreaID = 0;
    obj.Photo = '';
    obj.IsAllowSign = false;
    obj.SignPhoto = '';
    obj.SMSMobileNo = '';
    obj.Active = true;
    obj.AccountPost = false;
    obj.AccountPostType = 0;

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/SaveDoctor',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearDoctorRecord();
            }
            else
                alertify.error(response.d.MessageName);
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
function ClearDoctorRecord() {
    $('#txtdoctorcode').val('');
    $('#txtdoctorname').val('');
    $('#txtclinicnumber').val('');
    $('#txtdoctormobile').val('');
    $('#txtdocaddress').val();
    $('#txtdoctoremailid').val('');

    BindCombo($("#ddldoctor"), "ddldoctor", $('#ddlcentre').val());
}
function GetCentreRegistrationNo(id) {

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PatientBooking.aspx/GetCentreRegistrationNo',
        data: JSON.stringify({ ID: id }),
        async: false,
        success: function (response) {
            $('#lnkregistrationno').html(response.d);
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