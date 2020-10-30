var currentIndex = 0;
var helpindex = 0;
$(document).ready(function () {
    PermissionDetail();
    GetPatientDetail();
    GetStructure();
    $(document).on('click', '#btndeleteresult', function () {
        DeleteResultDetail();
    });
    SetCurrentDate($('#txtresultdate'));
    $("#gvresult tr").eq(currentIndex).find(".txtresult").focus();
    $(document).on('click', '.lnkselect', function () {
        var itemid = $(this).data('itemid');
        var testid = $(this).data('testid');
        var desc = $(this).data('desc');
        var length = $(this).data('length');
        var help = $(this).data('help');
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        helpindex = index;
        if (help != false) {
            GetHelpDetailList(itemid);
            $('#ModalHelp').modal('show');
        }
        else if (desc == true && length == false) {
            GetInsertDetail(itemid);
            $('#ModalInsert').modal('show');
        }
        else {
            getCommentDetail(testid);
            $('#ModalComment').modal('show');
        }
    });
    $(document).on('keydown', ".txtresult", function (e) {
        valuetxt = $(this).val();

        if (valuetxt == "*" || valuetxt == "{C}") {
            var keycode = e.which;
            if (keycode == 46)
            { }
            else {
                if ((keycode != 46 || keycode != 9) && (keycode < 9 || keycode > 9)) {
                    $(this).val(valuetxt);
                    return false;
                }
            }
        }
        if (e.keyCode == 35) {
            $("#gvresult tr").eq(currentIndex + 1).find(".txtresult").focus();
            currentIndex = currentIndex - 1;
        }

    });
    $(document).on("change", ".txtresult", function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        rowindexg = index;
        var value = $(this).val();
        //----------------
        value = getautocomplete(value);
        //-----------------
        FillResult(index, value);
        nexfield = rowindexg + 1;
        currentIndex = rowindexg;
        $("#gvresult tr").eq(currentIndex + 1).find(".txtresult").focus();

    });
    $(document).on("click", "#btnsaveresult", function () {

           var chck;
            chck = 0;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PathologyReportingResult.aspx/SaveResult",
                data: JSON.stringify({ IsValid: chck }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response.d.MsgID != 0) {
                        alertify.success("Validated!!!");
                      //  PrintReport($('#hdfBookingID').val(), response.d.MsgID, $('#hdfFormID').val(), $('#hdfTestGroupID').val());
                    }
                    else if (response.d.Msg == "0") {
                        alertify.success("Save Successfully!!!");
                    }
                    else if (response.d.Msg == "Please Fill atleast one Test Result !") {
                        alertify.error(response.d.Msg);
                    }
                    else
                        alertify.error("Software Error  !");
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
       
    });
    $(document).on("click", "#btnvalidsaveresult", function () {

           var chck;
            chck = 1;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PathologyReportingResult.aspx/SaveResult",
                data: JSON.stringify({ IsValid: chck }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response.d.MsgID != 0) {
                       
                        alertify.success("Validated!!!");
                       // PrintReport($('#hdfBookingID').val(), response.d.MsgID, $('#hdfFormID').val(), $('#hdfTestGroupID').val());
                    }
                    else if (response.d.Msg == "0") {
                        alertify.success("Save Successfully!!!");
                    }
                    else if (response.d.Msg == "Please Fill atleast one Test Result !") {
                        alertify.error(response.d.Msg);
                    }
                    else
                        alertify.error("Software Error  !");
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
       
    });
    $(document).on('click', '#btnclose', function () {
        window.close('PathologyReportingResult.aspx');
    });
    $(document).on('click', '.lnkhelpedit', function () {
        var hid = $(this).data("id");
        var help = $(this).data("help");
        var helphtml = $(this).data("helphtml");
        $('#txthelp').val(help);
        CKEDITOR.instances['txthelphtml'].setData(helphtml);
        helpid = hid;
    });
    $(document).on('click', '#btnaddhelp', function () {
        var help = $('#txthelp').val();
        $("#gvresult tr").eq(helpindex).find(".txtresult").val('{H}');
        SaveHelpDetail(helpindex, help, CKEDITOR.instances['txthelphtml'].getData());
        $('#ModalHelp').modal('hide');


    });
    $(document).on('click', '#btnaddinsert', function () {
        $("#gvresult tr").eq(helpindex).find(".txtresult").val('{I}');
        SaveHelpDetail(helpindex, "{I}", CKEDITOR.instances['txtinsert'].getData());
        $('#ModalInsert').modal('hide');


    });
    $(document).on('click', '#btnaddcomment', function () {
        $("#gvresult tr").eq(helpindex).find(".txtresult").val('{C}');
        SaveHelpDetail(helpindex, "{C}", CKEDITOR.instances['txtcommenthtml'].getData());
        $('#ModalComment').modal('hide');


    });

});

function getCommentDetail(testid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/GetCommentDetail",
        data: JSON.stringify({ ID: testid }),
        dataType: "json",
        async: false,
        success: function (response) {
            CKEDITOR.instances['txtcommenthtml'].setData(response.d);
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
function GetInsertDetail(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/GetInsertDetail",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            CKEDITOR.instances['txtinsert'].setData(response.d);

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
function SaveHelpDetail(index, help, helphtml) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/SaveHelpDetail",
        data: JSON.stringify({ Index: index, Help: help, HelpHtml: helphtml }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
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
function getautocomplete(value) {
    if (value == "P")
        value = "Positive";
    else if (value == "N")
        value = "Negative";
    else if (value == "RE")
        value = "Reactive";
    else if (value == "NR")
        value = "Non Reactive";
    else if (value == "R")
        value = "Resistant";
    else if (value == "S")
        value = "Sensitive";
    else if (value == "I")
        value = "Intermediate";
    else if (value == "NO")
        value = "Not Seen";
    else if (value == "NI")
        value = "Nil";
    return value;
}
function GetPatientDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/GetPatientDetail",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            $('#txtuhid').val(response.d.UHID);
            $('#txtpatientname').val(response.d.PatientName);
            $('#txtbillno').val(response.d.BillNo);
            $('#txtsampleno').val(response.d.SampleNo);
            $('#txtdoctor').val(response.d.DoctorName);

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
function FillResult(index, result) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/FillResult",
        data: JSON.stringify({ index: index, result: result }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
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
        if (data.d.constructor == Array) {
            $("#gvresult").empty();
            if (data.d.length > 0) {
                for (var i = 0; i < data.d.length; i++) {
                    var flag = '';
                    if (data.d[i].Flag == 'H') {
                        color = '#ffa50045';
                        flag = 'High';
                    }
                    else if (data.d[i].Flag == 'L') {
                        color = '#55ce6359';
                        flag = 'Low';
                    } else
                        color = 'white';
                    var machinedata = (data.d[i].MachineData != null) ? data.d[i].MachineData : "";

                    var formula = (data.d[i].Formula != "") ? "#5e60a952" : "";
                    var selecthelp = (data.d[i].IsDescriptive == true) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "' data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "' data-help='" + data.d[i].IsHelp + "'><i class='fa fa-edit' /></a>" : "";
                    if (selecthelp == "") {
                        selecthelp = (data.d[i].IsHelp == 1) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "'  data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "' data-help='" + data.d[i].IsHelp + "'><i class='fa fa-edit' /></a>" : "";
                    } $("#gvresult").append("<tr style='background-color:" + color + "'><td style='width:5px;' class='center'>" + (i + 1) + "</td>" +
                  //  "<td class='center'>" + data.d[i].TestName + "</td>"+
                  "<td class='center'>" + data.d[i].TestName + " - " + data.d[i].ItemName + "</td><td><input type='text'  style='width:200px' value='" + data.d[i].DefaultResult + "' class='form-control txtresult'  /></td>" +
                    "<td style='width:4%;background-color:" + formula + " ;'>" + machinedata + "</td><td style='width:4%;'>" + data.d[i].Unit + "</td><td style='width:5%;'>" + data.d[i].NormalRange + "</td>" +
                    "<td style='width:5%;'>" + flag + "</td>" +
                    "<td style='width:5px;'>" + selecthelp + "</td></tr>");

                }
            }
        }
        else
            alertify.error(data.d);
    }
}
function GetStructure() {
    debugger;
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/GetStructure",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
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
        var isOk = 0;
        $("#gvresult").empty();
        if (data.d.length > 0) {
            totalrow = data.d.length;

            for (var i = 0; i < data.d.length; i++) {
                var flag = '';
                if (data.d[i].Flag == 'H') {
                    color = '#ffa50045';
                    flag = 'High';
                }
                else if (data.d[i].Flag == 'L') {
                    color = '#55ce6359';
                    flag = 'Low';
                } else
                    color = 'white';
                var machinedata = (data.d[i].MachineData != null) ? data.d[i].MachineData : "";
                var formula = (data.d[i].Formula != "") ? "#5e60a952" : "";
                var selecthelp = (data.d[i].IsDescriptive == true) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "' data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "'  data-help='" + data.d[i].IsHelp + "'><i class='fa fa-edit' /></a>" : "";
                if (selecthelp == "") {
                    selecthelp = (data.d[i].IsHelp == 1) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "'  data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "'  data-help='" + data.d[i].IsHelp + "' ><i class='fa fa-edit' /></a>" : "";
                } $("#gvresult").append("<tr style='background-color:" + color + "'>" +
                    "<td style='width:5px;' class='center'>" + (i + 1) + "</td>" +
                //"<td class='center'>" + data.d[i].TestName + "</td>"+
                "<td class='center'>" + data.d[i].TestName + " - " + data.d[i].ItemName + "</td><td><input type='text'  style='width:200px' value='" + data.d[i].DefaultResult + "' class='form-control txtresult'  /></td>" +
                "<td style='width:4%;background-color:" + formula + " ;'>" + machinedata + "</td><td style='width:4%;'>" + data.d[i].Unit + "</td><td style='width:5%;'>" + data.d[i].NormalRange + "</td>" +
                "<td style='width:5%;'>" + flag + "</td>" +
                "<td style='width:5px;'>" + selecthelp + "</td></tr>");
            }
            //    $("#gvresult tr").eq(0).find(".txtresult").focus();
        }
    }
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
        url: "PathologyReportingResult.aspx/GetWorkloadDetail",
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
        $("#gvpathology").empty();
        if (data.d.length > 0) {
            $('#gvpathology').append("<thead><tr><th style='width:15px' class='center'>Select</th><th style='width:15px' class='center'>Print</th><th>Centre</th><th>UHID</th><th>PatientName</th><th>Mobile</th><th>EmailID</th><th>OrderNo</th><th>TestName</th><th>SampleNo</th><th>SampleName</th><th>DoctorName</th></tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var fillreporting = (data.d[i].Status == 0) ? 'red' : 'green';
                var reportingdetail = "<a class='glyphicon glyphicon-check lnkselect' style='font-size: large;'   data-doctor='" + data.d[i].DoctorName + "'  data-itemid='" + data.d[i].ItemID + "' data-uhid='" + data.d[i].UHID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'></a>";
                var printdetail = (data.d[i].VerifiedStatus != false) ? " <a class='glyphicon glyphicon-print lnkprint' style='font-size: large;' data-doctor='" + data.d[i].DoctorName + "'   data-itemid='" + data.d[i].ItemID + "' data-patientname='" + data.d[i].PatientName + "' data-ordernumber='" + data.d[i].OrderNo + "' data-sampleid='" + data.d[i].SampleID + "' data-id='" + data.d[i].RRID + "' data-orderid='" + data.d[i].OrderID + "' data-test='" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "' href='javascript:void();'> </a>" : "";

                $("#gvpathology").append("<tr style='color:" + fillreporting + "'><td>" +
                        "" + reportingdetail + "" +
                        "</td><td>" + printdetail + " " +
                        " </td>" +
                        "<td class='center'>" + data.d[i].CentreName + "|" + data.d[i].CentreName + "</td>" +
                         "<td class='center'>" + data.d[i].UHID + "</td>" +
                        "<td class='center'>" + data.d[i].PatientName + "</td>" +
                        "<td class='center'>" + data.d[i].Mobile + "</td>" +
                        "<td class='center'>" + data.d[i].EmailID + "</td>" +
                        "<td class='center'>" + data.d[i].OrderNo + "</td>" +
                        "<td>" + data.d[i].TestCode + ' | ' + data.d[i].TestName + "</td>" +
                        "<td class='center'>" + data.d[i].SampleNo + "</td>" +
                       "<td class='center'>" + data.d[i].SampleName + "</td>" +
                        "<td class='center'>" + data.d[i].DoctorName + "</td>" +
                        "</tr>");
            }
            $('#gvpathology').append("</tbody>");

        }
        else {
            $("#gvpathology").append("<thead><tr><th>Labourtary List</th></tr></thead>");
            $("#gvpathology").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function cleardetail() {
    $('#hdforderid').val('0');
    $('#hdfid').val('0');
    BindGrid();
    $('#lnkname').html('');
    $('#lnkuhid').html('');
    $('#lnkpatientdetail').html('');
    $('#txtuhid').val('');
    $('#txtpatientname').val('');
    $('#txttestname').val('');
    $('#txtdoctorname').val('');
}
function GetHelpDetailList(itemid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/GetItemHelpDetail",
        data: JSON.stringify({ ID: itemid }),
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
        $("#gvhelplist").empty();
        if (data.d.length > 0) {
            $("#gvhelplist").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Help</th><th>HelpDetail</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gvhelplist").append("<tr><td>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkhelpedit' data-id='" + data.d[i].HelpID + "' data-help='" + data.d[i].HelpText + "' data-helphtml='" + data.d[i].Helphtml + "' href='javascript:void();'> Edit</a>" +
                    " </div></li>" +
                    "</ul></div></td>" +
                    "<td class='center'>" + data.d[i].HelpText + "</td><td class='center'>" + data.d[i].HelpDetail + "</td>" +
                    "<td>" + data.d[i].IsHelpFullLength + "</td></tr>");
            }
            $('#gvhelplist').append("</tbody>");

        }
        else {
            $("#gvhelplist").append("<thead><tr><th>Help List</th></tr></thead>");
            $("#gvhelplist").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function DeleteResultDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyReportingResult.aspx/DeleteResultDetail",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {

            alertify.success('Result Delete Successfully');
            window.close('PathologyReportingResult.aspx');
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