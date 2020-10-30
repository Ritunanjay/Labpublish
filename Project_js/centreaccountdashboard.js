
$(document).ready(function () {
    $("form").bind("keypress", function (e) {
        if (e.keyCode == 13) {
            alertify.error('Action Not Allow');
            return false;
        }
    });
    PermissionDetail();
    BindAllComboBox();
    $(document).on('click', '#btnbookingdetail', function () {
        var cid = $('#ddlcentre').val();
        if (cid != "0") {
            $('#ModalCentreAccountInformation').modal();
            CentretransactionDetail(cid);
        }
        else {
        alertify.log('Please Select Centre First!!!')}
    });
    $(document).on('change', '#ddlcentre', function () {
        GetCentreWiseTest();
    });
    GetValuesCentreDetail();
    GetCentreWiseTest();
});

function GetCentreWiseTest() {
    $.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountDashboard.aspx/GetValues",
        data: JSON.stringify({ CentreID: $('#ddlcentre').val() }),
        dataType: "json",
        success: function (data) {
            $('#morris_donut_chart').empty();
            var valsnodata = [];
            for (var i = 0; i < data.d.length; i++) {
                valsnodata.push({
                    label: data.d[i].TestCode,
                    value: data.d[i].DataNooftest
                })
            }
            if ($('#morris_donut_chart').length > 0) {
                // Donut Chart
                Morris.Donut({
                    element: 'morris_donut_chart',
                    data:valsnodata,
                    colors: ['#177ec1', '#dc4666', '#e69a2a'],
                    resize: true,
                    labelColor: '#878787',
                });
                $("div svg text").attr("style", "font-family: Roboto").attr("font-weight", "400");
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
            alert(response.d);
        }
    });

}

function CentretransactionDetail(cid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountDashboard.aspx/CentretransactionDetail",
        data: JSON.stringify({ CentreID: cid }),
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
        $('#gvcentrebooking').empty();
        if (data.d.length > 0) {
            $('#gvcentrebooking').append("<thead><tr><th>Centre Detail</th>" +
                "<th>Type</th>" +
                "<th>Date</th>" +
                "<th>Time</th>" +
                "<th>Approve By</th>" +
                "<th>Voucher No</th>" +
                "<th>Narration</th>" +
                "<th>Payable Amount</th>" +
                "<th>Paid Amount</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gvcentrebooking").append("<tr>" +
                  "  <td>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td>" +
                    "<td>" + data.d[i].Type + "</td>" +
                             "<td>" + data.d[i].VoucherDate + "</td>" +
                             "<td>" + data.d[i].VoucherTime + "</td>" +
                             "<td>" + data.d[i].ApprovedBy + "</td>" +
                             "<td>" + data.d[i].VoucherNo + "</td>" +
                             "<td>" + data.d[i].Narration + "</td>" +
                             "<td>" + data.d[i].PayableAmount + "</td>" +
                             "<td>" + data.d[i].PaidAmount + "</td>" +
                             "</tr>");

            }
            $('#gvcentrebooking').append("</tbody>");
            Initializegvcentrebooking();
        }
        else {
            $("#gvcentrebooking").append("<thead><tr><th>Centre Account List</th></tr></thead>");
            $("#gvcentrebooking").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initializegvcentrebooking() {
    $('#gvcentrebooking').dataTable({
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

function GetValuesCentreDetail() {
    $.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountDashboard.aspx/GetValuesCentreDetail",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (data) {
            var valsnodata = [];
            for (var i = 0; i < data.d.length; i++) {
                valsnodata.push({
                    y: data.d[i].CentreName,
                    a: parseInt(data.d[i].TotalAmount),
                    b: parseInt(data.d[i].BalanceAmount),
                    c: parseInt(data.d[i].CreditLimit1)
                })
            }
           
            if ($('#morris_extra_bar_chart').length > 0)

            Morris.Bar({
                element: 'morris_extra_bar_chart',
                data: valsnodata,
                xkey: 'y',
                ykeys: ['a', 'b', 'c'],
                labels: ['Total PaidAmount', 'BookingAmount', 'CreditLimit'],
                barColors: ['#177ec1', '#dc4666', '#e69a2a'],
                hideHover: 'auto',
                gridLineColor: '#878787',
                resize: true,
                gridTextColor: '#878787',
                gridTextFamily: "Roboto"
            });
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
            alert(response.d);
        }
    });

}
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function BindAllComboBox() {
    BindCombo($("#ddlcentre"), "ddlcentre", '');

}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountDashboard.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcentre") {
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