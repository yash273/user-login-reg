export interface FormField {
    id: number;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
    label: string;
    options?: string[];
    required?: boolean;
    order?: number;
}


