
$(document).ready(function () {
    $(document).on("click", "#btnpicupload", function () {
        sendFile('sushil');
          GetUserDetail();
    });
   
     $(document).on('click','#btnchatnotification',function(){
      //  GetNotificationDetail();
     });
     GetUserDetail();

   // GetNotificationDetail();
});

function GetUserDetail() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: '../../MainHelper.aspx/userprofile',
        data: JSON.stringify({  }),
        dataType: "json",
        async: false,
        success: function (response) {
            setUserValues(response.d);
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

function setUserValues(data) {
    $('#username').html("<i class='icon-user'></i>" + data.UserName);
    if (data.Photo != "")
    {
        var photo = "../../UserImage/" + data.Photo;

       $('#userimg').attr('src',photo);
       $('#userimg1').attr('src', photo);
       $('#imgPhoto').attr('src', photo);
    }
    $('#txtApplicationRole').val(data.RoleName);
    $('#userrole').html("<i class='icon-user'></i>" + data.RoleName);
   // $('#txtcompanyName').val(response.d.CompanyName);
     $('#huserid').val(data.UserID);
    $('#txtemailid').val(data.EmailID);
    $('#txtusertype').val(data.RoleName);
    $('#txtuname').val(data.UserName);
    $('#txtphoneno').val(data.Mobile);
    $('#txtstatus').val((data.Active.toString() == 'false') ? 'Active' : 'Suspended');
    $('#txtlloigindate').val(data.LastLogin);
}
function sendFile(uhid) {
    var fp = $("#profilepic").get(0);
    var items = fp.files;
    var formData = new FormData();
    for (var i = 0; i < items.length; i++) {
        formData.append('file', items[i]);
    }
    formData.append('forr', 'UserImage');
    formData.append('ID', $('#huserid').val().trim());
    $.ajax({
        type: 'post',
        url: '../../UploadHandler.ashx',
        data: formData,
        success: function (status) {
            SaveProfile(status);
          // alertify.success(status +' Upload Profile Success');
        },
        processData: false,
        contentType: false,
        error: function () {
            alert("Whoops something went wrong!");
        }
    });
}

function SaveProfile(filename)
{
    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        url: '../../MainHelper.aspx/Saveprofile',
        data: JSON.stringify({ FileName: filename }),
        async: false,
        success: function (response) {
            if (response.d.MessageID != "0") {
                alertify.success(response.d.MessageName);
                setUserValues();
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