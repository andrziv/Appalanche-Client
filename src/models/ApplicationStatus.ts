export const APPLICATION_STATUSES = ['Applied', 'Online Assessment', 'Phone Interview',
    'Interview', 'Technical Interview', 'Offer', 'Rejected', 'Withdrew'] as const;

export function colourFor(applicationStatus: ApplicationStatus): string {
    switch(applicationStatus.label) {
        case 'Applied':
            return applicationStatus.colour;
        case 'Online Assessment':
            return applicationStatus.colour;
        case 'Phone Interview':
            return applicationStatus.colour;
        case 'Interview':
            return applicationStatus.colour;
        case 'Technical Interview':
            return applicationStatus.colour;
        case 'Offer':
            return applicationStatus.colour;
        case 'Rejected':
            return applicationStatus.colour;
        case 'Withdrew':
            return applicationStatus.colour;
        default:
            return "#ffffff";
    }
}

export function textColourFor(applicationStatus: ApplicationStatus): string {
    switch(applicationStatus.label) {
        case 'Applied':
            return applicationStatus.textColour;
        case 'Online Assessment':
            return applicationStatus.textColour;
        case 'Phone Interview':
            return applicationStatus.textColour;
        case 'Interview':
            return applicationStatus.textColour;
        case 'Technical Interview':
            return applicationStatus.textColour;
        case 'Offer':
            return applicationStatus.textColour;
        case 'Rejected':
            return applicationStatus.textColour;
        case 'Withdrew':
            return applicationStatus.textColour;
        default:
            return "#000000";
    }
}

export interface ApplicationStatus {
    id: number;
    code: string;
    label: string;
    round: number;
    colour: string;
    textColour: string;
}