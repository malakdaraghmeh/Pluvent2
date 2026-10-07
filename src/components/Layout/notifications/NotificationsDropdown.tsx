import { useMemo, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NotificationCheckCircleIcon as checkCircleIcon } from '@/assets';
import { NotificationCreditCardIcon as creditCardIcon } from '@/assets';
import { NotificationFileTextIcon as fileTextIcon } from '@/assets';
import { NotificationGitPullRequestIcon as gitPullRequestIcon } from '@/assets';
import { NotificationHelpCircleIcon as helpCircleIcon } from '@/assets';
import { NotificationMessageSquareIcon as messageSquareIcon } from '@/assets';
import { NotificationShieldIcon as shieldIcon } from '@/assets';
import Modal from '@/components/ui/modal';

type NotificationFilter = 'all' | 'unread' | 'action';
type NotificationActionVariant = 'fill' | 'outline' | 'link';

type NotificationItem = {
    id: number;
    translationKey: string;
    icon: string;
    iconBackground: string;
    categoryColor: string;
    actionVariant: NotificationActionVariant;
    actionRequired: boolean;
    unread: boolean;
    route: string;
};

type NotificationsDropdownProps = {
    isOpen: boolean;
    onClose: () => void;
    triggerRef: RefObject<HTMLElement | null>;
};

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
    {
        id: 1,
        translationKey: 'payment',
        icon: creditCardIcon,
        iconBackground: '#FFECEB',
        categoryColor: '#FF5E5B',
        actionVariant: 'fill',
        actionRequired: true,
        unread: true,
        route: '/projects/1/change-requests/CR-004/payment',
    },
    {
        id: 2,
        translationKey: 'changeRequest',
        icon: gitPullRequestIcon,
        iconBackground: '#FFF4E5',
        categoryColor: '#F59E0B',
        actionVariant: 'outline',
        actionRequired: true,
        unread: true,
        route: '/projects/1/change-requests/CR-004',
    },
    {
        id: 3,
        translationKey: 'support',
        icon: helpCircleIcon,
        iconBackground: '#F0EEFF',
        categoryColor: '#635BFF',
        actionVariant: 'outline',
        actionRequired: true,
        unread: true,
        route: '/support/TKT-0042',
    },
    {
        id: 4,
        translationKey: 'files',
        icon: fileTextIcon,
        iconBackground: '#E9FAF5',
        categoryColor: '#25B99A',
        actionVariant: 'link',
        actionRequired: false,
        unread: true,
        route: '/projects/1/files',
    },
    {
        id: 5,
        translationKey: 'warranty',
        icon: shieldIcon,
        iconBackground: '#EAF8FF',
        categoryColor: '#22B8E8',
        actionVariant: 'outline',
        actionRequired: false,
        unread: false,
        route: '/support-plans?projectId=1',
    },
    {
        id: 6,
        translationKey: 'messages',
        icon: messageSquareIcon,
        iconBackground: '#ECEBFF',
        categoryColor: '#4F46E5',
        actionVariant: 'outline',
        actionRequired: false,
        unread: false,
        route: '/messages',
    },
];

export default function NotificationsDropdown({
    isOpen,
    onClose,
}: NotificationsDropdownProps) {
    const { t, i18n } = useTranslation('notifications');
    const navigate = useNavigate();

    const isArabic = i18n.language.startsWith('ar');
    const currentLocale = isArabic ? 'ar' : 'en';
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const [filter, setFilter] = useState<NotificationFilter>('all');
    const [notifications, setNotifications] =
        useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

    const unreadCount = notifications.filter(
        notification => notification.unread,
    ).length;

    const actionCount = notifications.filter(
        notification => notification.actionRequired,
    ).length;

    const filteredNotifications = useMemo(() => {
        if (filter === 'unread') {
            return notifications.filter(
                notification => notification.unread,
            );
        }

        if (filter === 'action') {
            return notifications.filter(
                notification => notification.actionRequired,
            );
        }

        return notifications;
    }, [filter, notifications]);

    const markAllAsRead = () => {
        setNotifications(current =>
            current.map(notification => ({
                ...notification,
                unread: false,
            })),
        );
    };

    const handleNotificationAction = (route: string) => {
        onClose();
        navigate(`/${currentLocale}${route}`);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            ariaLabel={t('title')}
            overlayClassName="!overflow-hidden !p-0"
            className="!fixed !right-3 !top-[76px] !h-[calc(100dvh-88px)] !w-[calc(100vw-24px)] !max-w-[510px] !overflow-hidden !rounded-[20px] !border !border-[#E5E7EB] !bg-white !shadow-[0_24px_64px_rgba(18,17,92,0.16)] sm:!right-4 sm:!top-[80px] sm:!h-[calc(100dvh-96px)] sm:!w-[calc(100vw-32px)] lg:!right-6 lg:!top-[96px] lg:!h-[calc(100dvh-112px)] lg:!max-h-[799px] xl:!right-8 min-[1440px]:!right-10 min-[1920px]:!right-12 min-[1920px]:!max-w-[560px] min-[2500px]:!right-16 min-[2500px]:!max-w-[620px]"
        >
            <section className="flex h-full min-h-0 w-full flex-col overflow-hidden">
                <header className="flex shrink-0 flex-col gap-3 border-b border-[#ECEFF5] px-4 py-5 sm:min-h-[152px] sm:px-6 sm:py-6 min-[1920px]:gap-4 min-[1920px]:px-7 min-[1920px]:py-7 min-[2500px]:px-8 min-[2500px]:py-8">
                    <div
                        className={`flex w-full items-center justify-between gap-4 ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <h2 className={`min-w-0 font-['Sora'] text-[20px] font-semibold leading-[30px] text-[#12115C] min-[1920px]:text-[22px] min-[2500px]:text-[24px] ${textAlignment}`}>
                            {t('title')}
                        </h2>

                        <button
                            type="button"
                            onClick={markAllAsRead}
                            className={`flex shrink-0 items-center gap-1 font-['Sora'] text-[12px] font-semibold leading-none text-[#12115C] sm:text-[13px] min-[1920px]:text-[14px] ${
                                isArabic ? 'flex-row-reverse' : 'flex-row'
                            }`}
                        >
                            <img
                                src={checkCircleIcon}
                                alt=""
                                className="h-[14px] w-[14px] shrink-0 min-[1920px]:h-4 min-[1920px]:w-4"
                            />
                            <span>{t('markAllAsRead')}</span>
                        </button>
                    </div>

                    <p className={`font-['Sora'] text-[12px] font-normal leading-5 text-[#6B7280] sm:text-[13px] min-[1920px]:text-[14px] ${textAlignment}`}>
                        {t('subtitle')}
                    </p>

                    <div
                        className={`flex w-full flex-wrap items-start gap-x-4 gap-y-2 pt-1 ${
                            isArabic ? 'flex-row-reverse' : 'flex-row'
                        }`}
                    >
                        <TabButton
                            active={filter === 'all'}
                            onClick={() => setFilter('all')}
                        >
                            {t('tabs.all', {
                                count: notifications.length,
                            })}
                        </TabButton>

                        <TabButton
                            active={filter === 'unread'}
                            onClick={() => setFilter('unread')}
                        >
                            {t('tabs.unread', {
                                count: unreadCount,
                            })}
                        </TabButton>

                        <TabButton
                            active={filter === 'action'}
                            onClick={() => setFilter('action')}
                        >
                            {t('tabs.actionRequired', {
                                count: actionCount,
                            })}
                        </TabButton>
                    </div>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [scrollbar-color:#C8CAD3_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C8CAD3] [&::-webkit-scrollbar-thumb:hover]:bg-[#AEB1BB]">
                    {filteredNotifications.map(notification => (
                        <NotificationRow
                            key={notification.id}
                            notification={notification}
                            t={t}
                            isArabic={isArabic}
                            onAction={handleNotificationAction}
                        />
                    ))}

                    {filteredNotifications.length === 0 && (
                        <div className={`flex h-full min-h-[180px] items-center justify-center px-6 font-['Sora'] text-[13px] text-[#6B7280] ${textAlignment}`}>
                            {t('empty')}
                        </div>
                    )}
                </div>
            </section>
        </Modal>
    );
}

type TabButtonProps = {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
};

function TabButton({
    active,
    onClick,
    children,
}: TabButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative h-[26px] shrink-0 whitespace-nowrap font-['Sora'] text-[12px] font-semibold leading-4 transition-colors sm:text-[13px] min-[1920px]:text-[14px] ${
                active
                    ? 'text-[#12115C]'
                    : 'text-[#6B7280]'
            }`}
        >
            {children}

            {active && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-[#3634C7]" />
            )}
        </button>
    );
}

type NotificationRowProps = {
    notification: NotificationItem;
    t: (
        key: string,
        options?: Record<string, unknown>,
    ) => string;
    isArabic: boolean;
    onAction: (route: string) => void;
};

function NotificationRow({
    notification,
    t,
    isArabic,
    onAction,
}: NotificationRowProps) {
    const key = `items.${notification.translationKey}`;
    const textAlignment = isArabic
        ? 'text-right'
        : 'text-left';

    const category = t(`${key}.category`);
    const title = t(`${key}.title`);
    const description = t(`${key}.description`);
    const reference = t(`${key}.reference`);
    const time = t(`${key}.time`);
    const action = t(`${key}.action`);

    return (
        <article
            className={`flex min-h-[124px] w-full flex-col gap-3 border-b border-[#ECEFF5] p-4 sm:flex-row sm:items-start sm:gap-4 min-[1920px]:min-h-[136px] min-[1920px]:p-5 min-[2500px]:min-h-[148px] min-[2500px]:p-6 ${
                notification.unread
                    ? 'bg-[#F8FAFC]'
                    : 'bg-white'
            } ${
                isArabic
                    ? 'sm:flex-row-reverse'
                    : 'sm:flex-row'
            }`}
        >
            <div
                className={`flex min-w-0 flex-1 items-start gap-3 sm:gap-4 ${
                    isArabic
                        ? 'flex-row-reverse'
                        : 'flex-row'
                }`}
            >
                <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg min-[1920px]:h-11 min-[1920px]:w-11 min-[2500px]:h-12 min-[2500px]:w-12"
                    style={{
                        backgroundColor:
                            notification.iconBackground,
                    }}
                >
                    <img
                        src={notification.icon}
                        alt=""
                        className="h-5 w-5 object-contain min-[1920px]:h-[22px] min-[1920px]:w-[22px] min-[2500px]:h-6 min-[2500px]:w-6"
                    />
                </div>

                <div className={`flex min-w-0 flex-1 flex-col gap-1 ${textAlignment}`}>
                    <div
                        className={`flex min-w-0 items-center justify-between gap-3 ${
                            isArabic
                                ? 'flex-row-reverse'
                                : 'flex-row'
                        }`}
                    >
                        <span
                            className="min-w-0 truncate font-['Sora'] text-[11px] font-semibold leading-[14px] min-[1920px]:text-[12px] min-[2500px]:text-[13px]"
                            style={{
                                color:
                                    notification.categoryColor,
                            }}
                        >
                            {category}
                        </span>

                        <div
                            className={`flex shrink-0 items-center gap-1.5 ${
                                isArabic
                                    ? 'flex-row-reverse'
                                    : 'flex-row'
                            }`}
                        >
                            <span className="whitespace-nowrap font-['Sora'] text-[11px] font-normal leading-[14px] text-[#6B7280] min-[1920px]:text-[12px] min-[2500px]:text-[13px]">
                                {time}
                            </span>

                            {notification.unread && (
                                <span className="h-[6px] w-[6px] rounded-full bg-[#FF5E5B]" />
                            )}
                        </div>
                    </div>

                    <h3 className="truncate font-['Sora'] text-[14px] font-semibold leading-[18px] text-[#08040B] min-[1920px]:text-[15px] min-[2500px]:text-[16px]">
                        {title}
                    </h3>

                    {description && (
                        <p className="line-clamp-2 font-['Sora'] text-[12px] font-normal leading-[1.4] text-[#6B7280] min-[1920px]:text-[13px] min-[2500px]:text-[14px]">
                            {description}
                        </p>
                    )}

                    {reference && (
                        <p className="truncate font-['Sora'] text-[11px] font-semibold leading-[14px] text-[#3634C7] min-[1920px]:text-[12px] min-[2500px]:text-[13px]">
                            {reference}
                        </p>
                    )}
                </div>
            </div>

            <div
                className={`flex w-full shrink-0 sm:w-auto ${
                    isArabic
                        ? 'justify-start'
                        : 'justify-end'
                }`}
            >
                <NotificationAction
                    label={action}
                    variant={notification.actionVariant}
                    onClick={() =>
                        onAction(notification.route)
                    }
                />
            </div>
        </article>
    );
}

type NotificationActionProps = {
    label: string;
    variant: NotificationActionVariant;
    onClick: () => void;
};

function NotificationAction({
    label,
    variant,
    onClick,
}: NotificationActionProps) {
    if (variant === 'link') {
        return (
            <button
                type="button"
                onClick={onClick}
                className="shrink-0 whitespace-nowrap pt-1 font-['Sora'] text-[12px] font-semibold leading-[15px] text-[#12115C] min-[1920px]:text-[13px] min-[2500px]:text-[14px]"
            >
                {label}
            </button>
        );
    }

    if (variant === 'fill') {
        return (
            <button
                type="button"
                onClick={onClick}
                className="flex h-[31px] min-w-[86px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#FF3B30] px-4 py-2 font-['Sora'] text-[12px] font-semibold leading-[15px] text-white min-[1920px]:h-[34px] min-[1920px]:text-[13px] min-[2500px]:h-[38px] min-[2500px]:text-[14px]"
            >
                {label}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-[31px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-[#12115C] px-4 py-2 font-['Sora'] text-[12px] font-semibold leading-[15px] text-[#12115C] min-[1920px]:h-[34px] min-[1920px]:text-[13px] min-[2500px]:h-[38px] min-[2500px]:text-[14px]"
        >
            {label}
        </button>
    );
}