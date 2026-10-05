import { Email, User1, User2, User4 } from '@/assets';

import type { MetricItem } from '../../../../utils/types/users.types';

export const usersMetricsData: MetricItem[] = [
    {
        id: 'outstanding',
        label: 'Total Outstanding',
        value: 3,
        icon: User1,
    },
    {
        id: 'active',
        label: 'Active Accounts',
        value: 3,
        icon: User2,
    },
    {
        id: 'pending',
        label: 'Pending Invitations',
        value: 3,
        icon: Email,
    },
    {
        id: 'rejected',
        label: 'Rejected',
        value: 3,
        icon: User4,
    },
];
