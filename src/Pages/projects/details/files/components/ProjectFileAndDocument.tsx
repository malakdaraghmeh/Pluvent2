import { useTranslation } from 'react-i18next';
import FileDocuments from '../../../components/FileDocuments';
import { fileDocumentsData } from '../../../data/fileDocuments';

export default function ProjectFileAndDocument() {
    const { t, i18n } = useTranslation('files');
    const isArabic = i18n.language.startsWith('ar');
    const textAlign = isArabic ? 'text-right' : 'text-left';

    return (
        <main className="flex min-h-screen w-full flex-col gap-5">
            <div className={textAlign}>
                <h1 className="text-[24px] font-semibold leading-[30px] text-[#12115C]">
                    {t('title')}
                </h1>
                <p className="mt-1 text-[12px] font-normal leading-[18px] text-[#7E8492]">
                    {t('subtitle')}
                </p>
            </div>

            <section className="w-full rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 md:p-6">
                <FileDocuments
                    files={fileDocumentsData}
                    variant="all"
                    showTitle={false}
                    showViewAll={false}
                    showUpload
                />
            </section>
        </main>
    );
}
