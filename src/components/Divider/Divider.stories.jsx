import { Divider } from ".";

export default {
  title: "Primitives/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
};

export const Playground = {
  args: {},
  render: (args) => (
    <div style={{ maxWidth: 320 }}>
      <p>Section one</p>
      <Divider {...args} />
      <p>Section two</p>
    </div>
  ),
};

export const Labeled = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <p>Sign in with email</p>
      <Divider>OR</Divider>
      <p>Sign in with Google</p>
    </div>
  ),
};

export const Vertical = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", height: 40, gap: 12 }}>
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
