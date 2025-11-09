import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log("ChatbotWidget mounted!");
  }, []);

  useEffect(() => {
    const savedEmail = localStorage.getItem("chatbot_email");
    const savedName = localStorage.getItem("chatbot_name");
    if (savedEmail) {
      setEmail(savedEmail);
      setName(savedName || "");
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !emailInput.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await apiRequest("POST", "/api/leads", {
        name: name.trim(),
        email: emailInput.trim().toLowerCase(),
        source: window.location.pathname.includes("/support") ? "support" : "landing",
      });

      localStorage.setItem("chatbot_email", emailInput.trim().toLowerCase());
      localStorage.setItem("chatbot_name", name.trim());
      setEmail(emailInput.trim().toLowerCase());
      
      setMessages([{
        role: "assistant",
        content: `Hi ${name.trim()}! I'm here to help you learn about Faith Funnels AI. Ask me anything about features, pricing, or how to get started!`,
      }]);

      toast({
        title: "Welcome!",
        description: "You can now chat with our AI assistant",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to save your information";
      toast({
        title: "Invalid Information",
        description: errorMessage.includes("email") 
          ? "Please enter a valid email address" 
          : errorMessage.includes("name")
          ? "Please enter your full name"
          : "Failed to save your information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !email) return;

    const userMessage = message.trim();
    setMessage("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await apiRequest("POST", "/api/chat", {
        email,
        message: userMessage,
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          variant="default"
          size="icon"
          className="h-14 w-14 rounded-full shadow-lg hover-elevate"
          style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
          onClick={() => setIsOpen(true)}
          data-testid="button-chatbot-open"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card 
          className="w-[380px] h-[600px] flex flex-col shadow-2xl"
          style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}
        >
          <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-md">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Faith Funnels AI Assistant</h3>
                <p className="text-xs opacity-90">Ask me anything!</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
              data-testid="button-chatbot-close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {!email ? (
              <div className="space-y-4">
                <div className="text-center space-y-2">
                  <h4 className="font-semibold text-lg">Welcome! 👋</h4>
                  <p className="text-sm text-muted-foreground">
                    Get instant answers about Faith Funnels AI from our AI assistant.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please share your details to start chatting:
                  </p>
                </div>
                
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isLoading}
                      data-testid="input-chatbot-name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={isLoading}
                      data-testid="input-chatbot-email"
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                    data-testid="button-chatbot-submit-email"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Starting Chat...
                      </>
                    ) : (
                      "Start Chatting"
                    )}
                  </Button>
                </form>

                <p className="text-xs text-muted-foreground text-center">
                  We'll use this to personalize your experience and follow up if needed.
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      data-testid={`message-${msg.role}-${idx}`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {email && (
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={isLoading}
                  data-testid="input-chatbot-message"
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !message.trim()}
                  data-testid="button-chatbot-send"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          )}
        </Card>
      )}
    </>
  );
}
