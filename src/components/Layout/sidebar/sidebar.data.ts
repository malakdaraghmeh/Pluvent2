import { SidebarDashboardIcon as Dashboard } from '@/assets';
import { SidebarProjectIcon as Project } from '@/assets';
import { SidebarFilesIcon as Files } from '@/assets';
import { SidebarBillingIcon as Billing } from '@/assets';
import { SidebarSupportIcon as Support } from '@/assets';

import { SidebarMessagesIcon as Messages } from '@/assets';
import { SidebarUsersIcon as Users } from '@/assets';
import { SidebarSettingsIcon as Settings } from '@/assets';

export const mainNavigation = [
    {
        label: 'Dashboard',
        href: '/',
        icon: Dashboard,
    },
    {
        label: 'Projects',
        href: '/projects',
        icon: Project,
    },
    {
        label: 'FileAndDocument',
        href: '/file-and-document',
        icon: Files,
    },
    {
        label: 'BillingAndPayments',
        href: '/billing',
        icon: Billing,
    },
    {
        label: 'Support',
        href: '/support',
        icon: Support,
    },
];

export const accountNavigation = [
    {
        label: 'Messages',
        href: '/messages',
        icon: Messages,
        badge: 4,
    },
    {
        label: 'UserManagement',
        href: '/users',
        icon: Users,
    },
    {
        label: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];
