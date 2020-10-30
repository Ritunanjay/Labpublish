var successcolor = 'lightgreen';
var failcolor = 'antiquewhite';
var usermachine = navigator.userAgent.toLowerCase();
function getfocus(ele) {
    $(ele).removeClass('GridHeader');
    $(ele).addClass('GridHeaderFocus');
}
function getblur(ele) {
    $(ele).removeClass('GridHeaderFocus');
    $(ele).addClass('GridHeader');
}
function SetCurrentDate(ele) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yy = today.getFullYear();
    if (dd < 10)
        dd = "0" + dd;
    if (mm < 10)
        mm = "0" + mm;
    var today = dd + "/" + mm + "/" + yy;
    $(ele).val(today);
}

function allownumeric(ele) {

    $(ele).keydown(function (e) {
        //        if (e.shiftKey == true) {
        //            e.preventDefault();
        //        }
        if ((e.keyCode >= 48 && e.keyCode <= 57) ||
         (e.keyCode >= 96 && e.keyCode <= 105) ||
          e.keyCode == 8 || e.keyCode == 9 ||
          e.keyCode == 37 || e.keyCode == 39 ||
          e.keyCode == 46 || e.keyCode == 190 ||
          e.keyCode == 110) { }
        else { e.preventDefault(); }
        if ($(ele).val().indexOf('.') !== -1 && (e.keyCode == 190 || e.keyCode == 110))
            return false;
    });
    $(ele).keyup(function (e) {
        if (isNaN($(ele).val()))
            $(ele).val('');
    });
}
function allownumericwithoutdecimal(ele) {
    $(ele).keydown(function (e) {
        //        if (e.shiftKey == true) {
        //            e.preventDefault();
        //        }
        if ((e.keyCode >= 48 && e.keyCode <= 57) ||
         (e.keyCode >= 96 && e.keyCode <= 105) ||
          e.keyCode == 8 || e.keyCode == 9 ||
          e.keyCode == 37 || e.keyCode == 39 ||
          e.keyCode == 46) { }
        else { e.preventDefault(); }

    });
    $(ele).keyup(function (e) {
        if (isNaN($(ele).val()))
            $(ele).val('');
    });
}
function AllowOnlyZero(ele) {
    $(ele).keydown(function (e) {
        if (e.keyCode == 48 || e.keyCode == 96 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 46) { }
        else { e.preventDefault(); }
    });
    $(ele).keyup(function (e) {
        if (isNaN($(ele).val()))
            $(ele).val('');
    });
}
function AllowOnlyAlphabet(ele) {
    $(ele).keydown(function (e) {
        if (e.ctrlKey || e.altKey) {
            e.preventDefault();
        }
        else {
            var key = e.keyCode;
            if (!((key == 8) || (key == 9) || (key == 32) || (key == 46) || (key >= 35 && key <= 40) || (key >= 65 && key <= 90))) {
                e.preventDefault();
            }
        }
    });
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    alertify.log("You have entered an invalid email address!")
    return (false)
}
function SetCurrentTime(ele) {
    var dd = new Date();
    var mm = dd.getMinutes().toString();
    var hh = dd.getHours();
    if (hh < 10)
        hh = "0" + hh;
    if (mm < 10)
        mm = "0" + mm;
    var time = hh + ":" + mm;
    $(ele).val(time);
}
function titlecase(ele) {
    $(ele).keyup(function (e) {
        var s = $(ele).val();
        var arrStr = s.split(' ');
        //var k = e.keyCode;
        if (e.keyCode != 32) {
            var txt = "";
            for (s1 in arrStr) {
                var str1 = arrStr[s1].charAt(0).toUpperCase();
                var str2 = arrStr[s1].slice(1);
                txt = txt + str1 + str2;
                if (s1 == arrStr.length - 1)
                    txt = txt;
                else
                    txt = txt + ' ';
            }
            $(ele).val(txt);
        }
    });
}
function uppercase(ele) {
    $(ele).keyup(function (e) {
        var txt = $(ele).val();
        txt = txt.toUpperCase();
        $(ele).val(txt);
    });
}

function lowercase(ele) {
    $(ele).keyup(function (e) {
        var txt = $(ele).val();
        txt = txt.toLowerCase();
        $(ele).val(txt);
    });
}
function getDate() {
    $("#txtDate").val(getserverdate());
}
function serverdate() {
    var xmlHttp;
    try {
        xmlHttp = new XMLHttpRequest();
    }
    catch (err1) {
        try {
            xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
        }
        catch (err2) {
            try {
                xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');

            } catch (err3) {
                alert("AJAX not supported");
            }
        }
    }
    xmlHttp.open('HEAD', window.location.href.toString(), false);
    xmlHttp.setRequestHeader("Content-Type", "text/html");
    xmlHttp.send('');
    return xmlHttp.getResponseHeader("Date");
}
function getserverdate1(ele) {
    var today = '01/01/1900';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../../MainHelper.aspx/GetServerDate',
        data: JSON.stringify({}),
        dataType: "json",
        async: false,
        success: function (response) {
            today = response.d;
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
    //return today;
    $(ele).val(today);
}
function getserverdatecopy(ele) {
    debugger;
    var st = serverdate();
    var dat = new Date(st);
    var dd = dat.getDate();
    var mm = dat.getMonth() + 1;
    var yy = dat.getFullYear();
    if (dd < 10)
        dd = "0" + dd;
    if (mm < 10)
        mm = "0" + mm;
    var today = dd + "/" + mm + "/" + yy;
    //return today;
    $(ele).val(today);
}
//------------
function BindCity(ele, ControlName, stateid) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../MainHelper.aspx/BindCity",
        data: JSON.stringify({ BindFor: ControlName, StateID: stateid }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlcity") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.CityID).html(value.CityName));
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
function BindArea(ele, ControlName, stateid) {
    $(ele).empty();
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../MainHelper.aspx/BindArea",
        data: JSON.stringify({ BindFor: ControlName, CityID: stateid }),
        dataType: "json",
        async: false,
        success: function (data) {
            if (ControlName == "ddlarea") {
                $.each(data.d, function (key, value) {
                    $(ele).append($("<option></option>").val(value.AreaID).html(value.AreaName));
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
function PrintDiv() {
    var contents = document.getElementById("barcodeprint").innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}
function PrintDivRadiology() {
    var contents = document.getElementById("gvreport").innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame1";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<html><head>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(function () {
        window.frames["frame1"].focus();
        window.frames["frame1"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
}
function openFullscreen() {
    var elem = document.getElementById("form1");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
    }
}
function GetNotificationDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../MainHelper.aspx/GetNotificationDetail",
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
        $("#chatnotification").empty();
        if (data.d.length > 0) {
            $('#notificationcount').text(data.d.length);
            for (var i = 0; i < data.d.length; i++) {

                $("#chatnotification").append("<div class='sl-item'> <a href='javascript:void(0)'> <div class='icon bg-green'> <i class='zmdi zmdi-flag'></i> </div> <div class='sl-content'>" +
                       "<span class='inline-block capitalize-font  pull-left truncate head-notifications'>" + data.d[i].NotificationIcon + "</span><span class='inline-block font-11  pull-right notifications-time'>" + data.d[i].NotificationTime + "</span>" +
                "<div class='clearfix'></div><p class='truncate'>" + data.d[i].Notification + "</p></div></a>" +
                                           " </div> <hr class='light-grey-hr ma-0' />");
            }

        }
        else {
            $('#chatnotification').append("<div class='sl-item'><center><span >No Notification Found Yet</span></center></div>");
        }
    }

}
function CodeAvailable(code, path) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: path,
        data: JSON.stringify({ Code: code }),
        dataType: "json",
        async: false,
        success: function (response) {
            if (response.d != "") {
                $('#txtcode').val('');
                $('#txtcode').focus();
                alertify.error('Sorry ! Detail Exists');
            } else
                return "OK";
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
function check(ele) {

    var mobile = $(ele).val();
    mobile = mobile.replace(/[^0-9]/g, '');
    if (mobile.length != 10) {
        alertify.error('Phone number must be 10 digits.');
        $(ele).val('');
        $(ele).focus();
    }
}
function checkEmailID(ele) {
    var email = $(ele).val();
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
        alertify.error('EmailID is Not Valid.');
        $(ele).val('');
        $(ele).focus();
        return false;
    }
}

function countdown(date, ele)
{
    var counterreturn = "";
    var countDownDate = new Date(date).getTime();  // new Date("apr 10, 2020 9:45:25").getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        // Output the result in an element with id="demo"
        counterreturn=(hours + "h "
        + minutes + "m " + seconds + "s ");
        return counterreturn;
        // If the count down is over, write some text 

    }, 1000);
}
function LMSMessage(head,message, status)
{
    head = document.location.pathname.match(/[^\/]+$/)[0].split('.')[0];
    if (message == '')
        message = 'LMSIT Software Technical Error';
    jQuery(function () { $.toast().reset('all'); jQuery.toast({ heading: head, text: message, position: 'top-center', loaderBg: '#e69a2a', icon: status, hideAfter: '1000', allowToastClose: false, showHideTransition: 'fade' }); });
}


function usertracking() {
    var navigation = document.location.pathname.match(/[^\/]+$/)[0].split('.')[0];
    var status = navigator.onLine;
    if (status) {
       // $.getJSON("http://jsonip.com?callback=?", function (data) {

            navigation = "Navigate to " + navigation + "! Using System IP Address is Online";
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: "../../MainHelper.aspx/GetUserTrack",
                data: JSON.stringify({ navigation: navigation }),
                dataType: "json",
                async: false,
                success: function (response) {

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
    //    });
    } else {
     
        navigation = "Navigate to " + navigation + "! Using System is offline]";
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../MainHelper.aspx/GetUserTrack",
            data: JSON.stringify({ navigation: navigation }),
            dataType: "json",
            async: false,
            success: function (response) {

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
}
function IPTrace() {
    var status = navigator.onLine;
    if (status) {
        //$.getJSON("http://jsonip.com?callback=?", function (data) {
        //    $('.lnkipaddress').text(data.ip);
        //});
        $('.lnkipaddress').text("Online");
    } else {
           $('.lnkipaddress').text("Offline");
        
    }
}

// Ajax activity indicator bound to ajax start/stop document events
$(document).ajaxStart(function () {
    $("#btnadd").prop("disabled", true);
});

$(document).ajaxComplete(function () {
    $("#btnadd").prop("disabled", false);
});

function CheckUserlogin() {
  $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: "../../MainHelper.aspx/SingleUserLogin",
            data: JSON.stringify({ usermachine: usermachine }),
            dataType: "json",
            async: false,
            success: function (response) {

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