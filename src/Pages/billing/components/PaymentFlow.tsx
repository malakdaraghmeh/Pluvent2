import { useEffect, useState } from 'react';

import PaymentDetailsModal from '@/Pages/PaymentDetailsModal/paymentDetailsModal';

import type {
    PaymentFlowProps,
    PaymentMethodId,
} from '../../../../utils/types/payment-method-modal.types';

import CreditDebitCardModal from './CreditDebitCardModal';
import PaymentMethodModal from './PaymentMethodModal';

type PaymentFlowStage = 'details' | 'method' | 'creditCard';

const PaymentFlow = ({ isOpen, onClose, onAlternativeMethod }: PaymentFlowProps) => {
    const [stage, setStage] = useState<PaymentFlowStage>('details');

    useEffect(() => {
        if (isOpen) {
            setStage('details');
        }
    }, [isOpen]);

    const handleClose = () => {
        setStage('details');
        onClose();
    };

    const handleMethodContinue = (method: PaymentMethodId) => {
        if (method === 'creditDebitCard') {
            setStage('creditCard');
            return;
        }

        if (onAlternativeMethod) {
            onAlternativeMethod(method);
        }
    };

    return (
        <>
            <PaymentDetailsModal
                isOpen={isOpen && stage === 'details'}
                onClose={handleClose}
                onBack={handleClose}
                onContinue={() => setStage('method')}
            />

            <PaymentMethodModal
                isOpen={isOpen && stage === 'method'}
                onClose={handleClose}
                onBack={() => setStage('details')}
                onContinue={handleMethodContinue}
            />

            <CreditDebitCardModal
                isOpen={isOpen && stage === 'creditCard'}
                onClose={handleClose}
                onBack={() => setStage('method')}
            />
        </>
    );
};

export default PaymentFlow;
