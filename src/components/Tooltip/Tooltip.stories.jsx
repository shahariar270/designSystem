import { Tooltip } from ".";
import Button from "../Buttons";

export default {
  title: "Overlays & Feedback/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  argTypes: {
    placement: { control: "select", options: ["top", "bottom", "left", "right"] },
  },
};

export const Playground = {
  args: { content: "Copy to clipboard", placement: "top" },
  render: (args) => (
    <div style={{ padding: 40 }}>
      <Tooltip {...args}>
        <Button>Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements = {
  render: () => (
    <div style={{ display: "flex", gap: 64, padding: 60 }}>
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
  ),
};
