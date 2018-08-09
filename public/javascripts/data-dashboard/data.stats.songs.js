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

    socialDashboardApi.getStatsSongs()
        .then(data => {
            console.log(data)
            countArtistsBySongs(data);
            countAlbumsBySongs(data);
            songsByDuration(data);
            songsByPopularity(data);
            
        });
}

function countAlbumsBySongs(data) {
    let arrayAlbums = data[0].topSongs.reduce((acc, item) => {
        acc = acc.concat(item.songAlbum.songAlbumName); 
        return acc;
    }, []);

    let arrayAlbumsToChart = [];
    let albumList = compressArray(arrayAlbums).sort((item1, item2) => {
        return item2.count - item1.count;
    }).slice(0, 10)
    albumList.forEach(album => {
        arrayAlbumsToChart.push([album.value, album.count]);
    });

    Highcharts.chart('count-albumes-by-songs', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            borderWidth: 2,
            borderColor:'white',
            borderRadius: 10,
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor:'transparent',
        },
        title: {
            text: 'Álbumes más escuchados',
            style:{ "color": "white" }
        },
        labels:{
            style:{
                color: 'white'
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
        series: [{
            name: 'Nº Canciones',
            data: arrayAlbumsToChart
        }]
    });
}

function songsByPopularity(data) {
    let arrayDuration = data[0].topSongs.reduce((acc, item) => {
        acc.push([
            item.songName,
            Number(item.songPopularity)
        ]);
        return acc;
    }, []);

    Highcharts.chart('songs-by-popularity', {
        chart: {
            type: 'column',
            borderWidth: 2,
            borderRadius: 10,
            borderColor:'white',
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor:'transparent',
            style: {
                fontFamily: 'Circular Std Black'
            }

        },
        colorAxis:{
            gridLineColor:'#000000'
        },
        title: {
            text: 'Canciones por popularidad',
            style:{ "color": "white" }
        },
        xAxis: {
            labels: {
                style: {
                    color:'white'
                }
            },
            type: 'category',
        },
        yAxis: {
            labels: {
                style: {
                    color:'white'
                }
            },
            max: 100,
            min: 0,
            title: {
                text: 'Popularidad',
                style: {
                    color:'white'
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
                "name": "Popularidad",
                "colorByPoint": true,
                "data": arrayDuration
            }
        ]
    });

}
function songsByDuration(data) {
    let arrayDuration = data[0].topSongs.reduce((acc, item) => {
        acc.push([
            item.songName,
            ((item.songDuration)/1000)/60
        ]);
        return acc;
    }, []);

    Highcharts.chart('songs-by-duration', {
        chart: {
            type: 'column',
            borderWidth: 2,
            borderRadius: 10,
            borderColor:'white',
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor:'transparent',
            style: {
                fontFamily: 'Circular Std Black'
            }

        },
        colorAxis:{
            gridLineColor:'#000000'
        },
        title: {
            text: 'Canciones por duración',
            style:{ "color": "white" }
        },
        xAxis: {
            labels: {
                style: {
                    color:'white'
                }
            },
            type: 'category',
        },
        yAxis: {
            labels: {
                style: {
                    color:'white'
                }
            },
            max: 10,
            min: 0,
            title: {
                text: 'Duración (en minutos)',
                style: {
                    color:'white'
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
                "name": "Popularidad",
                "colorByPoint": true,
                "data": arrayDuration
            }
        ]
    });
}

function countArtistsBySongs (data){

    let arraySongs = data[0].topSongs.reduce((acc, item) => {
        item.songArtists.forEach(artists => {
            acc = acc.concat(artists.name); 
        });
        return acc;
    }, []);
    let arraySongsToChart = [];
    let songsList = compressArray(arraySongs).sort((item1, item2) => {
        return item2.count - item1.count;
    }).slice(0, 10)
    songsList.forEach(song => {
        arraySongsToChart.push([song.value, song.count]);
    });

    
    // Build the chart
    Highcharts.chart('count-artists-by-songs', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            borderWidth: 2,
            borderColor:'white',
            borderRadius: 10,
            style: {
                fontFamily: 'Circular Std Black'
            },
            backgroundColor:'transparent',
        },
        title: {
            text: 'Artistas más escuchados',
            style:{ "color": "white" }
        },
        labels:{
            style:{
                color: 'white'
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
        series: [{
            name: 'Nº Canciones',
            data: arraySongsToChart
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