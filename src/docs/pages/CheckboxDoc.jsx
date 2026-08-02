import { useState } from "react";
import { Page } from "../Page";
import { Example } from "../Example";
import { PropsTable } from "../PropsTable";
import { Checkbox } from "../../index";

function IndeterminateDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label="Select all"
      indeterminate={!checked}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export default function CheckboxDoc() {
  return (
    <Page
      title="Checkbox"
      lead="A labeled checkbox built on a native input for full keyboard and screen-reader support, with an indeterminate visual state."
    >
      <Example
        title="Basic"
        code={`const [checked, setChecked] = useState(false);
<Checkbox
  label="Accept terms and conditions"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}
      >
        <IndeterminateDemo />
      </Example>

      <Example
        title="Error state"
        code={`<Checkbox label="Accept terms" error="You must accept to continue" />`}
      >
        <Checkbox label="Accept terms" checked={false} error="You must accept to continue" />
      </Example>

      <Example
        title="Disabled"
        code={`<Checkbox label="Locked option" checked disabled />`}
      >
        <Checkbox label="Locked option" checked disabled />
      </Example>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: "label", type: "ReactNode", description: "Text next to the box." },
          { name: "checked", type: "boolean", description: "Controlled checked state." },
          { name: "indeterminate", type: "boolean", default: "false", description: "Renders a dash instead of a check; DOM-only state, doesn't affect `checked`." },
          { name: "onChange", type: "(e: ChangeEvent) => void", description: "Change handler." },
          { name: "helperText", type: "ReactNode", description: "Helper text shown below." },
          { name: "error", type: "ReactNode", description: "Error message; replaces helperText and applies error styling." },
          { name: "disabled", type: "boolean", default: "false", description: "Disables the field." },
        ]}
      />
    </Page>
  );
}
