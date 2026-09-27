/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

const CommonLink = ({ children, to = '/', className }) => {
    return (
        <>
            <Link
                to={to}
                className={`inline-block text-[14px] text-[#3E8F60] font-[400] hover:text-main hover:underline ${className}`}
            >
                {children}
            </Link>
        </>
    );
};

export default CommonLink;
