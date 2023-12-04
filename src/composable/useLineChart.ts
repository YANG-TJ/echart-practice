import * as echarts from 'echarts/core'
import { XAXisOption, YAXisOption } from 'echarts/types/dist/shared'
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponentOption,
  TooltipComponentOption,
  DatasetComponentOption
} from 'echarts/components'
import { LineChart, BarChart, LineSeriesOption } from 'echarts/charts'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { Content } from '@/../types'
export type ECOption =echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | XAXisOption
  | YAXisOption
  | LineSeriesOption
  | DatasetComponentOption
>
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  MarkLineComponent,
  MarkPointComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  BarChart
])

export const useLineChart = (element: HTMLDivElement) => {
  if (element !== null && element !== undefined) {
    const instance = echarts.getInstanceByDom(element)
    if (instance) {
      instance.dispose()
    }
  }
  let lineChart: echarts.ECharts
  const echartInit = (currentElement:HTMLDivElement, mode:string) => {
    if (element !== null && element !== undefined) {
      const instance = echarts.getInstanceByDom(element)
      if (instance) {
        instance.dispose()
      }
    }
    lineChart = echarts.init(currentElement, mode)
  }
  const setOption = (data:ECOption) => {
    const option = {
      backgroundColor: '',
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        type: 'scroll'
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {},
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        containLabel: true,
        tooltip: {
          trigger: 'axis'
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.xAxis,
        axisLabel: {
          formatter: '{value} 時'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: (data.maxData as Content).title,
          type: 'line',
          data: (data.maxData as Content).data,
          markPoint: {
            data: [
              { type: 'max', name: 'Max' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
              [
                {
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max'
                  },
                  type: 'max',
                  name: '最高點'
                }
              ]
            ]
          }
        },
        {
          name: (data.minData as Content).title,
          type: 'line',
          data: (data.minData as Content).data,
          markPoint: {
            data: [
              { name: '日最低', value: -2, xAxis: 1, yAxis: -1.5 },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
              [
                {
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'min'
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Min'
                  },
                  type: 'min',
                  name: '最高點'
                }
              ]
            ]
          },
          color: '#02e6b0'
        }
      ]
    }
    return lineChart.setOption(option)
  }
  const resize = () => lineChart.resize()
  return {
    echartInit,
    setOption,
    resize
  }
}
