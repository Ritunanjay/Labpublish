$(document).ready(function () {
    $(document)[0].oncontextmenu = function () { return false; }

    $(document).mousedown(function (e) {
        if (e.button == 2) {
            return false;
        } else {
            return true;
        }
    });
    $(window).on('keydown', function (event) {
        //if (event.keyCode == 123) {
        //    return false;
        //}
    //else 
        if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
            return false;  //Prevent from ctrl+shift+i
        }
        else if (event.ctrlKey && event.keyCode == 73) {
            return false;  //Prevent from ctrl+shift+i
        }
    });
});