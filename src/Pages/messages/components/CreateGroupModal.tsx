import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
    MessagesCreateGroupArrowIcon,
    MessagesCreateGroupCloseIcon,
    MessagesCreateGroupPlusIcon,
    MessagesProjectSelectArrowIcon,
    MessagesRadioSelectedIcon,
    MessagesRadioUnselectedIcon,
} from '@/assets';
import ActionButton from '@/components/ui/ActionButton';
import Modal from '@/components/ui/modal';
import type { CreateGroupModalProps } from '../../../../utils/types/chat.types';
import { projectsData } from '../../projects/data/projects';
import { INITIAL_MEMBERS } from '../mockData';

const DEFAULT_SELECTED_MEMBERS = ['2', '3'];

export function CreateGroupModal({ isOpen, onClose, onCreateGroup }: CreateGroupModalProps) {
    const { t, i18n } = useTranslation('chat');
    const isArabic = i18n.language.startsWith('ar');
    const textAlignment = isArabic ? 'text-right' : 'text-left';

    const projectDropdownRef = useRef<HTMLDivElement>(null);

    const [groupName, setGroupName] = useState('');
    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(DEFAULT_SELECTED_MEMBERS);
    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const selectedProject = projectsData.find(project => String(project.id) === selectedProjectId);

    useEffect(() => {
        if (!isProjectOpen) return;

        const handleClickOutside = (event: PointerEvent) => {
            if (
                projectDropdownRef.current &&
                !projectDropdownRef.current.contains(event.target as Node)
            ) {
                setIsProjectOpen(false);
            }
        };

        document.addEventListener('pointerdown', handleClickOutside, true);

        return () => {
            document.removeEventListener('pointerdown', handleClickOutside, true);
        };
    }, [isProjectOpen]);

    const resetForm = () => {
        setGroupName('');
        setSelectedProjectId('');
        setSelectedMemberIds(DEFAULT_SELECTED_MEMBERS);
        setIsProjectOpen(false);
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const toggleMember = (id: string) => {
        setSelectedMemberIds(current =>
            current.includes(id) ? current.filter(memberId => memberId !== id) : [...current, id]
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const name = groupName.trim();

        if (!name || !selectedProjectId || !selectedMemberIds.length) {
            return;
        }

        onCreateGroup({
            name,
            memberIds: selectedMemberIds,
            projectId: Number(selectedProjectId),
        });

        resetForm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            ariaLabel={t('createGroupModal.title')}
            overlayClassName="lg:pl-[320px]"
            className="create-group-modal !w-[650px] !max-w-[calc(100vw-32px)] overflow-hidden rounded-[20px] p-6 min-[1920px]:!w-[760px] min-[2500px]:!w-[860px] [@media(max-height:780px)]:p-5"
        >
            <div className="flex flex-col gap-5 [@media(max-height:780px)]:gap-4">
                <header className="flex shrink-0 items-start justify-between gap-4">
                    <div className={`min-w-0 ${textAlignment}`}>
                        <h2 className="text-[22px] font-semibold leading-[28px] text-[#12115C]">
                            {t('createGroupModal.title')}
                        </h2>

                        <p className="mt-1 text-[14px] leading-5 text-[#615E8B]">
                            {t('createGroupModal.subtitle')}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label={t('createGroupModal.close')}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-[#12115C]"
                    >
                        <MessagesCreateGroupCloseIcon
                            className="h-full w-full"
                            aria-hidden="true"
                        />
                    </button>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 [@media(max-height:780px)]:gap-4"
                >
                    <div className={textAlignment}>
                        <label
                            htmlFor="group-name"
                            className="block text-[14px] font-semibold leading-5 text-[#12115C]"
                        >
                            {t('createGroupModal.groupNameLabel')}{' '}
                            <span className="text-[#E02B2B]">*</span>
                        </label>

                        <input
                            id="group-name"
                            type="text"
                            value={groupName}
                            onChange={event => setGroupName(event.target.value)}
                            placeholder={t('createGroupModal.groupNamePlaceholder')}
                            className={`mt-2 h-[54px] w-full rounded-[12px] border-0 bg-[#F4F6FA] px-[14px] text-[14px] text-[#12115C] outline-none placeholder:text-[#8B91A1] [@media(max-height:780px)]:h-[48px] ${textAlignment}`}
                            required
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between gap-4">
                            <span
                                className={`text-[14px] font-semibold leading-5 text-[#12115C] ${textAlignment}`}
                            >
                                {t('createGroupModal.chooseMembersLabel')}{' '}
                                <span className="text-[#E02B2B]">*</span>
                            </span>

                            <span className="text-[12px] font-medium text-[#7B8190]">
                                {t('createGroupModal.membersCount', {
                                    count: selectedMemberIds.length,
                                })}
                            </span>
                        </div>

                        <div className="mt-3 h-[132px] space-y-3 overflow-y-auto pe-2 [scrollbar-color:#B1B4B6_#FCFCFC] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#FCFCFC] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#B1B4B6]">
                            {INITIAL_MEMBERS.map(member => {
                                const isSelected = selectedMemberIds.includes(member.id);

                                if (member.isPinned) {
                                    return (
                                        <div
                                            key={member.id}
                                            className="flex h-[60px] items-center justify-between rounded-[12px] border-[0.5px] border-[#39E1D7] bg-[rgba(0,229,200,0.0627)] p-3"
                                        >
                                            <div className="flex min-w-0 items-center gap-3">
                                                <img
                                                    src={member.avatar}
                                                    alt={member.name}
                                                    className="h-10 w-10 shrink-0 rounded-full object-cover"
                                                />

                                                <div className={`min-w-0 ${textAlignment}`}>
                                                    <p className="truncate text-[14px] font-semibold leading-5 text-[#12115C]">
                                                        {member.name}
                                                    </p>

                                                    <p className="text-[12px] font-medium leading-4 text-[#00AFA0]">
                                                        {t(`roles.${member.role.toLowerCase()}`)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <button
                                        key={member.id}
                                        type="button"
                                        onClick={() => toggleMember(member.id)}
                                        className={`flex h-[60px] w-full items-center justify-between rounded-[12px] border-[0.5px] p-3 ${
                                            isSelected
                                                ? 'border-[#39E1D7] bg-[rgba(0,229,200,0.0627)]'
                                                : 'border-[#E8E8E8] bg-white'
                                        }`}
                                    >
                                        <div className="flex min-w-0 items-center gap-3">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="h-10 w-10 shrink-0 rounded-full object-cover"
                                            />

                                            <div className={`min-w-0 ${textAlignment}`}>
                                                <p className="truncate text-[14px] font-semibold leading-5 text-[#12115C]">
                                                    {member.name}
                                                </p>

                                                <p className="text-[12px] font-medium leading-4 text-[#514EF3]">
                                                    {t(`roles.${member.role.toLowerCase()}`)}
                                                </p>
                                            </div>
                                        </div>

                                        {isSelected ? (
                                            <MessagesRadioSelectedIcon
                                                className="h-5 w-5 shrink-0"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <MessagesRadioUnselectedIcon
                                                className="h-5 w-5 shrink-0"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className={textAlignment}>
                        <span className="block text-[14px] font-semibold leading-5 text-[#12115C]">
                            {t('createGroupModal.selectProjectLabel')}{' '}
                            <span className="text-[#E02B2B]">*</span>
                        </span>

                        <div ref={projectDropdownRef} className="relative mt-2">
                            <button
                                type="button"
                                onClick={() => setIsProjectOpen(current => !current)}
                                aria-expanded={isProjectOpen}
                                className={`flex h-[54px] w-full items-center justify-between gap-3 rounded-[12px] bg-[#F4F6FA] px-[14px] text-[14px] text-[#615E8B] ${
                                    isArabic ? 'flex-row-reverse' : 'flex-row'
                                } ${textAlignment}`}
                            >
                                <span className="min-w-0 flex-1 truncate">
                                    {selectedProject?.title ??
                                        t('createGroupModal.projectPlaceholder')}
                                </span>

                                <MessagesProjectSelectArrowIcon
                                    className={`h-4 w-4 shrink-0 transition-transform ${
                                        isProjectOpen ? 'rotate-180' : ''
                                    }`}
                                    aria-hidden="true"
                                />
                            </button>

                            {isProjectOpen && (
                                <div className="mt-[10px] max-h-[140px] w-full overflow-y-auto rounded-[12px] border border-[#E8E8E8] bg-white p-1.5 shadow-[0_6px_20px_rgba(18,17,92,0.08)] [scrollbar-color:#B1B4B6_#FCFCFC] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#FCFCFC] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#B1B4B6]">
                                    {projectsData.map(project => {
                                        const isSelected = String(project.id) === selectedProjectId;

                                        return (
                                            <button
                                                key={project.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedProjectId(String(project.id));
                                                    setIsProjectOpen(false);
                                                }}
                                                className={`flex min-h-[42px] w-full items-center rounded-[10px] px-3 text-[14px] ${
                                                    isSelected
                                                        ? 'bg-[#EEF2FF] font-semibold text-[#3634C7]'
                                                        : 'text-[#615E8B] hover:bg-[#F7F8FA]'
                                                } ${textAlignment}`}
                                            >
                                                {project.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="pt-1">
                        <ActionButton
                            type="submit"
                            className="!h-[46px] !min-h-[46px] !w-full !shrink-0 !rounded-[12px]"
                        >
                            <span className="flex w-full items-center justify-center gap-2">
                                {isArabic ? (
                                    <>
                                        <MessagesCreateGroupArrowIcon
                                            className="h-4 w-4 shrink-0 rotate-180"
                                            aria-hidden="true"
                                        />

                                        <span>{t('createGroupModal.submitButton')}</span>

                                        <MessagesCreateGroupPlusIcon
                                            className="h-4 w-4 shrink-0 [&_path]:!stroke-white"
                                            aria-hidden="true"
                                        />
                                    </>
                                ) : (
                                    <>
                                        <MessagesCreateGroupPlusIcon
                                            className="h-4 w-4 shrink-0 [&_path]:!stroke-white"
                                            aria-hidden="true"
                                        />

                                        <span>{t('createGroupModal.submitButton')}</span>

                                        <MessagesCreateGroupArrowIcon
                                            className="h-4 w-4 shrink-0"
                                            aria-hidden="true"
                                        />
                                    </>
                                )}
                            </span>
                        </ActionButton>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
