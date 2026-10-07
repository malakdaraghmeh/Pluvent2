import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { ProfileContactIcon, ProfileUserIcon } from '@/assets';

import type {
    ProfileData,
    ProfileInformationModalProps,
} from '../../../../../utils/types/profile.types';

import ProfileField from './ProfileField';
import ProfileInfoSection from './ProfileInfoSection';
import ProfileModalFooter from './ProfileModalFooter';
import ProfileModalHeader from './ProfileModalHeader';
import ProfilePreview from './ProfilePreview';

export default function ProfileInformationModal({
    isOpen,
    onClose,
    profile,
    onSave,
}: ProfileInformationModalProps) {
    const { t } = useTranslation('profile');
    const [formData, setFormData] = useState<ProfileData>({ ...profile, fullName: 'James Carter' });
    const [isPersonalEditing, setIsPersonalEditing] = useState(false);
    const [isContactEditing, setIsContactEditing] = useState(false);

    useEffect(() => {
        if (!isOpen) return;

        setFormData({ ...profile, fullName: 'James Carter' });
        setIsPersonalEditing(false);
        setIsContactEditing(false);
    }, [isOpen, profile]);

    useEffect(() => {
        if (!isOpen) return;

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const updateField = (field: keyof ProfileData, value: string) => {
        setFormData(current => ({
            ...current,
            [field]: value,
        }));
    };

    const handleCancel = () => {
        setFormData({ ...profile, fullName: 'James Carter' });
        setIsPersonalEditing(false);
        setIsContactEditing(false);
        onClose();
    };

    const handleSave = () => {
        onSave?.(formData);
        onClose();
    };

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[99999] bg-black/30"
            onMouseDown={event => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="profile-information-title"
                onMouseDown={event => event.stopPropagation()}
                className={`
                    absolute
                    left-1/2
                    top-1/2
                    grid
                    w-[calc(100%-24px)]
                    -translate-x-1/2
                    -translate-y-1/2
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-[#EAEBEF]
                    bg-white
                    shadow-[0_24px_64px_rgba(18,17,92,0.18)]

                    max-h-[calc(100vh-24px)]
                    grid-rows-[auto_minmax(0,1fr)_auto]

                    sm:w-[calc(100%-32px)]
                    sm:max-h-[calc(100vh-32px)]

                    lg:h-[608px]
                    lg:w-[700px]
                    lg:grid-rows-[102px_minmax(0,1fr)_88px]

                    min-[1440px]:w-[700px]
                    min-[1920px]:w-[840px]
                    min-[2500px]:w-[900px]

                    
                `}
            >
                <ProfileModalHeader onClose={onClose} />

                <div
                    className="
                        min-h-0
                        overflow-y-auto
                        px-4
                        py-4

                        sm:px-6
                        sm:py-5

                        md:overflow-hidden
                        md:px-8
                        md:pb-7
                        md:pt-6
                    "
                >
                    <div
                        className="
                            flex
                            w-full
                            flex-col
                            gap-4

                            md:h-full
                            md:flex-row
                            md:gap-6
                        "
                    >
                        <ProfilePreview fullName={formData.fullName} role={formData.role} />

                        <div
                            className="
                                flex
                                min-w-0
                                flex-1
                                flex-col
                                gap-4

                                md:h-full
                            "
                        >
                            <ProfileInfoSection
                                title={t('personalInformation')}
                                icon={ProfileUserIcon}
                                isEditing={isPersonalEditing}
                                onEdit={() => setIsPersonalEditing(current => !current)}
                            >
                                <ProfileField
                                    label={t('fullName')}
                                    value={formData.fullName}
                                    isEditing={isPersonalEditing}
                                    onChange={value => updateField('fullName', value)}
                                />
                            </ProfileInfoSection>

                            <ProfileInfoSection
                                title={t('contactInformation')}
                                icon={ProfileContactIcon}
                                isEditing={isContactEditing}
                                onEdit={() => setIsContactEditing(current => !current)}
                            >
                                <div className="flex flex-col gap-4">
                                    <ProfileField
                                        label={t('email')}
                                        type="email"
                                        value={formData.email}
                                        isEditing={isContactEditing}
                                        onChange={value => updateField('email', value)}
                                    />

                                    <ProfileField
                                        label={t('phoneNumber')}
                                        type="tel"
                                        value={formData.phoneNumber}
                                        isEditing={isContactEditing}
                                        onChange={value => updateField('phoneNumber', value)}
                                    />
                                </div>
                            </ProfileInfoSection>
                        </div>
                    </div>
                </div>

                <ProfileModalFooter
                    lastUpdated={formData.lastUpdated}
                    onCancel={handleCancel}
                    onSave={handleSave}
                />
            </div>
        </div>,
        document.body
    );
}
