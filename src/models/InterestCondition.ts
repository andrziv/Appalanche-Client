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
    public conditionNum: number;
    public conditionNum2?: number;

    public constructor(operator: OperatorType, value: number, value2?: number) {
        this.operator = operator;
        this.conditionNum = value;
        this.conditionNum2 = value2;
    }

    public isValid(): boolean {
        if (this.operator === null) {
            return false;
        }

        if (this.operator === 'between') {
            return this.conditionNum !== null && this.conditionNum2 !== null;
        }

        return this.conditionNum !== null;
    }

    public displayString(): string {
        const mappedOperator = operatorTypeMapping(this.operator);
        if (this.operator === 'between') {
            return [this.conditionNum, mappedOperator, 'x', mappedOperator, this.conditionNum2].join(" ");
        }

        return ['x', mappedOperator, this.conditionNum].join(" ");
    }

    toString() {
        if (this.operator === 'between') {
            return [this.operator, this.conditionNum, this.conditionNum2].join(":");
        }

        return [this.operator, this.conditionNum].join(":");
    }
}