import { Page } from "../Page";
import { Example } from "../Example";
import { PropsTable } from "../PropsTable";
import { Avatar } from "../../index";

export default function AvatarDoc() {
  return (
    <Page
      title="Avatar"
      lead="User or entity image with an automatic initials fallback — never renders a broken image, and works the same server- or client-rendered."
    >
      <Example
        title="Sizes"
        code={`<Avatar name="Ada Lovelace" size="xs" />
<Avatar name="Ada Lovelace" size="sm" />
<Avatar name="Ada Lovelace" size="md" />
<Avatar name="Ada Lovelace" size="lg" />
<Avatar name="Ada Lovelace" size="xl" />`}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name="Ada Lovelace" size="xs" />
          <Avatar name="Ada Lovelace" size="sm" />
          <Avatar name="Ada Lovelace" size="md" />
          <Avatar name="Ada Lovelace" size="lg" />
          <Avatar name="Ada Lovelace" size="xl" />
        </div>
      </Example>

      <Example
        title="Image with fallback"
        description="If `src` is missing or fails to load, Avatar falls back to initials derived from `name`."
        code={`<Avatar src="/jane.jpg" name="Jane Doe" />
<Avatar src="/broken.jpg" name="Jane Doe" />`}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar src="https://i.pravatar.cc/80?img=5" name="Jane Doe" />
          <Avatar src="/broken.jpg" name="Jane Doe" />
        </div>
      </Example>

      <Example
        title="Status indicator"
        code={`<Avatar name="Ada Lovelace" status="online" />
<Avatar name="Grace Hopper" status="away" />
<Avatar name="Alan Turing" status="busy" />
<Avatar name="Tim Berners" status="offline" />`}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <Avatar name="Ada Lovelace" status="online" />
          <Avatar name="Grace Hopper" status="away" />
          <Avatar name="Alan Turing" status="busy" />
          <Avatar name="Tim Berners" status="offline" />
        </div>
      </Example>

      <h2>Props</h2>
      <PropsTable
        rows={[
          { name: "src", type: "string", description: "Image URL. Falls back to initials on error or when omitted." },
          { name: "name", type: "string", description: "Used for initials and the default alt text." },
          { name: "alt", type: "string", description: "Overrides the image alt text." },
          { name: "size", type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: "Avatar diameter." },
          { name: "shape", type: "'circle' | 'square'", default: "'circle'", description: "Outer shape." },
          { name: "status", type: "'online' | 'offline' | 'away' | 'busy'", description: "Optional presence dot." },
        ]}
      />
    </Page>
  );
}
