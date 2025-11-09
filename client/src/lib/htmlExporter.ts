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

export async function exportFunnelAsZip(
  funnel: Funnel,
  verses: Verse[],
  themes: Theme[],
  tenantSettings?: Partial<TenantSettings>
): Promise<void> {
  const zip = new JSZip();
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

  const termsContent = `
    <p><strong>Last Updated:</strong> ${new Date().toLocaleDateString()}</p>
    
    <h2>1. Acceptance of Terms</h2>
    <p>By purchasing, accessing, or using ${businessName} ("the Software," "the Service," or "the Product"), you ("Licensee," "you," or "your") accept and agree to be bound by these Terms of Service ("Agreement"). If you do not agree to these terms, do not use the Software.</p>
    
    <h2>2. License Grant</h2>
    <p><strong>2.1 White Label License:</strong> Subject to your compliance with this Agreement and payment of applicable fees, ${businessName} grants you a non-exclusive, non-transferable license to use, modify, rebrand, and customize the Software for your personal or commercial purposes.</p>
    
    <p><strong>2.2 Permitted Uses:</strong> You may:</p>
    <ul>
      <li>Use the Software to create unlimited sales funnels for your own business</li>
      <li>Rebrand the Software with your own business name, logo, and custom branding</li>
      <li>Export and deploy generated funnels to your own domains or hosting</li>
      <li>Offer funnel creation services to clients using the Software (Premium and higher tiers)</li>
      <li>Create funnels on behalf of clients as an agency or service provider</li>
      <li>Use your custom domain to access the white-labeled dashboard</li>
    </ul>
    
    <p><strong>2.3 Restrictions:</strong> You may NOT:</p>
    <ul>
      <li>Resell, redistribute, or transfer the Software to any third party</li>
      <li>Claim original authorship of the underlying Software code or platform</li>
      <li>Provide direct access to the Software dashboard to clients (you create funnels FOR them, not WITH them)</li>
      <li>Share your login credentials with others</li>
      <li>Use the Software for any illegal or unethical purposes</li>
      <li>Reverse engineer, decompile, or disassemble the Software</li>
      <li>Remove or modify copyright notices in the source code</li>
    </ul>
    
    <h2>3. Ownership and Intellectual Property</h2>
    <p><strong>3.1 Software Ownership:</strong> ${businessName} and its licensors retain all rights, title, and interest in and to the original Software, including all intellectual property rights. This Agreement does not transfer ownership of the Software to you.</p>
    
    <p><strong>3.2 Your Content:</strong> You retain all rights to content you create using the Software, including sales copy, images, Bible verses selections, and funnel configurations. You are solely responsible for ensuring your content complies with all applicable laws.</p>
    
    <p><strong>3.3 White Label Branding:</strong> You own all rights to your custom branding, logos, business names, and marketing materials you create in connection with your white-labeled version of the Software.</p>
    
    <h2>4. Account Tiers and Features</h2>
    <p><strong>4.1 Tier Levels:</strong> The Software is offered in multiple tiers (Basic, White Label, Premium) with different feature sets and usage limits. Your access to features is determined by your purchased tier.</p>
    
    <p><strong>4.2 Feature Restrictions:</strong> Certain features (white-label customization, unlimited funnels, unlimited exports) require specific tier purchases. Attempting to bypass tier restrictions is prohibited and may result in account suspension.</p>
    
    <p><strong>4.3 Upgrades:</strong> You may upgrade your tier at any time by purchasing the applicable upgrade. Downgrades are not offered, and all purchases are final (subject to our Refund Policy).</p>
    
    <p><strong>4.4 White Label Access:</strong> White-label branding features (custom business name, logo, support email, custom domain) are only available to White Label and Premium tier subscribers. Basic tier users receive standard branding.</p>
    
    <h2>5. Payment Terms</h2>
    <p><strong>5.1 Pricing:</strong> All prices are listed in USD and are subject to change. You will be charged the price displayed at the time of purchase.</p>
    
    <p><strong>5.2 One-Time Payment:</strong> All tiers are offered as one-time payments unless otherwise specified. There are no recurring subscription fees.</p>
    
    <p><strong>5.3 Payment Processing:</strong> Payments are processed through third-party payment processors (such as Warrior Plus, JVZoo, PayPal, or Stripe). You agree to comply with their terms of service.</p>
    
    <h2>6. User Responsibilities</h2>
    <p><strong>6.1 Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
    
    <p><strong>6.2 Content Compliance:</strong> You are solely responsible for ensuring that all content you create and deploy using the Software complies with applicable laws, including but not limited to:</p>
    <ul>
      <li>FTC disclosure requirements for affiliate marketing</li>
      <li>CAN-SPAM Act for email marketing</li>
      <li>GDPR and other privacy regulations</li>
      <li>Copyright and trademark laws</li>
      <li>Truth in advertising laws</li>
    </ul>
    
    <p><strong>6.3 Prohibited Content:</strong> You may not use the Software to create or promote:</p>
    <ul>
      <li>Illegal products or services</li>
      <li>Fraudulent or deceptive offers</li>
      <li>Hate speech, violence, or discrimination</li>
      <li>Adult or explicit content</li>
      <li>Pyramid schemes or multi-level marketing that violates applicable laws</li>
    </ul>
    
    <h2>7. Warranties and Disclaimers</h2>
    <p><strong>7.1 AS-IS Basis:</strong> THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
    
    <p><strong>7.2 No Guarantee of Results:</strong> ${businessName} makes no guarantees regarding your sales, revenue, or business results from using the Software. Your success depends on many factors including your effort, marketing skills, and market conditions.</p>
    
    <p><strong>7.3 Service Availability:</strong> While we strive for 99.9% uptime, we do not guarantee uninterrupted access to the Software. Scheduled maintenance and unexpected outages may occur.</p>
    
    <h2>8. Limitation of Liability</h2>
    <p><strong>8.1 Maximum Liability:</strong> IN NO EVENT SHALL ${businessName.toUpperCase()}, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</p>
    <ul>
      <li>Your use or inability to use the Software</li>
      <li>Any unauthorized access to or use of our servers and/or any personal information stored therein</li>
      <li>Any bugs, viruses, trojan horses, or similar that may be transmitted to or through the Software</li>
      <li>Any errors or omissions in any content or for any loss or damage incurred as a result of your use of any content posted or transmitted through the Software</li>
    </ul>
    
    <p><strong>8.2 Cap on Liability:</strong> Our total liability to you for all claims arising from or related to the Software shall not exceed the amount you paid for the Software in the twelve (12) months preceding the claim.</p>
    
    <h2>9. Indemnification</h2>
    <p>You agree to indemnify, defend, and hold harmless ${businessName} and its officers, directors, employees, contractors, agents, licensors, and suppliers from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Software.</p>
    
    <h2>10. Term and Termination</h2>
    <p><strong>10.1 Term:</strong> This Agreement begins on the date of your purchase and continues until terminated.</p>
    
    <p><strong>10.2 Termination for Cause:</strong> We may terminate your access to the Software immediately if you breach these Terms, engage in fraudulent activity, or use the Software for illegal purposes.</p>
    
    <p><strong>10.3 Effect of Termination:</strong> Upon termination, your right to use the Software ceases immediately. You may retain any funnels you have already exported, but you will lose access to the dashboard and may not create new funnels.</p>
    
    <h2>11. Modifications to Terms</h2>
    <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or dashboard notification. Your continued use of the Software after changes constitutes acceptance of the modified Terms.</p>
    
    <h2>12. Governing Law and Dispute Resolution</h2>
    <p><strong>12.1 Governing Law:</strong> This Agreement shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.</p>
    
    <p><strong>12.2 Dispute Resolution:</strong> Any disputes arising from this Agreement shall first be addressed through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.</p>
    
    <h2>13. Entire Agreement</h2>
    <p>This Agreement, together with our Privacy Policy and Refund Policy, constitutes the entire agreement between you and ${businessName} regarding the Software and supersedes all prior agreements and understandings.</p>
    
    <h2>14. Severability</h2>
    <p>If any provision of this Agreement is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that this Agreement shall otherwise remain in full force and effect.</p>
    
    <h2>15. Contact Information</h2>
    <p>For questions, concerns, or notices regarding these Terms of Service, please contact us at:</p>
    <p><strong>Email:</strong> ${supportEmail}<br>
    <strong>Website:</strong> ${customDomain}</p>
    
    <p><em>By using ${businessName}, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.</em></p>
  `;

  const privacyContent = `
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
      <li><strong>Communications:</strong> To send service updates, security alerts, and important announcements (you can opt out of marketing emails)</li>
      <li><strong>Analytics and Improvement:</strong> To analyze usage patterns and improve features, performance, and user experience</li>
      <li><strong>Security:</strong> To detect, prevent, and address fraud, abuse, and security vulnerabilities</li>
      <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
    </ul>
    
    <h2>3. Information Sharing and Disclosure</h2>
    
    <p><strong>3.1 We DO NOT sell your personal information to third parties.</strong></p>
    
    <p><strong>3.2 We may share your information with:</strong></p>
    <ul>
      <li><strong>Service Providers:</strong> Third-party vendors who help us operate the Software (hosting, payment processing, analytics) under strict confidentiality agreements</li>
      <li><strong>Payment Processors:</strong> Warrior Plus, JVZoo, PayPal, Stripe, or other processors to complete transactions</li>
      <li><strong>Legal Requirements:</strong> When required by law, court order, or government request</li>
      <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets (users will be notified)</li>
      <li><strong>With Your Consent:</strong> When you explicitly authorize us to share information</li>
    </ul>
    
    <p><strong>3.3 Your Exported Content:</strong> Funnels you export are downloaded to your device and deployed to your own hosting. We do not control or access content after export.</p>
    
    <h2>4. Data Retention</h2>
    
    <p>We retain your information for as long as your account is active or as needed to provide services. If you request account deletion, we will delete or anonymize your data within 30 days, except where retention is required by law.</p>
    
    <h2>5. Data Security</h2>
    
    <p>We implement industry-standard security measures to protect your information:</p>
    <ul>
      <li>HTTPS/TLS encryption for all data in transit</li>
      <li>Encrypted storage for passwords and sensitive data</li>
      <li>Regular security audits and updates</li>
      <li>Access controls and authentication requirements</li>
    </ul>
    
    <p>However, no system is 100% secure. We cannot guarantee absolute security but will notify you of any data breaches as required by law.</p>
    
    <h2>6. Your Privacy Rights</h2>
    
    <p><strong>6.1 Access and Portability:</strong> You can access, download, and export your account data and created funnels at any time through the dashboard.</p>
    
    <p><strong>6.2 Correction:</strong> You can update your account information and branding settings directly in the Software.</p>
    
    <p><strong>6.3 Deletion:</strong> You can request account deletion by contacting ${supportEmail}. We will delete your data within 30 days.</p>
    
    <p><strong>6.4 Opt-Out:</strong> You can unsubscribe from marketing emails via the unsubscribe link in any email.</p>
    
    <p><strong>6.5 Do Not Track:</strong> We honor Do Not Track browser settings for analytics tracking.</p>
    
    <p><strong>GDPR Rights (EU Users):</strong> If you are located in the European Union, you have additional rights including data portability, restriction of processing, and the right to object to processing. Contact us to exercise these rights.</p>
    
    <h2>7. Cookies and Tracking Technologies</h2>
    
    <p>We use cookies for:</p>
    <ul>
      <li><strong>Essential Cookies:</strong> Required for login sessions and core functionality (cannot be disabled)</li>
      <li><strong>Analytics Cookies:</strong> To understand how users interact with the Software (can be disabled)</li>
    </ul>
    
    <p>You can control cookies through your browser settings, but disabling essential cookies will prevent you from using the Software.</p>
    
    <h2>8. Third-Party Links and Services</h2>
    
    <p>The Software may contain links to third-party websites or integrate with third-party services. We are not responsible for their privacy practices. Please review their privacy policies before providing information.</p>
    
    <h2>9. Children's Privacy</h2>
    
    <p>The Software is not intended for users under 18 years of age. We do not knowingly collect information from children. If we discover we have collected data from a child, we will delete it immediately.</p>
    
    <h2>10. International Data Transfers</h2>
    
    <p>Your information may be stored and processed in the United States or other countries where our service providers operate. By using the Software, you consent to the transfer of your information to countries outside your residence.</p>
    
    <h2>11. Changes to This Privacy Policy</h2>
    
    <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or dashboard notification. The "Last Updated" date at the top reflects the most recent revision.</p>
    
    <h2>12. Contact Us</h2>
    
    <p>If you have questions, concerns, or requests regarding this Privacy Policy or your personal information, please contact us at:</p>
    <p><strong>Email:</strong> ${supportEmail}<br>
    <strong>Website:</strong> ${customDomain}</p>
    
    <p><em>We take your privacy seriously and will respond to all requests within 30 days.</em></p>
  `;

  const refundContent = `
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
    
    <p>If you purchased through a third-party marketplace (Warrior Plus, JVZoo), refunds may need to be processed through their system. We'll guide you through the process.</p>
    
    <h2>What Happens After a Refund</h2>
    
    <p><strong>Account Access:</strong> Your account will be deactivated immediately upon refund processing. You will no longer have access to the dashboard or any features.</p>
    
    <p><strong>Exported Funnels:</strong> Any funnels you have already exported and deployed to your own hosting will continue to work. We do not have access to deactivate content on your own servers.</p>
    
    <p><strong>Data Retention:</strong> Your account data (funnels, settings, content) will be retained for 30 days in case you choose to repurchase. After 30 days, all data is permanently deleted.</p>
    
    <h2>Exceptions and Special Cases</h2>
    
    <p><strong>After 14 Days:</strong> Refunds requested after the 14-day guarantee period has expired will be evaluated on a case-by-case basis. We may offer partial refunds, account credits, or alternative solutions.</p>
    
    <p><strong>Abuse Policy:</strong> We reserve the right to deny refunds to customers who exhibit patterns of abuse, including:</p>
    <ul>
      <li>Multiple purchases and refunds of the same product</li>
      <li>Extensive use of the Software followed by refund requests</li>
      <li>Fraudulent or deceptive refund claims</li>
    </ul>
    
    <p><strong>Technical Issues:</strong> If you're experiencing technical problems that prevent you from using the Software, please contact support BEFORE requesting a refund. We're here to help and can often resolve issues quickly.</p>
    
    <h2>No-Refund Scenarios</h2>
    
    <p>Refunds will NOT be issued in the following cases:</p>
    <ul>
      <li>Violation of our Terms of Service</li>
      <li>Use of the Software for illegal or prohibited activities</li>
      <li>Account suspension or termination due to policy violations</li>
      <li>After the 14-day window (except at our sole discretion)</li>
      <li>If purchased from an unauthorized reseller or third party</li>
    </ul>
    
    <h2>Partial Refunds</h2>
    
    <p>If you purchased multiple tiers or upgrades at different times, you may request a partial refund for purchases made within the last 14 days while retaining access to earlier purchases.</p>
    
    <p><strong>Example:</strong> If you bought Basic tier 20 days ago and upgraded to Premium 5 days ago, you can request a refund for the Premium upgrade only.</p>
    
    <h2>Contact Information</h2>
    
    <p>For refund requests, questions about this policy, or general support:</p>
    <p><strong>Email:</strong> ${supportEmail}<br>
    <strong>Website:</strong> ${customDomain}<br>
    <strong>Response Time:</strong> Within 24-48 hours (business days)</p>
    
    <h2>Fair Use Commitment</h2>
    
    <p>We are committed to fair and honest business practices. If you're unsure whether ${businessName} is right for you, please review our demo videos, feature list, and documentation before purchasing. We're here to help you make an informed decision.</p>
    
    <p><em>This refund policy is designed to protect both you and ${businessName}. We want happy customers who find value in our Software, and we stand behind our 14-day guarantee.</em></p>
  `;

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

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, `${funnel.name.replace(/\s+/g, '-').toLowerCase()}-funnel.zip`);
}
