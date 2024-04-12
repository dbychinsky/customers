/**
 * @description Копирование в буфер обмена.
 * @param {string} value - Value.
 */
export async function copyToClipboard(value: string) {
    navigator.clipboard.writeText(value).then();
}
