var liveid = 1;
var livetotal = 0;
var answerinfo = 0;
$(document).ready(function () {
    BindQuestion();
    countdownTimeStart();
    $(document).on('click', '.lnkquestionid', function () {
        var id = $(this).data("id");
        liveid = id;
        BindOneQuestion()
    });
    $('#btnprev').prop('disabled', 'disabled');;
    $(document).on('click', '#btnsavenext', function () {
        //if (liveid == livetotal) {
        //    alertify.log('You Have Reach Last Question');
        //    return false;
        //}
        debugger;
        $("#lnkques" + liveid.toString()).css('background-color', 'green');
        liveid = liveid + 1;
        BindOneQuestion();
        if (liveid == livetotal) {
            $('#btnsavenext').prop('disabled', 'disabled');
        }
        if (liveid != 1) {
            $('#btnprev').prop('disabled', '');
        }
        
    }); $(document).on('click', '#btnprev', function () {
        //if (liveid == 1) {
        //    alertify.log('You Have Reach First Question');
        //    return false;
        //};
        $("#lnkques" + liveid.toString()).css('background-color', 'blue');
        liveid = liveid - 1;
        BindOneQuestion();
        if (liveid == 1) {
            $('#btnprev').prop('disabled', 'disabled');
        }
        if (liveid != livetotal) {
            $('#btnsavenext').prop('disabled', '');
        }
    });


});

function countdownTimeStart() {
    var month = "";
    var year = "";
    var date = "";
    var hour = "";
    var minute = "";
    var second = "";
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LiveExam.aspx/TimerDetail",
        data: JSON.stringify({ }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (data.d == "") {
                alertify.error('Please Check System Date');
            }else{
            month = data.d.split('*')[0];
            year = data.d.split('*')[1];
            date = data.d.split('*')[2];
            hour = data.d.split('*')[3];
            minute = data.d.split('*')[4];
            second = data.d.split('*')[5];
            }
        },
        error: function (jqXHR, status, errorThrown) {
            if (jqXHR.status == "403") {
                window.location.href = jqXHR.responseText.substring(0, jqXHR.responseText.indexOf('{'));
            }
            else {
                var responseText = jQuery.parseJSON(jqXHR.responseText);
                var err = eval("(" + jqXHR.responseText + ")");
                alertify.error(responseText.Message);
            }
        }
    });
    var countDownDate = new Date("" + month + " " + date + ", " + year + " " + hour + ":" + minute + ":" + second + "").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        document.getElementById("demo").innerHTML = hours + "h "
        + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "EXPIRED";
        }
    }, 1000);
}
function BindQuestion() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LiveExam.aspx/GetLiveQuestion",
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
        $(".lnkquestionlist").empty();
        if (data.d.length > 0) {
            livetotal = data.d.length;
            for (var i = 0; i < data.d.length; i++) {
                $('.lnkquestionlist').append(" <a class='btn btn-googleplus btn-circle lnkquestionid' style='padding:10px;font-weight: bold; background-color:blue'   data-id='" + data.d[i].SNo + "'  href='javascript:void();' id='lnkques" + data.d[i].SNo + "'>" + data.d[i].SNo + "</a>")
            }
            BindOneQuestion();
        }
        else {

        }
    }
}

function BindOneQuestion() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "LiveExam.aspx/GetOneQuestion",
        data: JSON.stringify({ Sno: liveid }),
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
        $("#question").empty();
        $("#o1").empty();
        $("#o2").empty();
        $("#o3").empty();
        $("#o4").empty();
        if (data.d.length > 0) {
            $("#question").text("Question " + liveid + " : " + data.d[0].Question + "");
            if (data.d[0].Option1.trim() != "") {
                $("#o1").append(" <div class='sender-info' style='padding: 10px;'><div class='container-fluid'><div class='sender-img-wrap pull-left mr-20'>" +
                                " <input type='radio' name='optionradio' class='panel-heading' style='width: 25px;height: 30px;' data-id='A' /></div> <div class='sender-details   pull-left'>" +
                               " <span class='capitalize-font pr-5 block font-15 weight-500 head-font'>" + data.d[0].Option1 + "</span>" +
                                           " </div><div class='clearfix'></div></div></div>");
            }
            if (data.d[0].Option2.trim() != "") {
                $("#o2").append(" <div class='sender-info' style='padding: 10px;'><div class='container-fluid'><div class='sender-img-wrap pull-left mr-20'>" +
                                          " <input type='radio'  name='optionradio' class='panel-heading' style='width: 25px;height: 30px;' data-id='B' /></div> <div class='sender-details   pull-left'>" +
                                         " <span class='capitalize-font pr-5 block font-15 weight-500 head-font'>" + data.d[0].Option2 + "</span>" +
                                                     " </div><div class='clearfix'></div></div></div>");
            } if (data.d[0].Option3.trim() != "") {
                $("#o3").append(" <div class='sender-info' style='padding: 10px;'><div class='container-fluid'><div class='sender-img-wrap pull-left mr-20'>" +
                                          " <input type='radio' name='optionradio' class='panel-heading' style='width: 25px;height: 30px;'  data-id='C' /></div> <div class='sender-details   pull-left'>" +
                                         " <span class='capitalize-font pr-5 block font-15 weight-500 head-font'>" + data.d[0].Option3 + "</span>" +
                                                     " </div><div class='clearfix'></div></div></div>");
            } if (data.d[0].Option4.trim() != "") {
                $("#o4").append(" <div class='sender-info' style='padding: 10px;'><div class='container-fluid'><div class='sender-img-wrap pull-left mr-20'>" +
                                          " <input type='radio' name='optionradio' class='panel-heading' style='width: 25px;height: 30px;'  data-id='D' /></div> <div class='sender-details   pull-left'>" +
                                         " <span class='capitalize-font pr-5 block font-15 weight-500 head-font'>" + data.d[0].Option4 + "</span>" +
                                                     " </div><div class='clearfix'></div></div></div>");
            } if (data.d[0].Option5.trim() != "") {
                $("#o4").append(" <div class='sender-info' style='padding: 10px;'><div class='container-fluid'><div class='sender-img-wrap pull-left mr-20'>" +
                         " <input type='radio' name='optionradio' class='panel-heading' style='width: 25px;height: 30px;'  data-id='E' /></div> <div class='sender-details   pull-left'>" +
                        " <span class='capitalize-font pr-5 block font-15 weight-500 head-font'>" + data.d[0].Option5 + "</span>" +
                                    " </div><div class='clearfix'></div></div></div>");
            }

        }
        else {

        }
    }
}