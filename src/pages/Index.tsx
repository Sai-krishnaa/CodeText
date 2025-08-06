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
  const [showPlayground, setShowPlayground] = useState(false);
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
    setShowPlayground(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Enhanced background with animated elements */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none" />
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Enhanced Header with better typography and animations */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 rounded-2xl gradient-primary shadow-elegant animate-float relative overflow-hidden">
              <div className="absolute inset-0 shimmer opacity-50" />
              <Code2 className="h-10 w-10 text-primary-foreground relative z-10" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-in-left">
              PastePal
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed animate-slide-in-right">
            Share text instantly with beautiful, secure codes. 
            <br className="hidden md:block" />
            <span className="font-medium bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Fast, simple, and elegantly designed.
            </span>
          </p>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/view")}
            className="mt-8 h-12 px-8 text-base font-medium transition-spring hover-lift border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
          >
            <Search className="h-5 w-5 mr-3" />
            View Shared Text
          </Button>
        </div>

        {/* Enhanced Main Action Buttons with staggered animations */}
        {!showPlayground && (
          <div className="max-w-3xl mx-auto mb-16">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-10 glass-effect shadow-elegant border-0 animate-slide-in-left text-center hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="space-y-6 relative z-10">
                  <div className="p-5 rounded-2xl gradient-primary shadow-glow mx-auto w-fit animate-pulse-glow group-hover:animate-glow">
                    <Share2 className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Send</h3>
                  <p className="text-muted-foreground text-lg font-light">Share your text with others securely</p>
                  <Button 
                    onClick={() => setShowPlayground(true)}
                    className="w-full h-14 text-lg font-semibold gradient-primary shadow-elegant hover-glow transition-spring group-hover:scale-105"
                  >
                    Start Sharing
                  </Button>
                </div>
              </Card>

              <Card className="p-10 glass-effect shadow-elegant border-0 animate-slide-in-right text-center hover-lift group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="space-y-6 relative z-10">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-secondary/30 to-accent/20 border border-primary/20 mx-auto w-fit group-hover:shadow-elegant transition-smooth">
                    <Search className="h-10 w-10 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">Accept</h3>
                  <p className="text-muted-foreground text-lg font-light">View shared content instantly</p>
                  <Button 
                    variant="outline"
                    onClick={() => navigate("/view")}
                    className="w-full h-14 text-lg font-semibold border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-spring hover-lift"
                  >
                    Enter Code
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Enhanced Text Sharing Form (Playground) */}
        {showPlayground && (
          <div className="max-w-5xl mx-auto">
            {!isShared ? (
              <Card className="p-10 glass-effect shadow-elegant border-0 animate-slide-up relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-accent/3" />
                <div className="space-y-8 relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Playground
                    </h2>
                    <p className="text-muted-foreground text-lg font-light">
                      Paste your content and share it instantly
                    </p>
                  </div>
                  
                  <div>
                    <label htmlFor="text-input" className="block text-lg font-semibold mb-4 text-foreground">
                      Your Content
                    </label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter or paste your text, code, notes, or any content here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="min-h-[350px] text-lg border-2 border-border/50 focus:border-primary transition-spring resize-none font-mono bg-card/50 backdrop-blur-sm"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => setShowPlayground(false)}
                      className="h-14 px-8 text-base font-medium border-2 border-border hover:border-primary/50 transition-smooth"
                    >
                      ← Back
                    </Button>
                    <Button 
                      onClick={generateShareCode}
                      disabled={!text.trim()}
                      className="flex-1 h-14 text-lg font-semibold gradient-primary shadow-elegant hover-glow transition-spring disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Share2 className="h-6 w-6 mr-3" />
                      Generate Share Code
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-10 glass-effect shadow-elegant border-0 text-center animate-slide-up relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="space-y-8 relative z-10">
                  <div className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl border border-primary/30 shadow-elegant">
                    <h3 className="text-2xl font-bold mb-4 text-primary">Your Share Code</h3>
                    <div className="flex items-center justify-center gap-4 mb-6">
                      <code className="text-4xl md:text-5xl font-mono font-bold text-primary bg-background/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-elegant border border-primary/20">
                        {shareCode}
                      </code>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={copyCode}
                        className="h-16 w-16 border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-spring hover-lift"
                      >
                        <Copy className="h-6 w-6" />
                      </Button>
                    </div>
                    <p className="text-base text-muted-foreground font-light">
                      Share this beautiful code with others to let them view your content
                    </p>
                  </div>
                  
                  <div className="flex gap-4 justify-center">
                    <Button 
                      variant="outline"
                      onClick={resetForm}
                      className="h-12 px-8 text-base font-medium border-2 border-border hover:border-primary/50 transition-smooth hover-lift"
                    >
                      Share Another Text
                    </Button>
                    <Button 
                      onClick={() => navigate("/view")}
                      className="h-12 px-8 text-base font-semibold gradient-primary shadow-elegant hover-glow transition-spring"
                    >
                      <Search className="h-5 w-5 mr-3" />
                      View Shared Text
                    </Button>
                  </div>
                </div>
              </Card>
          )}
          </div>
        )}

        {/* Enhanced Features Section with improved design */}
        <div className="max-w-5xl mx-auto mt-20 grid md:grid-cols-3 gap-8">
          {[
            { icon: "🚀", title: "Lightning Fast", desc: "Share text instantly with no signup required", delay: "0s" },
            { icon: "🔒", title: "Secure Sharing", desc: "Your content is protected with unique codes", delay: "0.1s" },
            { icon: "📱", title: "Mobile Ready", desc: "Works perfectly on all devices", delay: "0.2s" }
          ].map((feature, idx) => (
            <Card 
              key={idx} 
              className="p-8 glass-effect shadow-elegant border-0 text-center transition-spring hover-lift group relative overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="relative z-10">
                <div className="text-4xl mb-4 animate-float" style={{ animationDelay: feature.delay }}>{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground font-light leading-relaxed">{feature.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;