$(document).ready(function () {
    FillCentreAccount();
    $(document).on('click', '.lnkviewcentredetail', function () {
        var cid = $(this).data('id');
        var cname = $(this).data('name');
        $('.lnkcentrename').text(cname);
        $('#ModalCentreAccountInformation').modal();
        CentretransactionDetail(cid);
    });
});

function FillCentreAccount() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountInformation.aspx/CentreAccountDetail",
        data: JSON.stringify({  }),
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
        $('#gvcentredetail').empty();
        if (data.d.length > 0) {
            $('#gvcentredetail').append("<thead><tr><th>Action</th><th>Centre Detail</th>" +
                   "<th>Account Type</th>" +
                   "<th>State</th>" +
                   "<th>City</th>" +
                   "<th>Area</th>" +
                   "<th>EmailID</th>" +
                   "<th>Mobile</th>" +
                   "<th>Total</th>" +
                   "<th>Balance</th>" +
                   "<th>Credit_Limit</th>" +
                   "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gvcentredetail").append("<tr>" +
                    "<td><a class='btn btn-success btn-xs lnkviewcentredetail' data-id='" + data.d[i].CentreID + "' data-name='" + data.d[i].Code + ' | ' + data.d[i].CentreName + "' href='javascript:void();'> View</a></td>" +
                  "  <td>" + data.d[i].Code + ' | ' + data.d[i].CentreName + "</td>" +
                    "<td>" + data.d[i].AccountType + "</td>" +
                             "<td>" + data.d[i].State + "</td>" +
                             "<td>" + data.d[i].City + "</td>" +
                             "<td>" + data.d[i].Area + "</td>" +
                             "<td>" + data.d[i].EmailID + "</td>" +
                             "<td>" + data.d[i].Mobile + "</td>" +
                             "<td>" + data.d[i].TotalAmount + "</td>" +
                             "<td>" + data.d[i].BalanceAmount + "</td>" +
                             "<td>" + data.d[i].CreditLimit1 + "</td>" +
                             "</tr>");

            }

           
            $('#gvcentredetail').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvcentredetail").append("<thead><tr><th>Centre Account List</th></tr></thead>");
            $("#gvcentredetail").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvcentredetail').dataTable({
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


function CentretransactionDetail(cid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreAccountInformation.aspx/CentretransactionDetail",
        data: JSON.stringify({CentreID:cid}),
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
