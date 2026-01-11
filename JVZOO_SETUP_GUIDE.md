# JVZoo Setup Guide for Faith Funnels AI

## Product Configuration

### JVZIPN v2 Integration (Recommended)

**Webhook URL:**
```
https://faithfunnelsai.com/api/webhooks/jvzipn
```

**Settings:**
- ✅ Use JVZIPN Output as Key Generation (check this box)
- ❌ PayPal IPN Forwarding URL (leave blank - JVZIPN handles everything)

### Product Checkboxes

| Setting | Recommendation | Why |
|---------|----------------|-----|
| ✅ Pass parameters to Thank You / Download Page | **CHECK** | Passes customer info (email, name, transaction ID) to your thank you page for personalization |
| ❌ Pass Affiliate ID to sales page | Skip for now | Only needed if your landing page tracks affiliate referrals |

### What the Webhook Handles Automatically:
| Transaction Type | Action |
|-----------------|--------|
| SALE / BILL | Creates user account, grants access |
| RFND (Refund) | Disables access, logs refund |
| CGBK (Chargeback) | Disables access |
| CANCEL-REBILL | Disables subscription access |
| UNCANCEL-REBILL | Re-enables access |

---

## Product Tiers & Naming

### Payment Reference (Max 22 chars)
| Product | Suggested Reference |
|---------|---------------------|
| Front-End | `FAITHFUNNELS FE` |
| OTO 1 (White Label) | `FAITHFUNNELS WHITELBL` |
| OTO 2 (Premium) | `FAITHFUNNELS PREMIUM` |
| OTO 3 (Agency) | `FAITHFUNNELS AGENCY` |
| Order Bump | `FAITHFUNNELS VERSES` |

---

## Refund Policy (Under 1024 chars)

Copy this for JVZoo's refund policy field:

```
14-DAY MONEY-BACK GUARANTEE

We offer a full refund within 14 days of purchase if you're not satisfied.

To request a refund:
1. Email support@faithfunnelsai.com with your receipt/transaction ID
2. Include reason for refund (helps us improve)
3. Refunds processed within 3-5 business days

Note: Refunds are for the specific product purchased. Upgraded tiers are non-refundable after 14 days. Digital products are non-refundable once downloaded/accessed beyond the guarantee period.

Questions? Contact support@faithfunnelsai.com
```

---

## Affiliate Settings

### Affiliate Approval
**Recommended: Manual Approve** (for new launches)

Why manual:
- Screen out spammers and low-quality promoters
- Protect your brand reputation
- Build relationships with quality affiliates

Switch to auto-approve after 50-100 sales when you have social proof.

### Affiliate Requirements
Add requirements that affiliates must meet before being approved:
- Minimum sales history on JVZoo
- Active email list in relevant niche
- No spam or black-hat promotion methods
- Must follow FTC disclosure guidelines

### Affiliate Notes
Notes visible to affiliates on your product page:
```
Welcome to Faith Funnels AI Affiliate Program!

Commission: 50% on Front-End, 50% on all OTOs
Cookie: 60 days

Promo Materials: Available in affiliate area
- Email swipes
- Banner ads
- Social media graphics
- Video demos

Support: affiliate@faithfunnelsai.com

Please follow FTC guidelines and disclose affiliate relationships.
No spam, no misleading claims. Let's build this together!
```

---

## Customer Access Flow

After purchase, customers receive:
1. **Access URL:** https://faithfunnelsai.com/jvzoo-thank-you
2. **Admin PIN:** Unique 6-character code
3. **Login Email:** Their JVZoo purchase email

Customers log in with their JVZoo email to access their dashboard.

---

## Testing

Before going live:
1. Create a test product in JVZoo
2. Use "Test Sale" to verify webhook receives data
3. Confirm user account is created
4. Test refund flow to verify access is disabled

---

## Support

- Customer Support: support@faithfunnelsai.com
- Affiliate Support: affiliate@faithfunnelsai.com
- Domain: faithfunnelsai.com
