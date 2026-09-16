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
    href: '/dashboard',
    icon: Dashboard,
  },
  {
    label: 'Project',
    href: '/projects',
    icon: Project,
  },
  {
    label: 'FilesAndDocuments',
    href: '/file-and-document',
    icon: Files,
  },
  {
    label: 'BillingAndPayments',
    href: '/billing',
    icon: Billing,
  },
  {
    label: 'SupportAndTickets',
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