import type { ProjectDetails } from '../../../../utils/types/project-details.types';

const projectDescription =
    'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent';

export const projectDetailsData: ProjectDetails[] = [
    {
        id: 1,
        projectName: 'Project Name',
        description: projectDescription,
        status: 'In Progress',
        startDate: 'March 15, 2026',
        deliveryDate: 'September 30, 2026',
        daysLeft: 20,
        daysLabel: 'Days Left',
        deliveryText: 'to deliver your project',
        lastUpdatedLabel: 'Last Updated',
        lastUpdated: '1 day ago',
    },
    {
        id: 2,
        projectName: 'XYZ Mobile App',
        description: projectDescription,
        status: 'In Progress',
        startDate: 'January 10, 2026',
        deliveryDate: 'August 20, 2026',
        daysLeft: 35,
        daysLabel: 'Days Left',
        deliveryText: 'to deliver your project',
        lastUpdatedLabel: 'Last Updated',
        lastUpdated: '2 days ago',
    },
    {
        id: 3,
        projectName: 'E-Commerce Website',
        description: projectDescription,
        status: 'In Progress',
        startDate: 'February 5, 2026',
        deliveryDate: 'July 15, 2026',
        daysLeft: 0,
        daysLabel: 'Completed',
        deliveryText: 'project delivered',
        lastUpdatedLabel: 'Last Updated',
        lastUpdated: '5 days ago',
    },
    {
        id: 4,
        projectName: 'Dashboard System',
        description: projectDescription,
        status: 'Completed',
        startDate: 'March 1, 2026',
        deliveryDate: 'July 30, 2026',
        daysLeft: 0,
        daysLabel: 'Completed',
        deliveryText: 'project delivered',
        lastUpdatedLabel: 'Last Updated',
        lastUpdated: '1 week ago',
    },
];
