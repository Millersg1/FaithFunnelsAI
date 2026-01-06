import { Link } from "wouter";

export default function FTCCompliance() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">FTC Compliance Disclosure</h1>
        <p className="text-muted-foreground">Effective date: December 25, 2025</p>
        <p className="text-muted-foreground">Last updated: December 25, 2025</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <p className="text-lg leading-relaxed text-muted-foreground italic">
          We aim to operate with integrity, honesty, and respect.
        </p>

        <p className="leading-relaxed text-muted-foreground">
          This FTC Compliance Disclosure explains how we comply with advertising and endorsement rules, including the U.S. Federal Trade Commission (FTC) guidelines, when promoting products, services, or offers.
        </p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Material Connections</h2>
          <p className="leading-relaxed text-muted-foreground">
            We may receive compensation (commissions, free products, discounts, sponsorships, or other benefits) in connection with recommendations, reviews, endorsements, or links. We disclose these relationships as required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Clear & Conspicuous Disclosures</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Disclosures should appear close to the relevant claim or link.</li>
            <li>Disclosures should be easy to understand and not hidden.</li>
            <li>Disclosures should be visible on mobile devices.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Results & Earnings Claims</h2>
          <p className="leading-relaxed text-muted-foreground">
            If results or earnings are mentioned, they should be presented accurately, with context, and without implying typical outcomes unless supported by evidence. See our{" "}
            <Link href="/earnings-disclaimer" className="text-primary hover:underline">
              Earnings & Results Disclaimer
            </Link>{" "}
            if available.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Questions</h2>
          <p className="leading-relaxed text-muted-foreground">
            Contact us at{" "}
            <a href="mailto:pastorshawn@faithharborministries.com" className="text-primary hover:underline">
              pastorshawn@faithharborministries.com
            </a>{" "}
            if you have questions about compliance disclosures.
          </p>
        </section>

        <section className="border-t pt-6 mt-8 space-y-3">
          <p className="text-sm text-muted-foreground">
            <strong>Contact:</strong> Faith Harbor Ministries, LLC • 815 Superior Ave East, Suite 1618 • Cleveland, OH 44114 • United States • Email:{" "}
            <a href="mailto:pastorshawn@faithharborministries.com" className="text-primary hover:underline">
              pastorshawn@faithharborministries.com
            </a>
          </p>
          <p className="text-xs text-muted-foreground italic">
            Legal Disclaimer: Faith Harbor Legal Pages provides informational templates for educational purposes only. We are not a law firm and do not provide legal advice. Review with qualified counsel for your jurisdiction.
          </p>
        </section>
      </div>
    </div>
  );
}
