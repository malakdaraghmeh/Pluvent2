import { useEffect } from 'react';

export default function useDynamicMeta(title: string, description: string) {
    useEffect(() => {
        document.title = title;
        const desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute('content', description);
    }, [title, description]);
}
