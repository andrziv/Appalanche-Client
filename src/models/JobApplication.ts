import type {ExperienceLevel} from "./ExperienceLevel.ts";
import type {ApplicationStatus} from "./ApplicationStatus.ts";

export interface JobApplication {
    applicationId: string;
    requisitionId: string;
    title: string;
    company: string;
    interest: number;
    status: ApplicationStatus;
    experience: ExperienceLevel;
    jobPostingLink: string;
    description: string;
    appliedDate: string;
    responseDate: string;
}

export interface JobApplicationForm {
    requisitionId: string;
    title: string;
    company: string;
    interest: number;
    statusCode: string;
    experienceLevelCode: string;
    jobPostingLink: string;
    appliedDate: string;
    responseDate: string;
}

export function isEqual(app1: JobApplication, app2: JobApplication) {
    return app1.applicationId !== app2.applicationId
        || app1.requisitionId !== app2.requisitionId
        || app1.title !== app2.title
        || app1.company !== app2.company
        || app1.interest !== app2.interest
        || app1.status.code !== app2.status.code
        || app1.experience.code !== app2.experience.code
        || app1.jobPostingLink !== app2.jobPostingLink
        || app1.appliedDate !== app2.appliedDate
        || app1.responseDate !== app2.responseDate;
}