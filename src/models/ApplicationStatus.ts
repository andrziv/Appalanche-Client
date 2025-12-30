export const SIMPLE_FE_APPLICATION_STATUSES: ApplicationStatus[] = [
    {
        id: 0,
        code: "APPLIED",
        label: "Applied",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 1,
        code: "ONLINE_ASSESSMENT",
        label: "Online Assessment",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 2,
        code: "PHONE_INTERVIEW",
        label: "Phone Interview",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 3,
        code: "INTERVIEW",
        label: "Interview",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 4,
        code: "TECHNICAL_INTERVIEW",
        label: "Technical Interview",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 5,
        code: "OFFER",
        label: "Offer",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 6,
        code: "REJECTED",
        label: "Rejected",
        round: 0,
        colour: "",
        textColour: ""
    }, {
        id: 7,
        code: "WITHDREW",
        label: "Withdrew",
        round: 0,
        colour: "",
        textColour: ""
    }] as const;

export interface ApplicationStatus {
    id: number;
    code: string;
    label: string;
    round: number;
    colour: string;
    textColour: string;
}