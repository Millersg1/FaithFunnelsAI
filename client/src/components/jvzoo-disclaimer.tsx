import { Link } from "wouter";
import jvzooLogo from "@assets/jvzoo_logo_3_17_1768161220939.png";

export function JVZooDisclaimer() {
  return (
    <div className="bg-muted/50 border-t py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center mb-4">
            <img 
              src={jvzooLogo} 
              alt="JVZoo" 
              className="h-10 object-contain"
            />
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Disclaimer</h3>
            <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
              <p>
                Please note that this product does not provide any guarantee of income or success. The results achieved by the product owner or any other individuals mentioned are not indicative of future success or earnings. This website is not affiliated with FaceBook or any of its associated entities. Once you navigate away from FaceBook, the responsibility for the content and its usage lies solely with the user. All content on this website, including but not limited to text, images, and multimedia, is protected by copyright law and the Digital Millennium Copyright Act. Unauthorized copying, duplication, modification, or theft, whether intentional or unintentional, is strictly prohibited. Violators will be prosecuted to the fullest extent of the law.
              </p>
              <p>
                We want to clarify that JVZoo serves as the retailer for the products featured on this site. JVZoo® is a registered trademark of BBC Systems Inc., a Florida corporation located at 1809 E. Broadway Street, Suite 125, Oviedo, FL 32765, USA, and is used with permission. The role of JVZoo as a retailer does not constitute an endorsement, approval, or review of these products or any claims, statements, or opinions used in their promotion.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground pt-4 border-t">
            <Link href="/terms" className="hover:underline">Terms of Service</Link>
            <span>|</span>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <span>|</span>
            <Link href="/jvzoo/refund" className="hover:underline">Refund Policy</Link>
            <span>|</span>
            <Link href="/jvzoo/disclaimer" className="hover:underline">Disclaimer</Link>
            <span>|</span>
            <Link href="/jvzoo/earnings-disclaimer" className="hover:underline">Earnings Disclaimer</Link>
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
