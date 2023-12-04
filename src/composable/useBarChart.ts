import * as echarts from 'echarts/core'
import { ComposeOption } from 'echarts/core'
import { UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  DatasetComponent,
  DatasetComponentOption,
  TransformComponent
} from 'echarts/components'

import {
  LineChart,
  LineSeriesOption,
  BarChart,
  BarSeriesOption
} from 'echarts/charts'

type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | DatasetComponentOption
>

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  CanvasRenderer,
  UniversalTransition
])

const useBarChart = (element: HTMLDivElement, mode:string) => {
if (element) {
  const instance = echarts.getInstanceByDom(element)
  if (instance) {
    instance.dispose()
  }
}
  const myChart = echarts.init(element, mode)
  const setOption = (optionData: any) => {
    const option: ECOption = {
      tooltip: {},
      xAxis: {
        data: ['襯衫', '羊毛衫', '雪紡衫', '褲子', '高跟鞋', '襪子']
      },
      yAxis: {},
      ...optionData
    }
    return myChart.setOption(option)
  }

  const resize = () => myChart.resize()
  return { setOption, resize }
}

export default useBarChart
