import Link from "next/link";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <section>
          <h2>Structural Analysis</h2>

          <p>
            Analyze structural systems including beams, trusses, and frames.
          </p>

          <Link href="/structural">Open Structural Analysis</Link>
        </section>
      </main>
    </>
  );
}
