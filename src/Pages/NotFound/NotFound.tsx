import { Logo } from '../../assets';
import ButtonLink from '../../components/ui/ButtonLink';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
    const { t, i18n } = useTranslation('notFound');
    const lang = i18n.language;

    return (
        <div className="custom-container border bg-white text-main flex flex-col items-center justify-center py-10 text-center px-4 my-4 rounded-xl">
            <img src={Logo} alt={t('logoAlt')} className="w-80 h-auto" />
            <h1 className="text-9xl font-bold mb-4">404</h1>
            <h2 className="text-3xl font-semibold mb-2">{t('title')}</h2>
            <p className="text-lg mb-8">{t('description')}</p>

            <ButtonLink className="rounded-xl !bg-main !text-white px-8 py-3 font-semibold" to={`/${lang}`}>
                {t('backToHome')}
            </ButtonLink>
        </div>
    );
}


