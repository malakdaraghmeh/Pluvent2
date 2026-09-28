import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import type { ReactNode, RefObject } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import checkCircleIcon from '@/assets/icons/check-circle(5).svg';
import creditCardIcon from '@/assets/icons/credit-card.svg';
import fileTextIcon from '@/assets/icons/file-text(12).svg';
import gitPullRequestIcon from '@/assets/icons/git-pull-request.svg';
import helpCircleIcon from '@/assets/icons/help-circle(2).svg';
import messageSquareIcon from '@/assets/icons/Icon-message-square.svg';
import shieldIcon from '@/assets/icons/shield.svg';

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
    },
];

export default function NotificationsDropdown({
    isOpen,
    onClose,
    triggerRef,
}: NotificationsDropdownProps) {
    const { t, i18n } = useTranslation('notifications');
    const isArabic = i18n.language.startsWith('ar');

    const [filter, setFilter] = useState<NotificationFilter>('all');
    const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

    const [position, setPosition] = useState({
        top: 96,
        left: 16,
        height: 799,
    });

    const unreadCount = notifications.filter(notification => notification.unread).length;
    const actionCount = notifications.filter(notification => notification.actionRequired).length;

    const filteredNotifications = useMemo(() => {
        if (filter === 'unread') {
            return notifications.filter(notification => notification.unread);
        }

        if (filter === 'action') {
            return notifications.filter(notification => notification.actionRequired);
        }

        return notifications;
    }, [filter, notifications]);

    useLayoutEffect(() => {
        if (!isOpen) return;

        const updatePosition = () => {
            const trigger = triggerRef.current;
            if (!trigger) return;

            const rect = trigger.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const horizontalMargin = 16;
            const verticalMargin = 16;
            const dropdownWidth = Math.min(510, viewportWidth - horizontalMargin * 2);

            const top = rect.bottom + 16;
            const availableHeight = viewportHeight - top - verticalMargin;
            const height = Math.min(799, Math.max(320, availableHeight));

            let left = isArabic ? rect.left : rect.right - dropdownWidth;

            if (left < horizontalMargin) {
                left = horizontalMargin;
            }

            if (left + dropdownWidth > viewportWidth - horizontalMargin) {
                left = viewportWidth - dropdownWidth - horizontalMargin;
            }

            setPosition({
                top,
                left,
                height,
            });
        };

        updatePosition();

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isOpen, isArabic, triggerRef]);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const markAllAsRead = () => {
        setNotifications(current =>
            current.map(notification => ({
                ...notification,
                unread: false,
            }))
        );
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99998] bg-black/30"
            onMouseDown={event => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-label={t('title')}
                dir={isArabic ? 'rtl' : 'ltr'}
                onMouseDown={event => event.stopPropagation()}
                style={{
                    top: position.top,
                    left: position.left,
                    height: position.height,
                }}
                className="fixed z-[99999] flex w-[calc(100vw-32px)] max-w-[510px] flex-col overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_24px_64px_rgba(18,17,92,0.16)]"
            >
                <header className="flex h-[152px] shrink-0 flex-col gap-3 overflow-hidden border-b border-[#ECEFF5] px-6 py-6">
                    <div className="flex h-[30px] w-full items-center justify-between gap-4">
                        <h2 className="text-[20px] font-semibold leading-[30px] text-[#12115C]">
                            {t('title')}
                        </h2>

                        <button
                            type="button"
                            onClick={markAllAsRead}
                            className="flex shrink-0 items-center gap-1 text-[13px] font-semibold leading-none text-[#12115C]"
                        >
                            <img
                                src={checkCircleIcon}
                                alt=""
                                className="h-[14px] w-[14px] shrink-0"
                            />

                            <span>{t('markAllAsRead')}</span>
                        </button>
                    </div>

                    <p className="h-4 truncate text-[13px] font-normal leading-4 text-[#6B7280]">
                        {t('subtitle')}
                    </p>

                    <div className="flex h-[34px] w-full items-start gap-4 overflow-hidden pt-2">
                        <TabButton active={filter === 'all'} onClick={() => setFilter('all')}>
                            {t('tabs.all', {
                                count: notifications.length,
                            })}
                        </TabButton>

                        <TabButton active={filter === 'unread'} onClick={() => setFilter('unread')}>
                            {t('tabs.unread', {
                                count: unreadCount,
                            })}
                        </TabButton>

                        <TabButton active={filter === 'action'} onClick={() => setFilter('action')}>
                            {t('tabs.actionRequired', {
                                count: actionCount,
                            })}
                        </TabButton>
                    </div>
                </header>

                <div
                    className="
                        min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain
                        [scrollbar-width:thin]
                        [scrollbar-color:#C8CAD3_transparent]
                        [&::-webkit-scrollbar]:w-[5px]
                        [&::-webkit-scrollbar-track]:bg-transparent
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-[#C8CAD3]
                        [&::-webkit-scrollbar-thumb:hover]:bg-[#AEB1BB]
                    "
                >
                    {filteredNotifications.map(notification => (
                        <NotificationRow key={notification.id} notification={notification} t={t} />
                    ))}

                    {filteredNotifications.length === 0 && (
                        <div className="flex h-full min-h-[180px] items-center justify-center px-6 text-center text-[13px] text-[#6B7280]">
                            {t('empty')}
                        </div>
                    )}
                </div>
            </section>
        </div>,
        document.body
    );
}

type TabButtonProps = {
    active: boolean;
    onClick: () => void;
    children: ReactNode;
};

function TabButton({ active, onClick, children }: TabButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative h-[26px] shrink-0 whitespace-nowrap text-[13px] font-semibold leading-4 transition-colors ${
                active ? 'text-[#12115C]' : 'text-[#6B7280]'
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
    t: (key: string, options?: Record<string, unknown>) => string;
};

function NotificationRow({ notification, t }: NotificationRowProps) {
    const key = `items.${notification.translationKey}`;

    const category = t(`${key}.category`);
    const title = t(`${key}.title`);
    const description = t(`${key}.description`);
    const reference = t(`${key}.reference`);
    const time = t(`${key}.time`);
    const action = t(`${key}.action`);

    return (
        <article
            className={`flex min-h-[124px] w-full items-start gap-4 border-b border-[#ECEFF5] p-4 ${
                notification.unread ? 'bg-[#F8FAFC]' : 'bg-white'
            }`}
        >
            <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                    backgroundColor: notification.iconBackground,
                }}
            >
                <img src={notification.icon} alt="" className="h-5 w-5 object-contain" />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex min-w-0 items-center justify-between gap-3">
                    <span
                        className="truncate text-[11px] font-semibold leading-[14px]"
                        style={{
                            color: notification.categoryColor,
                        }}
                    >
                        {category}
                    </span>

                    <div className="flex shrink-0 items-center gap-1.5">
                        <span className="whitespace-nowrap text-[11px] font-normal leading-[14px] text-[#6B7280]">
                            {time}
                        </span>

                        {notification.unread && (
                            <span className="h-[6px] w-[6px] rounded-full bg-[#FF5E5B]" />
                        )}
                    </div>
                </div>

                <h3 className="truncate text-[14px] font-semibold leading-[18px] text-[#08040B]">
                    {title}
                </h3>

                {description && (
                    <p className="line-clamp-2 text-[12px] font-normal leading-[1.4] text-[#6B7280]">
                        {description}
                    </p>
                )}

                {reference && (
                    <p className="truncate text-[11px] font-semibold leading-[14px] text-[#3634C7]">
                        {reference}
                    </p>
                )}
            </div>

            <NotificationAction label={action} variant={notification.actionVariant} />
        </article>
    );
}

type NotificationActionProps = {
    label: string;
    variant: NotificationActionVariant;
};

function NotificationAction({ label, variant }: NotificationActionProps) {
    if (variant === 'link') {
        return (
            <button
                type="button"
                className="shrink-0 whitespace-nowrap pt-1 text-[12px] font-semibold leading-[15px] text-[#12115C]"
            >
                {label}
            </button>
        );
    }

    if (variant === 'fill') {
        return (
            <button
                type="button"
                className="flex h-[31px] min-w-[86px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#FF3B30] px-4 py-2 text-[12px] font-semibold leading-[15px] text-white"
            >
                {label}
            </button>
        );
    }

    return (
        <button
            type="button"
            className="flex h-[31px] shrink-0 items-center justify-center whitespace-nowrap rounded-lg border border-[#12115C] px-4 py-2 text-[12px] font-semibold leading-[15px] text-[#12115C]"
        >
            {label}
        </button>
    );
}
