import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Arrow, True } from '@/assets';
import { SupportBackgroundImage as bgSupport } from '@/assets';
import { SupportTicketImage as supportTicket } from '@/assets';
import { WarrantyBackgroundImage as warrantyBg } from '@/assets';
import ProjectSupportSection from './ProjectSupportSection';

const SupportTicket = () => {
    const { t, i18n } = useTranslation('supportTickets');
    const isArabic = i18n.language.startsWith('ar');
    const { locale = 'en', id } = useParams();

    const features = t('features', {
        returnObjects: true,
    }) as string[];

    const warrantyTicketUrl = id
        ? `/${locale}/support/create?projectId=${id}&type=warranty`
        : `/${locale}/support/create?type=warranty`;

    return (
        <ProjectSupportSection
            title={t('title')}
            className="flex min-w-0 flex-col gap-4 p-4 sm:p-5 md:p-6"
        >
            <div className="grid w-full min-w-0 grid-cols-1 items-center gap-6 md:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[minmax(190px,0.75fr)_minmax(240px,1fr)_minmax(280px,0.95fr)] 3xl:grid-cols-[minmax(240px,0.8fr)_minmax(320px,1fr)_minmax(360px,0.9fr)] 4xl:grid-cols-[minmax(280px,0.8fr)_minmax(360px,1fr)_minmax(400px,0.9fr)]">
                <div className="flex min-w-0 items-center justify-center">
                    <img
                        src={supportTicket}
                        alt=""
                        width={300}
                        height={220}
                        className="h-auto w-full max-w-[250px] object-contain 3xl:max-w-[280px] 4xl:max-w-[300px]"
                    />
                </div>

                <div
                    className={`flex min-w-0 flex-col gap-3 ${
                        isArabic ? 'items-end text-right' : 'items-start text-left'
                    }`}
                >
                    <h3 className="break-words text-[20px] font-bold text-[#12115C]">
                        {t('warrantySupport')}
                    </h3>

                    <p className="max-w-full break-words text-[14px] leading-[1.6] text-[#6B7280]">
                        {t('description')}
                    </p>

                    <div className="flex flex-col gap-2">
                        {features.map(feature => (
                            <div
                                key={feature}
                                className={`flex min-w-0 items-start gap-2 ${
                                    isArabic ? 'flex-row-reverse text-right' : 'flex-row text-left'
                                }`}
                            >
                                <span className="mt-[1px] flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#39E1D7] text-[8px] font-bold text-white">
                                    <True />
                                </span>

                                <span className="min-w-0 break-words text-[16px] leading-[24px] text-[#12115C]">
                                    {feature}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div
                    className="flex min-h-[258px] w-full min-w-0 flex-col gap-6 rounded-[24px] border-[0.5px] border-[#39E1D7] bg-[#39E1D70D] bg-cover bg-center bg-no-repeat p-5 shadow-[0px_1px_3px_3px_#0000000D] md:col-span-2 xl:col-span-1 xl:p-6 3xl:min-h-[278px] 4xl:min-h-[290px]"
                    style={{
                        backgroundImage: `url(${warrantyBg})`,
                    }}
                >
                    <div className="flex min-w-0 items-center gap-2">
                        <img
                            src={bgSupport}
                            alt=""
                            width={30}
                            height={30}
                            className="h-[30px] w-[30px] shrink-0 object-contain"
                        />

                        <h3 className="min-w-0 break-words text-[22px] font-bold text-[#12115C] 3xl:text-[24px]">
                            {t('status.title')}
                        </h3>
                    </div>

                    <p className="min-w-0 break-words text-[16px] leading-[1.6] text-[#12115C]">
                        {t('status.description')}
                    </p>
                    <Link
                        to={warrantyTicketUrl}
                        className="mt-auto flex min-h-[40px] w-full min-w-0 items-center justify-center rounded-[10px] bg-[#12115C] px-3 py-2 text-center text-white transition hover:opacity-90"
                    >
                        {isArabic ? (
                            <span className="relative inline-flex items-center justify-center whitespace-nowrap text-[14px] min-[1600px]:text-[15px] 3xl:text-[16px]">
                                <span>{t('status.buttonText')}</span>

                                <span className="absolute -left-5 top-1/2 flex -translate-y-1/2 rotate-180 items-center">
                                    <Arrow />
                                </span>
                            </span>
                        ) : (
                            <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-[14px] min-[1600px]:text-[15px] 3xl:text-[16px]">
                                <span>{t('status.buttonText')}</span>

                                <span className="flex shrink-0 items-center">
                                    <Arrow />
                                </span>
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </ProjectSupportSection>
    );
};

export default SupportTicket;
