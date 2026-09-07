export const formatDate = (dateStr: string, isAr: boolean, timezone?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    if (timezone) {
        options.timeZone = timezone;
    }

    return d.toLocaleString(isAr ? 'ar-EG' : 'en-US', options);
};

export const formatTime = (dateStr: string, isAr: boolean, timezone?: string) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);

    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };

    if (timezone) {
        options.timeZone = timezone;
    }

    return d.toLocaleTimeString(isAr ? 'ar-EG' : 'en-US', options);
};

export const formatDateTime = (dateStr: string, isAr: boolean) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);

    return d.toLocaleString(isAr ? 'ar-EG' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};