export default function GeneExpraOption(NewxAxisHour = [], series = [], legenddata = []) {
    console.log('GeneExpraOption', NewxAxisHour)
    return {
        xAxis: {
            type: 'category',
            data: NewxAxisHour,
            axisLabel: {
                rotate: 0, // 设置标签旋转角度为45度
                interval: 3
            }
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