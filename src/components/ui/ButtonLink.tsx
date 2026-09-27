import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface ButtonLinkProps {
    children: ReactNode;
    to?: string;
    className?: string;
    onClick?: () => void;
}

const ButtonLink = ({ children, to = '/', className = '', onClick }: ButtonLinkProps) => {
    return (
        <Link
            to={to}
            onClick={onClick}
            className={`block text-center px-2 py-1 border-none rounded-md text-[14px] font-[400] text-white transition-colors cursor-pointer bg-main hover:bg-main/90 ${className}`}
        >
            {children}
        </Link>
    );
};

export default ButtonLink;
