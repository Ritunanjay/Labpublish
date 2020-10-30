var currentIndex = 0;
var helpindex = 0;
var iid = 0;
var tid = 0;
$(document).ready(function () {
    PermissionDetail();
    ClearResult();
    
    $(document).on('click', '.lnkallrecheck', function (e) {
        var status = $(this).is(':checked');
        if (status == true) {
            alertify.log('Only Recheck Fill');
            return false;}
        var table = $(e.target).closest('table');
        $('td input:text', table).prop('disabled', this.checked);
    });
    $(document).on('keydown', ".txtresult", function (e) {
        valuetxt = $(this).val();
        var currentRow = $(this).closest("tr");
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var formulanew = currentRow.find(".lnkformula").val();
        var ishelp = currentRow.find(".lnkishelp").val();
        if (ishelp == "true") {
            iid = currentRow.find(".lnkitemid").val();
            tid = currentRow.find(".lnktestid").val();
            AutocompleteItemName(valuetxt);
        }
        currentRow = index;
        if (formulanew != '') {
                FillResult(currentIndex, '');
                if (e.keyCode == 9) {
                        $("#gvresult tr").eq(currentIndex).find(".txtresult").focus();
                    } else
                    $("#gvresult tr").eq(currentIndex - 1).find(".txtresult").focus();
        }
        //if ($("#gvresult tr").length == index + 1)
        //    $('#ddlresultstatus').focus();
      });
    $(document).on('focusin', ".txtresult", function (e) {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        currentIndex = index;
    });
    $(document).on("change", ".txtresult", function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var value = $(this).val();
        value = getautocomplete(value);
        FillResult(index, value);
        $("#gvresult tr").eq(currentIndex + 1).find(".txtresult").focus();
    });
    $(document).on('click', '#btndeleteresult', function () {
        DeleteResultDetail();
    });
    $(document).on('change', '.lnkrecheck', function () {
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var recheck = $(this).val();
        FillRecheck(index, recheck);

    });
    $(document).on('click', '.lnkselect', function () {
        var itemid = $(this).data('itemid');
        var testid = $(this).data('testid');
        var desc = $(this).data('desc');
        var length = $(this).data('length');
        var help = $(this).data('help');
        var index = $(this).closest('td').parent()[0].sectionRowIndex;
        helpindex = index;
        $('#txthelp').val('');
        CKEDITOR.instances['txthelphtml'].setData('');
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
    $(document).on("click", "#btnsaveresult", function () {

        if (confirm(" Do you want to Save this Test Result?") == true) {
            var chck;
            chck = 0;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PathologyResulting.aspx/SaveResult",
                data: JSON.stringify({ IsValid: chck, RStatus: $("#ddlresultstatus").val(), RDoctorID: $('#ddlreportingdoctor').val(), ResultRemark: $('#txtresultremark').val() }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response.d.MsgID != 0) {
                        SMSResult();

                        alertify.success("Validated!!!");
                        PrintReport($('#hdfBookingID').val(), response.d.MsgID, $('#hdfFormID').val(), $('#hdfTestGroupID').val());
                        window.close('PathologyResulting.aspx');
                    }
                    else if (response.d.Msg == "0") {
                        alertify.success("Save Successfully!!!");
                        window.close('PathologyResulting.aspx');
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
        }
        window.close('PathologyResulting.aspx');

    });
    $(document).on("click", "#btnvalidsaveresult", function () {

        if (confirm(" Do you want to Save this Test Result?") == true) {
            var chck;
            chck = 1;
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PathologyResulting.aspx/SaveResult",
                data: JSON.stringify({ IsValid: chck }),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response.d.MsgID != 0) {
                        SMSResult();

                        alertify.success("Validated!!!");
                        PrintReport($('#hdfBookingID').val(), response.d.MsgID, $('#hdfFormID').val(), $('#hdfTestGroupID').val());
                        window.close('PathologyResulting.aspx');
                    }
                    else if (response.d.Msg == "0") {
                        alertify.success("Save Successfully!!!");
                        window.close('PathologyResulting.aspx');
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
        }
        window.close('PathologyResulting.aspx');

    });
    $(document).on('click', '#btnclose', function () {
        window.close('PathologyResulting.aspx');
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
        $("#gvresult tr").eq(helpindex).find(".txtresult").val(help);
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
function ClearResult() {
    BindAllComboBox();
    $('#ddlresultstatus').prop('selectedIndex', 1);
    GetPatientDetail();
    GetStructure();
    SetCurrentDate($('#txtresultdate'));
    $("#gvresult tr").eq(currentIndex).find(".txtresult").focus();
    $('#ddlreportingdoctor').prop('selectedIndex', 1);
    ($('#ddlreportingdoctor').val() == null) ? $('#ddlreportingdoctor').prop('selectedIndex', 0) : $('#ddlreportingdoctor').prop('selectedIndex', 1);

}
function getCommentDetail(testid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyResulting.aspx/GetCommentDetail",
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
        url: "PathologyResulting.aspx/GetInsertDetail",
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
        url: "PathologyResulting.aspx/SaveHelpDetail",
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
        url: "PathologyResulting.aspx/GetPatientDetail",
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
            $('#txtagesex').val(response.d.AgeSex);

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

function FillRecheck(index, recheck) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyResulting.aspx/FillRecheck",
        data: JSON.stringify({ index: index, recheck: recheck }),
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
    }
}
function FillResult(index, result) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyResulting.aspx/FillResult",
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
            var testname = "";
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
                    var profilename = (data.d[i].ProfileName == "") ? "" : "[" + data.d[i].ProfileName + "]";
                  //  if (testname == "")
                        testname = data.d[i].TestName + " - ";
                   // else if (testname == data.d[i].TestName + " - ")
                     //   testname = "";
                    //else
                      //  testname = data.d[i].TestName + " - ";
                var formula = '';
                    if (parseInt(data.d[i].Formula.length) > 1)
                        formula = (data.d[i].Formula != "") ? "#5e60a952" : "";
                    var selecthelp = (data.d[i].IsDescriptive == true) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "' data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "' data-help='" + data.d[i].IsHelp + "'><i class='fa fa-edit' /></a>" : "";
                    if (selecthelp == "") {
                        selecthelp = (data.d[i].IsHelp == 1) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "'  data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "' data-help='" + data.d[i].IsHelp + "'><i class='fa fa-edit' /></a>" : "";
                    }
                    var freezlabel = "";
                    if (data.d[i].DefaultResult == "*" || data.d[i].DefaultResult == "{C}")
                        freezlabel = "readonly";
                    $("#gvresult").append("<tr style='background-color:" + color + "'><td style='width:5px;' class='center'>" + (i + 1) + "</td>" +
                  //  "<td class='center'>" + data.d[i].TestName + "</td>"+
                  "<td class='center'>" + profilename + " " + testname + " " + data.d[i].ItemName + "</td><td><input type='hidden' class='lnkishelp' value='" + data.d[i].IsHelp + "' /><input type='hidden' class='lnkitemid' value='" + data.d[i].ItemID + "' /><input type='hidden' class='lnktestid' value='" + data.d[i].TestID + "' /><input type='hidden' class='lnkformula' value='" + formula + "' /><input type='text'  style='width:200px;' " + freezlabel + " value='" + data.d[i].DefaultResult + "' class='form-control txtresult' onfocus='select(this);'  /></td><td style='width:5px;'>" + selecthelp + "</td>" +
                    "<td style='width:4%;background-color:" + formula + " ;'>" + machinedata + "</td><td style='width:4%;'>" + data.d[i].Unit + "</td><td style='width:5%;'>" + data.d[i].NormalRange + "</td>" +
                    "<td style='width:5%;'>" + flag + "</td>" +
                    "<td><input type='text' tabindex='0' style='width:200px' value='" + data.d[i].Recheck + "' class='form-control lnkrecheck' onfocus='select(this);' disabled  /></td></tr>");

                }
            }
        }
        else
            alertify.error(data.d);
    }
}
function GetStructure() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyResulting.aspx/GetStructure",
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
        var testname = "";
        if (data.d.length > 0) {
            totalrow = data.d.length;
            $('#ddlresultstatus').val(data.d[0].ResultStatus);
            for (var i = 0; i < data.d.length; i++) {
                $('#txtresultremark').val(data.d[i].Remark);
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
                var profilename = (data.d[i].ProfileName == "") ? "" : "[" + data.d[i].ProfileName + "]";
                var machinedata = (data.d[i].MachineData != null) ? data.d[i].MachineData : "";
                //  if (testname == "")
                testname = data.d[i].TestName + " - ";
                // else if (testname == data.d[i].TestName + " - ")
                //   testname = "";
                //else
                //  testname = data.d[i].TestName + " - ";
                    var formula = '';
                if (parseInt(data.d[i].Formula.length) > 1)
                    formula = (data.d[i].Formula != "") ? "#5e60a952" : "";
                var selecthelp = (data.d[i].IsDescriptive == true) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "' data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "'  data-help='" + data.d[i].IsHelp + "'><i class='fa fa-edit' /></a>" : "";
                if (selecthelp == "") {
                    selecthelp = (data.d[i].IsHelp == 1) ? "<a class='lnkselect' href='javascript:void(0);' data-testid='" + data.d[i].TestID + "' data-itemid='" + data.d[i].ItemID + "'  data-desc='" + data.d[i].IsDescriptive + "' data-length='" + data.d[i].IsFullLength + "'  data-help='" + data.d[i].IsHelp + "' ><i class='fa fa-edit' /></a>" : "";
                }
                var freezlabel = "";
                if (data.d[i].DefaultResult == "*" || data.d[i].DefaultResult == "{C}")
                    freezlabel = "readonly";
                $("#gvresult").append("<tr style='background-color:" + color + ";'>" +
                    "<td style='width:5px;' class='center'>" + (i + 1) + "</td>" +
                //"<td class='center'>" + data.d[i].TestName + "</td>"+
                "<td class='center'>" + profilename + " " + testname + " " + data.d[i].ItemName + "</td><td><input type='hidden' class='lnkishelp' value='" + data.d[i].IsHelp + "' /><input type='hidden' class='lnkitemid' value='" + data.d[i].ItemID + "' />"+
                "<input type='hidden' class='lnktestid' value='" + data.d[i].TestID + "' /><input type='hidden' class='lnkformula' value='" + formula + "' /><input type='text'  " + freezlabel + " style='width:200px' value='" + data.d[i].DefaultResult + "' class='form-control txtresult' onfocus='select(this);'  /></td>"+
                "<td style='width:5px;'>" + selecthelp + "</td>" +
                "<td style='width:4%;background-color:" + formula + " ;'> " + machinedata + "</td><td style='width:4%;'>" + data.d[i].Unit + "</td><td style='width:5%;'>" + data.d[i].NormalRange + "</td>" +
                "<td style='width:5%;'>" + flag + "</td>" +
                "<td><input type='text'  style='width:200px' value='" + data.d[i].Recheck + "'  tabindex='0' class='form-control lnkrecheck' onfocus='select(this);'  disabled   /></td></tr>");
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
        url: "PathologyResulting.aspx/GetWorkloadDetail",
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
        url: "PathologyResulting.aspx/GetItemHelpDetail",
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
        url: "PathologyResulting.aspx/DeleteResultDetail",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {

            alertify.success('Result Delete Successfully');
            window.close('PathologyResulting.aspx');
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
function BindAllComboBox() {

    BindCombo($("#ddlresultstatus"), "ddlresultstatus", 'RS');
    BindCombo($("#ddlreportingdoctor"), "ddlreportingdoctor", '');
}
function BindCombo(ele, ControlName, code) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "PathologyResulting.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: code }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlresultstatus") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailCode).html(value.HeadDetailName));
                });
            }
            if (ControlName == "ddlreportingdoctor") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.DoctorID).html(value.DoctorName));
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


function AutocompleteItemName(searchdetail) {
    $(".txtresult").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "PathologyResulting.aspx/SearchHelp",
                data: JSON.stringify({ HelpDetail: searchdetail, ItemID: iid, TestID: tid }),
                dataType: "json",
                success: function (data) {
                    response($.map(data.d, function (item) {
                        return {
                            label: item.split('~')[0],
                            val: item.split('~')[1]
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
                FillResult(currentIndex, i.item.label);
               // $("#gvresult tr").eq(currentIndex + 1).find(".txtresult").focus();
            }
        },
        minLength: 0
    });


}