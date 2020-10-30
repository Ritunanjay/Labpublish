$(document).ready(function () {
    BindQuestionAnswerDetail();
});

function BindQuestionAnswerDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ExamPaperSubmit.aspx/GetQuestionAnsweDetail",
        data: "",
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
            $("#gv").append("<thead><tr><th>Question Detail</th><th>No of Question</th>" +
                "</tr></thead><tbody>");
            for (var i = 0; i < data.d.length; i++) {
                var status = "";
                if (data.d[i].Status == 'red')
                    status = "Not Attempted";
                else if (data.d[i].Status == 'blue')
                    status = "Not Viewed";
                else if (data.d[i].Status == 'lightblue')
                    status = "Attempted & Review";
                else if (data.d[i].Status == 'violet')
                    status = "Not Attempted & Review";
                else
                    status = "Attempted & Save";
                $("#gv").append("<tr><td>" + status + "</td><td>" + data.d[i].NoQuestion + "</td></tr>");
            }
            $('#gv').append("</tbody>");
           
        }
        else {
            $("#gv").append("<thead><tr><th>Exam List</th></tr></thead>");
            $("#gv").append("<tr><td>There is No List</td></tr>");
        }
    }
}
