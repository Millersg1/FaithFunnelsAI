import { JVZooDisclaimer } from "@/components/jvzoo-disclaimer";

export default function JVZooEarningsDisclaimer() {
  return (
    <div className="min-h-screen flex flex-col">
    <div className="flex-1 max-w-4xl mx-auto px-4 py-12 space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Earnings Disclaimer</h1>
        <p className="text-muted-foreground">Last updated: January 10, 2026</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">No Earnings Projections, Promises, or Representations</h2>
          <p className="leading-relaxed text-muted-foreground">
            You recognize and agree that we have made no implications, warranties, promises, suggestions, projections, representations or guarantees whatsoever to you about future prospects or earnings, or that you will earn any money, with respect to your purchase of Faith Funnels AI, and that we have not authorized any such projection, promise, or representation by others.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Any earnings or income statements, or any earnings or income examples, are only estimates of what we think you could earn. There is no assurance you will do as well as stated in any examples. If you rely upon any figures provided, you must accept the entire risk of not doing as well as the information provided.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Results May Vary</h2>
          <p className="leading-relaxed text-muted-foreground">
            Your results will vary and depend on many factors, including but not limited to your background, experience, and work ethic. All business involves risk and requires consistent effort and action. If you're not willing to accept that, please DO NOT PURCHASE FAITH FUNNELS AI.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The testimonials and examples used are exceptional results, which do not apply to the average purchaser, and are not intended to represent or guarantee that anyone will achieve the same or similar results. Each individual's success depends on their background, dedication, desire, and motivation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">No Financial Advice</h2>
          <p className="leading-relaxed text-muted-foreground">
            We are not financial advisors or planners. The information contained on this website and the Faith Funnels AI product is not intended as, and shall not be understood or construed as, financial advice. We are not attorneys, accountants, or financial advisors, nor are we holding ourselves out to be.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The information contained on this website and in the Faith Funnels AI product is not a substitute for financial advice from a professional who is aware of the facts and circumstances of your individual situation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Your Responsibility</h2>
          <p className="leading-relaxed text-muted-foreground">
            You alone are responsible and accountable for your decisions, actions, and results in life, and by your registration here you agree not to attempt to hold us liable for your decisions, actions, or results, at any time, under any circumstance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Tools and Software</h2>
          <p className="leading-relaxed text-muted-foreground">
            Faith Funnels AI is a software tool designed to help you create faith-based sales funnels. Like any tool, results depend entirely on how you use it. We make no guarantees about the income you will generate using our software.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            The software is designed to save you time and effort in building sales funnels. Your success with these funnels depends on factors including your marketing skills, product quality, market demand, and business acumen.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Typical Results</h2>
          <p className="leading-relaxed text-muted-foreground">
            The typical purchaser does not make any money using this system. We make no guarantees of income whatsoever.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Payment Processing</h2>
          <p className="leading-relaxed text-muted-foreground">
            JVZoo.com is the trusted marketplace for Faith Funnels AI. JVZoo is a registered trademark of BBC Systems, Inc.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="leading-relaxed text-muted-foreground">
            If you have any questions about this Earnings Disclaimer, please contact us:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Via JVZoo:{" "}
              <a href="https://www.jvzoo.com/helpdesk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://www.jvzoo.com/helpdesk
              </a>
            </li>
            <li>By email:{" "}
              <a href="mailto:support@faithfunnelsai.com" className="text-primary hover:underline">
                support@faithfunnelsai.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
    <JVZooDisclaimer />
    </div>
  );
}
