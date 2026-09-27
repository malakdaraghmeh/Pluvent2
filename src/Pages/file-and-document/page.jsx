/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Filter from '@icons/filter.svg?react';
import FolderUpload from '@icons/folder-upload.svg?react';
import FileIcon from '@icons/Group.svg?react';
import LogoIcon from '@icons/logo png 2.svg?react';
import { useTranslation } from 'react-i18next';

const mockFiles = [
    {
        id: 1,
        name: 'Project Proposal.pdf',
        uploader: 'Amr Zayed',
        size: '1.2 MB',
        date: 'Jan 15, 2025',
        type: 'pdf',
        isFolderIcon: true,
    },
    {
        id: 2,
        name: 'Project Proposal.pdf',
        uploader: 'Pulvent',
        size: '1.2 MB',
        date: 'Jan 15, 2025',
        type: 'pdf',
        isFolderIcon: false,
    },
    {
        id: 3,
        name: 'Project Proposal.pdf',
        uploader: 'Amr Zayed',
        size: '1.2 MB',
        date: 'Jan 15, 2025',
        type: 'pdf',
        isFolderIcon: true,
    },
    {
        id: 4,
        name: 'Project Proposal.pdf',
        uploader: 'Pulvent',
        size: '1.2 MB',
        date: 'Jan 15, 2025',
        type: 'pdf',
        isFolderIcon: false,
    },
];

export default function FileAndDocumentPage() {
    const { t } = useTranslation('files');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const handleDragOver = e => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = e => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = e => {
        e.preventDefault();
        setIsDragOver(false);
        // Handle file drop logic here
    };

    return (
        <div className="min-h-screen p-6 text-[#1A1A1A] ">
            <div className="mb-6">
                <h1 className="font-semibold text-[24px] leading-tight tracking-normal text-[#12115C]">
                    {t('title')}
                </h1>
                <p className="text-sm text-[#7E8492] mt-1 text-[12px] font-normal pt-1">
                    {t('subtitle')}
                </p>
            </div>
            {/* Main Content Area */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 max-w-6xl mx-auto">
                {/* Search & Filter Bar */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t('searchPlaceholder')}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 border-[0.5px] border-gray-200 rounded-[20px] text-sm outline-none focus:border-blue-500 transition-colors placeholder:text-gray-400"
                        />
                    </div>
                    <button className="p-3 border-[0.5px] border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-center">
                        <Filter />
                    </button>
                </div>

                {/* File Dropzone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-upload-input')?.click()}
                    className={`border-2 border-dashed rounded-2xl p-8 mb-8 text-center cursor-pointer transition-colors ${
                        isDragOver
                            ? 'border-teal-500 bg-teal-50/20'
                            : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                    }`}
                >
                    <input id="file-upload-input" type="file" className="hidden" multiple />
                    <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3">
                        <FolderUpload />
                    </div>
                    <h3 className="text-base font-bold text-[#102A63]">{t('dropzoneTitle')}</h3>
                    <p className="text-xs text-gray-400 mt-1">{t('dropzoneHint')}</p>
                </div>

                {/* Files List */}
                <div className="space-y-3">
                    {mockFiles.map(file => (
                        <div
                            key={file.id}
                            className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-white hover:border-gray-200 transition-all shadow-2xs"
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    {file.isFolderIcon ? (
                                        <div className="w-10 h-10 rounded-lg bg-[#2F1ABD10] flex items-center justify-center text-blue-600">
                                            <FileIcon />
                                        </div>
                                    ) : (
                                        <div className="w-10 h-10 rounded-lg bg-[#00E5C810] flex items-center justify-center text-blue-600">
                                            <LogoIcon />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#102A63]">
                                        {file.name}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {t('uploadedBy')} : {file.uploader}{' '}
                                        <span className="mx-1">•</span> {file.size}{' '}
                                        <span className="mx-1">•</span> {file.date}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => alert(`${t('downloading')} ${file.name}`)}
                                className="text-sm font-bold text-[#102A63] hover:text-blue-600 transition-colors px-3 py-1.5"
                            >
                                {t('download')}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
