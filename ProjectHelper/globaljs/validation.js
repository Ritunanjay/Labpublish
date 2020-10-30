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
function getfocus(ele) {
    $(ele).removeClass('GridHeader');
    $(ele).addClass('GridHeaderFocus');
}
function getblur(ele) {
    $(ele).removeClass('GridHeaderFocus');
    $(ele).addClass('GridHeader');
}
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

function uppercase(ele) {
    $(ele).keyup(function (e) {
        var txt = $(ele).val();
        txt = txt.toUpperCase();
        $(ele).val(txt);
    });
}

function RandomNumber()
{
    var x = Math.floor((Math.random() * 1000000) + 1);
    return x;
}

function CentreNo() {
    var x = Math.floor((Math.random() * 1000) + 1);
    return x;
}