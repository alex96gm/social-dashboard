

var socialDashboardApi = new SocialDashboardApi();

window.onload = function () {
    socialDashboardApi.getStatsArtists()
        .then(data => {
            stastGenres(data);
            statsPopularityByArtits(data);

        });
}

function statsPopularityByArtits(data) {
    let arrayPopularity = data[0].topArtists.reduce((acc, item) => {
        acc.push([
            item.artistName,
            Number(item.artistPopularity)
        ]);
        return acc;
    }, []);

    Highcharts.chart('artists-by-popularity', {
        chart: {
            type: 'column',
            borderWith: 5,
            borderRadius: 10,
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor: {
                linearGradient: { x1: 1, y1: 1, x2: 0, y2: 0 },
                stops: [
                    [0, '#DE5F98'],
                    [1, '#EFBA80']
                ]
            },
            style: {
                fontFamily: 'Circular Std Black'
            }

        },
        colorAxis:{
            gridLineColor:'#000000'
        },
        title: {
            text: 'Artistas por popularidad'
        },
        xAxis: {
            labels: {
                style: {
                    color:'black'
                }
            },
            type: 'category',
        },
        yAxis: {
            labels: {
                style: {
                    color:'black'
                }
            },
            max: 100,
            min: 0,
            title: {
                text: 'Popularidad'
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
                "name": "Popularidad",
                "colorByPoint": true,
                "data": arrayPopularity
            }
        ]
    });
}

function stastGenres(data) {
    let arrayGenres = data[0].topArtists.reduce((acc, item) => {
        acc = acc.concat(item.artistGenres);
        return acc;
    }, []);

    var genresList = compressArray(arrayGenres).sort((item1, item2) => {
        return item2.count - item1.count;
    }).slice(0, 10);

    var mySeries = [];
    genresList.forEach(element => {
        mySeries.push([element.value, element.count]);
    });

    console.log(genresList);
    var chart = Highcharts.chart('firtsChart', {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            borderWith: 5,
            borderRadius: 10,
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor: {
                linearGradient: { x1: 1, y1: 1, x2: 0, y2: 0 },
                stops: [
                    [0, '#4B2E39'],
                    [1, '#4B2E39']
                ]
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        title: {
            text: 'Géneros mas escuchados'
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: mySeries
        }]
    });

}

function compressArray(original) {

    var compressed = [];
    // make a copy of the input array
    var copy = original.slice(0);

    // first loop goes over every element
    for (var i = 0; i < original.length; i++) {

        var myCount = 0;
        // loop over every element in the copy and see if it's the same
        for (var w = 0; w < copy.length; w++) {
            if (original[i] == copy[w]) {
                // increase amount of times duplicate is found
                myCount++;
                // sets item to undefined
                delete copy[w];
            }
        }

        if (myCount > 0) {
            var a = new Object();
            a.value = original[i];
            a.count = myCount;
            compressed.push(a);
        }
    }

    return compressed;
};
