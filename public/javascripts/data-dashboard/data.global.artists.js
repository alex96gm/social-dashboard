var socialDashboardApi = new SocialDashboardApi();

window.onload = function () {

    Highcharts.setOptions({
        colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
            return {
                radialGradient: {
                    cx: 0.5,
                    cy: 0.3,
                    r: 0.7
                },
                stops: [
                    [0, color],
                    [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
                ]
            };
        })
    });
    socialDashboardApi.getGlobalArtistsGenres()
        .then(data => {
            globalArtistsGenres(data);
            console.log(data)
        });

}
function globalArtistsGenres(data) {

    let arrayArtistsGenresToChart = [];
    data.forEach(album => {
        arrayArtistsGenresToChart.push([album.value, album.count]);
    });

    Highcharts.chart('global-data-artists-genres', {
        chart: {
            type: 'column',
            borderWidth: 2,
            borderRadius: 10,
            borderColor: 'white',
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor: 'transparent',
            style: {
                fontFamily: 'Circular Std Black'
            }

        },
        colorAxis: {
            gridLineColor: '#000000'
        },
        title: {
            text: 'Histórico de genéneros más escuchados',
            style: { "color": "white" }
        },
        xAxis: {
            labels: {
                style: {
                    color: 'white'
                }
            },
            type: 'category',
        },
        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },
        yAxis: {
            labels: {
                style: {
                    color: 'white'
                }
            },
            min: 0,
            title: {
                text: 'Duración (en minutos)',
                style: {
                    color: 'white'
                }
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },
        "series": [
            {
                "name": "% de canciones",
                "colorByPoint": true,
                "data": arrayArtistsGenresToChart
            }
        ]
    });
}

