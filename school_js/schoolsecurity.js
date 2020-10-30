$(document).ready(function () {
    $(this).bind("contextmenu", function (e) {
        e.preventDefault();
        LMSMessage('', 'Function not allowed', 'info');

    }); document.onkeydown = function (e) {
        if (e.ctrlKey &&
            (e.keyCode === 67 ||
             e.keyCode === 86 ||
             e.keyCode === 85 ||
             e.keyCode === 123 ||
             e.keyCode === 83 ||
             e.keyCode === 80 ||
             e.keyCode === 117)) {
            LMSMessage('', 'Function not allowed', 'info');
            return false;
        }
        else if (
            (
             e.keyCode === 123)) {
            LMSMessage('', 'Function not allowed', 'info');
            return false;
        } else {
            return true;
        }
    };
});