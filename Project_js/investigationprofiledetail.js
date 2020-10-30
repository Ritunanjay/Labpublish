var itemid = 0;
var helpid = 0;
var searchid = 0;
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    ClearRecord();
    $(document).on('click', '#btnsaveitem', function () {
        if ($('#txtinvestigationcode').val() == "") {
            alertify.log('Please Fill Profile Detail First !');
            $("#txtautoinvestigation").val('');
            searchid = 0;
        }
        else {
            GetProfileInvestigation(searchid);
            searchid = 0;
        }
    });
    $("#txtautoinvestigation").autocomplete({
        source: function (request, response) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "InvestigationProfile.aspx/SearchInvestigation",
                data: "{ 'InvestigationDetail': '" + request.term + "'}",
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
                $("#txtautoinvestigation").val('');
                searchid = i.item.val;
                $("#txtautoinvestigation").val('');
                $("#txtautoinvestigation").focus();
            }
        },
        minLength: 1
    });
    $(document).on('click', '#btnclear', function () {
        ClearRecord();
    });
    $(document).on('click', '.lnkdelete', function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        DeleteRow(rowindex);
    });
    $(document).on('click', '#btnadd', function () {
        Save();
        BindGrid("");
    });
    $(document).on("click", "#btninvestigationsearch", function () {
        BindGrid("");
        $('#ModalInvestigation').modal('show');
    });
    $(document).on("keydown", "#txttestname", function () {
        BindGrid($(this).val());
    });
    $(document).on("click", ".lnkedit", function () {
        ClearRecord();
        var navid = $(this).data("id");
        GetInvestigationByID(navid);
        $('#ModalInvestigation').modal('hide');
    });
    $(document).on("click", ".lnkprofiledelete", function () {
        if ($('#hdfdelete').val() == "False") {
            LMSMessage('', "You Don't Have Permission To Delete Item", 'info');
        }
        else {
            var navid = $(this).data("id");
            if (confirm('Do You Want To Delete ?')) {

                var id = $(this).data("id");
                DeleteProfileByID(id);
                BindGrid("");
            }
        }
    });
    BindGrid("");
    $('#txtinvestigationcode').focus();
});

function DeleteProfileByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/DeleteProfileByID",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            debugger;
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
function DeleteRow(RowIndex) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/DeleteRow",
        data: JSON.stringify({ RowIndex: RowIndex }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            if (response.d == "1") {
                $("#investigationlist tr:eq(" + (RowIndex) + ")").remove();
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
function GetProfileInvestigation(TestID) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/GetProfileInvestigation",
        data: JSON.stringify({ TestID: TestID }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            if (response.d == null) {
                alertify.error('Test Already Exist');
                return;
            }
            if (response.d.length > 0) {
                $("#investigationlist").empty();
                for (var i = 0; i < response.d.length; i++) {
                    $("#investigationlist").append("<tr><td> <a class='fa fa-times lnkdelete' style='font-size:large'  data-id=" + response.d[i].TestID + " href='javascript:void();'></a>" +
                    //"<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    //" <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    //" <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    //"<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    //"  <a class=' fa fa-times lnkdelete' style='font-size:large'  data-id=" + response.d[i].TestID + " href='javascript:void();'>Delete</a>" +
                    //" </div> </li></ul></div>"+
                    "</td>" +
                    "<td >" + response.d[i].TestCode + "</td>" +
                    "<td >" + response.d[i].TestName + "</td>" +
                    "</tr>");
                }
            }
            $("#txtautoinvestigation").val('');
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function BindAllComboBox() {
    BindCombo($("#ddlgroup"), "ddlgroup", '');
    BindCombo($("#ddlmachine"), "ddlmachine", '');
    BindCombo($("#ddlsample"), "ddlsample", '');
    BindCombo($("#ddlreporttype"), "ddlreporttype", 'RT');
}
function BindCombo(ele, ControlName, status) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, status: status }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlgroup") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.GroupID).html(value.Groupname));
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
function ClearRecord() {
    $('#hdftestid').val('0');
    $('#txtinvestigationcode').val('');
    $('#txtinvestigationname').val('');
    $('#txtinvestigationname').val('');
    $('#txtreportdays').val('0');
    $('#ddlprintcomment').val('false');
    $('#txttattime').val('00:00');
    $('#txttatalarm').val('00:00');
    BindAllComboBox();
    $('#txtorder').val('0');
    ItemClear();
    $('#ddlstatus').val('true');
    $("#btnadd").attr("value", "Add New Profile");
    $("#txtautoinvestigation").val('');

}
function ItemClear() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/ItemClear",
        data: JSON.stringify({}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        async: false,
        success: function (response) {
            $("#investigationlist").empty();

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
function Save() {
    if ($("#txtinvestigationcode").val() == "") {
        alertify.log("Profile Code is required.");
        $("#txtinvestigationcode").focus();
        return false;
    } if ($("#txtinvestigationname").val() == "") {
        alertify.log("Profile Name is required.");
        $("#txtinvestigationname").focus();
        return false;
    } if ($("#investigationlist tr").length < 2) {
        alertify.log("Please Select More than One Investigation.");
        $("#txtautoinvestigation").focus();
        return false;
    }
    //if ($('#ddlgroup').val() == null || $('#ddlgroup').val() == "0") {
    //    alertify.log("Please Select Department Group.");
    //    $("#ddlgroup").focus();
    //    return false;
    //}
    var obj = {};
    obj.TestID = $('#hdftestid').val();
    obj.TestCode = $('#txtinvestigationcode').val();
    obj.TestInitial = $('#txtinvestigationcode').val();
    obj.TestName = $('#txtinvestigationname').val();
    obj.GroupID = $('#ddlgroup').val();
    obj.MachineID = ($('#ddlmachine').val() == null) ? "0" : $('#ddlmachine').val();
    obj.ReportDays = ($('#txtreportdays').val() == "") ? "0" : $('#txtreportdays').val();
    obj.OrderNo = ($('#txtorder').val() == "") ? "0" : $('#txtorder').val();
    obj.Comment = '';
    obj.Commenthtml = '';
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
    obj.IsProfile = 'true';
    obj.IsHideLable = 'false';
    obj.IsOutsource = $('#ddloutsource').val();
    obj.IsProcedure = 'false';
    obj.TATTime = $('#txttattime').val();
    obj.TATAlarm = $('#txttatalarm').val();
    obj.Active = $('#ddlstatus').val();
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'InvestigationProfile.aspx/Save',
        data: JSON.stringify({ obj: obj }),
        async: false,
        success: function (response) {
            if (response.d.MessageName != "") {
                alertify.success(response.d.MessageName);
                ClearRecord();
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
function BindGrid(investigation) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/GetInvestigationInfoDetail",
        data: JSON.stringify({ InvestigationDetail: investigation }),
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
            $("#gvinvestigation").append("<thead><tr><th style='width:15px' class='center'>Action</th><th>Code</th><th>Investigation</th><th>Order</th><th>Show</th><th>For</th><th>Status</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var active = (data.d[i].Active == true) ? 'Use' : 'Not Use';
                var activecolor = (data.d[i].Active == true) ? 'success' : 'danger';
                var showlist = (data.d[i].ShowInList == true) ? 'Yes' : 'No';
                var gender = "B";
                if (data.d[i].TestFor == 'M')
                    gender = "Male";
                else if (data.d[i].TestFor == 'F')
                    gender = "Female";
                else if (data.d[i].TestFor == 'B')
                    gender = "Both";
                $("#gvinvestigation").append("<tr><td class='" + activecolor + "'>" +
                   // "<a class='fa fa-check-square lnkedit' data-id='" + data.d[i].TestID + "' href='javascript:void();' style='font-size:large'> </a>" +
                    "<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
                    " <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
                    " <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
                    "<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkedit' data-id='" + data.d[i].TestID + "' href='javascript:void();'> Edit</a>" +
                    " </div></li><li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
                    "<a class='list_toolbr_btn lnkprofiledelete' data-id='" + data.d[i].TestID + "' href='javascript:void();'> Delete</a>" +
                    " </div></li></ul></div>" +
                    "</td>" +
                    "<td class='" + activecolor + "'>" + data.d[i].TestCode + "</td><td class='" + activecolor + "'>" + data.d[i].TestName + "</td><td class='" + activecolor + "'>" + data.d[i].OrderNo + "</td>" +
                    "<td class='" + activecolor + "'>" + showlist + "</td><td class='" + activecolor + "'>" + gender + "</td><td class='" + activecolor + "'>" + active + "</td></tr>");
            }
            $('#gvinvestigation').append("</tbody>");
            Initialize();
        }
        else {
            $("#gvinvestigation").append("<thead><tr><th>Profile List</th></tr></thead>");
            $("#gvinvestigation").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gvinvestigation').dataTable({
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
function GetInvestigationByID(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "InvestigationProfile.aspx/GetInvestigationByID",
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
    $('#txtinvestigationcode').val(response.d.TestInitial);
    $('#txtinvestigationname').val(response.d.TestName);
    $('#ddlgroup').val(response.d.GroupID);
    $('#ddlmachine').val(response.d.MachineID);
    $('#txtreportdays').val(response.d.ReportDays);
    $('#txtorder').val(response.d.OrderNo);
    $('#ddlprintcomment').val(response.d.IsPrintComment.toString());
    $('#ddlsample').val(response.d.SampleID);
    $('#ddlspecialreport').val(response.d.SpecialRpt);
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
    $("#btnadd").attr("value", "Modify Profile");
}
function BindGridItem(data) {

    if (data.length > 0) {
        $("#investigationlist").empty();
        for (var i = 0; i < data.length; i++) {
            $("#investigationlist").append("<tr><td> <a class=' fa fa-times lnkdelete' style='font-size:large'  data-id=" + data[i].TestID + " href='javascript:void();'></a>" +
            //"<div class='input-group-btn'><button type='button' class='btn-default btn-rounded btn-xs' data-toggle='dropdown' aria-expanded='true'>" +
            //" <i class='fa fa-info-circle 2x' aria-hidden='true' title='Vitals, Lab tests and Prescription'></i>" +
            //" <span class='caret'></span> </button><ul class='dropdown-menu pull-left' role='menu'>" +
            //"<li> <div class='list_toolbr'> <i class='fa fa-info-circle 2x' aria-hidden='true'></i>" +
            //"  <a class='list_toolbr_btn lnkdelete'  data-id=" + data[i].TestID + " href='javascript:void();'>Delete</a>" +
            //" </div> </li>" +
            //"</ul></div>"+
            "</td>" +
            "<td >" + data[i].TestCode + "</td>" +
            "<td >" + data[i].TestName + "</td>" +
            "</tr>");
        }
    }
}