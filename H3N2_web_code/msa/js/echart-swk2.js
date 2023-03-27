// 基于准备好的dom，初始化echarts实例
var myChart2 = echarts.init(document.getElementById('test2'));
//统计序列中，ATCG等二十种氨基酸的量
// 指定图表的配置项和数据
// prettier-ignore
let hours = [
    'A', 'R', 'N', 'D', 'C', 'Q', 'E', 'H', 'I', 'L', 'K', 'M', 'F', 'P', 'S', 'T', 'W', 'Y', 'V', 'G'
];
// prettier-ignore
let days_ = [
    '>A/BRAZIL/1742/2005'
];
//  data [0 , 0 , 5]  第一个代表0，代表0号序列：'>A/BRAZIL/1742/2005',  ； 第二个 0 代表 0号氨基酸 "A " ;  第三个5，代表序列中氨基酸共计 5个
let data_ = [];

refreshW(days_, data_)

function refreshW(days, data) {
    myChart2.clear();
    myChart2 = echarts.init(document.getElementById('test2'));
    let title = [];
    let singleAxis = [];
    let series = [];
    let n = days.length
    if (n === 0) {
        days.push("raw")
    }
    days.forEach(function (day, idx) {
        console.log(idx)
        //title的位置，其中7为数量，一共7个name
        title.push({
            textBaseline: 'middle',
            top: ((idx + 0.5) * 140) / n + '%',
            text: day
        });
        singleAxis.push({
            left: 50,
            type: 'category',
            boundaryGap: false,
            data: hours,
            top: (idx * 140) / 7 + n + '%',
            height: 140 / 7 - 10 + '%',
            axisLabel: {
                interval: 0
            }
        });
        series.push({
            singleAxisIndex: idx,
            coordinateSystem: 'singleAxis',
            type: 'scatter',
            data: [],
            name: days[idx],
            symbolSize: function (dataItem) {
                return dataItem[1];
            }
        });
    });
    data.forEach(function (dataItem) {
        series[dataItem[0]].data.push([dataItem[1], dataItem[2]]);
    });

    // console.log(singleAxis)
    // console.log(series)
    var option2 = {
        grid: {
            top: '50px'
        },
        tooltip: {
            position: 'right'
        },
        title: [],
        singleAxis: singleAxis,
        series: series
    };
    myChart2.setOption(option2);
    window.onresize = myChart2.resize();
}