export class ApplicationState {
    static readonly Applied = new ApplicationState('Applied', 1, '#3498db', '#bebebe');
    static readonly OnlineAssessment = new ApplicationState('Online Assessment', 1, '#fe7a2b', '#bebebe');
    static readonly PhoneInterview = new ApplicationState('Phone Interview', 1, '#f1c40f', '#555555');
    static readonly Interview = new ApplicationState('Interview', 1, '#f1c40f', '#555555');
    static readonly TechnicalInterview = new ApplicationState('Technical Interview', 1, '#f1c40f', '#555555');
    static readonly Offer = new ApplicationState('Offer', 1, '#2ecc71', '#bebebe');
    static readonly Rejected = new ApplicationState('Rejected', 1, '#000000', '#ffffff');
    static readonly Withdrew = new ApplicationState('Withdrew', 1, '#000000', '#ffffff');

    public readonly label: string;
    public readonly colour: string;
    public readonly textColour: string;
    private round: number;

    private constructor(label: string, round: number, colour: string, textColour: string) {
        this.label = label;
        this.colour = colour;
        this.textColour = textColour;
        this.round = Math.max(0, round);
    }

    static interviewRound(round: number): ApplicationState {
        return new ApplicationState(ApplicationState.Interview.label, round, ApplicationState.Interview.colour, ApplicationState.Interview.textColour);
    }

    static phoneInterviewRound(round: number): ApplicationState {
        return new ApplicationState(ApplicationState.PhoneInterview.label, round, ApplicationState.PhoneInterview.colour, ApplicationState.PhoneInterview.textColour);
    }

    static technicalInterviewRound(round: number): ApplicationState {
        return new ApplicationState(ApplicationState.TechnicalInterview.label, round, ApplicationState.TechnicalInterview.colour, ApplicationState.TechnicalInterview.textColour);
    }

    static values(): ApplicationState[] {
        return [
            ApplicationState.Applied,
            ApplicationState.OnlineAssessment,
            ApplicationState.PhoneInterview,
            ApplicationState.Interview,
            ApplicationState.TechnicalInterview,
            ApplicationState.Offer,
            ApplicationState.Rejected,
            ApplicationState.Withdrew
        ];
    }

    get roundValue(): number {
        return this.round;
    }

    set roundValue(value: number) {
        this.round = value;
    }

    get code(): string {
        return this.label.toUpperCase().replace(` `, `_`) + this.round;
    }

    toString() {
        const suffix = this.round > 1 ? ` ${this.round}` : "";
        return `${this.label}${suffix}`;
    }
}