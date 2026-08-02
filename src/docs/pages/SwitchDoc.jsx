import { useState } from "react";
import { Page } from "../Page";
import { Example } from "../Example";
import { PropsTable } from "../PropsTable";
import { Switch } from "../../index";

function SwitchDemo() {
  const [checked, setChecked] = useState(true);
  return <Switch label="Email notifications" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
}

export default function SwitchDoc() {
  return (
    <Page
      title="Switch"
      lead="An on/off toggle built on a native checkbox input, so keyboard control and the ARIA switch role come for free."
    >
      <Example
        title="Basic"
        code={`const [checked, setChecked] = useState(true);
<Switch
  label="Email notifications"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
      >
        <SwitchDemo />
      </Example>

      <Example
        title="Sizes"
        code={`<Switch label="Small" size="sm" checked readOnly />
<Switch label="Medium" size="md" checked readOnly />
<Switch label="Large" size="lg" checked readOnly />`}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Switch label="Small" size="sm" checked readOnly />
          <Switch label="Medium" size="md" checked readOnly />
          <Switch label="Large" size="lg" checked readOnly />
        </div>
      </Example>

      <Example
        title="Disabled"
        code={`<Switch label="Locked" checked disabled />`}
      >
        <Switch label="Locked" checked disabled />
      </Example>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: "label", type: "ReactNode", description: "Text next to the switch." },
          { name: "checked", type: "boolean", description: "Controlled on/off state." },
          { name: "onChange", type: "(e: ChangeEvent) => void", description: "Change handler." },
          { name: "size", type: "'sm' | 'md' | 'lg'", default: "'md'", description: "Track/thumb size." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
        ]}
      />
    </Page>
  );
}
