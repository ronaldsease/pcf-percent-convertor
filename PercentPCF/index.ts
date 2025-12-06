import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { PercentInput, IPercentInputProps } from "./PercentInput";
import * as React from "react";

export class PercentPCF implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    percentageDecimalValue?: number | null;

    constructor() {
        // Empty
    }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        this.percentageDecimalValue = undefined;
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: IPercentInputProps = { context, updatePercentValue: this.updatePercentValue };
        return React.createElement(
            PercentInput, props
        );
    }

    public getOutputs(): IOutputs {
        return {
            percentageDecimalValue: this.percentageDecimalValue ?? undefined
        };
    }

    public destroy(): void {
        // Empty
    }

    public updatePercentValue = (percentageDecimalValue: number | null): void => {
        this.percentageDecimalValue = percentageDecimalValue;
        this.notifyOutputChanged();
    };
}
