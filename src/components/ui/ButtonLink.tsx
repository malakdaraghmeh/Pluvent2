import React from 'react';
import Link from 'next/link';

interface ButtonLinkProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
}

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, onClick, href = '/', className }) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`bg-main text-[20px] text-white px-8 py-2.5 rounded-full hover:bg-opacity-90 transition-all ${className}`}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;
