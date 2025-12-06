import * as React from "react";
import { FluentProvider, Input, tokens, webLightTheme } from "@fluentui/react-components";
import { IInputs } from "./generated/ManifestTypes";

export interface IPercentInputProps {
  context: ComponentFramework.Context<IInputs>
  updatePercentValue: (decimalValue: number | null) => void;
}

export const PercentInput: React.FC<IPercentInputProps> = ({ context, updatePercentValue }) => {
  // Local state for the percent text
  const decimalPlacesToRoundTo = context.parameters.numberOfDecimalPlacesToRoundPercentageTo?.raw ?? 2;
  const percentageDecimalValue = context.parameters.percentageDecimalValue?.raw;
  const [percentText, setPercentText] = React.useState(.5.toFixed(2));

  // Keep display in sync if parent value changes
  React.useEffect(() => {
    if (percentageDecimalValue) {
      setPercentText((percentageDecimalValue * 100).toFixed(decimalPlacesToRoundTo));
    }
    else {
      setPercentText("");
    }

  }, [percentageDecimalValue]);

  // Update local text while typing
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setPercentText(ev.target.value);
  };

  // Commit changes only on blur
  const handleBlur = () => {
    const parsed = parseFloat(percentText);
    if (!isNaN(parsed)) {
      const roundedNumber = parsed.toFixed(decimalPlacesToRoundTo);
      const percentAsDecimal = parseFloat((parseFloat(roundedNumber) / 100).toFixed(decimalPlacesToRoundTo + 2));
      updatePercentValue(percentAsDecimal);
    } else {
      setPercentText("");
      updatePercentValue(null);
    }
  };

  return (
    <FluentProvider theme={webLightTheme}>
      <Input
        value={percentText}
        onChange={handleChange}
        onBlur={handleBlur}
        contentAfter={percentageDecimalValue !== null && percentageDecimalValue !== undefined ? "%" : ""}
        type="number"
        placeholder="---"
        style={{ backgroundColor: tokens.colorNeutralBackground3 }}
      />
    </FluentProvider>
  );
};