export default function GeneExpraOption(xAxisHour = [], series = [], legenddata = []) {
    return {
        xAxis: {
            type: 'category',
            data: xAxisHour
        },
        yAxis: {
            type: 'value'
        },
        series: series,
        legend: {
            data: legenddata
        }
    }
}