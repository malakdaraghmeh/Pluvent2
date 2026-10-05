import type { TFunction } from 'i18next';

export type SupportPlanKey =
    | 'essential'
    | 'professional'
    | 'businessCritical'
    | 'enterprise';

export type SupportPlan = {
    key: SupportPlanKey;
    title: string;
    buttonText: string;
    popular: boolean;
    features: string[];
};

export type SupportPlansData = {
    pageTitle: string;
    plans: SupportPlan[];
};

export type SupportPlanCardProps = {
    plan: SupportPlan;
};

export type GetSupportPlansData = (
    t: TFunction,
    currentLang: string,
) => SupportPlansData;