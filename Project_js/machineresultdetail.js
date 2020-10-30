$(document).ready(function () {
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
    cleardetail();

});
function cleardetail() {
    $("#gv").empty();
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    FillPatientBindGrid();
}

function FillPatientBindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "MachineResultDetail.aspx/BindMachineResultDetail",
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
            $('#gv').append("<thead><tr><th class='center'>CentreDetail</th><th class='center'>SampleNo</th><th>PatientName</th><th>AgeSex</th><th>TestCode</th>" +
                "<th>Result</th><th>Alarm</th><th>Unit</th><th>RefRange</th><th>Reviewed</th><th>Used</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gv").append("<tr><td>" + data.d[i].CentreDetail + "</td><td class='center'>" + data.d[i].SampleNo + "</td>" +
                         "<td class='center'>" + data.d[i].PatientName + "</td>" +
                         "<td class='center'>" + data.d[i].AgeSex + "</td>" +
                         "<td class='center'>" + data.d[i].TestCode + "</td>" +
                        "<td class='center'>" + data.d[i].Result + "</td>" +
                        "<td class='center'>" + data.d[i].Alarm + "</td>" +
                        "<td class='center'>" + data.d[i].Units + "</td>" +
                        "<td class='center'>" + data.d[i].RefRange + "</td>" +
                        "<td class='center'>" + data.d[i].Reviewed + "</td>" +
                        "<td class='center'>" + data.d[i].Used + "</td>" +
                         "</tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Machine Result List</th></tr></thead>");
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
