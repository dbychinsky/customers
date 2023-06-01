export function getClassName(value: string, calcAmount: string): boolean {
    let result = false;
    if (value === calcAmount) {
        result = true;
    }
    return result
}