// 基于准备好的dom，初始化echarts实例
var myChart3 = echarts.init(document.getElementById('training'));
option3 = {
  parallelAxis: [
    {
      dim: 0,
      name: 'Years',
      left: 50,
      type: 'category',
      data: ['1980~1984', '1985~1989', '1990~1994', '1995~1999', '2000~2004', '2005~2011']
    },
    { dim: 1,max:100, name: 'T:5' },
    { dim: 2,max:100, name: 'T:10' },
    { dim: 3,max:100, name: 'T:15' },
    { dim: 4,max:100, name: 'T:20' },
    { dim: 5,max:100, name: 'T:25' },
    { dim: 6,max:100, name: 'T:30' },
    { dim: 7,max:100, name: 'T:40' },
    { dim: 8,max:100, name: 'T:45' },
    { dim: 9,max:100, name: 'T:50' },
    { dim: 10,max:100, name: 'T:55' },
    { dim: 11,max:100, name: 'T:60' },
    { dim: 12,max:100, name: 'T:65' },
    { dim: 13,max:100, name: 'T:70' },
    { dim: 14,max:100, name: 'T:75' },
    { dim: 15,max:100, name: 'T:80' },
    { dim: 16,max:100, name: 'T:85' },
    { dim: 17,max:100, name: 'T:90' },
  ],
  series: {
    type: 'parallel',
    lineStyle: {
      width: 4
    },
    data: [
      [ '1980~1984', 46,54,60,72,78,80,83,84,86,87,85,83,82,84,85,82,82],
      [ '1985~1989',56,54,56,68,71,74,76,77,77,77,75,78,73,74,75,72,72],
      [ '1990~1994',71,76,78,72,73,74,74,78,80,81,82,81,81,84,82,82,81],
      [ '1995~1999',73,77,80,81,82,82,83,85,86,87,90,87,85,86,85.5,86.5,87],
      [ '2000~2004',72,77,83,82,78,82,84,86,86,87,91,82,81,84,86,86,86],
      [ '2005~2011',76,79,83,78,81,83,86,87,88,89,90,89,90,91,92,90,89]
    ]
  }
};
myChart3.setOption(option3);
window.onresize = myChart3.resize();