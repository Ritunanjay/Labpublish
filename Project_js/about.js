$(document).ready(function () {
    $(document).on("click", "#btnexcelupload", function () {
        SaveFile('sushil');
      
    });

});

function SaveFile(uhid) {
    var fp = $("#excelfile").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', 'UploadDataFromExcel');
    formData.append('ID', $('#Datauploadtable').val());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            SaveData(status);
            alertify.success(status + ' Upload Profile Success');
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}

function SaveData(filename) {
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: 'DataUpload.aspx/SaveData',
        data: JSON.stringify({ FileName: filename }),
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0") {
               LMSMessage('',response.d.MessageName,"success");
             
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