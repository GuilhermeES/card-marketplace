import {computed, shallowRef} from 'vue'

export function useSelectionSet<T extends string = string>() {
    const selected = shallowRef<Set<T>>(new Set<T>());

    const count = computed(() => selected.value.size)

    function has(id: T) {
        return selected.value.has(id)
    }

    function toggle(id: T) {
        const next = new Set(selected.value)
        next.has(id) ? next.delete(id) : next.add(id)
        selected.value = next
    }

    function clear() {
        selected.value = new Set()
    }

    function toArray() {
        return Array.from(selected.value)
    }

    return { selected, count, has, toggle, clear, toArray }
}