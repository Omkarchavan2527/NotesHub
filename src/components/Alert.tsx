import React from 'react';

import {
    CheckCircle,
    Info,
    AlertTriangle,
    XCircle,
    X,
} from 'lucide-react';
type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertProps {
    type: AlertType;
    title: string;
    description?: string;
    actionText?: string;
    onActionClick?: () => void;
    onClose?: () => void;
}

const styles = {
    success: {
        wrapper: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-800 ',
        icon: 'text-green-600',
        Icon: CheckCircle,

    },

    info: {
        wrapper: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-800 ',
        icon: 'text-blue-600',
        Icon: Info,

    },
    warning: {
        wrapper: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-800 ',
        icon: 'text-yellow-600',
        Icon: AlertTriangle,

    },
    error: {
        wrapper: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-800 ',
        icon: 'text-red-600',
        Icon: XCircle,

    },
};


export const Alert: React.FC<AlertProps> = ({
    type,
    title,
    description,
    actionText,
    onActionClick,
    onClose

}) => {

    const { wrapper, icon, Icon } = styles[type];
    return (

        <div className={`relative flex gap-3 rounded-lg border p-4 ${wrapper}`}>

            <Icon className={`mt-0.5 h-5 w-5 ${icon}`}/>

            <div className='flex-1'>
                <h4 className='test-sm font-semibold'>{title}</h4>
                {description && (
                    <p className='mt-1 text-sm opacity-90'>
                        {description}
                    </p>
                )}

                {actionText && (
                    <button
                    onClick={onActionClick}
                    className='mt-2 text-sm font-medium underline underline-offset-2 hover:opacity-80'
                    >
                        {actionText}
                    </button>
                )}
            </div>
            {onclose&&(
                <button onClick={onClose}
                className='absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );

};