var itemid = 0;
var helpid = 0;
var rangeid = 0;
var samplereq = "False";
$(document).ready(function () {
    $(document).on("click", ".lnkaddrange", function () {
        var navid = $(this).data("id");
        if (parseInt(navid)>0) {
            itemid = navid;
            GetRangeDetailList(itemid);
            var itemname = $(this).data('itemname');
            $('.lnkrangeitem').html(itemname);

            $('#ModalRange').modal('show');
        }
        else {
            alertify.error('Please Save Investigation First!!!');
        }
        });
    $(document).on("click", "#btnaddnormalrange", function () {
    //    alertify.log(itemid);
        var obj = {};
        obj.RangeID = rangeid;
        obj.TestID = $('#hdftestid').val();
        obj.ItemID = itemid;
        obj.ToAge = $('#txttoage').val();
        obj.ToAgeType = $('#ddltoage').val();
        obj.FromAge = $('#txtfromage').val();
        obj.FromAgeType = $('#ddlfromage').val();
        obj.Gender = $('#ddlgender').val();
        obj.NormalRange = $('#txtmasternormalrange').val();
        SaveRangeDetail(obj);
        GetRangeDetailList(itemid);
        $('#txttoage').val('0');
         $('#ddltoage').val('D');
        $('#txtfromage').val('0');
        $('#ddlfromage').val('D');
        $('#ddlgender').val('B');
        $('#txtmasternormalrange').val('');
        rangeid = 0;
    });
    $(document).on("click", ".lnkrangeedit", function () {
        rangeid = $(this).data('id');
        $('#txttoage').val($(this).data('toage'));
        $('#ddltoage').val($(this).data('toagetype'));
        $('#txtfromage').val($(this).data('fromage'));
        $('#ddlfromage').val($(this).data('fromagetype'));
        $('#ddlgender').val($(this).data('gender'));
        $('#txtmasternormalrange').val($(this).data('normalrange'));
    });
    $(document).on("click", ".lnkrangedelete", function () {
        rangeid = $(this).data('id');
        DeleteRangeDetail();
        GetRangeDetailList(itemid);
    });
    $(document).on('keyup', '#txtqty', function () {
        var qty = $('#txtqty').val();
        if (qty == "")
            $('#txtqty').val('0');
    });
    $(document).on('click', '#btnrowadd', function () {
        if ($('#investigationitemgv tr').length < 1) {
            AddRow(-1);
        }
        else {

            LMSMessage('Investigation Detail', 'Sorry Function Not Applicable', 'info');
        }
    });
    $(document).on('change', '#ddldetail', function () {
        BindGrid("");
    });
    $(document).on('click', '.lnkhelpedit', function () {
        var hid = $(this).data("id");
        var help = $(this).data("help");
        var helphtml = $(this).data("helphtml");
        $('#txthelp').val(help);
        CKEDITOR.instances['txthelphtml'].setData(helphtml);
        $('#btnaddhelp').val('Update Help');
        helpid = hid;
    });
    $(document).on('change', '#txtinvestigationcode', function () {
        if ($('#txtinvestigationcode').val() != "") {
            var code = $('#txtinvestigationcode').val();
            InvestigationCodeAvailable(code);

        }
    });
    $(document).on('click', '.lnkhelpdelete', function () {
        var hid = $(this).data("id");
        var help = $(this).data("help");
        var helphtml = $(this).data("helphtml");
        helpid = hid;
        DeleteHelpDetail();
        GetHelpDetailList(itemid);

    });
    $(document).on("click", ".lnkaddhelp", function () {
        var navid = $(this).data("id");
        itemid = navid;
        var itemname = $(this).data('itemname');
        $('#helpitemname').html(itemname);
        GetHelpDetailList(itemid);
        $('#ModalHelp').modal('show');
    });
    $(document).on("click", "#btnaddhelp", function () {
        var help = $('#txthelp').val();
        var helphtml = CKEDITOR.instances['txthelphtml'].getData();
        SaveHelpDetail(help, helphtml);
        $('#ModalInsert').modal('hide');
        $('#txthelp').val('');
        CKEDITOR.instances['txthelphtml'].setData('');
        GetHelpDetailList(itemid);
        $('#btnaddhelp').val('Add Help');

    });
    PermissionDetail();
    $(document).on("click", "#ddltype", function () {
        ClearRecord();
    });
    $(document).on("click", ".lnkaddinsert", function () {
        var navid = $(this).data("id");
        itemid = navid;
        var itemname = $(this).data('itemname');
        $('#spanitemname').html(itemname);
        GetInsertDetail(navid);
        $('#ModalInsert').modal('show');
    });
    $(document).on("click", "#btnviewcomment", function () {
        var testid = $('#hdftestid').val();
        if (testid == "0")
            alertify.log('Please Select Test First!');
        else {
            $('#ModalComment').modal('show');
            var investigationname = $('#txtinvestigationname').val();
            $('#commentTest').html(investigationname);
            getCommentDetail();
        }
    });
    $(document).on("click", "#btnaddinsert", function () {
        var inserthtml = CKEDITOR.instances['txtinsert'].getData();
        SaveInsertDetail(inserthtml);
        $('#ModalInsert').modal('hide');
        ClearRecord();
    });
    $(document).on('click', '#btnworksheet', function () {
        var testid = $('#hdftestid').val();
        if (testid == "0")
            alertify.log('Please Select Test First!');
        else {
            $('#ModalWorksheet').modal('show');
            var investigationname = $('#txtinvestigationname').val();
            $('#investigationworksheet').html(investigationname);
            getworksheetDetail();
        }
    });
    $(document).on('click', '#btnaddworksheet', function () {
        var worksheethtml = CKEDITOR.instances['txtworksheethtml'].getData();
        var worksheet = $('#txtworksheet').val();
        SaveworksheetDetail(worksheet, worksheethtml);
        $('#ModalWorksheet').modal('hide');
        ClearRecord();
    });
    $(document).on('click', '#btnaddcomment', function () {
        var resulthtml = CKEDITOR.instances['txtcommenthtml'].getData();
        SaveResultDetail(resulthtml);
        $('#ModalComment').modal('hide');
        ClearRecord();
    });

    //  BindAllComboBox();
    $(document).on("click", "#btnadd", function () {
        Save();
        BindGrid("");
    });
    $(document).on("click", "#btnclear", function () {
        ClearRecord();
    });
    $(document).on("click", ".lnkedit", function () {
        ClearRecord();
        var navid = $(this).data("id");
        GetInvestigationByID(navid);
        $('#ModalInvestigation').modal('hide');
    });
    $(document).on("click", ".lnkadd", function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        AddRow(rowindex);
    });
    $(document).on("click", ".lnkdelete", function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        var itemid = $(this).data('id');
        if (confirm('Do You Want To Permanent Delete this Item'))
            DeleteRow(rowindex, itemid);
    });
    $(document).on("click", "#btninvestigationsearch", function () {
        $('#txttestname').val('');
        BindGrid("");
        $('#ModalInvestigation').modal('show');
    });
    $(document).on("change", ".lnkitemname", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("ItemName", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Item Name");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("ItemName", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkmethod", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Method", itemcode, rowindex);

        }
        else {
            alertify.log("Please select Method");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Method", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkextra1", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra1", itemcode, rowindex);

        }
        else {
            alertify.log("Please Fill Extra 1");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra1", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkextra2", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra2", itemcode, rowindex);

        }
        else {
            alertify.log("Please Fill Extra 2");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra2", itemcode, rowindex);
         //   $(this).focus();
        }
    });
    $(document).on("change", ".lnkextra3", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra3", itemcode, rowindex);

        }
        else {
            alertify.log("Please Fill Extra 3");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra3", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkextra4", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra4", itemcode, rowindex);

        }
        else {
            alertify.log("Please Fill Extra 4");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalExtra4", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkisn", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("ISN", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter ISN");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("ISN", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkitemorder", function () {
        var itemorder = $(this).val().trim();
        if (itemorder != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("OrderNo", itemorder, rowindex);

        }
        else {
            alertify.log("Please Enter ItemOrder");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("OrderNo", itemorder, rowindex);
            //$(this).focus();
        }
    });

    $(document).on("change", ".lnkresult", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Result", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter  Result");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Result", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkunit", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Unit", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Unit");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Unit", itemcode, rowindex);
          //  $(this).focus();
        }
    });
    $(document).on("change", ".lnknormalrange", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalRange", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal Range");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalRange", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormalmale", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalMale", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal Range");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalMale", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormalfemale", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalFemale", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal Range");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalFemale", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormal1", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Normal1", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal  1");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Normal1", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormal6", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Normal6", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal 6");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Normal6", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormal12", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Normal12", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal 12");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Normal12", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormalquarter", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalQuarter", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal Quarter");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalQuarter", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnknormalday", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalDay", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Normal Day");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("NormalDay", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkalarmrange", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("AlarmRange", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Alarm range");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("AlarmRange", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkformula", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Formula", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Formula");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("Formula", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkformatresult", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("FormatResult", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Format Result");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("FormatResult", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkintcode", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("INTCode", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter INTCode");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("INTCode", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkhelpcode", function () {
        var itemcode = $(this).val().trim();
        if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("HelpCode", itemcode, rowindex);

        }
        else {
            alertify.log("Please Enter Help Code");
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("HelpCode", itemcode, rowindex);
            //$(this).focus();
        }
    });
    $(document).on("change", ".lnkisbold", function () {
        var itemcode = $(this).is('checked');
       // if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("IsBold", itemcode, rowindex);

    });
    $(document).on("change", ".lnkisitalic", function () {
        var itemcode = $(this).is('checked');
       // if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("IsItalic", itemcode, rowindex);

        //}
        //else {
        //    $(this).focus();
        //}
    });
    $(document).on("change", ".lnkisheading", function () {
        var itemcode = $(this).is('checked');
       // if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("IsHeading", itemcode, rowindex);

        //}
        //else {
        //    $(this).focus();
        //}
    });
    $(document).on("change", ".lnkisunderline", function () {
        var itemcode = $(this).is('checked');
        //if (itemcode != "") {
            var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
            GetInvestigationItem("IsUnderLine", itemcode, rowindex);

        //}
        //else {
        //    $(this).focus();
        //}
    });
    $(document).on("keydown", "#txttestname", function () {
        BindGrid($(this).val());
    });
    // AddRow(-1);
    $(document).on("click", ".lnkinvestigationdelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteInvestigationByID(id);
                $('#ModalInvestigation').modal('hide');

                ClearRecord();
            }
        }
    });
    $(document).on("change", "#ddlgroup", function () {
        var groupid = $(this).val();
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "InvestigationDetail.aspx/GetSampleDetail",
            data: JSON.stringify({ ID: groupid }),
            dataType: "json",
            async: false,
            success: function (response) {
                samplereq = response.d.MessageName;
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
    ClearRecord();
});
function DeleteInvestigationByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/DeleteInvestigationByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {

            if (response.d.MessageID != "0") {
                alertify.success(response.d.MessageName);

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
function InvestigationCodeAvailable(code) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/CodeExist",
        data: JSON.stringify({ Code: code }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $('#txtinvestigationcode').val('');
                $('#txtinvestigationcode').focus();
                //  alertify.error('Sorry ! Detail Exists');
                if (confirm("Do You Want To Update Investigation !")) {
                    GetInvestigationByID(response.d);
                    LMSMessage('Investigation Detail', 'Ready To Modify Investigation', 'success');
                }
                else {
                    LMSMessage('Investigation Detail', 'Sorry Detail Alrady Exist', 'info');
                }
            } else {
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
function GetInvestigationItem(ColName, ColValue, RowIndex) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetInvestigationItemDetail",
        data: JSON.stringify({ ColName: ColName, ColValue: ColValue, RowIndex: RowIndex }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            if (ColValue.substring(0, 1) == '$' || ColValue.substring(0, 1) == '#') {
                BindGridItem(response.d);
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
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function GetInvestigationByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetInvestigationByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            setValues(response);
            BindGridItem(response.d.TestItemList);
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
    $('#hdftestid').val(response.d.TestID);
    $('#txtinvestigationcode').val(response.d.TestCode);
    $('#txtinvestigationdisplay').val(response.d.TestInitial);
    $('#txtinvestigationname').val(response.d.TestName);
    $('#ddlgroup').val(response.d.GroupID);
    $('#ddlmachine').val(response.d.MachineID);
    $('#txtreportdays').val(response.d.ReportDays);
    $('#ddlcommentHead').val(response.d.Comment);
    $('#txtorder').val(response.d.OrderNo);
    $('#ddlprintcomment').val(response.d.IsPrintComment.toString());
    $('#ddlsample').val(response.d.SampleID);
    var spclrpt = (response.d.SpecialRpt.toString() == "") ? "false" : response.d.SpecialRpt.toString();
    $('#ddlspecialreport').val(spclrpt);
    $('#ddlnewpage').val(response.d.NewPage.toString());
    $('#ddldisplay').val(response.d.ShowInList.toString());
    $('#ddltestfor').val(response.d.TestFor);
    $('#ddlreporttype').val(response.d.ReportType);
    $('#txtduedays').val(response.d.DueDays);
    $('#ddlnabl').val(response.d.IsNabl.toString());
    $('#ddlblank').val(response.d.IsBlank.toString());
    $('#ddloutsource').val(response.d.IsOutsource.toString());
    $('#txttattime').val(response.d.TATTime);
    $('#txttatalarm').val(response.d.TATAlarm);
    $('#ddlstatus').val(response.d.Active.toString());
    if ($('#hdfupdate').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');
    $("#btnadd").attr("value", "Modify Investigation");
}
function Save() {
    if ($("#txtinvestigationcode").val() == "") {
        alertify.log("Investigation Code is required.");
        $("#txtinvestigationcode").focus();
        return false;
    } if ($("#txtinvestigationname").val() == "") {
        alertify.log("Investigation Name is required.");
        $("#txtinvestigationname").focus();
        return false;
    }
    if ($('#ddlgroup').val() == null || $('#ddlgroup').val() == "0") {
        alertify.log("Please Select Department Group.");
        $("#ddlgroup").focus();
        return false;
    } if (samplereq != "False" && $('#ddlsample').val() == null || $('#ddlsample').val() == "0") {
        alertify.log("Please Select Sample Detail.");
        $("#ddlsample").focus();
        return false;
    }
    var obj = {};
    obj.TestID = $('#hdftestid').val();
    obj.TestCode = $('#txtinvestigationcode').val();
    obj.TestInitial = $('#txtinvestigationdisplay').val();
    obj.TestName = $('#txtinvestigationname').val();
    obj.GroupID = $('#ddlgroup').val();
    obj.MachineID = ($('#ddlmachine').val() == null) ? "0" : $('#ddlmachine').val();
    obj.ReportDays = ($('#txtreportdays').val() == "") ? "0" : $('#txtreportdays').val();
    obj.OrderNo = ($('#txtorder').val() == "") ? "0" : $('#txtorder').val();
    obj.Comment = ($('#ddlcommentHead').val() == null) ? "0" : $('#ddlcommentHead').val();
    obj.Commenthtml = $('#ddlcommentHead :selected').text();
    obj.IsPrintComment = ($('#ddlprintcomment').val() == null) ? "false" : $('#ddlprintcomment').val();
    obj.SampleID = ($('#ddlsample').val() == null) ? "0" : $('#ddlsample').val();
    obj.SpecialRpt = ($('#ddlspecialreport').val() == null) ? "false" : $('#ddlspecialreport').val();
    obj.NewPage = ($('#ddlnewpage').val() == null) ? "false" : $('#ddlnewpage').val();
    obj.ShowInList = ($('#ddldisplay').val() == null) ? "false" : $('#ddldisplay').val();
    obj.TestWorksheet = '';
    obj.TestWorksheetRtf = '';
    obj.TestFor = $('#ddltestfor').val();
    obj.ReportType = $('#ddlreporttype').val();
    obj.DueDays = $('#txtduedays').val();
    obj.IsNabl = $('#ddlnabl').val();
    obj.IsBlank = $('#ddlblank').val();
    obj.IsProfile = 'false';
    obj.IsHideLable = 'true';
    obj.IsOutsource = $('#ddloutsource').val();
    obj.IsProcedure = 'false';
    obj.TATTime = $('#txttattime').val();
    obj.TATAlarm = $('#txttatalarm').val();
    obj.Active = $('#ddlstatus').val();
    obj.IsDiscount = $('#ddldiscount').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'InvestigationDetail.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                LMSMessage('Investigation Detail', response.d.MessageName, 'success');
                ClearRecord();
            }
            else
                LMSMessage('Investigation Detail', response.d.MessageName, 'info');

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
function ClearRecord() {

    samplereq = "False";
    $('#hdftestid').val('0');
    $('#txtinvestigationcode').val('');
    $('#txtinvestigationname').val('');
    $('#txtinvestigationname').val('');
    $('#txtreportdays').val('0');
    $('#ddlprintcomment').val('false');
    //$('#ddlsample').val();
    //$('#ddlspecialreport').val();
    //$('#ddlnewpage').val();
    //$('#ddldisplay').val();
    //$('#ddltestfor').val();
    //$('#ddlreporttype').val();
    //$('#txtduedays').val();
    //$('#ddlnabl').val();
    //$('#ddlblank').val();
    //$('#ddloutsource').val();
    $('#txttattime').val('00:00');
    $('#txttatalarm').val('00:00');
    BindAllComboBox();
    ItemClear();
    if ($('#ddltype').val() == "R")
        $('#pathology').css('display', 'none');
    else {
        $('#pathology').css('display', '');
    }
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add Investigation");
    $("#btnadd").attr('AccessKey', 'S');
    $('#txtinvestigationcode').focus();

}
function ItemClear() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/ItemClear",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            $("#investigationitemgv").empty();
            AddRow(-1);
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.log(responseText.Message);
            }
        },
        failure: function (response) {
            alertify.log(response.d);
        }
    });
}
function BindGrid(investigation) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetInvestigationInfoDetail",
        data: JSON.stringify({ InvestigationDetail: investigation, Detail: $('#ddldetail :selected').val() }),
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
        $("#gvinvestigation").empty();
        if (data.d.length > 0) {
            $("#gvinvestigation").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>SNo</th><th>Investigation Code</th><th>Investigation</th><th>SNo</th><th>Department</th><th>Department Group</th><th>Machine Detail</th><th>Sample Detail</th><th>Used</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var display = (data.d[i].ShowInList == true) ? "Yes" : "No";
                var Active = (data.d[i].Active == true) ? "Use" : "Not Use";
                var Activecolor = (data.d[i].Active == true) ? "success" : "danger";
                $("#gvinvestigation").append("<tr><td class='" + Activecolor + "'>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].TestID + "' href='javascript:void();'> Edit</a>" +
                    " </div></li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkinvestigationdelete' data-id='" + data.d[i].TestID + "' href='javascript:void();'> Delete</a>" +
                    " </div></li></ul></div></td>" +
                    //"<a class='fa fa-edit lnkedit' style='font-size:large' data-id='" + data.d[i].TestID + "' href='javascript:void();'></a>" +
                    "<td class='" + Activecolor + "'>" + (i+1).toString() + "</td><td class='" + Activecolor + "'>" + data.d[i].TestCode + "</td><td class='" + Activecolor + "'>" + data.d[i].TestName + "</td><td class='" + Activecolor + "'>" + data.d[i].OrderNo + "</td>" +
                    "<td class='" + Activecolor + "'>" + data.d[i].DepartmentName + "</td><td class='" + Activecolor + "'>" + data.d[i].GroupName + "</td>" +
                    "<td class='" + Activecolor + "'>" + data.d[i].MachineName + "</td><td class='" + Activecolor + "'>" + data.d[i].SampleName + "</td>" +
                    "<td class='" + Activecolor + "'>" + display + "</td>" +
                    "<td class='" + Activecolor + "'>" + Active + "</td></tr>");
            }
            $('#gvinvestigation').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvinvestigation").append("<thead><tr><th>Investigation List</th></tr></thead>");
            $("#gvinvestigation").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gvinvestigation').dataTable({
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
function BindAllComboBox() {
    BindCombo($("#ddlgroup"), "ddlgroup", '');
    BindCombo($("#ddlmachine"), "ddlmachine", '');
    BindCombo($("#ddlsample"), "ddlsample", '');
    BindCombo($("#ddlcommentHead"), "ddlcommentHead", '');
    BindCombo($("#ddlreporttype"), "ddlreporttype", 'RT');
}
function BindCombo(ele, ControlName, status) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/BindComboBox",
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
function DeleteRow(RowIndex, itemid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/DeleteRow",
        data: JSON.stringify({ RowIndex: RowIndex, ItemID: itemid }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {

            if (response.d == "1") {
                $("#investigationitemgv tr:eq(" + (RowIndex) + ")").remove();
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
function AddRow(RowIndex) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/AddRow",
        data: JSON.stringify({ RowIndex: RowIndex }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            var lengthgv = $("#investigationitemgv tr").length;
            if (response.d == "1") {
                var htmltext = "<tr><td>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkadd' href='javascript:void();'> Add</a>" +
                    " </div> </li>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkdelete' href='javascript:void();'> Delete</a>" +
                    " </div> </li>" +
                    "</ul></div></td>" +
                    "<td ><input type='text'   style='width:40px'  class='form-control lnkitemorder' autocomplete='off' value='0' /></td>" +
                    "<td><input type='text'    style='width:200px'  class='form-control lnkmethod' /></td>" +
                    "<td ><input type='text'   style='width:100px'  class='form-control lnkisn' autocomplete='off' /></td>" +
                    "<td ><input type='text'  style='width:200px'  autocomplete='off' class='form-control lnkitemname' /></td>" +
                    "<td><input type='text'  style='width:100px'  autocomplete='off' class='form-control lnkresult' /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkunit' /></td>" +
                    //   "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalrange' /></td>" +
                    // "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormal1' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormal6' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormal12' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalmale' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalfemale' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalquarter' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalday' /></td>" +
                    //   "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra1' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra2' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra3' /></td>" +
                    //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra4' /></td>" +

                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkalarmrange' /></td>" +
                   "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkintcode' /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkformula' /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkformatresult' /></td>" + "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisbold' /></td>" +
                    "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisitalic' /></td>" +
                    "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisheading' /></td>" +
                    "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisline' /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkhelpcode' /></td>" +
                     "</tr>";

            }
            if (RowIndex < 0)
                $("#investigationitemgv").append(htmltext);
            else
                $("#investigationitemgv tr").eq(RowIndex).after(htmltext);
          //  BindCombo($(".ddlmethod"), "ddlmethod", '');

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
function BindGridItem(data) {

    if (data.length > 0) {
        $("#investigationitemgv").empty();
        for (var i = 0; i < data.length; i++) {

            var comment = "";
            var bold = (data[i].IsBold.toString() == 'false') ? "" : "checked";
            var italic = (data[i].IsItalic.toString() == 'false') ? "" : "checked";
            var heading = (data[i].IsHeading.toString() == 'false') ? "" : "checked";
            var underline = (data[i].IsUnderLine.toString() == 'false') ? "" : "checked";
            var itemname = (data[i].ItemName == null) ? "" : data[i].ItemName;
            var isn = (data[i].ISN == null) ? "" : data[i].ISN;
            var result = (data[i].Result == null) ? "" : data[i].Result;
            var unit = (data[i].Unit == null) ? "" : data[i].Unit;
            var normalrange = (data[i].NormalRange == null) ? "" : data[i].NormalRange;
            var normalmale = (data[i].NormalMale == null) ? "" : data[i].NormalMale;
            var normalfemale = (data[i].NormalFemale == null) ? "" : data[i].NormalFemale;
            var normal1 = (data[i].Normal1 == null) ? "" : data[i].Normal1;
            var normal6 = (data[i].Normal6 == null) ? "" : data[i].Normal6;
            var normal12 = (data[i].Normal12 == null) ? "" : data[i].Normal12;
            var normalquater = (data[i].NormalQuater == null) ? "" : data[i].NormalQuater;
            var normalday = (data[i].NormalDay == null) ? "" : data[i].NormalDay;
            var alarmrange = (data[i].AlarmRange == null) ? "" : data[i].AlarmRange;
            var formula = (data[i].Formula == null) ? "" : data[i].Formula;
            var formatresult = (data[i].FormatResult == null) ? "" : data[i].FormatResult;
            var intcode = (data[i].INTCode == null) ? "" : data[i].INTCode;
            var helpcode = (data[i].HelpCode == null) ? "" : data[i].HelpCode;
            var orderno = (data[i].OrderNo == null) ? "" : data[i].OrderNo;
            var extra1 = (data[i].NormalExtra1 == null) ? "" : data[i].NormalExtra1;
            var extra2 = (data[i].NormalExtra2 == null) ? "" : data[i].NormalExtra2;
            var extra3 = (data[i].NormalExtra3 == null) ? "" : data[i].NormalExtra3;
            var extra4 = (data[i].NormalExtra4 == null) ? "" : data[i].NormalExtra4;
            var method = (data[i].Method == null) ? "0" : data[i].Method;
            $("#investigationitemgv").append("<tr><td>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkadd' href='javascript:void();'> Add</a>" +
                    " </div> </li>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkdelete' href='javascript:void();' data-id=" + data[i].TestItemID + "> Delete</a>" +
                    " </div> </li>" +
                       "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkaddrange' data-id=" + data[i].TestItemID + " data-itemname=" + itemname + " href='javascript:void();'> Add Range</a>" +
                    " </div> </li>" +

                 "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkaddinsert' data-id=" + data[i].TestItemID + " data-itemname=" + itemname + " href='javascript:void();'> Add Insert</a>" +
                    " </div> </li>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "  <a class='list_toolbr_btn lnkaddhelp' data-id=" + data[i].TestItemID + " data-itemname=" + itemname + " href='javascript:void();'> Add Help</a>" +
                    " </div> </li>" +
                    "</ul></div></td>" +
                    "<td ><input type='text'   style='width:40px'  class='form-control lnkitemorder' autocomplete='off' value='" + orderno + "' /></td>" +
                    "<td><input type='text'   style='width:200px'  class='form-control lnkmethod'  autocomplete='off' value='" + method + "' /></td>" +
                    "<td ><input type='text'   style='width:100px'  class='form-control lnkisn' autocomplete='off' value='" + isn + "' /></td>" +
                    "<td ><input type='text'  style='width:200px'  autocomplete='off' class='form-control lnkitemname' value='" + itemname + "' /></td>" +
                    "<td><input type='text'  style='width:100px'  autocomplete='off' class='form-control lnkresult' value='" + result + "'  /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkunit' value='" + unit + "'  /></td>" +
               //                  "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalrange' value='" + normalrange + "'  /></td>" +
               //"<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormal1' value='" + normal1 + "'  /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormal6' value='" + normal6 + "'  /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormal12' value='" + normal12 + "'  /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalmale' value='" + normalmale + "'  /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalfemale' value='" + normalfemale + "'  /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalquarter' value='" + normalquater + "'  /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnknormalday' value='" + normalday + "' /></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra1'  value='" + extra1 + "'/></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra2'  value='" + extra2 + "'/></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra3'  value='" + extra3 + "'/></td>" +
               //     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkextra4'  value='" + extra4 + "'/></td>" +
                     "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkalarmrange' value='" + alarmrange + "' /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkintcode'  value='" + intcode + "'/></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkformula' value='" + formula + "' /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkformatresult' value='" + formatresult + "' /></td>" +

                    "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisbold' " + bold + "/></td>" +
                    "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisitalic' " + italic + " /></td>" +
                    "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisheading' " + heading + " /></td>" +
                 "<td ><input type='checkbox' autocomplete='off' class='form-control lnkisline' " + underline + " /></td>" +
                    "<td ><input type='text' style='width:100px' autocomplete='off' class='form-control lnkhelpcode'  value='" + helpcode + "'/></td>" +

            "</tr>");
            //BindCombo($(".ddlmethod"), "ddlmethod", '');
            //$(".ddlmethod :selected").val(method);
            //alert(method)
        }
    }
}
function getworksheetDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetWorksheetDetail",
        data: JSON.stringify({ ID: $('#hdftestid').val() }),
        dataType: "json",
        async: false,
        success: function (response) {
            var worksheet = response.d.split('~');
            CKEDITOR.instances['txtworksheethtml'].setData(worksheet[1]);
            $('#txtworksheet').val(worksheet[0]);

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
function SaveworksheetDetail(worksheet, worksheethtml) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/SaveworksheetDetail",
        data: JSON.stringify({ ID: $('#hdftestid').val(), worksheet: worksheet, worksheethtml: worksheethtml }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d == "1")
                LMSMessage('', 'WorkSheet Save Successfully', 'success');
            else
                LMSMessage('', '', 'info');
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
        url: "InvestigationDetail.aspx/GetInsertDetail",
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
function SaveInsertDetail(Inserthtml) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/SaveInsertDetail",
        data: JSON.stringify({ ID: itemid, Inserthtml: Inserthtml }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d == "1")
                LMSMessage('', 'Insert Save Successfully', 'success');
            else
                LMSMessage('', '', 'info');
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
function getCommentDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetCommentDetail",
        data: JSON.stringify({ ID: $('#hdftestid').val() }),
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
function SaveResultDetail(CommentHtml) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/SaveResultDetail",
        data: JSON.stringify({ ID: $('#hdftestid').val(), Commenthtml: CommentHtml }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d == "1")
                LMSMessage('', 'Comment Save Successfully', 'success');
            else
                LMSMessage('', '', 'info');
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
function GetHelpDetailList(itemid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetItemHelpDetail",
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
                     "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkhelpdelete' data-id='" + data.d[i].HelpID + "' href='javascript:void();'> Delete</a>" +
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
function SaveHelpDetail(help, helphtml) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/SaveHelpDetail",
        data: JSON.stringify({ HelpID: helpid, TestID: $('#hdftestid').val(), ItemID: itemid, Help: help, Helphtml: helphtml }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageName != "")
            {
                LMSMessage('', 'Help Save Successfully', 'success');
                helpid = 0;
            } else
                LMSMessage('', '', 'info');
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
function DeleteHelpDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/DeleteHelpDetail",
        data: JSON.stringify({ HelpID: helpid }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageName != "")
                LMSMessage('', 'Help Delete Successfully', 'success');
            else
                LMSMessage('', '', 'info');
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



function SaveRangeDetail(obj) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/SaveRangeDetail",
        data: JSON.stringify({ Objrange:obj }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d.MessageName != "")
                LMSMessage('', 'Range Save Successfully', 'success');
            else
                LMSMessage('', '', 'info');
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


function GetRangeDetailList(itemid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/GetItemRangeDetail",
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
        $("#gvnormalrange").empty();
        if (data.d.length > 0) {
            $("#gvnormalrange").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>FromAge</th><th>ToAge</th><th>Gender</th><th>NormalRange</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gvnormalrange").append("<tr><td>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkrangeedit' data-id='" + data.d[i].RangeID + "' data-fromage='" + data.d[i].FromAge + "' data-fromagetype='" + data.d[i].FromAgeType + "' data-toage='" + data.d[i].ToAge + "' data-toagetype='" + data.d[i].FromAgeType + "' data-gender='" + data.d[i].Gender + "' data-normalrange='" + data.d[i].NormalRange + "'  href='javascript:void();'> Edit</a>" +
                    " </div></li>" +
                     "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkrangedelete' data-id='" + data.d[i].RangeID + "' href='javascript:void();'> Delete</a>" +
                    " </div></li>" +
                    "</ul></div></td>" +
                    "<td class='center'>" + data.d[i].FromAge + ' ' + data.d[i].FromAgeType + "</td><td class='center'>" + data.d[i].ToAge + ' ' + data.d[i].ToAgeType + "</td>" +
                    "<td>" + data.d[i].Gender + "</td><td>" + data.d[i].NormalRange + "</td></tr>");
            }
            $('#gvnormalrange').append("</tbody>");

        }
        else {
            $("#gvnormalrange").append("<thead><tr><th>Range List</th></tr></thead>");
            $("#gvnormalrange").append("<tr><td>There is No List</td></tr>");
        }
    }
}


function DeleteRangeDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationDetail.aspx/DeleteRangeDetail",
        data: JSON.stringify({ RangeID: rangeid }),
        dataType: "json",
        async: false,
        success: function (response) {
            rangeid = 0;
            if (response.d.MessageName != "")
                LMSMessage('', 'Help Delete Successfully', 'success');
            else
                LMSMessage('', '', 'info');
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
