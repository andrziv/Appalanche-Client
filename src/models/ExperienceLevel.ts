export class ExperienceLevel {
    static readonly Intern = new ExperienceLevel('Intern', 'Not graduated yet');
    static readonly Entry = new ExperienceLevel('Entry Level', '0 years experience');
    static readonly Junior = new ExperienceLevel('Junior', '1–2 years experience');
    static readonly Intermediate = new ExperienceLevel('Intermediate', '3–5 years experience');
    static readonly Senior = new ExperienceLevel('Senior', '5–8 years experience');
    static readonly Staff = new ExperienceLevel('Staff', '>8 years experience');
    static readonly Principal = new ExperienceLevel('Principal', '>10 years experience');
    static readonly Manager = new ExperienceLevel('Manager', 'Managerial role');

    public readonly label: string;
    public readonly description: string;

    private constructor(label: string, description: string) {
        this.label = label;
        this.description = description;
    }

    static values(): ExperienceLevel[] {
        return [
            ExperienceLevel.Intern,
            ExperienceLevel.Entry,
            ExperienceLevel.Junior,
            ExperienceLevel.Intermediate,
            ExperienceLevel.Senior,
            ExperienceLevel.Staff,
            ExperienceLevel.Principal,
            ExperienceLevel.Manager,
        ];
    }

    get code(): string {
        return label.toUpperCase().replace(` `, `_`);
    }

    toString() {
        return this.label;
    }
}