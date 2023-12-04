<template>
  <NavBar />
  <div ref="container" class="container max-w-7xl text-center grid gap-5 sm:mt-20 mt-5 mx-auto sm:px-5">
    <component :is="currentChart[num.number]"></component>
  </div>
</template>
<script lang="ts" setup>
import { provide, ref, markRaw } from 'vue'
import {
  chartKey, setChartKey, Chart,
  themeKey, setThemeKey, Theme
} from '../types'
import NavBar from '@/components/NavBar.vue'
import LineChart from '@/components/LineChart.vue'
import BarChart from '@/components/BarChart.vue'
const lineChart = markRaw(LineChart)
const barChart = markRaw(BarChart)
const currentChart = ([lineChart, barChart]) // change component
const num = ref({ number: 0 })
provide(chartKey, num.value)
const setChart = (params: Chart) => {
  num.value.number = params.number
}
provide(setChartKey, setChart)

// change light/dark mode
const theme = ref({ theme: 'dark' })
provide(themeKey, theme.value)
const setTheme = (params: Theme) => {
  theme.value.theme = params.theme
}
provide(setThemeKey, setTheme)
</script>
