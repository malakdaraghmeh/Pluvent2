import React from 'react';
import Pulvetlogo from '@icons/pulvetlogo.svg?react';

export default function InvoiceHeaderLogo() {
    return (
        <div className="flex flex-col items-center justify-center mt-2 p-4 sm:p-6 bg-[#F6F8FC]">
            <div className="flex items-center gap-2.5">
                <Pulvetlogo className="h-7 sm:h-9 w-auto" />
            </div>
        </div>
    );
}