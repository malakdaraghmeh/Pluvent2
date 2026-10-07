import { useEffect, useState } from 'react';
import PaymentDetailsModal from './PaymentDetailsModal';
import type {
    PaymentFlowProps,
    PaymentFlowStage,
    PaymentMethodId,
} from '../../../../utils/types/payment-method-modal.types';
import CreditDebitCardModal from './CreditDebitCardModal';
import PaymentMethodModal from './PaymentMethodModal';

const PaymentFlow = ({ isOpen, onClose, onAlternativeMethod }: PaymentFlowProps) => {
    const [stage, setStage] = useState<PaymentFlowStage>('details');

    useEffect(() => {
        if (isOpen) setStage('details');
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
        onAlternativeMethod?.(method);
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
