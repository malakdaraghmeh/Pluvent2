"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export default function useSyncedLocale() {
    const lang = useLocale();
    const pathname = usePathname();
    const currentLang = pathname.split("/")[1];

    const isReady = lang === currentLang;

    return { lang, isReady };
}
