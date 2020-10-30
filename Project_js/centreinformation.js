$(document).ready(function () {
    GetValues();
    GetPieValue();
    morieschart();
    Getbarchart();
});
function Getbarchart() {
    $.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreInformation.aspx/GetValues",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (data) {
            var valsnodata = [];
            for (var i = 0; i < data.d.length; i++) {
                valsnodata.push({
                    y: data.d[i].TestCode,
                    a: data.d[i].DataNooftest
                    })
            }
            if ($('#morris_extra_bar_chart').length > 0)
                // Morris bar chart
                Morris.Bar({
                    element: 'morris_extra_bar_chart',
                    data: valsnodata,
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['A'],
                    barColors: ['#177ec1'],
                    hideHover: 'auto',
                    gridLineColor: '#878787',
                    resize: true,
                    gridTextColor: '#878787',
                    gridTextFamily: "Roboto"
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
        },
        failure: function (response) {
            alert(response.d);
        }
    });

}
function GetValues() {
    $.ajax({

        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "CentreInformation.aspx/GetValues",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (data) {
            if ($('#chart_2').length > 0) {

                var ctx2 = document.getElementById("chart_2").getContext("2d");
                var valslabel = [];
                var valsdata = [];
                var valsnodata = [];
                var Centre = "";
                var Centrenew = "";
                for (var i = 0; i < data.d.length; i++) {
                    valslabel.push(data.d[i].TestCode);

                }
                for (var i = 0; i < data.d.length; i++) {
                    if (i == 0)
                        valsnodata.push(data.d[i].DataNooftest);
                    else if (data.d[i - 1].CentreName == data.d[i].CentreName) {
                        valsnodata.push(data.d[i].DataNooftest);
                    }

                    else {
                        valsdata.push({
                            label: data.d[i].CentreName,
                            backgroundColor: data.d[i].Background,
                            borderColor: data.d[i].Border,
                            data: valsnodata
                        })
                    }
                    if (i == data.d.length - 1) {
                        valsdata.push({
                            label: data.d[i].CentreName,
                            backgroundColor: data.d[i].Background,
                            borderColor: data.d[i].Border,
                            data: valsnodata
                        })
                    }
                }

                var data2 = {
                    labels: valslabel,
                    datasets: valsdata
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
        url: "CentreInformation.aspx/GetValues",
        data: JSON.stringify({}),
        dataType: "json",
        success: function (data) {
            var valsnodata = [];
            for (var i = 0; i < data.d.length; i++) {
                valsnodata.push({ y: data.d[i].DataNooftest, label: data.d[i].TestCode });
            }
            var options = {
                title: {
                    text: "Pharmacy Transaction List "
                },
                subtitles: [{
                    text: "Session 2019-20"
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
                    dataPoints: valsnodata
                }, ]
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
function morieschart() {
    if ($('#morris_extra_line_chart').length > 0) {
        var data = [{
            period: 'Son',
            iphone: 50,
            ipad: 80,
            itouch: 20
        }, {
            period: 'Mon',
            iphone: 130,
            ipad: 100,
            itouch: 80
        }, {
            period: 'Tue',
            iphone: 80,
            ipad: 60,
            itouch: 70
        }, {
            period: 'Wed',
            iphone: 70,
            ipad: 200,
            itouch: 140
        }, {
            period: 'Thu',
            iphone: 180,
            ipad: 150,
            itouch: 140
        }, {
            period: 'Fri',
            iphone: 105,
            ipad: 100,
            itouch: 80
        },
         {
             period: 'Sat',
             iphone: 250,
             ipad: 150,
             itouch: 200
         }];
        var dataNew = [{
            period: 'Jan',
            iphone: 10,
            ipad: 60,
            itouch: 20
        },
		{
		    period: 'Feb',
		    iphone: 110,
		    ipad: 100,
		    itouch: 80
		},
		{
		    period: 'March',
		    iphone: 120,
		    ipad: 100,
		    itouch: 80
		},
		{
		    period: 'April',
		    iphone: 110,
		    ipad: 100,
		    itouch: 80
		},
		{
		    period: 'May',
		    iphone: 170,
		    ipad: 100,
		    itouch: 80
		},
		{
		    period: 'June',
		    iphone: 120,
		    ipad: 150,
		    itouch: 80
		},
		{
		    period: 'July',
		    iphone: 120,
		    ipad: 150,
		    itouch: 80
		},
		{
		    period: 'Aug',
		    iphone: 190,
		    ipad: 120,
		    itouch: 80
		},
		{
		    period: 'Sep',
		    iphone: 110,
		    ipad: 120,
		    itouch: 80
		},
		{
		    period: 'Oct',
		    iphone: 10,
		    ipad: 170,
		    itouch: 10
		},
		{
		    period: 'Nov',
		    iphone: 10,
		    ipad: 470,
		    itouch: 10
		},
		{
		    period: 'Dec',
		    iphone: 30,
		    ipad: 170,
		    itouch: 10
		}
        ];
        var lineChart = Morris.Line({
            element: 'morris_extra_line_chart',
            data: data,
            xkey: 'period',
            ykeys: ['iphone', 'ipad', 'itouch'],
            labels: ['iphone', 'ipad', 'itouch'],
            pointSize: 2,
            fillOpacity: 0,
            lineWidth: 2,
            pointStrokeColors: ['#e69a2a', '#dc4666', '#177ec1'],
            behaveLikeLine: true,
            gridLineColor: '#878787',
            hideHover: 'auto',
            lineColors: ['#e69a2a', '#dc4666', '#177ec1'],
            resize: true,
            redraw: true,
            gridTextColor: '#878787',
            gridTextFamily: "Roboto",
            parseTime: false
        });
    }
}