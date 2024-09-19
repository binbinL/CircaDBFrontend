export default function RingChartOptions(data = []) {
    const colors = [
        '#F8B195', '#6C5B7B', '#99B898', '#E84A5F', '#A8E6CF',
        '#FF8B94', '#474747', '#a764c9', '#E1F5C4', '#FC913A',
        '#53a667', '#355C7D', '#e7894a', '#87c8de', '#D3EDC1',
        '#A8A7A7', '#E8175D', '#7ec0bc', '#3a5b1f', '#FF4E50',
        '#2292b2', '#FF847C', '#FFD3B6', '#CC527A', '#2F9599',
        '#ca8ee3', '#ecd984', '#A7226E', '#EC2049', '#FFAAA5'
    ];


    // 为每个数据点设置颜色
    data.forEach((item, index) => {
        item.itemStyle = {color: colors[index % colors.length]};
    });
    return {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '0%',
            left: 'right'
        },
        series: [
            {
                name: 'Tissue Count',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data
            }
        ]
    };
}