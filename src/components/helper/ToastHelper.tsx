import { toast } from 'sonner';

export const ShowToastSuccess = message => {
    toast.success(message, {
        style: {
            background: '#2B7B4C',
            color: 'white',
        },
    });
};

export const ShowToastInfo = message => {
    toast.success(message, {
        style: {
            background: '#fff',
            color: '#2B7B4C',
        },
    });
};

export const ShowToastError = message => {
    toast.error(message, {
        style: {
            background: '#D14343',
            color: 'white',
        },
    });
};
