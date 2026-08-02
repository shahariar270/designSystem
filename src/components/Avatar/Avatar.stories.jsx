import { Avatar } from ".";

export default {
  title: "Primitives/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Jane Doe", size: "md", shape: "circle" },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    shape: { control: "select", options: ["circle", "square"] },
    status: { control: "select", options: [undefined, "online", "offline", "away", "busy"] },
  },
};

export const Playground = {};

export const Sizes = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar name="Ada Lovelace" size="xs" />
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Ada Lovelace" size="lg" />
      <Avatar name="Ada Lovelace" size="xl" />
    </div>
  ),
};

export const WithImage = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar src="https://i.pravatar.cc/80?img=5" name="Jane Doe" />
      <Avatar src="/broken-image.jpg" name="Jane Doe" />
    </div>
  ),
};

export const WithStatus = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar name="Ada Lovelace" status="online" />
      <Avatar name="Grace Hopper" status="away" />
      <Avatar name="Alan Turing" status="busy" />
      <Avatar name="Tim Berners" status="offline" />
    </div>
  ),
};

export const Shapes = {
  render: () => (
    <div style={{ display: "flex", gap: 12 }}>
      <Avatar name="Jane Doe" shape="circle" />
      <Avatar name="Jane Doe" shape="square" />
    </div>
  ),
};
