import { Toast } from 'primereact/toast';
import { useRef } from 'react';

let toastRef: any = null;

export const ToastService = () => {
    toastRef = useRef(null);

    return <Toast ref={toastRef} />;
};

export const showToast = (severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail: string) => {
    if (toastRef && toastRef.current) {
        toastRef.current.show({ severity, summary, detail });
    }
};