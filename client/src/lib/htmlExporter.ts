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
      <p style="margin-top: 20px;">Support: <a href="mailto:support@faithfunnelsai.com">support@faithfunnelsai.com</a></p>
    </div>
  </div>
</body>
</html>`;

  return html;
}

function generateLegalPage(title: string, content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Faith Funnels AI</title>
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
    <h2>1. Acceptance of Terms</h2>
    <p>By accessing and using ${businessName} ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
    
    <h2>2. Use License</h2>
    <p>Permission is granted to temporarily use ${businessName} for personal or commercial purposes. This is the grant of a license, not a transfer of title.</p>
    
    <h2>3. PLR (Private Label Rights) Usage</h2>
    <p>As a PLR software product, ${businessName} grants you the right to rebrand and resell the software under specific conditions.</p>
    
    <h2>4. Contact Information</h2>
    <p>For questions about these Terms of Service, please contact us at ${supportEmail}</p>
  `;

  const privacyContent = `
    <h2>1. Information We Collect</h2>
    <p>${businessName} collects information that you provide directly to us when you create an account, use our services, or communicate with us.</p>
    
    <h2>2. How We Use Your Information</h2>
    <p>We use the information we collect to provide, maintain, and improve our services.</p>
    
    <h2>3. Information Sharing</h2>
    <p>We do not share your personal information with third parties except with your consent, to comply with legal obligations, or to protect our rights.</p>
    
    <h2>4. Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please contact us at ${supportEmail}</p>
  `;

  const refundContent = `
    <h2>14-Day Money-Back Guarantee</h2>
    <p>We stand behind the quality of ${businessName}. If you're not completely satisfied with your purchase, we offer a 14-day money-back guarantee from the date of purchase.</p>
    
    <h2>Refund Eligibility</h2>
    <p>To be eligible for a refund, you must request the refund within 14 days of your original purchase date and provide a valid reason for the refund request.</p>
    
    <h2>How to Request a Refund</h2>
    <p>Email our support team at ${supportEmail} with your order number and purchase date.</p>
    
    <h2>Contact Information</h2>
    <p>For refund requests or questions about this policy, please contact us at ${supportEmail}</p>
  `;

  zip.file("terms.html", generateLegalPage("Terms of Service", termsContent));
  zip.file("privacy.html", generateLegalPage("Privacy Policy", privacyContent));
  zip.file("refund.html", generateLegalPage("Refund Policy (14 Days)", refundContent));

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
