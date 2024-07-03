var data = [
    [{x: 1, y: [10, 15, 20]},
        {x: 3, y: [15, 18, 26]},
        {x: 5, y: [8, 12, 18]},
        {x: 7, y: [14, 19, 25]},
        {x: 9, y: [16, 30, 28]}],

    [{x: 1, y: [12, 17, 25]},
        {x: 3, y: [16, 19, 25]},
        {x: 5, y: [10, 12, 20]},
        {x: 7, y: [10, 20, 30]},
        {x: 9, y: [18, 28, 36]}],
];
var meanData0 = data[0].map(item => {
    return {x: item.x, y: item.y.reduce((a, b) => a + b, 0) / item.y.length};
});
var meanData1 = data[1].map(item => {
    return {x: item.x, y: item.y.reduce((a, b) => a + b, 0) / item.y.length};
});
export default function GeneExpraOption() {
    return {
        xAxis: {
            type: 'category',
            data: data[0].map(item => item.x)
        },
        yAxis: {
            type: 'value'
        },
        legend: {
            data: ['con1', 'con2']
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                if (params.data && params.data.seriesId) {
                    var seriesId = params.data.seriesId;
                    return 'SeriesId: ' + seriesId;
                }
                return ''; // 如果没有 seriesId，返回空字符串
            }
        },
        series: [
            {
                name: 'con1',
                data: data[0].map(item => item.y[0]),
                type: 'scatter',
                seriesId: 'con1_1',
            },
            {
                name: 'con1',
                data: data[0].map(item => item.y[1]),
                type: 'scatter',
                seriesId: 'con1_2',
            },
            {
                name: 'con1',
                data: data[0].map(item => item.y[2]),
                type: 'scatter',
                seriesId: 'con1_3',
            },
            {
                name: 'con1',
                data: meanData0.map(item => item.y),
                type: 'line',
                smooth: true
            },
            {
                name: 'con2',
                data: data[1].map(item => item.y[0]),
                type: 'scatter',
                smooth: true,
                seriesId: 'con2_1',
            },
            {
                name: 'con2',
                data: data[1].map(item => item.y[1]),
                type: 'scatter',
                seriesId: 'con2_2',
            },
            {
                name: 'con2',
                data: data[1].map(item => item.y[2]),
                type: 'scatter',
                seriesId: 'con2_3',
            },
            {
                name: 'con2',
                data: meanData1.map(item => item.y),
                type: 'line',
                smooth: true
            },
        ]
    };

}