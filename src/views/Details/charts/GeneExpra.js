// // 假设xAxisHour是一个包含CT时间数据的数组
// let xAxisHour = ['CT0', 'CT3', 'CT5', 'CT8', 'CT12', 'CT15', 'CT18', 'CT21'];
//
// // 假设dataList是一个包含多组数据的数组，每组数据对应不同条件下的重复实验
// let dataList = [
//     [
//         [880, 1000, 1000, 934, 1290, 1500, 1420, 1320], // 条件1下的重复实验数据
//         [810, 925, 895, 930, 1285, 1325, 1315, 1195],  // 条件1下的另一组重复实验数据
//         [700, 640, 584, 1000, 1285, 1325, 1315, 1195]
//     ],
//     [
//         [620, 732, 701, 734, 1090, 1130, 1120, 1000], // 条件2下的重复实验数据
//         [600, 700, 500, 530, 800, 900, 940, 995]  // 条件2下的另一组重复实验数据
//     ]
// ];
//
// // 假设conditions是一个包含条件信息的数组
// let conditions = ['条件A', '条件B'];
//
// // 定义一组颜色和线型用于区分不同条件下的数据和不同重复实验
// let colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'];
let option = {
    xAxis: {
        type: 'category',
        data: []//xAxisHour
    },
    yAxis: {
        type: 'value'
    },
    series: [],
    legend: {
        data: []
    }
};
// // 动态生成数据系列对象和图例名称
// dataList.forEach((conditionData, conditionIndex) => {
//     let meanData = new Array(xAxisHour.length).fill(0);
//
//     conditionData.forEach((replicateData) => {
//         replicateData.forEach((value, index) => {
//             meanData[index] += value; // 累加同一时间点的数据
//         });
//     });
//
//     meanData = meanData.map(value => value / conditionData.length); // 计算均值
//
//     option.series.push({
//         data: meanData,
//         type: 'line', // 使用线连接均值数据点
//         lineStyle: {
//             color: colors[conditionIndex % colors.length] // 使用不同颜色区分不同条件下的数据
//         },
//         name: conditions[conditionIndex] + ' 均值' // 设置数据系列名称
//     });
//
//     conditionData.forEach((data, dataIndex) => {
//         option.series.push({
//             data: data,
//             type: 'scatter', // 使用点图展示原始数据
//             symbolSize: 8, // 设置点的大小
//             itemStyle: {
//                 color: colors[conditionIndex % colors.length] // 使用同一颜色区分不同条件下的数据
//             },
//             name: conditions[conditionIndex] + ' 实验' + (dataIndex + 1) // 设置数据系列名称
//         });
//     });
//
//     option.legend.data.push(conditions[conditionIndex] + ' 均值'); // 添加均值数据的图例名称
// });

export default function GeneExpraOption() {
    return option
}