/**
 * Presentation helpers. A generated table or details page imports one of these
 * because a FIELD declared `presentation.format`, not because of what it is.
 */
export function formatCurrency(value: number, currency = 'USD', locale = 'en-US'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export function formatDate(
    value: Date | string,
    options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' },
    locale = 'en-US',
): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleDateString(locale, options);
}

export function formatDateShort(value: Date | string, locale = 'en-US'): string {
    return formatDate(value, { year: 'numeric', month: 'short', day: 'numeric' }, locale);
}

export function formatDateTime(value: Date | string, locale = 'en-US'): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    return date.toLocaleString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

// a human changed this
