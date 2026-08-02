import { useState } from "react";
import { Switch } from ".";

export default {
  title: "Primitives/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Email notifications", size: "md" },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export const Playground = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
  },
};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Switch label="Small" size="sm" checked readOnly />
      <Switch label="Medium" size="md" checked readOnly />
      <Switch label="Large" size="lg" checked readOnly />
    </div>
  ),
};

export const Disabled = {
  args: { label: "Locked", checked: true, disabled: true },
};
