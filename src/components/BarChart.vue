<template>
    <h2>{{ data.title }}</h2>
    <div ref="containerRef">
        <div :class="['chart', isLoading ? 'loading' : '']" ref="chartRef"></div>
    </div>
</template>

<script setup lang="ts">
import {
    ref,
    onMounted,
    onUnmounted,
    nextTick,
    computed,
    inject,
    watch
} from 'vue'
import useBarChart from '@/composable/useBarChart'
import { themeKey } from '@/../types'
import { useLoading } from '@/composable/useLoading'
const data = ref({ title: '銷售統計' })
const parentHeight = ref(0)
const containerRef = ref<HTMLDivElement>()
const chartRef = ref<HTMLDivElement>()
const { isLoading, handleLoading } = useLoading()
const currentTheme = computed(() => {
    return theme?.theme === 'dark' ? '' : 'dark'
})
const fakeDate = {
    backgroundColor: '',
    series: [
        {
            name: '銷量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }
    ]
}
const computedParentHeight = computed({
    get: () => {
        return parentHeight.value
    },
    set: (val: number) => {
        parentHeight.value = val;
        (chartRef.value as any).style.height = `${val}px`
    }
})
const theme = inject(themeKey)
let chartInstance: ReturnType<typeof useBarChart>

onMounted(() => {
    nextTick(() => {
        if (chartRef.value) {
            parentHeight.value = (containerRef.value as HTMLDivElement).clientHeight
            computedParentHeight.value = parentHeight.value
        }
    })
    watch(
        [theme],
        () => {
            handleLoading(true)
            chartInstance = useBarChart(
                chartRef.value as HTMLDivElement,
                currentTheme.value as string
            )
            const { setOption, resize } = chartInstance
            setTimeout(() => {
                setOption(fakeDate)
                window.addEventListener('resize', () => {
                    if (!chartInstance) return
                    resize()
                })
                handleLoading(false)
            }, 1000)
        },
        { immediate: true }
    )
})

onUnmounted(() => {
    const { resize } = chartInstance
    window.removeEventListener('resize', () => {
        resize()
    })
})
</script>
