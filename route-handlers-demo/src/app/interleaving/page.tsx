import { ClientComponentOne } from "@/components/client-component-one";
import { ServerComponentOne } from "@/components/server-component-one";

export default function InterleavingPage() {
  console.log("Interleaving Component rendered");
  return (
    <div>
      <h3>This is Interleaving Component</h3>
      <ClientComponentOne />
      <ServerComponentOne />
    </div>
  );
}
