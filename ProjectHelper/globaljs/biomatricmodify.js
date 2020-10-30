var quality = 60; //(1 to 100) (recommanded minimum 55)
var timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
var fingureprint = "";
$(document).ready(function () {
    $(document).on("keydown", function (ev) {
        if (ev.keyCode === 27 || ev.keyCode === 122) return false
    })
    $(document).on('click', '#btnassfingure', function () {
        GetInfosave();
    });
    $(document).on('click', '#btnloginfingureprint',function () {
      GetInfologin();
      });
});
function GetInfosave() {
    var infostatus;
    var res;
    res = GetMFS100Info();
    if (res.httpStaus) {
       infostatus = "ErrorCode: " + res.data.ErrorCode + " ErrorDescription: " + res.data.ErrorDescription;

        if (res.data.ErrorCode == "0") {
            infostatus+= "\\n Serial:" + res.data.DeviceInfo.SerialNo + " Certification:" + res.data.DeviceInfo.Certificate
                        + " Make:" + res.data.DeviceInfo.Make + " Model:" + res.data.DeviceInfo.Model + " Width:" + res.data.DeviceInfo.Width + " Height:" + res.data.DeviceInfo.Height +
                        " LocalMac:" + res.data.DeviceInfo.LocalMac + " LocalIP:" + res.data.DeviceInfo.LocalIP + " SystemID:" + res.data.DeviceInfo.SystemID + " PublicIP:" + res.data.DeviceInfo.PublicIP;
            Capture('save');
        }
    }
    else {
        alertify.log(res.err);
    }
    alertify.log(infostatus);
}

function GetInfologin() {
    var infostatus;
    var res;
    res = GetMFS100Info();
    if (res.httpStaus) {
        infostatus = "ErrorCode: " + res.data.ErrorCode + " ErrorDescription: " + res.data.ErrorDescription;

        if (res.data.ErrorCode == "0") {
            infostatus += "\\n Serial:" + res.data.DeviceInfo.SerialNo + " Certification:" + res.data.DeviceInfo.Certificate
                        + " Make:" + res.data.DeviceInfo.Make + " Model:" + res.data.DeviceInfo.Model + " Width:" + res.data.DeviceInfo.Width + " Height:" + res.data.DeviceInfo.Height +
                        " LocalMac:" + res.data.DeviceInfo.LocalMac + " LocalIP:" + res.data.DeviceInfo.LocalIP + " SystemID:" + res.data.DeviceInfo.SystemID + " PublicIP:" + res.data.DeviceInfo.PublicIP;
            Capture('login');
        }
    }
    else {
        alertify.log(res.err);
    }
    alertify.log(infostatus);
}

function Capture(type) {
    try {
      //  $('#imgfinger').src = "data:image/bmp;base64,";
      //  $('#txtIsoTemplate').val("11");

        var res = CaptureFinger(quality, timeout);
        if (res.httpStaus) {
            if (res.data.ErrorCode == "0") {
                //    $('#imgFinger').src = "data:image/bmp;base64," + res.data.BitmapData;
                fingureprint = res.data.IsoTemplate;
                if (type == 'save')
                    Savefingureprint(fingureprint);
                else
                    LoginFingure(fingureprint);
            }
        }
        else {
            alertify.log(res.err);
        }
    }
    catch (e) {
        alertify.log(e);
    }
}
function NewVerify(Fingure1) {
     var res = VerifyFinger(Finger1, isotemplate);
    if (res.httpStaus || res2.httpStaus || res3.httpStaus) {
        if (res.data.Status || res2.data.Status || res3.data.Status) {
            LoginFingure(Finger1);
        }
        else {
            if (res.data.ErrorCode != "0") {
                alert("er3" + res.data.ErrorDescription + res.data.ErrorCode);
            }
            else {
                alert("Finger not matched Try again..");
            }
        }
    }
    else {
        alert("er4" + res.err);
    }

}

function Match() {
    try {
        var isotemplate = "";
        if (isotemplate == "")
        { alertify.log('Please Scan New Capture Finger Data After Match Finger!!'); }
        var res = MatchFinger(quality, timeout, isotemplate);

        if (res.httpStaus) {
            if (res.data.Status) {
                alertify.error("Finger matched");
            }
            else {
                if (res.data.ErrorCode != "0") {
                    alertify.log(res.data.ErrorDescription);
                }
                else {
                    alertify.error("Finger not matched");
                }
            }
        }
        else {
            alertify.error(res.err);
        }
    }
    catch (e) {
        alertify.error(e);
    }

}
function Verify() {
    try {
        var isotemplate = $('#txtIsoTemplate').val();

        var res = VerifyFinger(isotemplate, isotemplate);
        if (res.httpStaus || res2.httpStaus || res3.httpStaus) {
            if (res.data.Status || res2.data.Status || res3.data.Status) {
                alertify.success("Finger matched");
            }
            else {
                if (res.data.ErrorCode != "0") {
                    alertify.log(res.data.ErrorDescription);
                }
                else {
                    alertify.error("Finger not matched");
                }
            }
        }
        else {
            alertify.error(res.err);
        }
    }
    catch (e) {
        alertify.error(e);
    }
    return false;
}