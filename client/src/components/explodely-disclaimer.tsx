export function ExplodelyDisclaimer() {
  return (
    <div className="border-t py-6 bg-muted/50">
      <div className="container mx-auto px-4 space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-xs">
          <a 
            href="/disclaimer"
            className="text-muted-foreground hover:text-foreground underline"
            data-testid="link-disclaimer"
          >
            Disclaimer
          </a>
          <a 
            href="/refund"
            className="text-muted-foreground hover:text-foreground underline"
            data-testid="link-refund-policy"
          >
            Refund Policy
          </a>
          <a 
            href="/ftc-compliance"
            className="text-muted-foreground hover:text-foreground underline"
            data-testid="link-ftc-compliance"
          >
            FTC Compliance
          </a>
          <a 
            href="/earnings-disclaimer"
            className="text-muted-foreground hover:text-foreground underline"
            data-testid="link-earnings-disclaimer"
          >
            Earnings Disclaimer
          </a>
          <a 
            href="mailto:support@faithfunnelsai.com"
            className="text-muted-foreground hover:text-foreground underline"
            data-testid="link-product-support"
          >
            Product Support
          </a>
          <a 
            href="https://help.explodely.com/support/tickets/new" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground underline"
            data-testid="link-billing-support"
          >
            Billing Support
          </a>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed text-center">
          Explodely.com is the trusted gateway for Faith Funnels AI. Explodely is a trademark of Explodely LLC, a US corporation located at 1317 Edgewater Drive Suite #4648, Orlando FL, 32804, United States and used by permission. Explodely's role as a gateway provider does not constitute an endorsement, approval or review of this product(s) or any claim, statement or opinion used in promotion of this product(s). If you aren't completely satisfied with your purchase, or need order support, please contact Explodely here:{" "}
          <a 
            href="http://expldely.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="underline hover:text-foreground"
            data-testid="link-explodely-support"
          >
            http://expldely.com/
          </a>
        </p>
      </div>
    </div>
  );
}
