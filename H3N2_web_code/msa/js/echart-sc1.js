// import * as echarts from 'echarts';

// import ecStat from 'echarts-stat';

var chartDom = document.getElementById('cccp1');
var myChartSC1 = echarts.init(chartDom);
var optionSC1;

// See https://github.com/ecomfe/echarts-stat
echarts.registerTransform(ecStat.transform.clustering);

var dataSC1 = deal2D()  //2d文件
var CLUSTER_COUNT = 8;
var DIENSIION_CLUSTER_INDEX = 2;
var COLOR_ALL = [
  '#37A2DA',
  '#e06343',
  '#37a354',
  '#b55dba',
  '#b5bd48',
  '#8378EA',
  '#96BFFF'
];
var pieces = [];
for (var i = 0; i < CLUSTER_COUNT; i++) {
  pieces.push({
    value: i,
    label: 'cluster ' + i,
    color: COLOR_ALL[i]
  });
}
optionSC1 = {
  dataset: [
    {
      source: dataSC1
    },
    {
      transform: {
        type: 'ecStat:clustering',
        // print: true,
        config: {
          clusterCount: CLUSTER_COUNT,
          outputType: 'single',
          outputClusterIndexDimension: DIENSIION_CLUSTER_INDEX
        }
      }
    }
  ],
  tooltip: {
    position: 'top'
  },
  visualMap: {
    type: 'piecewise',
    top: 'middle',
    min: 0,
    max: CLUSTER_COUNT,
    left: 10,
    splitNumber: CLUSTER_COUNT,
    dimension: DIENSIION_CLUSTER_INDEX,
    pieces: pieces
  },
  grid: {
    left: 120
  },
  xAxis: {},
  yAxis: {},
  series: {
    type: 'scatter',
    encode: { tooltip: [0, 1] },
    symbolSize: 15,
    itemStyle: {
      borderColor: '#555'
    },
    datasetIndex: 1
  }
};

optionSC1 && myChartSC1.setOption(optionSC1);
