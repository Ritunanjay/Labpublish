
$(document).ready(function () {
    PermissionDetail();
    BindAllComboBox();
    RateGrid();
    $(document).on('change', '#ddlremaininvestigation', function () {
        var itemid = $('#ddlremaininvestigation').val();
        if (parseInt(itemid) > 0)
        {
            if (confirm('Do You Want To Add This Investigation To RateList')) {
                AddNewInvestigation(itemid);
                RateGrid();
                BindRemainInvestigation();
                alertify.success('You successfully Add This Investigation');
            }
            else {
                alertify.log('You Refuse to Add This Investigation');
            }
        }
    });
    $(document).on('click', '#btncopyrate', function () {
        if (confirm("Do You Want To Copy Item Rate From One To Another Type")) {
            CopyitemrateDetail();
            alertify.success('Rate List Copy Done !');
        }
    });
    $(document).on('click', '#btntestlist', function () {
        if (confirm("Do You Want To Show Test List")) {
            GetTestlist();
            alertify.success('Test List Loading Done !');
        }
    });
    $(document).on('change', '#normalrate', function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        var value = $(this).val();
        var testid = $(this).data("testid");
        UpdateDetail(rowindex, value, "NormalRate", testid);
    });
    $(document).on('change', '#privaterate', function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        var value = $(this).val();
        var testid = $(this).data("testid");
        UpdateDetail(rowindex, value, "PrivateRate", testid);
    });
    $(document).on('change', '#emergencyrate', function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        var value = $(this).val();
        var testid = $(this).data("testid");
        UpdateDetail(rowindex, value, "EmergencyRate", testid);
    });
    $(document).on('change', '#nightrate', function () {
        var rowindex = $(this).closest('td').parent()[0].sectionRowIndex;
        var value = $(this).val();
        var testid = $(this).data("testid");
        UpdateDetail(rowindex, value, "NightRate", testid);
    });

    $(document).on('change', '#ddlpatienttype', function () {
       // alertify.log('Loading...');
        RateGrid();
        BindRemainInvestigation();
        alertify.success('Load Complete');
    });
    $(document).on('change', '#ddltype', function () {
       // alertify.log('Loading...');
        BindAllComboBoxExtra();
        RateGrid();
        BindRemainInvestigation();
        alertify.success('Load Complete');
    });
    $(document).on('change', '#ddlto', function () {
       // alertify.log('Loading...');
        BindCombo($("#ddlfrom"), "ddlfrom");
        RateGrid();
        BindRemainInvestigation();
        alertify.success('Load Complete');
    });
    $(document).on('click', '#btnadd', function () {
        if (confirm("Do You Want To Save Rate List")) {
            insetitemrateDetail();
            RateGrid();
            alertify.success('Rate List Save Done !');
        }
    });
    BindRemainInvestigation();

});

function GetTestlist() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/GetTestList",
        data: JSON.stringify({}),
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
            $("#gv").append("<thead><tr><th>Department</th><th>GroupName</th><th>Investigation</th><th>PatientRate</th><th>TypeRate</th><th>Percentage</th><th>Amount</th><th>PatientRate</th><th>TypeRate</th><th>Percentage</th><th>Amount</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gv").append("<tr>" +
                "<td class='danger'><input type='hidden' id='rateid' value=" + data.d[i].RateID + " /> <input type='hidden' id='testid' value=" + data.d[i].TestID + " /> " + data.d[i].Department + "</td>" +
                "<td class='info'>" + data.d[i].Group + "</td>" +
                "<td class='success'>" + data.d[i].TestName + "</td>" +
                   "<td class='center'>" + data.d[i].NormalRate + "</td>" +
                "<td class='center'>" + data.d[i].PrivateRate + "</td>" +
                "<td class='center'>" + data.d[i].EmergencyRate + "</td>" +
                "<td class='center'>" + data.d[i].NightRate + " </td>" +
                "<td class='center'><input type='text' id='normalrate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].NormalRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6' /></td>" +
                "<td class='center'><input type='text' id='privaterate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].PrivateRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6'  /></td>" +
                "<td class='center'><input type='text' id='emergencyrate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].EmergencyRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6'  /></td>" +
                "<td class='center'><input type='text' id='nightrate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].NightRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6'  /></td>" +
                "</tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Item List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function UpdateDetail(rowindex, value, Field, testid) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/UpdateDetail",
        data: JSON.stringify({ Field: Field, Value: value, Index: rowindex, TestID: testid }),
        dataType: "json",
        async: false,
        success: function (data) {

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
function AddNewInvestigation(itemid)
{
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/AddNewInvestigation",
        data: JSON.stringify({ ItemID:itemid, Type: $('#ddltype').val(), TypeID: $('#ddlto').val(), PatientTypeID: $('#ddlpatienttype').val() }),
        dataType: "json",
        async: false,
        success: function (data) {

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
function insetitemrateDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/SaveRateList",
        data: JSON.stringify({ Type: $('#ddltype').val(), TypeID: $('#ddlto').val(), PatientTypeID: $('#ddlpatienttype').val() }),
        dataType: "json",
        async: false,
        success: function (data) {

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
function BindRemainInvestigation() {
    BindInvestigation($("#ddlremaininvestigation"), "ddlremaininvestigation");
}

function BindInvestigation(ele, ControlName) {
    var toID = ($('#ddlto').val() == undefined) ? "0" : $('#ddlto').val();
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/BindInvestigation",
        data: JSON.stringify({ BindFor: ControlName, Code: $('#ddltype').val(), ID: toID, PatientTypeID: $('#ddlpatienttype').val() }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlremaininvestigation") {
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

function BindAllComboBoxExtra() {
    BindCombo($("#ddlto"), "ddlto");
    BindCombo($("#ddlfrom"), "ddlfrom");
}
function BindAllComboBox() {
    BindCombo($("#ddlpatienttype"), "ddlpatienttype");
    BindCombo($("#ddlto"), "ddlto");
    BindCombo($("#ddlfrom"), "ddlfrom");
}
function BindCombo(ele, ControlName) {
    debugger;
    var toID = ($('#ddlto').val() == undefined) ? "0" : $('#ddlto').val();
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/BindComboBox",
        data: JSON.stringify({ BindFor: ControlName, Code: $('#ddltype').val(), ID: toID }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlpatienttype") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlto") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.HeadDetailID).html(value.HeadDetailName));
                });
            } if (ControlName == "ddlfrom") {
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
function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}
function RateGrid() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/GetRateListDetail",
        data: JSON.stringify({ PatientTypeID: $('#ddlpatienttype').val(), Type: $('#ddltype').val(), TypeID: $('#ddlto').val() }),
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
            $("#gv").append("<thead><tr><th>Department</th><th>GroupName</th><th>Investigation</th><th>OldPatientRate</th><th>OldTypeRate</th><th>OldPercentage</th><th>OldAmount</th><th>NewPatientRate</th><th>NewTypeRate</th><th>NewPercentage</th><th>NewAmount</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gv").append("<tr>" +
                "<td class='danger'><input type='hidden' id='rateid' value=" + data.d[i].RateID + " /> <input type='hidden' id='testid' value=" + data.d[i].TestID + " /> " + data.d[i].Department + "</td>" +
                "<td class='info'>" + data.d[i].Group + "</td>" +
                "<td class='success'>" + data.d[i].TestName + "</td>" +
                "<td class='center'>" + data.d[i].NormalRate + "</td>" +
                "<td class='center'>" + data.d[i].PrivateRate + "</td>" +
                "<td class='center'>" + data.d[i].EmergencyRate + "</td>" +
                "<td class='center'>" + data.d[i].NightRate + " </td>" +
               "<td class='center'><input type='text' id='normalrate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].NormalRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6' /></td>" +
                "<td class='center'><input type='text' id='privaterate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].PrivateRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6'  /></td>" +
                "<td class='center'><input type='text' id='emergencyrate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].EmergencyRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6'  /></td>" +
                "<td class='center'><input type='text' id='nightrate' data-testid=" + data.d[i].TestID + " value=" + data.d[i].NightRate + " class='form-control' onfocus='allownumeric(this)' maxlength='6'  /></td>" +
                "</tr>");
            }
            $('#gv').append("</tbody>");
            Initialize();
        }
        else {
            $("#gv").append("<thead><tr><th>Item List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gv').dataTable({
        "iDisplayLength": -1,
        "aLengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        "columnDefs": [{ "searchable": true, "targets": [0], "sortable": true, "targets": [2] }],
        "searching": true,
        "paging": false,
        "processing": true,
        "bSort": false,
        "info": false,
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


function CopyitemrateDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ItemRateList.aspx/CopyRateList",
        data: JSON.stringify({ Type: $('#ddltype').val(), TypeID: $('#ddlfrom').val(), PatientTypeID: $('#ddlpatienttype').val() }),
        dataType: "json",
        async: false,
        success: function (data) {

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