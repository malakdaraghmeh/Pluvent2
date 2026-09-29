import Dashboard from '@icons/dashboard.svg?react';
import Project from '@icons/project.svg?react';
import Files from '@icons/files.svg?react';
import Billing from '@icons/billing.svg?react';
import Support from '@icons/support.svg?react';

import Messages from '@icons/messages.svg?react';
import Users from '@icons/users.svg?react';
import Settings from '@icons/settings.svg?react';

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
