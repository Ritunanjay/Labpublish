$(document).ready(function () {
    $(document).on('click', '#chckallinst', function () {
       
    });
    $(document).on('click', '.btnstartexam', function () {
        if ($('#chckallinst').is(':checked')) {
            var id = $('#hdfpapersetid').val();
            StartExamPaper(id);
        }
        else {
            alertify.log('Please Check Terms And Condition');
        }
    });
   
});

function StartExamPaper(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ExamPaperInstruction.aspx/StartExamPaper",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
            window.open(response.d, '_self');
              //  window.open(response.d, 'popUpPage', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',scrollbars=yes,toolbar=no,left=0');
            }
            else {
                alertify.error('Software Error !Please Contact Admin ');
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