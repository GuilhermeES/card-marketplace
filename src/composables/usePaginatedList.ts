import { ref, shallowRef } from 'vue'

type PaginatedResponse<T> = { list: T[]; more: boolean }

export function usePaginatedList<T>(
    fetcher: (params: { page: number; rpp: number }) => Promise<PaginatedResponse<T>>,
    opts?: { rpp?: number }
) {
    const items = shallowRef<T[]>([])
    const page = ref(1)
    const rpp = ref(opts?.rpp ?? 10)
    const more = ref(true)
    const loading = ref(false)

    async function fetch(reset = false) {
        if (loading.value) return
        loading.value = true

        try {
            if (reset) {
                page.value = 1
                items.value = []
                more.value = true
            }

            const data = await fetcher({ page: page.value, rpp: rpp.value })

            items.value = reset
                ? data.list
                : items.value.concat(data.list)
            more.value = data.more
        } finally {
            loading.value = false
        }
    }

    async function loadMore() {
        if (!more.value || loading.value) return
        page.value++
        await fetch(false)
    }

    return { items, page, rpp, more, loading, fetch, loadMore }
}