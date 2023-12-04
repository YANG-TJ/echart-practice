import { ref } from 'vue'
export const useLoading = () => {
    const isLoading = ref(true)
    const handleLoading = (state:boolean) => {
        isLoading.value = state
    }
    return {
        isLoading,
        handleLoading
    }
}
