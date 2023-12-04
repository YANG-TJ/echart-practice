import { InjectionKey } from 'vue'
export interface Content {
  [key: string]: number[] | string;
}
export interface Items {
  [key: string]: string | Array<Content> | string[] | Content;
}
// 切換 chart元件順位
export interface Chart {
  number: number;
}
export const chartKey: InjectionKey<Chart> = Symbol(0)
export type setChart = (chart: Chart) => void;
export const setChartKey: InjectionKey<setChart> = Symbol(0)

// 切換 dark/light mode
export interface Theme {
  theme: string;
}
export const themeKey: InjectionKey<Theme> = Symbol('')
export type setTheme = (Theme: Theme) => void;
export const setThemeKey: InjectionKey<setTheme> = Symbol('')
