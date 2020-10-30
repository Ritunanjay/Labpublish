$(function () {
    EmptyRecord();
    
    $(document).on("click", "#btnprint", function () {
        PrintDiv();
    });
    $(document).on("click", "#btnadd", function () {
            if (!Validate())
            return false;
        else {
                var number = $('#txtnumber').val();
                if (number > 20) {
                    alertify.log("Print Number Not Max 20");
                    return false;}
             if ($('#ddltype').val() == "BAR") {
                 for (var i = 0; i < number; i++) {
                     BarCode(i,"B");
                 }
             }
             else {
                 for (var i = 0; i < number; i++) {
                     BarCode(i,"Q");
                 }
             }
         }
        
    });
     $(document).on("click", "#btnclear", function () {
         $('#img').empty();
        EmptyRecord();
    });
  
});
function Validate()
{
    if ($('#txtnumber').val() == '')
    {
        alertify.log('Please Fill Number of QRCode');
        $('#txtnumber').focus();
        return false;
    }
    return true;
}
function EmptyRecord()
{
   $('#txtnumber').val('');
  
}
function BarCode(number,type) {
    $.ajax({
        type: "POST",
        url: "BarcodePrint.aspx/Barcode",
        data: JSON.stringify({ Number:number ,type:type}),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#img").append("<div class='col-md-3 col-sm-3 col-xs-12' style='display: inline;'> <img id='qrimg' class='img img-responsive' alt='' src='" + response.d + "' /></div>");
        
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
