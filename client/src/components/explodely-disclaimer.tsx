export function ExplodelyDisclaimer() {
  return (
    <div className="border-t py-6 bg-muted/50">
      <div className="container mx-auto px-4">
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
