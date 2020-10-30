var userid = 0;
var user = "";
$(document).ready(function () {
    $('#onlineusername').text(' Select User');
    PermissionDetail();
     $(document).keyup(function (e) {
        if (e.keyCode == 13)
        {
            if (userid != 0) {
                if ($('#input_msg_send_chatapp').val() == "")
                    alertify.error('Please Write Some Message');
                else {
                    savemessage($('#input_msg_send_chatapp').val());
                    $('#input_msg_send_chatapp').val('');
                }
            }
            else {
                alertify.error('Please Select user to Chat');
            }
        }
       // alertify.log(e.keyCode);
    });
     setInterval(function () {
         BindOnlineUser();
         BindOnlineMessage()
     }, 4000);
    $(document).on('click', '#btnsendmessage', function () {
        if (userid != 0) {
            if ($('#input_msg_send_chatapp').val() == "")
                alertify.error('Please Write Some Message');
            else {
                savemessage($('#input_msg_send_chatapp').val());
                $('#input_msg_send_chatapp').val('');
            }
        }
        else {
            alertify.error('Please Select user to Chat');
        }
    });
    $(document).on('click', '#lnkreceiver', function () {
        var uid = $(this).data('id');
        var username = $(this).data('user');
        $('#onlineusername').text(' ' + username);
        userid = uid;
        BindOnlineMessage();

    });
});

function BindOnlineUser() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ChatDetail.aspx/BindOnlineUser",
        data: JSON.stringify({ Username: user}),
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
        $("#onlinechatuser").empty();
        if (data.d.length > 0) {

            for (var i = 0; i < data.d.length; i++) {
                var status = (data.d[i].Active == true) ? "online" : "offline";
                var Activestatus = (data.d[i].Active == true) ? "active-user" : "";
                $("#onlinechatuser").append("<a href='javascript:void(0)' data-id=" + data.d[i].UserID + " data-user=" + data.d[i].UserName + " id='lnkreceiver'><div class='chat-data " + Activestatus + "'>" +
                        "  <img class='user-img img-circle' src='../../userimage/" + data.d[i].Photo + "' alt='" + data.d[i].UserName + "'>" +
                        "   <div class='user-data'>" +
                        "       <span class='name block capitalize-font'>" + data.d[i].UserName + " [" + data.d[i].RoleName + "]</span>" +
                    //    "       <span class='time block truncate txt-grey'>No one saves us but ourselves.</span>" +
                        "   </div>" +
                        "   <div class='status " + status + "'></div>" +
                        "   <div class='clearfix'></div>" +
                        "  </div>" +
                        " </a>");
            }
        }
        else {
            $("#onlinechatuser").append("");
        }
    }
}



function savemessage(Message) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'ChatDetail.aspx/savemessage',
        data: JSON.stringify({ Message: Message, UserID: userid }),
        dataType: "json",
        async: false,
        success: function (response) {
            BindOnlineMessage();

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
function BindOnlineMessage() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "ChatDetail.aspx/BindOnlineMessage",
        data: JSON.stringify({ UserID: userid }),
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
        $("#chatpanel").empty();
        if (data.d.length > 0) {

            for (var i = 0; i < data.d.length; i++) {
                var messagefrom = (data.d[i].MessageStatus == 'S') ? "self" : "friend";
                var side = (data.d[i].MessageStatus == 'S') ? "right" : "left";
                var image = (data.d[i].MessageStatus == 'S') ? "" : "<img class='user-img img-circle block pull-left' src='../../userimage/" + data.d[i].Photo + "' alt='Meessage'>";


                $("#chatpanel").append("  <li class='" + messagefrom + "'>  <div class='" + messagefrom + "-msg-wrap'>" +
                        "" + image + "<div class='msg pull-" + side + "'>                                                       " +
                        "    <p>" + data.d[i].Message + "</p>     " +
                        "    <div class='msg-per-detail text-right'>                                       " +
                        "        <span class='msg-time txt-grey'>" + data.d[i].MessageDate + "</span>  </div> </div>             " +
                        "<div class='clearfix'></div>  </div>  </li>");
            }
        }
        else {
            $("#chatpanel").append("");
        }
    }
}

function PermissionDetail() {
    if ($('#hdfadd').val() == "False")
        $('#btnadd').css('display', 'none');
    else
        $('#btnadd').css('display', '');

}