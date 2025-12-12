export const OPERATORS = ['gt', 'gte', 'eq', 'lte', 'lt', 'between'] as const;
export type OperatorType = typeof OPERATORS[number];

export function operatorTypeMapping(operator: OperatorType) {
    switch (operator) {
        case 'gt':
            return "\u003e";
        case 'gte':
            return "\u2265";
        case 'eq':
            return "\u003d";
        case 'lte':
            return "\u2264";
        case 'lt':
            return "\u003c";
        case 'between':
            return "\u2264";
        default:
            return "";
    }
}

export class InterestCondition {
    public operator: OperatorType;
    public value: number;
    public value2?: number;

    public constructor(operator: 'gt' | 'gte' | 'eq' | 'lte' | 'lt' | 'between', value: number, value2?: number) {
        this.operator = operator;
        this.value = value;
        this.value2 = value2;
    }

    public isValid(): boolean {
        if (this.operator === null) {
            return false;
        }

        if (this.operator === 'between') {
            return this.value !== null && this.value2 !== null;
        }

        return this.value !== null;
    }

    public displayString(): string {
        const mappedOperator = operatorTypeMapping(this.operator);
        if (this.operator === 'between') {
            return [this.value, mappedOperator, 'x', mappedOperator, this.value2].join(" ");
        }

        return ['x', mappedOperator, this.value].join(" ");
    }

    toString() {
        if (this.operator === 'between') {
            return [this.operator, this.value, this.value2].join(":");
        }

        return [this.operator, this.value].join(":");
    }
}