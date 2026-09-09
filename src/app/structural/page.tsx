import Link from "next/link";

export default function StructuralPage() {
  return (
    <main>
      <h1>Structural Analysis</h1>

      <p>
        Structural engineering tools for analyzing beams, trusses, and frames.
      </p>

      <section>
        <h2>Beam Analysis</h2>

        <p>
          Analyze beams with supports and loads and view structural results.
        </p>

        <Link href="/structural/beam">
          Open Beam Analysis
        </Link>
      </section>
    </main>
  );
}