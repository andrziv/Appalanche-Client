export class ExperienceLevel {
    static readonly Entry = new ExperienceLevel('Entry Level', '0 years experience');
    static readonly Junior = new ExperienceLevel('Junior', '1–2 years experience');
    static readonly Intermediate = new ExperienceLevel('Intermediate', '3–5 years experience');
    static readonly Senior = new ExperienceLevel('Senior', '5–8 years experience');
    static readonly StaffPlus = new ExperienceLevel('Staff+', '8+ years experience');

    public readonly label: string;
    public readonly description: string;

    private constructor(label: string, description: string) {
        this.label = label;
        this.description = description;
    }

    toString() {
        return this.label;
    }
}