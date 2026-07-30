import { Page } from "../Page";
import { Example } from "../Example";
import { PropsTable } from "../PropsTable";
import { Divider } from "../../index";

export default function DividerDoc() {
  return (
    <Page
      title="Divider"
      lead="A thin separator between content, with an optional inline label. Server-render safe — no client JS required."
    >
      <Example
        title="Horizontal"
        code={`<p>Section one</p>
<Divider />
<p>Section two</p>`}
      >
        <div style={{ maxWidth: 320 }}>
          <p>Section one</p>
          <Divider />
          <p>Section two</p>
        </div>
      </Example>

      <Example
        title="Labeled"
        code={`<Divider>OR</Divider>`}
      >
        <div style={{ maxWidth: 320 }}>
          <p>Sign in with email</p>
          <Divider>OR</Divider>
          <p>Sign in with Google</p>
        </div>
      </Example>

      <Example
        title="Vertical"
        code={`<Divider orientation="vertical" />`}
      >
        <div style={{ display: "flex", alignItems: "center", height: 40, gap: 12 }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </div>
      </Example>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: "orientation", type: "'horizontal' | 'vertical'", default: "'horizontal'", description: "Direction of the rule." },
          { name: "children", type: "ReactNode", description: "Optional inline label; switches rendering from <hr> to a labeled separator." },
        ]}
      />
    </Page>
  );
}
