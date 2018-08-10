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
    Promise.all([
        socialDashboardApi.getGlobalSongsData(),
        socialDashboardApi.getGlobalSongsDataArtists()
    ]).then(results => {
        chartGlobalData(results[0]);
        chartGlobalDataArtists(results[1]);
    });

}


function chartGlobalDataArtists(data) {

    let arrayArtistsToChart = [];
    data.forEach(album => {
        arrayArtistsToChart.push([album.value, album.count]);
    });

    Highcharts.chart('global-data-chart-artists', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor: 'transparent',
        },
        title: {
            text: 'Histórico de canciones más escuchados',
            style: { "color": "white" }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        labels: {
            style: {
                color: 'white'
            }
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '% de canciones',
            data: arrayArtistsToChart
        }]
    });
}
function chartGlobalData(data) {

    let arrayAlbumsToChart = [];
    data.forEach(album => {
        arrayAlbumsToChart.push([album.value, album.count]);
    });

    Highcharts.chart('global-data-chart', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor: 'transparent',
        },
        title: {
            text: 'Histórico de albumes más escuchados',
            style: { "color": "white" }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        labels: {
            style: {
                color: 'white'
            }
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: '% de canciones',
            data: arrayAlbumsToChart
        }]
    });
}