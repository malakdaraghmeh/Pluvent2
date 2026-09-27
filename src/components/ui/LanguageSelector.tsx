import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

const LanguageSelector = ({ onClick }: { onClick?: () => void }) => {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const isAr = i18n.language === 'ar';

    const handleLanguageChange = (newLang: string) => {
        i18n.changeLanguage(newLang);
        localStorage.setItem('i18nextLng', newLang);

        const segments = location.pathname.split('/');
        if (segments[1] === 'ar' || segments[1] === 'en') {
            segments[1] = newLang;
        } else {
            segments.splice(1, 0, newLang);
        }

        const newPath = segments.join('/');
        navigate(newPath, { replace: true });
        onClick?.();
    };

    return (
        <button
            onClick={() => handleLanguageChange(isAr ? 'en' : 'ar')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white transition-all duration-300 hover:bg-white/10 active:scale-95 font-medium text-sm"
            aria-label="Toggle Language"
        >
            <span>{isAr ? 'English' : 'العربية'}</span>
        </button>
    );
};

export default LanguageSelector;
