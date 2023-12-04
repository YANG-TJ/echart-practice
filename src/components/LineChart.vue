<template>
    <h2>{{ fakeData.title }}</h2>
    <div class="">
        <div id="lineChart" ref="lineChart" :class="['chart select-none', isLoading ? 'loading' : '']"></div>
    </div>
    <button class="text-1st-color w-fit mx-auto" @click="changeRender()">
        Render Data
    </button>
</template>
<script setup lang="ts">
import { onMounted, ref, watch, inject, computed } from 'vue'
import { useLineChart } from '@/composable/useLineChart'
import { Items, themeKey } from '@/../types'
import { useLoading } from '@/composable/useLoading'

const lineChart = ref<HTMLDivElement | null>(null)
const theme = inject(themeKey)
const currentTheme = computed(() => {
    return theme?.theme === 'dark' ? '' : 'dark'
})
const { isLoading, handleLoading } = useLoading()
const fakeData = ref<Items>({
    title: '一天氣溫',
    xAxis: ['00', '03', '06', '09', '12', '15', '18', '21', '00'],
    maxData: {
        title: '最高溫',
        data: [13, 20, 21, 30, 31, 31, 23, 12, 9]
    },
    minData: {
        title: '最低溫',
        data: [12, 12, 15, 15, 22, 15, 10, 10, 8]
    }
})
const fakeData1 = {
    title: '一天氣溫',
    xAxis: ['00', '03', '06', '09', '12', '15', '18', '21', '00'],
    maxData: {
        title: '最高溫',
        data: [22, 20, 21, 30, 35, 31, 23, 12, 29]
    },
    minData: {
        title: '最低溫',
        data: [7, 12, 15, 15, 22, 15, 10, 10, 8]
    }
}
// mock data re-render
const changeRender = () => {
    fakeData.value = fakeData1
}
onMounted(() => {
    const { setOption, resize, echartInit } = useLineChart(lineChart.value as HTMLDivElement)
    watch(
        [fakeData, theme],
        (current, old) => {
            handleLoading(true)
            if (lineChart.value !== null && setOption && resize && echartInit) {
                if (current !== old) {
                    echartInit(lineChart.value as HTMLDivElement, currentTheme.value)
                    setTimeout(() => {
                        setOption(fakeData.value)
                        window.addEventListener('resize', () => {
                            resize()
                        })
                        handleLoading(false)
                    }, 1000)
                }
            }
        },
        { immediate: true, deep: true }
    )
})
</script>
