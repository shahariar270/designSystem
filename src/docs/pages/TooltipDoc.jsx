import { Page } from "../Page";
import { Example } from "../Example";
import { PropsTable } from "../PropsTable";
import { Tooltip, Button } from "../../index";

export default function TooltipDoc() {
  return (
    <Page
      title="Tooltip"
      lead="A hover/focus hint anchored to a single child element. aria-describedby is wired onto the trigger itself, so screen readers announce it on keyboard focus too."
    >
      <Example
        title="Basic"
        code={`<Tooltip content="Copy to clipboard">
  <Button>Hover me</Button>
</Tooltip>`}
      >
        <div style={{ padding: 24 }}>
          <Tooltip content="Copy to clipboard">
            <Button>Hover me</Button>
          </Tooltip>
        </div>
      </Example>

      <Example
        title="Placements"
        code={`<Tooltip content="Top tooltip" placement="top"><Button>Top</Button></Tooltip>
<Tooltip content="Bottom tooltip" placement="bottom"><Button>Bottom</Button></Tooltip>
<Tooltip content="Left tooltip" placement="left"><Button>Left</Button></Tooltip>
<Tooltip content="Right tooltip" placement="right"><Button>Right</Button></Tooltip>`}
      >
        <div style={{ display: "flex", gap: 48, padding: 40 }}>
          <Tooltip content="Top tooltip" placement="top">
            <Button variant="secondary">Top</Button>
          </Tooltip>
          <Tooltip content="Bottom tooltip" placement="bottom">
            <Button variant="secondary">Bottom</Button>
          </Tooltip>
          <Tooltip content="Left tooltip" placement="left">
            <Button variant="secondary">Left</Button>
          </Tooltip>
          <Tooltip content="Right tooltip" placement="right">
            <Button variant="secondary">Right</Button>
          </Tooltip>
        </div>
      </Example>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: "children", type: "ReactElement", description: "Single trigger element; receives aria-describedby and hover/focus handlers." },
          { name: "content", type: "ReactNode", description: "Tooltip text/content." },
          { name: "placement", type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: "Side the bubble anchors to." },
        ]}
      />
    </Page>
  );
}
