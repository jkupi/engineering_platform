import BeamWorkspace from "@/components/BeamWorkspace";

export default function BeamPage() {
  return (
    <main>
      <h1>Beam Analysis</h1>

      <p>
        Analyze beam supports, loads, reactions, shear forces, and bending
        moments.
      </p>

      <BeamWorkspace />

      <section>
        <h2>Results</h2>

        <p>Support reactions and analysis results will be displayed here.</p>
      </section>
    </main>
  );
}
