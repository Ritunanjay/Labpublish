var userid = 0;
var username = '';
$(document).ready(function () {
    FillUserDetail();
    $(document).on('click', '.lnkcentreselect', function () {
     // var index = $(this).closest('td').parent()[0].sectionRowIndex;
        var id = $(this).data('id');
        var status = $(this).is(':checked');
        UpdateDetail(id, status);
    });
    $(document).on("click", ".lnkselect", function () {
     
        var id = $(this).data('id');
        var name = $(this).data('name');
        var grid = $(this).closest("table");
        $("td", grid).each(function () {
            $("td").css('background', '#fff');
            $("td").css('color', '#000');
        });
        $(this).css('background', 'linear-gradient(45deg, black, transparent)');
        $(this).css('color', '#fff');
        userid = id;
        username = name;
        FillCentreDetail(id);
      //  FillFormGrid(id, $("#ddlRole").val());
    });
    $(document).on('click', '#btnadd', function () {
        SaveCentrePermissionDetail(userid);
        alertify.success('Permission Change Successfully');
        FillCentreDetail(userid);

    });
    $('#btnclear').click(function () {
        FillUserDetail();
        FillCentreDetail(userid);
    });

});
function SaveCentrePermissionDetail(id)
{
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AssignCentrePermission.aspx/SaveCentrePermissionList",
        data: JSON.stringify({ ID:id}),
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
function UpdateDetail(id, status)
{
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AssignCentrePermission.aspx/UpdateDetail",
        data: JSON.stringify({ ID:id,Status:status }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            $("#btnSave").attr("value", response.d);
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
function FillUserDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AssignCentrePermission.aspx/FillUserDetail",
        data: JSON.stringify({ }),
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
        // console.log(data);
        $("#gv").empty();
        if (data.d.length > 0) {
            $("#gv").append("<thead><tr><th style='background:linear-gradient(45deg, black, transparent);color:white;'>User/Employee Name</th></tr></thead>");
            for (var i = 0; i < data.d.length; i++) {
                $("#gv").append("<tr><td class='lnkselect' style='cursor:pointer;'  data-id='" + data.d[i].UserID + "'  data-name='" + data.d[i].UserName + "'>" + data.d[i].UserName + "</td></tr>");
            }
        }
        else {
            $("#gv").append("<thead><tr><th>User/Employee Detail List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
       // Initializeuser();

    }
}


function FillCentreDetail(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AssignCentrePermission.aspx/FillCentreDetail",
        data: JSON.stringify({ID:id}),
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
        // console.log(data);
        $("#gvcentre").empty();
        if (data.d.length > 0) {
            $("#gvcentre").append("<thead><tr><th style='background:linear-gradient(45deg, black, transparent);color:white;'>Action</th><th>User/Employee Name</th><th>Permission</th><th>Centre/Franchise</th><th>Mobile</th><th>EmailID</th></tr></thead>");
            for (var i = 0; i < data.d.length; i++) {
                var status = (data.d[i].Active == true) ? 'checked' : '';
                var cssstatus = (data.d[i].Active == true) ? 'success' : 'danger';
                var permission = (data.d[i].Active == true) ? 'Grant' : 'Denied';
                
                $("#gvcentre").append("<tr class='" + cssstatus + "' ><td><input  class='form-control lnkcentreselect' style='cursor:pointer;'  data-id='" + data.d[i].CentreID + "' type='checkbox' " + status + " /></td><td> " + username + "</td><td> " + permission + "</td><td>" + data.d[i].Code + " | " + data.d[i].CentreName + "</td><td> " + data.d[i].Mobile + "</td><td> " + data.d[i].EmailID + "</td></tr>");
            }
            Initialize();
        }
        else {
            $("#gvcentre").append("<thead><tr><th>Centre/Franchise Detail List</th></tr></thead>");
            $("#gvcentre").append("<tr><td>There is No List</td></tr>");
        }
    }
}
function Initialize() {
    $('#gvcentre').dataTable({
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

function Initializeuser() {
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
