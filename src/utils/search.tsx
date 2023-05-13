import { RedirectWithKey } from "@/types/redirectType";

const searchRedirectSource = (items: RedirectWithKey[], search: string) => {
    if (!search) return items
    const regexp = new RegExp(search, 'i')
    return items.filter((item) => regexp.test(item.source.trim()))
}

const searchRedirectDestination = (items: RedirectWithKey[], search: string) => {
    if (!search) return items
    const regexp = new RegExp(search, 'i')
    return items.filter((item) => regexp.test(item.destination.trim()))
}

export { searchRedirectSource, searchRedirectDestination }
