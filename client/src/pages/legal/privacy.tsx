export default function Privacy() {
  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: December 21, 2025</p>
      </div>

      <div className="prose prose-sm max-w-none space-y-6">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p className="leading-relaxed text-muted-foreground">
            Faith Funnels AI collects information that you provide directly to us when you create an account, use our services, or communicate with us. This may include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Email address and contact information</li>
            <li>Payment and billing information (processed by WarriorPlus)</li>
            <li>Funnel content and configuration data</li>
            <li>Usage data and analytics</li>
            <li>Chat conversations with our AI assistant</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">2. Legal Basis for Processing (GDPR)</h2>
          <p className="leading-relaxed text-muted-foreground">
            For users in the European Union (EU) and European Economic Area (EEA), we process your personal data based on the following legal grounds:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Consent:</strong> When you explicitly agree to data processing (e.g., subscribing to our newsletter, using our chatbot)</li>
            <li><strong>Contract Performance:</strong> To deliver the services you purchased</li>
            <li><strong>Legitimate Interest:</strong> For fraud prevention, security, and improving our services</li>
            <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">3. How We Use Your Information</h2>
          <p className="leading-relaxed text-muted-foreground">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices and support messages</li>
            <li>Respond to your comments and questions</li>
            <li>Monitor and analyze trends and usage</li>
            <li>Power our AI chatbot to provide customer support</li>
          </ul>
        </section>

        <section className="space-y-3 bg-muted/30 p-4 rounded-lg border">
          <h2 className="text-xl font-semibold">4. AI Technology Disclosure</h2>
          <p className="leading-relaxed text-muted-foreground">
            <strong>Important:</strong> Faith Funnels AI uses artificial intelligence technology powered by OpenAI to provide:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>AI Chatbot:</strong> Our customer support chatbot uses OpenAI's language models to answer questions about our product and services</li>
            <li><strong>Lead Capture:</strong> The chatbot collects your email address before providing assistance</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-3">
            Chat conversations may be processed by OpenAI. By using our chatbot, you consent to this processing. OpenAI's data handling practices are governed by their own privacy policy at openai.com/privacy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">5. Information Sharing</h2>
          <p className="leading-relaxed text-muted-foreground">
            We do not sell your personal information. We may share your information with:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Payment Processors:</strong> WarriorPlus handles all payment transactions</li>
            <li><strong>AI Service Providers:</strong> OpenAI for chatbot functionality</li>
            <li><strong>Hosting Providers:</strong> Replit for application hosting</li>
            <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">6. Cookies and Tracking</h2>
          <p className="leading-relaxed text-muted-foreground">
            We use cookies and similar technologies for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Essential Cookies:</strong> Required for the website to function (always active)</li>
            <li><strong>Analytics Cookies:</strong> To understand how visitors use our site</li>
            <li><strong>Marketing Cookies:</strong> To deliver relevant advertisements</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-3">
            <strong>Managing Your Cookie Preferences:</strong> You can manage your cookie preferences at any time by clicking the "Manage Cookies" link in our website footer. This allows you to withdraw or modify your consent choices. You may also configure your browser to reject cookies, though some features may not function properly.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">7. Data Retention</h2>
          <p className="leading-relaxed text-muted-foreground">
            We retain your personal data for as long as necessary to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide our services to you</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce agreements</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-3">
            Account data is retained for 3 years after your last activity. Chat logs are retained for 90 days. You may request earlier deletion at any time.
          </p>
        </section>

        <section className="space-y-3 bg-primary/5 p-4 rounded-lg border border-primary/20">
          <h2 className="text-xl font-semibold">8. Your Rights (GDPR/CCPA)</h2>
          <p className="leading-relaxed text-muted-foreground">
            Depending on your location, you have the following rights:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
            <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
            <li><strong>Right to Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
            <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
            <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
            <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
            <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-3">
            To exercise any of these rights, contact us at support@faithfunnelsai.com. We will respond within 30 days (or 72 hours for urgent requests).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">9. Data Security</h2>
          <p className="leading-relaxed text-muted-foreground">
            We implement appropriate technical and organizational measures to protect your personal data, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Encryption of data in transit (HTTPS/TLS)</li>
            <li>Secure authentication via Replit Auth</li>
            <li>Regular security reviews</li>
          </ul>
          <p className="leading-relaxed text-muted-foreground mt-3">
            In the event of a data breach affecting your personal information, we will notify you within 72 hours as required by GDPR.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">10. International Data Transfers</h2>
          <p className="leading-relaxed text-muted-foreground">
            Your data may be processed in the United States where our servers are located. For EU/EEA users, we ensure appropriate safeguards are in place for international data transfers in compliance with GDPR.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">11. Children's Privacy</h2>
          <p className="leading-relaxed text-muted-foreground">
            Faith Funnels AI is not intended for users under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected data from a minor, please contact us immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">12. Changes to This Policy</h2>
          <p className="leading-relaxed text-muted-foreground">
            We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">13. Contact Us</h2>
          <p className="leading-relaxed text-muted-foreground">
            For privacy-related inquiries or to exercise your data rights, contact our Data Protection Officer:
          </p>
          <ul className="list-none pl-0 space-y-1 text-muted-foreground">
            <li><strong>Email:</strong> support@faithfunnelsai.com</li>
            <li><strong>Subject Line:</strong> "Privacy Request" or "GDPR Request"</li>
            <li><strong>Response Time:</strong> Within 30 days</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">14. Supervisory Authority</h2>
          <p className="leading-relaxed text-muted-foreground">
            If you are located in the EU/EEA and believe we have not adequately addressed your privacy concerns, you have the right to lodge a complaint with your local Data Protection Authority.
          </p>
        </section>
      </div>
    </div>
  );
}
