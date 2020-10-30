$(document).ready(function () {
    PermissionDetail();
      $(document).on('click', '.lnkselect', function () {
          var empid = $(this).data('empid');
          var id = $(this).data('id');
          PrintEmployeeSlip(empid,id);
      });
      $(document).on('keydown', '#txtemployeeslip', function () {
          var search = $('#txtemployeeslip').val();
          BindGrid(search);
      });
      BindGrid("");
});
function PrintEmployeeSlip(empid,id) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'PayrollEmployeeSlipReport.aspx/PrintPayrollEmployeeSlip',
        data: JSON.stringify({ EmpID: empid, ID: id }),
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
}
function BindGrid(search) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PayrollEmployeeSlipReport.aspx/GetEmployeeSlipDetail",
        data: JSON.stringify({Search:search }),
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
        $('#gv').empty();
        if (data.d.length > 0) {
            $('#gv').append("<thead><tr><th style='width:15px' class='center'>Action</th><th>SlipMonth</th><th>RoleName</th><th>EmployeeName</th><th>Mobile</th><th>EmailID</th><th>Address</th><th>Basic Salary</th></tr></thead><tbody>");
            var print = $('#hdfprint').val();

            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active==false)?'none':'';
                $("#gv").append("<tr><td class='center' > <a class='fa fa-print lnkselect' style='font-size:large;display:"+active+"' data-empid='" + data.d[i].UserID + "' data-id='" + data.d[i].SlipID + "' href='javascript:void();'> </a></td>"+
                               "<td class='center'>" + data.d[i].Paydetail + "</td>" +
                            "<td class='center'>" + data.d[i].RoleName + "</td>" +
                             "<td class='center'>" + data.d[i].FullName + "</td>" +
                             "<td class='center'>" + data.d[i].Mobile + "</td>" +
                             "<td class='center'>" + data.d[i].EmailID + "</td>" +
                             "<td class='center'>" + data.d[i].Address + "</td>" +
                             "<td class='center'>" + data.d[i].BasicSalary + "</td>" +
                             "</tr>");
               
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Employee Slip List</th></tr></thead>");
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
