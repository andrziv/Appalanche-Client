export class ApplicationState {
    static readonly Applied = new ApplicationState('Applied', '#3498db', '#bebebe');        // Blue
    static readonly PhoneInterview = new ApplicationState('Interview', '#f1c40f', '#555555');
    static readonly Interview = new ApplicationState('Interview', '#f1c40f', '#555555');
    static readonly TechnicalInterview = new ApplicationState('Interview', '#f1c40f', '#555555'); // Yellow
    static readonly Offer = new ApplicationState('Offer', '#2ecc71', '#bebebe');            // Green
    static readonly Rejected = new ApplicationState('Rejected', '#000000', '#ffffff');      // Red

    public readonly label: string;
    public readonly colour: string;
    public readonly textColour: string;

    private constructor(label: string, colour: string, textColour: string) {
        this.label = label;
        this.colour = colour;
        this.textColour = textColour;
    }

    static interviewRound(round: number): ApplicationState {
        return new ApplicationState(`Interview ${round}`, ApplicationState.Interview.colour, ApplicationState.Interview.textColour);
    }

    toString() {
        return this.label;
    }
}