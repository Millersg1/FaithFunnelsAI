import { storage } from "./storage";

interface EmailContact {
  email: string;
  name: string;
  source?: string;
}

interface GetResponseContact {
  email: string;
  name?: string;
  campaign: {
    campaignId: string;
  };
  customFieldValues?: Array<{ customFieldId: string; value: string[] }>;
}

async function getResponseRequest(
  endpoint: string,
  method: string,
  apiKey: string,
  body?: any
): Promise<any> {
  const response = await fetch(`https://api.getresponse.com/v3${endpoint}`, {
    method,
    headers: {
      "X-Auth-Token": `api-key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GetResponse API error: ${response.status} - ${error}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function syncLeadToEmailProvider(
  contact: EmailContact,
  tenantId?: string
): Promise<{ success: boolean; message: string }> {
  try {
    let apiKey: string | undefined;
    let listId: string | undefined;
    let provider = "getresponse";

    if (tenantId) {
      const settings = await storage.getTenantSettings(tenantId);
      if (settings?.emailApiKey && settings?.emailListId) {
        apiKey = settings.emailApiKey;
        listId = settings.emailListId;
        provider = settings.emailProvider || "getresponse";
      }
    }

    if (!apiKey) {
      apiKey = process.env.GETRESPONSE_API_KEY;
      listId = process.env.GETRESPONSE_LIST_ID;
    }

    if (!apiKey) {
      console.log("No email marketing API key configured");
      return { success: false, message: "Email marketing not configured" };
    }

    if (!listId) {
      console.log("No email list ID configured");
      return { success: false, message: "Email list ID not configured" };
    }

    if (provider === "getresponse") {
      const contactData: GetResponseContact = {
        email: contact.email,
        name: contact.name,
        campaign: {
          campaignId: listId,
        },
      };

      if (contact.source) {
        contactData.customFieldValues = [
          { customFieldId: "source", value: [contact.source] },
        ];
      }

      await getResponseRequest("/contacts", "POST", apiKey, contactData);
      console.log(`Lead synced to GetResponse: ${contact.email}`);
      return { success: true, message: "Lead synced successfully" };
    }

    return { success: false, message: `Unsupported provider: ${provider}` };
  } catch (error: any) {
    if (error.message?.includes("409")) {
      console.log(`Contact already exists: ${contact.email}`);
      return { success: true, message: "Contact already exists" };
    }
    console.error("Email sync error:", error);
    return { success: false, message: error.message };
  }
}

export async function getEmailLists(
  apiKey: string,
  provider: string = "getresponse"
): Promise<Array<{ id: string; name: string }>> {
  try {
    if (provider === "getresponse") {
      const campaigns = await getResponseRequest("/campaigns", "GET", apiKey);
      return campaigns.map((c: any) => ({
        id: c.campaignId,
        name: c.name,
      }));
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch email lists:", error);
    return [];
  }
}

export async function testEmailConnection(
  apiKey: string,
  provider: string = "getresponse"
): Promise<{ success: boolean; message: string }> {
  try {
    if (provider === "getresponse") {
      await getResponseRequest("/accounts", "GET", apiKey);
      return { success: true, message: "Connection successful" };
    }
    return { success: false, message: "Unsupported provider" };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
