import type {ExperienceLevel} from "./ExperienceLevel.ts";
import type {ApplicationState} from "./ApplicationState.ts";

export class JobApplication {
    private id: number;
    private employerName: string;
    private positionName: string;
    private jobId: string;
    private level: ExperienceLevel;
    private interest: number;
    private status: ApplicationState;
    private dateApplied: Date;
    private lastResponse: Date;
    private link: string;

    constructor(id: number, employerName: string, positionName: string, jobId: string, level: ExperienceLevel,
                interest: number, status: ApplicationState, dateApplied: Date, lastResponse: Date, link: string) {
        this.id = id;
        this.employerName = employerName;
        this.positionName = positionName;
        this.jobId = jobId;
        this.level = level;
        this.interest = interest;
        this.status = status;
        this.dateApplied = dateApplied;
        this.lastResponse = lastResponse;
        this.link = link;
    }


    get idValue(): number {
        return this.id;
    }

    get employer(): string {
        return this.employerName;
    }

    get position(): string {
        return this.positionName;
    }

    get jobIdentifier(): string {
        return this.jobId;
    }

    get experienceLevel(): ExperienceLevel {
        return this.level;
    }

    get interestLevel(): number {
        return this.interest;
    }

    get applicationStatus(): ApplicationState {
        return this.status;
    }

    get appliedDate(): Date {
        return this.dateApplied;
    }

    get lastResponseDate(): Date {
        return this.lastResponse;
    }

    get jobLink(): string {
        return this.link;
    }
}