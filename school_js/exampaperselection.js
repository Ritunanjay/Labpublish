$(document).ready(function () {
    ExamPaperSelection();
    window.setInterval(function () {
        SetExamPaperSelection();
    }, 2000);

    $(document).on('click', '.lnkassignid', function () {
        var id = $(this).data("id");
        StartExamPaper(id);
    });
    GetStudentInformation();
});

function GetStudentInformation() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "StudentLiveExam.aspx/GetStudentInformation",
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            $('#lnkname').text(response.d.StudentFName + ' ' + response.d.StudentLName);
            $('#lblclass').text(response.d.UHID);
            $('#lblpapercode').text(response.d.StudentCode);
            $('.lnkstudentimage').attr('src', "..\\..\\" + response.d.StudentPhoto);
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
function StartExamPaper(id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ExamPaperSelection.aspx/StartExamPaper",
        data: JSON.stringify({ ID: id }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {

                //    window.open(response.d,"_self");
                window.open(response.d, 'popUpPage', 'width=' + screen.availWidth + ',height=' + screen.availHeight + ',scrollbars=yes,toolbar=no,left=0');
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

function ExamPaperSelection() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ExamPaperSelection.aspx/GetAllSujectDetail",
        data: JSON.stringify({}),
        dataType: "json",
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
        $(".allsubject").empty();
        if (data.d.length > 0) {
            for (var i = 0; i < data.d.length; i++) {
                $(".allsubject").append("<div class='col-md-3 col-sm-3 col-xs-12'>" +
                        "    <div class='panel panel-default card-view pa-0 weather-info'>" +
                        "        <div class='panel-wrapper collapse in'>" +
                        "            <div class='panel-body pa-0'>" +
                        "                <div class='row ma-0'>" +
                        "                    <div class='col-xs-6 pa-0'>" +
                        "                        <div class='left-block-wrap pa-30'>" +
                        "                            <p class='block nowday'>Subject Detail</p>" +
                        "                            <span class='block nowdate'> " + data.d[i].SubjectName + "</span>" +
                        "                            <div class='left-block  mt-15'><span class='block temprature '><span class='unit'></span></span></div>" +
                        "                        </div>" +
                        "                    </div>" +
                        "                    <div class='col-xs-6 pa-0'>" +
                        "                        <div class='right-block-wrap pa-30'>" +
                        "                            <div class='right-block'><span class='block temprature-icon '>" +
                        "                                <img src='../../Admin/img/computersubject.gif'></span><h6>Subject </h6> <p style='font-weight:bold'>" + data.d[i].SubjectCode + "</p>" +
                        "                            </div>" +
                        "                        </div>" +
                        "                    </div>" +
                        "                </div>" +
                        "            </div>" +
                        "        </div>" +
                        "    </div>" +
                        "</div>");
            }

        }
        else {

        }
    }
}

function SetExamPaperSelection() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ExamPaperSelection.aspx/SetExamPaperSelection",
        data: JSON.stringify({}),
        dataType: "json",
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
        $(".assignsubject").empty();
        if (data.d.length > 0) {
            for (var i = 0; i < data.d.length; i++) {
                $(".assignsubject").append("<div class='col-md-3 col-sm-3 col-xs-12'>                                                                                " +
                        "    <div class='panel panel-success card-view pa-0 weather-info'>                                                                        " +
                        "        <div class='panel-wrapper collapse in'>                                                                                          " +
                        "            <div class='panel-body pa-0'>                                                                                                " +
                        "                <div class='row ma-0'>                                                                                                   " +
                        "                    <div class='col-xs-6 pa-0'>                                                                                          " +
                        "                        <div class='left-block-wrap pa-30'>                                                                              " +
                        "                            <p class='block nowday'>Subject|PaperSet</p>                                                                          " +
                        "                            <span class='block nowdate'> " + data.d[i].SubjectName + " | " + data.d[i].PaperSetName + "</span>                                                                " +
                        //"                             <span class='block nowdate'> " + data.d[i].SubjectCode + " | " + data.d[i].PaperSetCode + "</span>                                                                " +
                        "                             <span class='block nowdate'>Exam Timing : " + data.d[i].ExamHour + "H:" + data.d[i].ExamMinutes + "M:" + data.d[i].ExamSecond + "S</span>                                                                " +
                        //"                            <div class='left-block  mt-15'><span class='block temprature '>" + data.d[i].PaperSetCode + "<span class='unit'></span></span></div>   " +
                        "                          </div>                                                                                                           " +
                        "                    </div>                                                                                                               " +
                        "                    <div class='col-xs-6 pa-0'>                                                                                          " +
                        "                        <div class='right-block-wrap pa-30'>                                                                             " +
                        "                            <div class='right-block'><span class='block temprature-icon '>                                               " +
                        "                                <img src='../../Admin/img/onlineexam.gif'></span>" +
                       "<a class='btn btn-success list_toolbr_btn lnkassignid' data-id='" + data.d[i].PaperSetID + "' href='javascript:void();'> Start Exam </a>         " +
                        "                            </div>                                                                                                       " +
                        "                        </div>                                                                                                           " +
                        "                    </div>                                                                                                               " +
                        "                </div>                                                                                                                   " +
                        "            </div>                                                                                                                       " +
                        "        </div>                                                                                                                           " +
                        "    </div>                                                                                                                               " +
                        "</div>");
            }

        }
        else {

        }
    }
}