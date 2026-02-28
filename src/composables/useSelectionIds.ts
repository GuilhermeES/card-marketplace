import { computed, ref } from 'vue'

export function useSelectionIds() {
    const ids = ref<string[]>([])

    function toggle(id: string) {
        const idx = ids.value.indexOf(id)
        if (idx >= 0) ids.value.splice(idx, 1)
        else ids.value.push(id)
    }

    function isSelected(id: string) {
        return ids.value.includes(id)
    }

    function clear() {
        ids.value = []
    }

    const count = computed(() => ids.value.length)

    return { ids, toggle, isSelected, clear, count }
}