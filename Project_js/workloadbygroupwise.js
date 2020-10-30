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
    $(document).on('click', '.lnkrefreshworkload', function () {
     BindGrid();

    });
    $('#txtfromdate,#txttodate').datepicker({
        format: 'dd/mm/yyyy',
        todayHighlight: true,
        autoclose: true,
    });
    cleardetail();
    $(document).on('click', '.lnkselect', function () {
        var billid = $(this).data('billid');
        var groupid = $(this).data('groupid');
        ShowStructure(billid, groupid);

    });
    $(document).on('click', '.lnkprint', function () {
        var BillID = $(this).data('billid');
        var status = $(this).data('status');
        var groupid = $(this).data('groupid');
        PrintReport(BillID, status, groupid);
    });
    window.setInterval(function () {
        BindGrid();
    }, 40000);
    $(document).on('click', '#chckvalidate', function () {
        var billid = $(this).data('billid');
        var groupid = $(this).data('groupid');
        var status = $(this).is(':checked');
        ReportValidate(billid, groupid, status);
    });
    $(document).on('change', '#ddlgroup', function () {
        BindGrid();
    });
    $(document).on('change', '#ddlstatus', function () {
        BindGrid();
    });


});

function ReportValidate(billid, groupid, status) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'WorkloadByGroupWise.aspx/ReportValidate',
        data: JSON.stringify({ BillID: billid, GroupID: groupid, Status: status }),
        async: false,
        success: function (response) {
            if (response.d == "Error")
                alertify.error("Software Error Found !");
            else
                alertify.success("Validate Done!");
            // window.open(response.d, '_blank');
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
function PrintReport(id, status, groupid) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'WorkloadByGroupWise.aspx/PrintPathologyBillByReport',
        data: JSON.stringify({ ID: id, Status: status, GroupID: groupid }),
        async: false,
        success: function (response) {
            if (response.d == "")
                alertify.error("Access Denied!");
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
function ShowStructure(billid, groupid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "WorkloadByGroupWise.aspx/ShowDetail",
        data: JSON.stringify({ BillID: billid, GroupID: groupid }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            window.open(response.d, 'popUpPage', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',scrollbars=yes,toolbar=no,left=0');

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
function BindGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "WorkloadByGroupWise.aspx/GetWorkloadDetail",
        data: JSON.stringify({ FromDate: $('#txtfromdate').val(), ToDate: $('#txttodate').val(), PatientFilter: $('#txtpatientfilter').val(), groupid: $('#ddlgroup').val(), status: $('#ddlstatus').val() }),
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
        $("#gvpathology").empty();
        if (data.d.length > 0) {
            $('#gvpathology').append("<thead><tr><th style='display:none'>Account Detail</th><th style='width:15px' class='center'>Validate</th><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Print</th><th>Centre</th><th>UHID</th><th>Patient_Detail</th><th>Mobile</th><th>EmailID</th><th>BillNo</th><th>Test_Group</th><th>TestList</th><th>Booking_Date</th><th>TATTimer</th><th>Result_Remark</th><th>Container_Remark</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var checkbox = "";
                var statusbill = "";
                var fillreporting = '';
                var printdetail = '';
                var reportvalidate = '';

                var timer;
                timer = data.d[i].TATTimer;
                if (data.d[i].Recheck == 'B')
                    fillreporting = '#3be2d359';
                else if (data.d[i].Recheck == 'I') {
                    fillreporting = '#ec39396b';
                    printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-status='" + data.d[i].Recheck + "' data-billid='" + data.d[i].BillID + "'  data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'> </a>";
                } else if (data.d[i].Recheck == 'C') {
                    fillreporting = '#39ec3f6b';
                    printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-status='" + data.d[i].Recheck + "'  data-billid='" + data.d[i].BillID + "'  data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    timer = 'Test Complete Done';
                } else if (data.d[i].Recheck == 'V') {
                    fillreporting = '#c839ec6b';
                    printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-status='" + data.d[i].Recheck + "'  data-billid='" + data.d[i].BillID + "'  data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                } else if (data.d[i].Recheck == 'P') {
                    fillreporting = '#b3851d6b';
                    printdetail = " <a class='glyphicon glyphicon-print lnkprint' data-status='" + data.d[i].Recheck + "'  data-billid='" + data.d[i].BillID + "' data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'> </a>";
                    reportvalidate = "checked";
                    timer = 'Test Validate Done';
                }
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' data-billid='" + data.d[i].BillID + "' data-groupid='" + data.d[i].GroupID + "' style='font-size: large;' href='javascript:void();'></a>";
                checkbox = "<input type='checkbox'  class='form-control' id='chckvalidate' " + reportvalidate + " data-billid='" + data.d[i].BillID + "' data-groupid='" + data.d[i].GroupID + "' />"
                if (data.d[i].Collect == false) {
                    reportingdetail = "";
                    checkbox = "";
                    timer = "Sample Not Collect";
                    printdetail = "";
                }
                printdetail = (data.d[i].Balance == true) ? "" : printdetail;
                //  var balance = (data.d[i].Balance == false) ? "<i class='fa fa-rupee'></i>" : "<i class='fa fa-check'></i>";
                var balance = (data.d[i].Balance == false) ? "" : "<img src='../../admin/img/paid.gif' style='width: 56px;height: 50px;'></img>";
                $("#gvpathology").append("<tr style='color:black;background-color:" + fillreporting + "'>" +
                                     "<td style='display:none'>" + balance + " </td> " +
                                  "<td>" + checkbox + "</td><td>" +
                                      "" + reportingdetail + "" +
                                      "</td><td>" + printdetail + " " +
                                      " </td>" +
                                      "<td>" + data.d[i].CentreName + "</td>" +
                                      "<td>" + data.d[i].UHID + "</td>" +
                                      "<td>" + data.d[i].PatientName + ' ' + data.d[i].Age + "</td>" +
                                      "<td>" + data.d[i].Mobile + "</td>" +
                                      "<td>" + data.d[i].EmailID + "</td>" +
                                      "<td>" + data.d[i].BillNo + "</td>" +
                                      "<td>" + data.d[i].TestGroup + "</td>" +
                                       "<td>" + data.d[i].TestList + "</td>" +
                                      "<td>" + data.d[i].BillOpenDate + "</td>" +
                                 "<td><i class='fa fa-clock-o' style='background-color:white;font-size:large' >" + timer + "</i></td>" +
                                        "<td>" + data.d[i].Remark + "</td>" +
                                        "<td>" + data.d[i].ContainerRemark + "</td>" +
                            "</tr>");
            }
            $('#gvpathology').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvpathology").append("<thead><tr><th>Labourtary List</th></tr></thead>");
            $("#gvpathology").append("<tr><td>There is No List</td></tr>");
        }
    }
}

function Initialize() {
    $('#gvpathology').dataTable({
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": false, "targets": [2] }],
        "searching": true,
        "paging": true,
        "processing": true,
        "bSort": false,
        "info": true,
        order: [[1, "desc"]],
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
function cleardetail() {
    BindAllComboBox();
    getserverdate1($("#txtfromdate"));
    getserverdate1($("#txttodate"));
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');

}


function BindAllComboBox() {
    BindCombo($("#ddlgroup"), "ddlgroup", '');

}
function BindCombo(ele, ControlName, status) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "WorkloadByGroupWise.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, status: status }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlgroup") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.GroupID).html(value.Groupname));
                });
            } if (ControlName == "ddlmethod") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.MethodID).html(value.MethodName));
                });
            } if (ControlName == "ddlcommentHead") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CommentID).html(value.CommentHead));
                });
            } if (ControlName == "ddlmachine") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.MachineID).html(value.MachineName));
                });
            } if (ControlName == "ddlsample") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.SampleID).html(value.SampleName));
                });
            } if (ControlName == "ddlreporttype") {
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