$(document).ready(function () {
    $(document).on('click', '.lnkbilling', function () {
        GetPieValue();
    });
    $(document).on('click', '.lnkreporting', function () {
        GetNewPieValue();
    });
    $(".mydashboardfilter li").click(function () {
        GetPieValue();
        GetNewPieValue();
    });
    GetPieValue();
    GetNewPieValue();
});
function GetValues() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserHome.aspx/GetValues",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (data) {

            if ($('#chart_1').length > 0) {

                var ctx2 = document.getElementById("chart_1").getContext("2d");
                var data2 = {
                    labels: [data.d[0].Tag, data.d[1].Tag, data.d[2].Tag],
                    datasets: [
                        {
                            label: data.d[0].Label,
                            backgroundColor: data.d[0].Background,
                            borderColor: data.d[0].Border,
                            data: [data.d[0].Datao, data.d[1].Datao, data.d[2].Datao]
                        },
                        {
                            label: data.d[1].Label,
                            backgroundColor: data.d[1].Background,
                            borderColor: data.d[1].Border,
                            data: [data.d[0].Datai, data.d[1].Datai, data.d[2].Datai]
                        },
                        {
                            label: data.d[2].Label,
                            backgroundColor: data.d[2].Background,
                            borderColor: data.d[2].Border,
                            data: [data.d[0].Datae, data.d[1].Datae, data.d[2].Datae]
                        },
                        {
                            label: data.d[3].Label,
                            backgroundColor: data.d[3].Background,
                            borderColor: data.d[3].Border,
                            data: [data.d[0].Datam, data.d[1].Datam, data.d[2].Datam]
                        }
                    ]
                };

                var hBar = new Chart(ctx2, {
                    type: "horizontalBar",
                    data: data2,

                    options: {
                        tooltips: {
                            mode: "label"
                        },
                        scales: {
                            yAxes: [{
                                stacked: true,
                                gridLines: {
                                    color: "#878787",
                                },
                                ticks: {
                                    fontFamily: "Roboto",
                                    fontColor: "#878787"
                                }
                            }],
                            xAxes: [{
                                stacked: true,
                                gridLines: {
                                    color: "#878787",
                                },
                                ticks: {
                                    fontFamily: "Roboto",
                                    fontColor: "#878787"
                                }
                            }],

                        },
                        elements: {
                            point: {
                                hitRadius: 40
                            }
                        },
                        animation: {
                            duration: 3000
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                        },

                        tooltip: {
                            backgroundColor: 'rgba(33,33,33,1)',
                            cornerRadius: 0,
                            footerFontFamily: "'Roboto'"
                        }

                    }
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
        },
        failure: function (response) {
            alert(response.d);
        }
    });

}

function GetValuesData() {
    $.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "AdminHome.aspx/GetValuesData",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (data) {
            if ($('#chart_2').length > 0) {

                var ctx2 = document.getElementById("chart_2").getContext("2d");
                var data2 = {
                    labels: [data.d[0].Tag, data.d[1].Tag, data.d[2].Tag],
                    datasets: [
                        {
                            label: data.d[0].Label,
                            backgroundColor: data.d[0].Background,
                            borderColor: data.d[0].Border,
                            data: [data.d[0].Datao, data.d[1].Datao, data.d[2].Datao]
                        },
                        {
                            label: data.d[1].Label,
                            backgroundColor: data.d[1].Background,
                            borderColor: data.d[1].Border,
                            data: [data.d[0].Datai, data.d[1].Datai, data.d[2].Datai]
                        },
                        {
                            label: data.d[2].Label,
                            backgroundColor: data.d[2].Background,
                            borderColor: data.d[2].Border,
                            data: [data.d[0].Datae, data.d[1].Datae, data.d[2].Datae]
                        },
                        {
                            label: data.d[3].Label,
                            backgroundColor: data.d[3].Background,
                            borderColor: data.d[3].Border,
                            data: [data.d[0].Datam, data.d[1].Datam, data.d[2].Datam]
                        }
                    ]
                };

                var hBar = new Chart(ctx2, {
                    type: "horizontalBar",
                    data: data2,

                    options: {
                        tooltips: {
                            mode: "label"
                        },
                        scales: {
                            yAxes: [{
                                stacked: true,
                                gridLines: {
                                    color: "#878787",
                                },
                                ticks: {
                                    fontFamily: "Roboto",
                                    fontColor: "#878787"
                                }
                            }],
                            xAxes: [{
                                stacked: true,
                                gridLines: {
                                    color: "#878787",
                                },
                                ticks: {
                                    fontFamily: "Roboto",
                                    fontColor: "#878787"
                                }
                            }],

                        },
                        elements: {
                            point: {
                                hitRadius: 40
                            }
                        },
                        animation: {
                            duration: 3000
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            display: true,
                        },

                        tooltip: {
                            backgroundColor: 'rgba(33,33,33,1)',
                            cornerRadius: 0,
                            footerFontFamily: "'Roboto'"
                        }

                    }
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
        },
        failure: function (response) {
            alert(response.d);
        }
    });

}

function GetPieValue() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserHome.aspx/GetPieDetail",
        data: JSON.stringify({ Type: type, FromDate: fromdate, ToDate: todate }),
        dataType: "json",
        success: function (data) {
            var d = new Date();
            var n = d.getFullYear();
            var options = {
                title: {
                    text: "Total Information Detail"
                },
                subtitles: [{
                    text: "Session " + n + '-' + (n + 1)
                }],
                animationEnabled: true,
                data: [{
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    backgound: "#469408",
                    dataPoints: [
                     { y: data.d[0].TotalBooking, label: "No Of Booking" },
                      { y: data.d[0].TotalBookingAmount, label: "Booking Amount" },
                      { y: data.d[0].TotalCollection, label: "Collection" },
                      { y: data.d[0].TotalReceipt, label: "Receipt " },
                      { y: data.d[0].TotalRefund, label: "Refund" },
                     { y: data.d[0].TotalBalance, label: "Balance" },
                     { y: data.d[0].NewPatient, label: "New Patient" },
                     { y: data.d[0].OldPatient, label: "Old Patient" },
                    ]
                }]
            };
            $("#chartContainer").CanvasJSChart(options);

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
            alert(response.d);
        }
    });
}
function GetNewPieValue() {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "UserHome.aspx/GetPieDetail",
        data: JSON.stringify({ Type: type, FromDate: fromdate, ToDate: todate }),
        dataType: "json",
        success: function (data) {
            var d = new Date();
            var n = d.getFullYear();
            var options = {
                title: {
                    text: "Today Information Detail"
                },
                subtitles: [{
                    text: "Session " + n + '-' + (n + 1)
                }],
                animationEnabled: true,
                data: [{
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    backgound: "#469408",
                    dataPoints: [
                     { y: data.d[0].TotalSampleCollect, label: "Sample Collect" },
                     { y: data.d[0].TotalSampleReceive, label: "Sample Receive" },
                      { y: data.d[0].TotalReportIncomplete, label: "InComplete Report" },
                     { y: data.d[0].TotalReportcomplete, label: "Complete Report" },
                    { y: data.d[0].TotalReportValidate, label: "Validate Report" },
                    ]
                }]
            };
            $("#chartContainernew").CanvasJSChart(options);

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
            alert(response.d);
        }
    });
}