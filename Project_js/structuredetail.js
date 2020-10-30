
$(document).ready(function () {
    PermissionDetail();
    BindGrid();
});

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
        url: "StructureDetail.aspx/GetBodyStructureDetail",
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
        debugger; $("#bodystructure").empty();
        if (data.d.length > 0) {
               $("#bodystructure").append(data.d[0].BodyStructurehtml);
               $('#bodystructuredetail').append('<h1 class="alert alert-success">' + data.d[0].Heading + '</h1>');
               $('#bodystructuredetail').append('<p class="alert alert-warning" style="text-align: justify;">' + data.d[0].Detail + '</p>');
               $('#lnkdetail').src(data.d[0].LinkDetail);
        }
        else {
            $("#bodystructure").append("");
            $("#bodystructuredetail").append("");
        }
    }
}