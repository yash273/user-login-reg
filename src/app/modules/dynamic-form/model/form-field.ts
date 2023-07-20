export interface FormField {
    id: number;
    type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
    label: string;
    options?: string[];
    required?: boolean;
    order?: number;
}
// export interface FormField {
//     id: number;
//     type: 'text' | 'textarea' | 'select' | 'radio' | 'checkbox';
//     label: string;
//     options?: EditableOption[];
//     required?: boolean;
//     order?: number;
// }


