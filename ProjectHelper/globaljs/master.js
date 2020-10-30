$(document).ready(function () {
    LoadNavigation();
   UserLoginNameWelcome();
   $('.lnklogo').text($('#hdfsoftware').val());
   $('#lnktitle').text($('#hdfsoftware').val());
   
    $(".MM").empty();
    $(".MM").append($('#hdfMenuBar').val());
    $('.lnkusername').text($('#hdfusername').val());
    $('.lnksoftwarename').text($('#hdfsoftware').val());
    $('.lnknotificationcount').text('0');
    $('.lnkmessagecount').text('0');
    $("#MN").empty();
    $("#MN").append($('#hdfMessage').val());
    $("#NN").empty();
    $("#NN").append($('#hdfNotification').val());
    $(".lnkmessage").empty();
    $(".lnkmessage").append($('#hdfmessage').val());
    $(".lnknotification").empty();
    $(".lnknotification").append($('#hdfnotification').val());

    $('.lnkmcount').text($('#hdfmessagecount').val());
    $('.lnkmsgcount').text($('#hdfmessagecount').val());
    $('.lnkncount').text($('#hdfnotificationcount').val());
    $('.lnknoticount').text($('#hdfnotificationcount').val());
    $('#Name').text($('#hdfname').val());
    //  $('#Name').text($('#hdfname').val());
     $('#short').text($('#hdfsoftware').val());
    $('#UserNamerole').text($('#hdfrole').val());
    var today = new Date();
    $('#datetoday').text(today.toDateString());
   
});
function LoadNavigation()
{
    var res = '';
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../Helper.aspx/NavigationList",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (response) {
             res = response.d;
            $('#txtnavigationsearch').autoComplete({
                minChars: 1,
                delay: 0,
                source: function (term, suggest) {
                    term = term.toLowerCase();
                    var suggestions = [];
                    for (i = 0; i < res.length; i++) {
                        if (~res[i].toLowerCase().indexOf(term))
                            suggestions.push(res[i]);
                    }
                    suggest(suggestions);
                }
            });
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

function UserLoginNameWelcome() {
    var res = '';

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "../../Helper.aspx/UserLoginNameWelcome",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (response) {
           
            if (response.d != "") {
                var name = "";
                $.getJSON("http://jsonip.com/?callback=?", function (data) {
                    name = " Your IP Address is :" + data.ip
                    alertify.success(name);
                });
                $.toast({
                    heading: 'Welcome to ' + response.d + '',
                    text: 'We Are Happy To See You Again.'+name,
                    position: 'top-left',
                    loaderBg: '#ff6849',
                    icon: 'info',
                    hideAfter: 3000,
                    stack: 6
                });
             }},
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


