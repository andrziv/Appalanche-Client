import type {ExperienceLevel} from "./ExperienceLevel.ts";
import type {ApplicationStatus} from "./ApplicationStatus.ts";

export interface JobApplication {
    id: number;
    applicationId: string;
    requisitionId: string;
    title: string;
    company: string;
    interest: number;
    status: ApplicationStatus;
    experience: ExperienceLevel;
    jobPostingLink: string;
    appliedDate: string;
    responseDate: string;
}