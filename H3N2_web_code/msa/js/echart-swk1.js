// 基于准备好的dom，初始化echarts实例

// 在329长度的序列中，取下列序号对应位置的字母
var index_list = [50, 57, 121, 122, 124, 129, 131, 132, 133, 135, 137, 140, 142, 143, 144, 145, 146, 152, 155, 156, 157, 157, 158, 159, 160, 164, 172, 173, 188, 189, 190, 193, 196, 197, 207, 208, 216, 217, 219, 225, 226, 240, 244, 260, 275, 276, 278, 279]

//字母与数字的映射关系，除此外的其他字母一律映射为0
var mapping = {
    'A': 1,
    'R': 2,
    'N': 3,
    'D': 4,
    'C': 5,
    'Q': 6,
    'E': 7,
    'H': 8,
    'I': 9,
    'L': 10,
    'K': 11,
    'M': 12,
    'F': 13,
    'P': 14,
    'S': 15,
    'T': 16,
    'W': 17,
    'Y': 18,
    'V': 19,
    'G': 20
}

var option1 = {
    title: {
        // text: '46 Index'
    },
    legend: {
        //add 序列名称
        // data: ['>A/BRAZIL/1742/2005', '>A/MOSCOW/10/1999']
        data: []
    },
    radar:
        {
            // shape: 'circle',
            indicator: [
                {name: '50', max: 21},
                {name: '57', max: 21},
                {name: '121', max: 21},
                {name: '122', max: 21},
                {name: '124', max: 21},
                {name: '129', max: 21},
                {name: '131', max: 21},
                {name: '132', max: 21},
                {name: '133', max: 21},
                {name: '135', max: 21},
                {name: '137', max: 21},
                {name: '140', max: 21},
                {name: '142', max: 21},
                {name: '143', max: 21},
                {name: '144', max: 21},
                {name: '145', max: 21},
                {name: '146', max: 21},
                {name: '152', max: 21},
                {name: '155', max: 21},
                {name: '156', max: 21},
                {name: '157', max: 21},
                {name: '158', max: 21},
                {name: '159', max: 21},
                {name: '160', max: 21},
                {name: '164', max: 21},
                {name: '172', max: 21},
                {name: '173', max: 21},
                {name: '188', max: 21},
                {name: '189', max: 21},
                {name: '190', max: 21},
                {name: '193', max: 21},
                {name: '196', max: 21},
                {name: '197', max: 21},
                {name: '207', max: 21},
                {name: '208', max: 21},
                {name: '216', max: 21},
                {name: '217', max: 21},
                {name: '219', max: 21},
                {name: '255', max: 21},
                {name: '226', max: 21},
                {name: '240', max: 21},
                {name: '244', max: 21},
                {name: '260', max: 21},
                {name: '275', max: 21},
                {name: '276', max: 21},
                {name: '278', max: 21},
                {name: '279', max: 21}
            ]
        },
    series: [
        {
            name: 'Budget vs spending',
            type: 'radar',
            top:'50px',
            // data: [
            //     {
            //         value: [9, 9, 3, 7, 13, 19, 6, 3, 20, 15, 1, 2, 15, 3, 3, 15, 13, 17, 8, 10, 11, 13, 11, 18, 3, 11, 13, 3, 4, 6, 10, 6, 1, 2, 15, 9, 20, 2, 19, 14, 4, 9, 2, 11, 5, 15, 7],
            //         name: '>A/BRAZIL/1742/2005'
            //     },
            //     {
            //         value: [9, 9, 3, 7, 13, 19, 6, 3, 20, 15, 1, 2, 15, 9, 3, 15, 13, 17, 6, 10, 11, 18, 2, 18, 3, 11, 13, 15, 0, 6, 10, 6, 1, 2, 15, 9, 20, 2, 9, 15, 4, 9, 2, 11, 5, 15, 7],
            //         name: '>A/MOSCOW/10/1999'
            //     }
            // ]
            data: []
        }
    ]
};

var myChart1 = {}
window.onload = function () {
    myChart1 = echarts.init(document.getElementById('test1'));
    myChart1.setOption(option1);
    window.onresize = myChart1.resize();
}

function refreshData(data) {
    option1.legend.data = data.name
    option1.series[0].data = data.seq;
    myChart1.setOption(option1);
    window.onresize = myChart1.resize();
}

