import { useTranslation } from 'react-i18next';
import GeneralSelect from '@/components/ui/GeneralSelect';
import type {
    FilterDropdownProps,
    SupportTicketFilter,
} from '../../../../utils/types/support-tickets.types';

const FilterDropdown = ({
    value,
    onChange,
}: FilterDropdownProps) => {
    const { t, i18n } = useTranslation('tickets');
    const isArabic = i18n.language.startsWith('ar');

    return (
        <GeneralSelect
            value={value}
            placeholder={t('filter.all')}
            options={[
                {
                    label: t('filter.all'),
                    value: 'all',
                },
                {
                    label: t('filter.project'),
                    value: 'project',
                },
                {
                    label: t('filter.general'),
                    value: 'general',
                },
            ]}
            isArabic={isArabic}
            onChange={newValue =>
                onChange(newValue as SupportTicketFilter)
            }
            className="max-w-[220px]"
        />
    );
};

export default FilterDropdown;
