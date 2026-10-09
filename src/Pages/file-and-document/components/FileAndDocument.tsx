import PageHeader from '@/components/ui/PageHeader';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, Search } from '@/assets';
import FileDocuments from '../../projects/components/FileDocuments';
import { fileDocumentsData } from '../../projects/data/fileDocuments';

export default function FileAndDocument() {
    const { t, i18n } = useTranslation('files');
    const [searchQuery, setSearchQuery] = useState('');
    const isArabic = i18n.language.startsWith('ar');
    const textAlign = isArabic ? 'text-right' : 'text-left';

    const filteredFiles = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        if (!query) return fileDocumentsData;

        return fileDocumentsData.filter(
            file =>
                file.fileName.toLowerCase().includes(query) ||
                file.uploadedBy.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <main className="flex min-h-screen w-full flex-col gap-5">
            <PageHeader title={t('title')} description={t('subtitle')} />

            <section className="flex w-full flex-col gap-4 rounded-[24px] border border-[#ECEFF4] bg-white p-4 sm:p-5 md:p-6">
                <div className="flex w-full items-center gap-[10px]">
                    <div className="flex h-[48px] min-w-0 flex-1 items-center gap-[10px] rounded-[20px] border-[0.5px] border-[#D9D9D9] bg-white px-[14px]">
                        <Search className="shrink-0" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={event => setSearchQuery(event.target.value)}
                            placeholder={t('searchPlaceholder')}
                            className={`w-full min-w-0 bg-transparent text-[14px] font-normal text-[#888282] outline-none placeholder:text-[#888282] ${textAlign}`}
                        />
                    </div>

                    <button
                        type="button"
                        aria-label={t('filter')}
                        className="flex h-[48px] w-[56px] shrink-0 items-center justify-center rounded-[16px] border-[0.5px] border-[#D9D9D9] bg-white transition-colors hover:bg-[#F8F8FA]"
                    >
                        <Filter />
                    </button>
                </div>

                <FileDocuments
                    files={filteredFiles}
                    variant="all"
                    showTitle={false}
                    showViewAll={false}
                    showUpload
                />
            </section>
        </main>
    );
}
