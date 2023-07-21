export interface FormData {
    formName: string,
    formDetails: Array<{
        id: number;
        type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
        label: string;
        options?: string[];
        required?: boolean;
        order?: number;
    }>
}


