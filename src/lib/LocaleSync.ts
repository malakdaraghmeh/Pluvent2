'use client';
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function LocaleSync({ locale }) {
    useEffect(() => {
        const current = Cookies.get("locale");
        if (current !== locale) {
            Cookies.set("locale", locale);
        }
    }, [locale]);

    return null;
}
