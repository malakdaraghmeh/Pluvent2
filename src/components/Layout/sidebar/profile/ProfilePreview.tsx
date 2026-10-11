import { useState, type ChangeEvent } from 'react';
import { AmrProfilePhoto, ProfileEditIcon } from '@/assets';
import type { ProfilePreviewProps } from '../../../../../utils/types/profile.types';

export default function ProfilePreview({ fullName, role }: ProfilePreviewProps) {
    const [profileImage, setProfileImage] = useState(AmrProfilePhoto);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setProfileImage(reader.result);
            }
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className="flex w-full shrink-0 items-center gap-3 rounded-2xl border border-[#ECEEF2] bg-white p-2 md:h-[366px] md:w-[200px] md:flex-col md:items-stretch md:gap-2 md:rounded-[20px]">
            <div className="relative h-[76px] w-[76px] shrink-0 sm:h-[88px] sm:w-[88px] md:h-[302px] md:w-[184px]">
                <img
                    src={profileImage}
                    alt={fullName}
                    className="h-full w-full rounded-lg object-cover"
                />

                <label
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#ECEEF2] bg-white shadow-sm"
                    aria-label="Change profile image"
                >
                    <ProfileEditIcon className="h-4 w-4 text-[#3634C7]" />

                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </label>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-1 md:h-10 md:w-[184px] md:flex-none md:items-center">
                <p className="w-full truncate text-[16px] font-semibold leading-5 text-[#08040B] md:text-center">
                    {fullName}
                </p>

                <p className="w-full truncate text-[13px] font-normal leading-4 text-[#7C7D86] md:text-center">
                    {role}
                </p>
            </div>
        </div>
    );
}
