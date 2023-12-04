<template>
    <header class="w-screen py-2 relative min-h-fit flex justify-between items-center shadow-sm h-12 px-2">
        <button class="sm:h-8 h-7 rounded-full aspect-square flex justify-center items-center hover:bg-slate-100 bg-white"
            :title="chartIcon === barChart ? '切換barchart' : '切換linechart'" @click="handleChange">
            <img :class="['icon']" :src="chartIcon" :alt="chartIcon === barChart ? '切換barchart' : '切換linechart'" />
        </button>
        <div :class="['rounded-full border-0 sm:w-16 w-12 relative sm:h-8 h-7']">
            <img :class="['icon', currentIcon === 'dark'
                ? 'sm:translate-x-[34px] translate-x-[1.4rem]'
                : 'left-1',
            ]" :src="modeIcon" :alt="`${currentIcon} mode`" @click="handleTheme" />
        </div>
    </header>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue'
import { chartKey, setChartKey, themeKey, setThemeKey } from '@/../types'
import sun from '@/assets/sun.svg'
import moon from '@/assets/moon.svg'
import lineChart from '@/assets/line-chart.svg'
import barChart from '@/assets/bar-chart.svg'
const chart = inject(chartKey)
const setChart = inject(setChartKey)
const theme = inject(themeKey)
const setTheme = inject(setThemeKey)
const currentIcon = ref('light')
const modeIcon = ref(sun)
const chartIcon = ref(barChart)
const handleTheme = () => {
    if (theme?.theme) {
        if (theme.theme === 'light') {
            setTheme?.({ theme: 'dark' })
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
            modeIcon.value = sun
            currentIcon.value = 'light'
        } else {
            setTheme?.({ theme: 'light' })
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
            modeIcon.value = moon
            currentIcon.value = 'dark'
        }
    }
}
const handleChange = () => {
    if (chart?.number) {
        setChart?.({ number: 0 })
        chartIcon.value = barChart
    } else {
        setChart?.({ number: 1 })
        chartIcon.value = lineChart
    }
}
</script>
<style lang="scss" scoped>
.icon {
    @apply sm:h-6 h-5 absolute my-auto inset-y-0 rounded-full transition-transform duration-200 ease-in sm:cursor-pointer;
}
</style>
