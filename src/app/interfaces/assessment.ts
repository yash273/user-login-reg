export interface AssessmentData {
    aId: number;
    // AssmData: {
    bodyRegion: string;
    description: string;
    template: string;
    measurements: Array<{
        about: string;
        time: string;
    }>;
    category: Array<{
        catName: string;
        assessment: Array<{
            AssmName: string;
            AssmDetails: Array<{
                type: string;
                unit: string;
                rangeFrom: string;
                rangeTo: string;
                refRegion: string;
                measureType: boolean;
                measureRegion: string;
                isPatientAssessment: boolean;
                chartData: any;
                measurements: string[];
                routine: string[];
                goals: {
                    comparison: {
                        selection: string;
                        value: string;
                    },
                    simple: {
                        selection: string;
                        value: string;
                    },
                    errorRate: {
                        selection: string;
                        value: string;
                    },
                    difference: {
                        selection: string;
                        value: string;
                    }
                };
                times: Array<{
                    about: string;
                    time: string;
                }>;
            }>;
        }>;
    }>
    // }
}
