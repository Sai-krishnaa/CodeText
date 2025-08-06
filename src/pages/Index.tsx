import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Share2, Code2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [text, setText] = useState("");
  const [shareCode, setShareCode] = useState("");
  const [isShared, setIsShared] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateShareCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setShareCode(code);
    
    // Store the text with the code (in a real app, this would be sent to a backend)
    localStorage.setItem(code, text);
    setIsShared(true);
    
    toast({
      title: "Text shared successfully!",
      description: `Your share code is: ${code}`,
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(shareCode);
    toast({
      title: "Code copied!",
      description: "Share code copied to clipboard",
    });
  };

  const resetForm = () => {
    setText("");
    setShareCode("");
    setIsShared(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full gradient-primary shadow-glow">
              <Code2 className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PastePal
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Share text instantly with a simple code. Paste, share, and access your content anywhere.
          </p>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/view")}
            className="mt-6 transition-smooth hover:shadow-soft"
          >
            <Share2 className="h-4 w-4 mr-2" />
            View Shared Text
          </Button>
        </div>

        {/* Main Action Buttons */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-8 gradient-card shadow-soft border-0 animate-slide-up text-center hover:shadow-medium transition-smooth">
              <div className="space-y-4">
                <div className="p-4 rounded-full gradient-primary shadow-glow mx-auto w-fit">
                  <Share2 className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Send</h3>
                <p className="text-muted-foreground">Share your text with others</p>
                <Button 
                  onClick={() => setIsShared(false)}
                  className="w-full h-12 text-base gradient-primary shadow-medium hover:shadow-glow transition-bounce"
                >
                  Start Sharing
                </Button>
              </div>
            </Card>

            <Card className="p-8 gradient-card shadow-soft border-0 animate-slide-up text-center hover:shadow-medium transition-smooth">
              <div className="space-y-4">
                <div className="p-4 rounded-full bg-secondary/20 border border-secondary/30 mx-auto w-fit">
                  <Search className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-bold">Accept</h3>
                <p className="text-muted-foreground">View shared content</p>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/view")}
                  className="w-full h-12 text-base transition-smooth hover:shadow-soft"
                >
                  Enter Code
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Text Sharing Form (when Send is clicked) */}
        <div className="max-w-4xl mx-auto">
          {!isShared ? (
            <Card className="p-8 gradient-card shadow-soft border-0 animate-slide-up">
              <div className="space-y-6">
                <div>
                  <label htmlFor="text-input" className="block text-sm font-medium mb-3">
                    Paste your content here
                  </label>
                  <Textarea
                    id="text-input"
                    placeholder="Enter or paste your text, code, or notes here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="min-h-[300px] text-base border-border/50 focus:border-primary transition-smooth resize-none"
                  />
                </div>
                
                <Button 
                  onClick={generateShareCode}
                  disabled={!text.trim()}
                  className="w-full h-12 text-base gradient-primary shadow-medium hover:shadow-glow transition-bounce disabled:opacity-50"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Generate Share Code
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 gradient-card shadow-soft border-0 text-center animate-slide-up">
              <div className="space-y-6">
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/20">
                  <h3 className="text-lg font-semibold mb-3">Your Share Code</h3>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <code className="text-3xl font-mono font-bold text-primary bg-background px-6 py-3 rounded-lg shadow-soft">
                      {shareCode}
                    </code>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={copyCode}
                      className="h-12 w-12 transition-smooth hover:shadow-soft"
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share this code with others to let them view your text
                  </p>
                </div>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    variant="outline"
                    onClick={resetForm}
                    className="transition-smooth hover:shadow-soft"
                  >
                    Share Another Text
                  </Button>
                  <Button 
                    onClick={() => navigate("/view")}
                    className="gradient-primary shadow-medium hover:shadow-glow transition-bounce"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    View Shared Text
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Features */}
        <div className="max-w-4xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          {[
            { icon: "🚀", title: "Lightning Fast", desc: "Share text instantly with no signup required" },
            { icon: "🔒", title: "Secure Sharing", desc: "Your content is protected with unique codes" },
            { icon: "📱", title: "Mobile Ready", desc: "Works perfectly on all devices" }
          ].map((feature, idx) => (
            <Card key={idx} className="p-6 gradient-card shadow-soft border-0 text-center transition-smooth hover:shadow-medium">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;