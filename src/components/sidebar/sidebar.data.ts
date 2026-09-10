import Dashboard from '@icons/dashboard.svg';
import Project from '@icons/project.svg';
import Files from '@icons/files.svg';
import Billing from '@icons/billing.svg';
import Support from '@icons/support.svg';

import Messages from '@icons/messages.svg';
import Users from '@icons/users.svg';
import Settings from '@icons/settings.svg';

export const mainNavigation = [
    {
        label: 'Dashboard',
        href: '/en/dashboard',
        icon: Dashboard,
    },
    {
        label: 'Project',
        href: '/en/projects/id',
        icon: Project,
    },
    {
        label: 'Files & Documents',
        href: '/en/file-and-document',
        icon: Files,
    },
    {
        label: 'Billing & Payments',
        href: '/en/billing',
        icon: Billing,
    },
    {
        label: 'Support / Tickets',
        href: '/en/support',
        icon: Support,
    },
];

export const accountNavigation = [
    {
        label: 'Messages',
        href: '/en/messages',
        icon: Messages,
        badge: 4,
    },
    {
        label: 'User Management',
        href: '/en/users',
        icon: Users,
    },
    {
        label: 'Setting',
        href: '/en/settings',
        icon: Settings,
    },
];
