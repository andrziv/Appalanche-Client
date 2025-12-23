import type {ExperienceLevel} from "./ExperienceLevel.ts";
import type {ApplicationStatus} from "./ApplicationStatus.ts";

export interface JobApplication {
    id: number;
    company: string;
    title: string;
    requisitionId: string;
    experience: ExperienceLevel;
    interest: number;
    status: ApplicationStatus;
    appliedDate: string;
    responseDate: string;
    // link: string;
}