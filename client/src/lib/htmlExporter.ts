import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { Funnel, Verse, Theme, TenantSettings } from "@shared/schema";

export function generateHTML(
  funnel: Funnel,
  verses: Verse[],
  themes: Theme[],
  stageIndex: number,
  tenantSettings?: Partial<TenantSettings>,
  exportImagePath?: string
): string {
  const stage = funnel.stages[stageIndex];
  if (!stage) return "";

  const verse = verses.find(v => v.id === stage.verseId);
  const theme = themes.find(t => t.id === stage.themeId) || themes[0];

  const primaryColor = tenantSettings?.primaryColor || theme?.primaryColor || "#6366f1";
  const secondaryColor = tenantSettings?.secondaryColor || theme?.secondaryColor || "#8b5cf6";
  const accentColor = tenantSettings?.accentColor || theme?.accentColor || "#ec4899";
  
  const businessName = tenantSettings?.businessName || "Faith Funnels AI";
  const supportEmail = tenantSettings?.supportEmail || "support@faithfunnelsai.com";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${stage.title} - ${funnel.name}</title>
  <meta name="description" content="${funnel.name} - ${stage.title}">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .header h1 {
      font-size: 3em;
      color: ${primaryColor};
      margin-bottom: 20px;
      font-weight: 700;
    }
    
    .header p {
      font-size: 1.3em;
      color: ${secondaryColor};
    }
    
    .verse-card {
      background: white;
      padding: 40px;
      border-radius: 12px;
      margin: 40px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-left: 4px solid ${primaryColor};
    }
    
    .verse-icon {
      display: inline-block;
      width: 48px;
      height: 48px;
      background: ${primaryColor}20;
      border-radius: 8px;
      text-align: center;
      line-height: 48px;
      color: ${primaryColor};
      font-size: 24px;
      margin-bottom: 20px;
    }
    
    .verse-text {
      font-size: 1.3em;
      font-style: italic;
      line-height: 1.8;
      color: #555;
      margin: 20px 0;
    }
    
    .verse-reference {
      font-size: 1.1em;
      font-weight: 600;
      color: #777;
      margin-top: 15px;
    }
    
    .cta-button {
      display: inline-block;
      background: ${primaryColor};
      color: white;
      padding: 18px 48px;
      font-size: 1.2em;
      font-weight: 600;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s;
      margin-top: 30px;
    }
    
    .cta-button:hover {
      background: ${secondaryColor};
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }
    
    .cta-section {
      text-align: center;
      margin: 60px 0;
    }
    
    .hero-image {
      width: 100%;
      max-height: 400px;
      object-fit: cover;
      border-radius: 12px;
      margin: 40px 0;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
    
    .content {
      background: white;
      padding: 40px;
      border-radius: 12px;
      margin: 40px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    
    .content h2 {
      color: ${primaryColor};
      font-size: 2em;
      margin-bottom: 20px;
    }
    
    .content p {
      font-size: 1.1em;
      line-height: 1.8;
      color: #555;
      margin-bottom: 15px;
    }
    
    .footer {
      text-align: center;
      margin-top: 80px;
      padding: 40px 20px;
      border-top: 2px solid #eee;
      color: #777;
    }
    
    .footer a {
      color: ${primaryColor};
      text-decoration: none;
      margin: 0 15px;
    }
    
    .footer a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 768px) {
      .header h1 {
        font-size: 2em;
      }
      
      .verse-text {
        font-size: 1.1em;
      }
      
      .cta-button {
        padding: 15px 30px;
        font-size: 1em;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${stage.title}</h1>
      <p>${funnel.name}</p>
    </div>
    
    ${exportImagePath ? `
    <img src="${exportImagePath}" alt="${stage.title}" class="hero-image" />
    ` : stage.imageUrl ? `
    <img src="${stage.imageUrl}" alt="${stage.title}" class="hero-image" />
    ` : ''}
    
    ${verse ? `
    <div class="verse-card">
      <div class="verse-icon">📖</div>
      <div class="verse-text">"${verse.verseText}"</div>
      <div class="verse-reference">— ${verse.reference}</div>
    </div>
    ` : ''}
    
    <div class="content">
      <h2>Welcome to Your Faith Journey</h2>
      <p>This is a placeholder for your custom content. Edit this section to add your offer details, benefits, testimonials, and any other information you'd like to share with your visitors.</p>
      <p>You can customize every aspect of this page to match your ministry's message and branding.</p>
    </div>
    
    ${verse ? `
    <div class="cta-section">
      <a href="${verse.ctaUrl || '#'}" class="cta-button">${verse.ctaText || 'Learn More'}</a>
    </div>
    ` : ''}
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} ${funnel.name}. All rights reserved.</p>
      <div>
        <a href="terms.html">Terms of Service</a>
        <a href="privacy.html">Privacy Policy</a>
        <a href="refund.html">Refund Policy</a>
      </div>
      <p style="margin-top: 20px;">Support: <a href="mailto:${supportEmail}">${supportEmail}</a></p>
    </div>
  </div>
</body>
</html>`;

  return html;
}

function generateLegalPage(title: string, content: string, businessName: string = "Faith Funnels AI"): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${businessName}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    
    .header {
      background: white;
      padding: 40px;
      border-radius: 12px;
      margin-bottom: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .header h1 {
      font-size: 2.5em;
      color: #6366f1;
      margin-bottom: 10px;
    }
    
    .header p {
      color: #777;
    }
    
    .content {
      background: white;
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .content h2 {
      color: #6366f1;
      font-size: 1.5em;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    
    .content h2:first-child {
      margin-top: 0;
    }
    
    .content p {
      margin-bottom: 15px;
      line-height: 1.8;
    }
    
    .content ul {
      margin: 15px 0 15px 30px;
    }
    
    .content li {
      margin-bottom: 10px;
      line-height: 1.8;
    }
    
    .back-link {
      display: inline-block;
      margin-top: 30px;
      color: #6366f1;
      text-decoration: none;
    }
    
    .back-link:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>${title}</h1>
      <p>Last updated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
    </div>
    
    <div class="content">
      ${content}
    </div>
    
    <a href="index.html" class="back-link">← Back to Home</a>
  </div>
</body>
</html>`;
}

export async function addFunnelToZip(
  zip: JSZip,
  funnel: Funnel,
  verses: Verse[],
  themes: Theme[],
  tenantSettings?: Partial<TenantSettings>
): Promise<void> {
  const imagesFolder = zip.folder("images");
  const imageMap = new Map<string, string>();

  for (const stage of funnel.stages) {
    if (stage.imageUrl && !imageMap.has(stage.imageUrl)) {
      try {
        const response = await fetch(stage.imageUrl);
        if (response.ok) {
          const blob = await response.blob();
          const filename = stage.imageUrl.split('/').pop() || `image-${Date.now()}.jpg`;
          imagesFolder?.file(filename, blob);
          imageMap.set(stage.imageUrl, filename);
        }
      } catch (error) {
        console.warn(`Failed to fetch image ${stage.imageUrl}:`, error);
      }
    }
  }

  const businessName = tenantSettings?.businessName || "Faith Funnels AI";
  const supportEmail = tenantSettings?.supportEmail || "support@faithfunnelsai.com";
  const customDomain = tenantSettings?.customDomain || "faithfunnelsai.com";

  funnel.stages.forEach((stage, index) => {
    const filename = stage.type === "main" ? "index.html" : `${stage.type}${index}.html`;
    const imagePath = stage.imageUrl && imageMap.has(stage.imageUrl) 
      ? `images/${imageMap.get(stage.imageUrl)}`
      : undefined;
    const html = generateHTML(funnel, verses, themes, index, tenantSettings, imagePath);
    zip.file(filename, html);
  });

  const termsContent = getFullTermsContent(businessName, supportEmail, customDomain);
  const privacyContent = getFullPrivacyContent(businessName, supportEmail, customDomain);
  const refundContent = getFullRefundContent(businessName, supportEmail, customDomain);

  zip.file("terms.html", generateLegalPage("Terms of Service", termsContent, businessName));
  zip.file("privacy.html", generateLegalPage("Privacy Policy", privacyContent, businessName));
  zip.file("refund.html", generateLegalPage("Refund Policy (14 Days)", refundContent, businessName));

  zip.file("README.txt", `
${businessName} - Export Package
==================================

This package contains your complete funnel ready for deployment.

Files Included:
- index.html (Main Offer Page)
- Additional funnel stage pages (if applicable)
- terms.html (Terms of Service)
- privacy.html (Privacy Policy)
- refund.html (Refund Policy - 14 Days)

Deployment Instructions:
1. Extract all files from this ZIP
2. Upload all files to your web server
3. Ensure index.html is in the root directory
4. Test all pages to confirm they load correctly

Support:
Email: ${supportEmail}
Website: ${customDomain}

© ${new Date().getFullYear()} ${businessName}. All rights reserved.
  `);
}

function getFullTermsContent(businessName: string, supportEmail: string, customDomain: string): string {
  return `
    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By purchasing, accessing, or using ${businessName} ("the Software," "the Service," or "the Product"), you ("Licensee," "you," or "your") accept and agree to be bound by these Terms of Service ("Agreement"). If you do not agree to these terms, do not use the Software.</p>
    
    <h2>2. Extended License with White Label Rights</h2>
    <p>${businessName} is provided with an Extended License that includes White Label Rights for agencies and service providers. Depending on your purchased tier, you receive the following rights:</p>
    
    <p><strong>2.1 What You CAN Do:</strong></p>
    <ul>
      <li>Create funnels for clients as an agency or service provider</li>
      <li>Use this product as part of client projects and charge for your funnel creation services</li>
      <li>Rebrand and customize with your own business name, logo, and colors</li>
      <li>Modify exported funnels, themes, and design elements</li>
      <li>Charge clients for your funnel creation services (not software licenses)</li>
      <li>Keep 100% of the profits from your client services</li>
      <li>Use your custom domain to access the white-labeled dashboard</li>
    </ul>
    
    <p><strong>2.2 What You CANNOT Do:</strong></p>
    <ul>
      <li>Resell the software dashboard access itself to customers</li>
      <li>Give clients direct access to your ${businessName} dashboard</li>
      <li>Claim original authorship of the core ${businessName} software platform</li>
      <li>Trademark the name "${businessName}" or confusingly similar names</li>
      <li>Decompile, reverse engineer, or extract the source code</li>
      <li>Use the software for illegal activities or fraudulent purposes</li>
      <li>Sell as part of an MLM, pyramid scheme, or similar structure</li>
    </ul>
    
    <h2>3. Tier-Specific Rights</h2>
    <p>Your rights depend on which tier you purchased:</p>
    <ul>
      <li><strong>Basic ($17):</strong> Personal use only, 3 funnels, 10 exports, no client services</li>
      <li><strong>White Label ($47):</strong> Create funnels for clients, 10 funnels, 100 exports, white label branding</li>
      <li><strong>Premium Unlimited ($67):</strong> Unlimited funnels/exports for unlimited clients, premium templates included</li>
      <li><strong>Agency Package ($97):</strong> All features, unlimited clients, full white label rights, perfect for agencies and service providers</li>
    </ul>
    
    <h2>4. Prohibited Uses</h2>
    <p>You may not use ${businessName} for the following purposes:</p>
    <ul>
      <li>Any illegal activity or violation of local, state, national, or international law</li>
      <li>Fraudulent, deceptive, or misleading marketing practices</li>
      <li>Spam, unsolicited commercial email, or violations of anti-spam laws</li>
      <li>Violating the terms of service of Warrior Plus, JVZoo, or other platforms</li>
      <li>Creating content that infringes on copyrights, trademarks, or intellectual property</li>
      <li>Harassment, hate speech, or content that promotes violence or discrimination</li>
    </ul>
    
    <h2>5. Warranties and Disclaimers</h2>
    <p><strong>AS-IS Basis:</strong> THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    
    <p><strong>No Guarantee of Results:</strong> ${businessName} makes no guarantees regarding your sales, revenue, or business results from using the Software.</p>
    
    <h2>6. Limitation of Liability</h2>
    <p>${businessName} is provided on an 'as is' basis without warranties of any kind. In no event shall ${businessName} be liable for any direct, indirect, incidental, consequential, or punitive damages arising from use of the software. Our total liability shall not exceed the amount you paid for the software.</p>
    
    <h2>7. Contact Information</h2>
    <p>For questions, concerns, or notices regarding these Terms of Service, please contact us at:</p>
    <p><strong>Email:</strong> ${supportEmail}<br>
    <strong>Website:</strong> ${customDomain}</p>
    
    <p><em>By using ${businessName}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</em></p>
  `;
}

function getFullPrivacyContent(businessName: string, supportEmail: string, customDomain: string): string {
  return `
    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    <p><strong>Effective Date:</strong> ${new Date().toLocaleDateString()}</p>
    
    <p>This Privacy Policy describes how ${businessName} ("we," "us," or "our") collects, uses, and protects your personal information when you use our web-based software service.</p>
    
    <h2>1. Information We Collect</h2>
    
    <p><strong>1.1 Information You Provide to Us:</strong></p>
    <ul>
      <li><strong>Account Information:</strong> Email address, name, and password when you create an account</li>
      <li><strong>Payment Information:</strong> Billing details processed securely through third-party payment processors (we do not store credit card numbers)</li>
      <li><strong>Content Data:</strong> Funnels, sales copy, images, Bible verses, and custom branding you create using the Software</li>
      <li><strong>Support Communications:</strong> Messages, emails, and feedback you send to our support team</li>
    </ul>
    
    <p><strong>1.2 Information Collected Automatically:</strong></p>
    <ul>
      <li><strong>Usage Data:</strong> Pages visited, features used, time spent in the Software, and actions taken</li>
      <li><strong>Device Information:</strong> Browser type, operating system, IP address, and device identifiers</li>
      <li><strong>Cookies and Tracking:</strong> Session cookies to keep you logged in and analytics cookies to improve our service</li>
    </ul>
    
    <h2>2. How We Use Your Information</h2>
    <p>We use your information for the following purposes:</p>
    <ul>
      <li><strong>Service Delivery:</strong> To provide, maintain, and improve the Software functionality</li>
      <li><strong>Account Management:</strong> To create and manage your account, process payments, and enforce tier restrictions</li>
      <li><strong>Customer Support:</strong> To respond to your inquiries, troubleshoot issues, and provide technical assistance</li>
      <li><strong>Communications:</strong> To send service updates, security alerts, and important announcements</li>
      <li><strong>Analytics and Improvement:</strong> To analyze usage patterns and improve features, performance, and user experience</li>
      <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security vulnerabilities</li>
    </ul>
    
    <h2>3. Information Sharing and Disclosure</h2>
    <p><strong>3.1 We DO NOT sell your personal information to third parties.</strong></p>
    <p><strong>3.2 We may share your information with:</strong></p>
    <ul>
      <li><strong>Service Providers:</strong> Third-party vendors who help us operate the Software under strict confidentiality agreements</li>
      <li><strong>Payment Processors:</strong> Warrior Plus, JVZoo, PayPal, Stripe, or other processors to complete transactions</li>
      <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
    </ul>
    
    <h2>4. Data Security</h2>
    <p>We implement industry-standard security measures to protect your information:</p>
    <ul>
      <li>HTTPS/TLS encryption for all data in transit</li>
      <li>Encrypted storage for passwords and sensitive data</li>
      <li>Regular security audits and updates</li>
      <li>Access controls and authentication requirements</li>
    </ul>
    
    <h2>5. Your Privacy Rights</h2>
    <p><strong>Access and Portability:</strong> You can access, download, and export your account data and created funnels at any time through the dashboard.</p>
    <p><strong>Deletion:</strong> You can request account deletion by contacting ${supportEmail}. We will delete your data within 30 days.</p>
    <p><strong>Opt-Out:</strong> You can unsubscribe from marketing emails via the unsubscribe link in any email.</p>
    
    <h2>6. Contact Us</h2>
    <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:</p>
    <p><strong>Email:</strong> ${supportEmail}<br>
    <strong>Website:</strong> ${customDomain}</p>
    
    <p><em>We take your privacy seriously and will respond to all requests within 30 days.</em></p>
  `;
}

function getFullRefundContent(businessName: string, supportEmail: string, customDomain: string): string {
  return `
    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    
    <h2>Our Commitment to You</h2>
    <p>We stand behind the quality of ${businessName} and want you to be completely satisfied with your purchase. That's why we offer a straightforward 14-day money-back guarantee.</p>
    
    <h2>14-Day Money-Back Guarantee</h2>
    <p>If you're not completely satisfied with ${businessName} for any reason, you may request a full refund within 14 days of your original purchase date. No questions asked.</p>
    
    <h2>Refund Eligibility</h2>
    <p><strong>You are eligible for a refund if:</strong></p>
    <ul>
      <li>You request the refund within 14 calendar days of your purchase date</li>
      <li>You provide your order number or transaction ID</li>
      <li>You purchased directly from us or through an authorized platform (Warrior Plus, JVZoo, etc.)</li>
    </ul>
    
    <p><strong>Refunds are processed for:</strong></p>
    <ul>
      <li>The main product purchase</li>
      <li>Any One-Time Offers (OTOs) or upsells purchased alongside the main product</li>
      <li>All tier upgrades (if refunded together within the 14-day window)</li>
    </ul>
    
    <h2>How to Request a Refund</h2>
    <p><strong>Step 1:</strong> Email our support team at <strong>${supportEmail}</strong> with the subject line "Refund Request"</p>
    <p><strong>Step 2:</strong> Include the following information:</p>
    <ul>
      <li>Your full name</li>
      <li>Email address used for purchase</li>
      <li>Order number or transaction ID</li>
      <li>Purchase date</li>
      <li>Brief reason for refund (optional but helpful for us to improve)</li>
    </ul>
    <p><strong>Step 3:</strong> We will process your refund within 2-5 business days of receiving your request.</p>
    
    <h2>Refund Processing Times</h2>
    <p><strong>Approval:</strong> Most refund requests are approved within 24-48 hours during business days (Monday-Friday).</p>
    <p><strong>Processing:</strong> Once approved, refunds are processed through the original payment method:</p>
    <ul>
      <li><strong>PayPal:</strong> 1-2 business days</li>
      <li><strong>Credit/Debit Card:</strong> 3-10 business days (depending on your bank)</li>
      <li><strong>Warrior Plus/JVZoo Wallet:</strong> Instant to 24 hours</li>
    </ul>
    
    <h2>What Happens After a Refund</h2>
    <p><strong>Account Access:</strong> Your account will be deactivated immediately upon refund processing. You will no longer have access to the dashboard or any features.</p>
    <p><strong>Exported Funnels:</strong> Any funnels you have already exported and deployed to your own hosting will continue to work.</p>
    <p><strong>Data Retention:</strong> Your account data will be retained for 30 days in case you choose to repurchase. After 30 days, all data is permanently deleted.</p>
    
    <h2>Exceptions and Special Cases</h2>
    <p><strong>After 14 Days:</strong> Refunds requested after the 14-day guarantee period has expired will be evaluated on a case-by-case basis.</p>
    <p><strong>Technical Issues:</strong> If you're experiencing technical problems, please contact support BEFORE requesting a refund. We can often resolve issues quickly.</p>
    
    <h2>Contact Information</h2>
    <p>For refund requests, questions about this policy, or general support:</p>
    <p><strong>Email:</strong> ${supportEmail}<br>
    <strong>Website:</strong> ${customDomain}<br>
    <strong>Response Time:</strong> Within 24-48 hours (business days)</p>
    
    <p><em>This refund policy is designed to protect both you and ${businessName}. We want happy customers who find value in our Software, and we stand behind our 14-day guarantee.</em></p>
  `;
}

export async function exportFunnelAsZip(
  funnel: Funnel,
  verses: Verse[],
  themes: Theme[],
  tenantSettings?: Partial<TenantSettings>
): Promise<void> {
  const zip = new JSZip();
  
  await addFunnelToZip(zip, funnel, verses, themes, tenantSettings);

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${funnel.name.replace(/\s+/g, '-').toLowerCase()}-funnel.zip`);
}

