import { useEffect,useRef,useState } from 'react';
import { DownArrow } from '@/assets';
import type { CardExpirySelectProps } from '../../../utils/types/payment-method-modal.types';

const CardExpirySelect=({id,value,placeholder,options,isArabic,onChange}:CardExpirySelectProps)=>{
    const [isOpen,setIsOpen]=useState(false);
    const containerRef=useRef<HTMLDivElement>(null);

    useEffect(()=>{
        if(!isOpen)return;

        const handleOutsideClick=(event:PointerEvent)=>{
            const target=event.target as Node;
            if(containerRef.current&&!containerRef.current.contains(target))setIsOpen(false);
        };

        const handleEscape=(event:KeyboardEvent)=>{
            if(event.key==='Escape')setIsOpen(false);
        };

        document.addEventListener('pointerdown',handleOutsideClick,true);
        document.addEventListener('keydown',handleEscape);

        return()=>{
            document.removeEventListener('pointerdown',handleOutsideClick,true);
            document.removeEventListener('keydown',handleEscape);
        };
    },[isOpen]);

    const handleSelect=(option:string)=>{
        onChange(option);
        setIsOpen(false);
    };

    return(
        <div ref={containerRef} className="relative h-[54px] w-full">
            <button id={id} type="button" aria-haspopup="listbox" aria-expanded={isOpen} onClick={()=>setIsOpen(current=>!current)} className={`flex h-[54px] w-full items-center rounded-[8px] bg-[#F4F6FA] px-[14px] text-[14px] font-normal outline-none ${isArabic?'flex-row-reverse text-right':'text-left'}`}>
                <span className={`min-w-0 flex-1 ${value?'text-[#888282]':'text-[#A0A5AF]'}`}>{value||placeholder}</span>
                <DownArrow aria-hidden="true" className={`shrink-0 transition-transform duration-200 ${isOpen?'rotate-180':''}`}/>
            </button>
            {isOpen&&(
                <div role="listbox" className="absolute left-0 top-[calc(100%+6px)] z-[100] max-h-[210px] w-full overflow-x-hidden overflow-y-auto overscroll-contain rounded-[8px] border border-[#DFE3E5] bg-white py-1 shadow-[0_8px_24px_rgba(18,17,92,0.12)] [direction:ltr] [scrollbar-color:#C7CBD4_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[5px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#C7CBD4] hover:[&::-webkit-scrollbar-thumb]:bg-[#AEB4C0]">
                    <div className={isArabic?'[direction:rtl]':'[direction:ltr]'}>
                        {options.map(option=>(
                            <button key={option} type="button" role="option" aria-selected={value===option} onClick={()=>handleSelect(option)} className={`flex h-[46px] w-full items-center px-[14px] text-[14px] transition-colors hover:bg-[#F4F6FA] ${isArabic?'justify-end text-right':'justify-start text-left'} ${value===option?'bg-[#F8F8FF] font-medium text-[#12115C]':'text-[#888282]'}`}>{option}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardExpirySelect;
