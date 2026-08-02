import { useState } from "react";
import { Checkbox } from ".";

export default {
  title: "Primitives/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Accept terms and conditions" },
};

export const Playground = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Indeterminate = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label="Select all"
        indeterminate={!checked}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const WithError = {
  args: { label: "Accept terms", checked: false, error: "You must accept to continue" },
};

export const Disabled = {
  args: { label: "Locked option", checked: true, disabled: true },
};
