
var quality = 60; //(1 to 100) (recommanded minimum 55)
var timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )

function GetInfo() {
    $('#lbldeviceinfo').val('');
    var res;
    res = GetMFS100Info();
    if (res.httpStaus) {
        $('#lbldeviceinfo').val("ErrorCode: " + res.data.ErrorCode + " ErrorDescription: " + res.data.ErrorDescription);

        if (res.data.ErrorCode == "0") {
            $('#lbldeviceinfo').val("\\n Serial:" + res.data.DeviceInfo.SerialNo + " Certification:" + res.data.DeviceInfo.Certificate
                + " Make:" + res.data.DeviceInfo.Make + " Model:" + res.data.DeviceInfo.Model + " Width:" + res.data.DeviceInfo.Width + " Height:" + res.data.DeviceInfo.Height +
                " LocalMac:" + res.data.DeviceInfo.LocalMac + " LocalIP:" + res.data.DeviceInfo.LocalIP + " SystemID:" + res.data.DeviceInfo.SystemID + " PublicIP:" + res.data.DeviceInfo.PublicIP);
            Capture();
        }
    }
    else {
        alertify.error(res.err);
    }
    return false;
}
function Capture() {
    try {
        $('#imgfingure').attr("src", "data:image/bmp;base64,");
        $('#txtisoimage').val("11");
        var res = CaptureFinger(quality, timeout);
        if (res.httpStaus) {
            $('#txtisoimage').val("ErrorCode: " + res.data.ErrorCode + " ErrorDescription: " + res.data.ErrorDescription);

            if (res.data.ErrorCode == "0") {
                $('#imgfingure').attr("src", "data:image/bmp;base64," + res.data.BitmapData);
                $('#txtisoimage').val(res.data.IsoTemplate);
                //Verify();
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
function Match() {
    try {
        var isotemplate = $('#txtisoimage').val();
        if (isotemplate == "") { alert('Please Scan New Capture Finger Data After Match Finger!!'); }
        var res = MatchFinger(quality, timeout, isotemplate);

        if (res.httpStaus) {
            if (res.data.Status) {
                alert("Finger matched");
            }
            else {
                if (res.data.ErrorCode != "0") {
                    alert(res.data.ErrorDescription);
                }
                else {
                    alert("Finger not matched");
                }
            }
        }
        else {
            alert(res.err);
        }
    }
    catch (e) {
        alert(e);
    }
    return false;

}
function Verify() {
    try {
       var finguredetail = $('#finguredetail').val();
       var isotemplate = $('#txtisoimage').val();

        var res = VerifyFinger(finguredetail, isotemplate);
        if (res.httpStaus) {
            if (res.data.Status) {
                alertify.success("Finger matched User name:"+ $('#fingureuser').val());
                return true;
            }
            else {
                if (res.data.ErrorCode != "0") {
                    alertify.error(res.data.ErrorDescription);
                    return false;
                }
                else {
                    alertify.error("Finger not matched");
                    return false;
                }
            }
         
        }
        else {
            alertify.error(res.err);
            return false;
        }
    }
    catch (e) {
        alertify.error(e);
        return false;
    }
    return false;
}


