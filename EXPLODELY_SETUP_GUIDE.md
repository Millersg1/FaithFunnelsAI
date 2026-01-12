# Explodely IPN Setup Guide for Faith Funnels AI

## Overview

This guide explains how to configure Explodely IPN (Instant Payment Notification) to automatically provision user accounts when customers purchase Faith Funnels AI products on the Explodely marketplace.

## Webhook URL

```
https://faithfunnelsai.com/api/webhooks/explodely
```

## Setup Instructions

### Step 1: Access IPN Settings in Explodely

1. Log in to your Explodely seller account
2. Navigate to **Products** → **Product Settings** (top menu)
3. Click on the **IPN** section

### Step 2: Configure IPN Settings

| Setting | Value |
|---------|-------|
| **IPN URL** | `https://faithfunnelsai.com/api/webhooks/explodely` |
| **Send IPN** | Yes |
| **IPN Type** | POST (recommended) |
| **Refund IPN** | Leave blank (uses main IPN URL) |

### Step 3: Product Naming Convention

For automatic tier assignment, include these keywords in your product names:

| Product Type | Include in Name | Tier Assigned |
|--------------|-----------------|---------------|
| Front-End | (default) | basic |
| OTO1 | "OTO1" or "White Label" | white_label |
| DS1 | "DS1" | white_label |
| OTO2 | "OTO2" or "Premium" | premium |
| DS2 | "DS2" | premium |
| OTO3 | "OTO3" or "Agency" | reseller |
| DS3 | "DS3" | reseller |
| Order Bump | "Bump" or "Verse" | basic |

**Examples:**
- "Faith Funnels AI - Front End" → basic tier
- "Faith Funnels AI OTO1 - White Label Rights" → white_label tier
- "Faith Funnels AI OTO2 - Premium Templates" → premium tier
- "Faith Funnels AI OTO3 - Agency License" → reseller tier

---

## IPN Transaction Types

The webhook automatically handles these Explodely IPN types:

| IPN Type | Action Taken |
|----------|--------------|
| `sale` | Creates user account, grants access |
| `rebill` | Processes subscription renewal |
| `partial` | Processes order bump additions |
| `refund` | Disables access, logs refund |
| `rebill_cancel` | Disables subscription access |

---

## How It Works

### When a Sale Occurs:

1. Customer completes purchase on Explodely
2. Explodely sends IPN to your webhook URL (within 1-2 minutes)
3. Webhook creates user account with customer email
4. Tenant account is created with appropriate tier
5. Customer can log in at `https://faithfunnelsai.com` using their purchase email

### When a Refund Occurs:

1. You process refund in Explodely
2. Explodely sends refund IPN to webhook
3. Webhook disables customer's access
4. Customer can no longer access dashboard

---

## Testing Your Integration

### Before Product Approval:

1. Use test URL: `https://explodely.com/p/YOUR_PRODUCT_ID?testmode=yes`
2. Generate test card from **View Products** → **Action Menu** → **Generate Test Card**
3. Complete test checkout
4. Verify IPN is received in your server logs

### After Product Approval:

1. Use regular payment link
2. Get test card details (same method)
3. Complete test purchase
4. Verify user account is created

---

## Optional: Secret Key Verification

For added security, you can configure a secret key:

1. Add `EXPLODELY_SECRET_KEY` to your environment secrets
2. In Explodely IPN settings, add a custom parameter `secret` with your key value
3. The webhook will verify this key before processing

---

## Product Mapping Reference

| Explodely Product | Faith Funnels Tier | Features |
|-------------------|-------------------|----------|
| Front-End ($17) | basic | Core funnel builder, 10 funnels |
| OTO1 - White Label ($47) | white_label | Custom branding, 50 funnels |
| DS1 - White Label Lite ($27) | white_label | Limited white label features |
| OTO2 - Premium ($67) | premium | All templates, 100 funnels |
| DS2 - Premium Lite ($37) | premium | Limited premium features |
| OTO3 - Agency ($97) | reseller | Unlimited funnels, client accounts |
| DS3 - Agency Lite ($47) | reseller | Limited agency features |
| Order Bump - Verses ($9) | basic | Extra Bible verse packs |

---

## Troubleshooting

### IPN Not Received

1. Verify IPN URL is exactly: `https://faithfunnelsai.com/api/webhooks/explodely`
2. Ensure "Send IPN" is set to "Yes"
3. Check that IPN Type is set to "POST"
4. Wait 1-2 minutes after purchase (Explodely has slight delay)

### User Not Created

1. Check server logs for "Explodely IPN received" message
2. Verify customer email is included in IPN
3. Ensure product name matches tier keywords

### Access Not Working After Purchase

1. Customer should log in with the same email used for purchase
2. Verify the purchase appears in your admin purchases list
3. Check that tenant was created with correct tier

---

## Customer Access Instructions

After purchase, customers should:

1. Visit `https://faithfunnelsai.com`
2. Click "Login" 
3. Use their Explodely purchase email to sign in
4. Access their Faith Funnels AI dashboard

---

## Support

- **Email:** support@faithfunnelsai.com
- **Explodely Docs:** https://docs.explodely.com/ipn-for-sellers/

---

## Comparison: Explodely vs JVZoo

| Feature | Explodely | JVZoo |
|---------|-----------|-------|
| Webhook URL | `/api/webhooks/explodely` | `/api/webhooks/jvzipn` |
| IPN Type | POST recommended | POST only |
| Sale Parameter | `type=sale` | `ctransaction_type=SALE` |
| Email Parameter | `customerEmail` | `ccustemail` |
| Order ID | `orderid` | `ctransreceipt` |
| Response Expected | "OK" (text) | JSON object |

Both marketplaces are fully supported with automatic user provisioning!
