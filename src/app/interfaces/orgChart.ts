export interface ChartData {
    id?: number;
    name: string;
    designation: string;
    experience?: number;
    tech: string;
    children?: ChartData[];
}