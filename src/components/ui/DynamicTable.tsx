import React, { useState, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';

export interface Column<T> {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: any;
}

interface DynamicTableProps<T> {
    columns: Column<T>[];
    data: T[];
    actions?: any;
    isLoading?: boolean;
    searchPlaceholder?: string;
    itemsPerPage?: number;
}

export function DynamicTable<T extends { id: string | number }>({
    columns,
    data,
    actions,
    isLoading = false,
    searchPlaceholder = "Search...",
    itemsPerPage = 10
}: DynamicTableProps<T>) {
    const t = useTranslations();
    const locale = useLocale()
    const isRtl = locale === 'ar';
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{ key: keyof T | string; direction: 'asc' | 'desc' } | null>(null);

    // Sorting
    const handleSort = (key: keyof T | string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Filtering & Sorting Logic
    const filteredAndSortedData = useMemo(() => {
        let processed = [...data];

        if (searchTerm) {
            const lowercasedSearch = searchTerm.toLowerCase();
            processed = processed.filter(item => {
                return Object.values(item as any).some(val =>
                    String(val).toLowerCase().includes(lowercasedSearch)
                );
            });
        }

        if (sortConfig) {
            processed.sort((a: any, b: any) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return processed;
    }, [data, searchTerm, sortConfig]);

    // Pagination
    const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage) || 1;
    const paginatedData = filteredAndSortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page on search
    React.useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50/50">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute top-1/2 -translate-y-1/2 text-gray-400 left-3 rtl:left-auto rtl:right-3" size={18} />
                    <input
                        type="text"
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-main/20 focus:border-main transition-shadow"
                    />
                </div>
            </div>

            {/* Table Wrapper */}
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left rtl:text-right text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-100">
                        <tr>
                            {columns.map((col, idx) => (
                                <th
                                    key={idx}
                                    className={`px-6 py-4 ${col.sortable ? 'cursor-pointer hover:bg-gray-100 select-none transition-colors' : ''}`}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        <span>{col.header}</span>
                                        {col.sortable && (
                                            <ArrowUpDown size={14} className={sortConfig?.key === col.key ? 'text-main' : 'text-gray-400'} />
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && <th className="px-6 py-4 w-24 text-center">{t('common.actions')}</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="animate-pulse">
                                    {columns.map((_, j) => (
                                        <td key={j} className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4">
                                            <div className="h-4 bg-gray-200 rounded w-8 mx-auto"></div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : paginatedData.length > 0 ? (
                            <AnimatePresence>
                                {paginatedData.map((item) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-gray-50/80 transition-colors"
                                    >
                                        {columns.map((col, idx) => (
                                            <td key={idx} className="px-6 py-4 text-gray-700">
                                                {col.render ? col.render(item) : (item as any)[col.key]}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    {actions(item)}
                                                </div>
                                            </td>
                                        )}
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                                            <Search className="text-gray-400 w-8 h-8" />
                                        </div>
                                        <p className="text-base font-medium">{t('common.noData')}</p>
                                        {searchTerm && <p className="text-sm mt-1">{t('common.tryDifferentSearch')}</p>}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            {!isLoading && filteredAndSortedData.length > 0 && (
                <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600 bg-gray-50/30">
                    <div>
                        {t('common.showing')} <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> {t('common.to')} <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)}</span> {t('common.of')} <span className="font-semibold text-gray-900">{filteredAndSortedData.length}</span> {t('common.results')}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="p-1.5 rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-main/20"
                        >
                            {isRtl ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const page = i + 1;
                                if (totalPages > 5 && Math.abs(page - currentPage) > 1 && page !== 1 && page !== totalPages) {
                                    if (page === 2 || page === totalPages - 1) return <span key={page} className="px-1 text-gray-400">...</span>;
                                    return null;
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-md flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-main/20 ${currentPage === page
                                            ? 'bg-main text-white border border-main shadow-sm'
                                            : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="p-1.5 rounded-md border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-main/20"
                        >
                            {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
