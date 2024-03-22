export function getIdForEmptyList(id: string): string {
    let result = 'fullList'
    if (id === '0') {
        result = 'emptyList'
    }
    return result
}