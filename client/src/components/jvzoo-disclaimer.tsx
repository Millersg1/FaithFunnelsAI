import { Link } from "wouter";

export function JVZooDisclaimer() {
  return (
    <div className="bg-muted/50 border-t py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Important Disclaimers</h3>
            <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>INCOME DISCLAIMER:</strong> The results mentioned on this page are not typical. Your results will vary and depend on many factors including but not limited to your background, experience, and work ethic. All business involves risk and requires consistent effort and action. Faith Funnels AI is a tool to help you build sales funnels - we make no guarantees of income or success.
              </p>
              <p>
                <strong>FTC COMPLIANCE:</strong> In accordance with the FTC guidelines, we are required to inform you that some of the links on this page may be affiliate links. If you click on the link and purchase the item, we may receive an affiliate commission. We only recommend products or services that we believe will add value to our customers.
              </p>
              <p>
                <strong>AI DISCLOSURE:</strong> This product uses artificial intelligence technology powered by OpenAI for the customer support chatbot feature. AI-generated responses are provided for informational purposes. By using the chatbot, you consent to having your conversations processed by AI systems.
              </p>
              <p>
                <strong>JVZOO DISCLOSURE:</strong> This product is sold through JVZoo marketplace. JVZoo is a trusted third-party payment processor. Your purchase is protected by JVZoo's buyer protection policies.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground pt-4 border-t">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>|</span>
            <Link href="/refund" className="hover:underline">Refund Policy</Link>
            <span>|</span>
            <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
            <span>|</span>
            <Link href="/earnings-disclaimer" className="hover:underline">Earnings Disclaimer</Link>
            <span>|</span>
            <Link href="/ftc-compliance" className="hover:underline">FTC Compliance</Link>
          </div>
          <div className="text-center text-xs text-muted-foreground pt-4">
            <p>&copy; {new Date().getFullYear()} Faith Funnels AI. All rights reserved.</p>
            <p className="mt-1">Support: support@faithfunnelsai.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
