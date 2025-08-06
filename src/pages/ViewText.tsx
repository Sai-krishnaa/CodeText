import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Search, Copy, Home, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ViewText = () => {
  const [code, setCode] = useState("");
  const [sharedText, setSharedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const searchText = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setNotFound(false);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Retrieve text from localStorage (in a real app, this would be an API call)
    const text = localStorage.getItem(code.toUpperCase());
    
    if (text) {
      setSharedText(text);
      toast({
        title: "Text found!",
        description: "Successfully retrieved shared content",
      });
    } else {
      setNotFound(true);
      setSharedText("");
      toast({
        title: "Code not found",
        description: "Please check the code and try again",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const copyText = () => {
    navigator.clipboard.writeText(sharedText);
    toast({
      title: "Text copied!",
      description: "Content copied to clipboard",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchText();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            View Shared Text
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter the share code to view the content that was shared with you.
          </p>
          
          <Button 
            variant="outline" 
            onClick={() => navigate("/")}
            className="mt-6 transition-smooth hover:shadow-soft"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="p-6 gradient-card shadow-soft border-0 animate-slide-up">
            <div className="space-y-4">
              <div>
                <label htmlFor="code-input" className="block text-sm font-medium mb-2">
                  Share Code
                </label>
                <div className="flex gap-3">
                  <Input
                    id="code-input"
                    placeholder="Enter the 6-character code"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    onKeyPress={handleKeyPress}
                    className="text-lg font-mono text-center tracking-wider border-border/50 focus:border-primary transition-smooth"
                    maxLength={6}
                  />
                  <Button 
                    onClick={searchText}
                    disabled={!code.trim() || isLoading}
                    className="px-6 gradient-primary shadow-medium hover:shadow-glow transition-bounce"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 animate-spin border-2 border-primary-foreground border-t-transparent rounded-full" />
                    ) : (
                      <Search className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Results Section */}
        {sharedText && (
          <div className="max-w-4xl mx-auto animate-slide-up">
            <Card className="p-6 gradient-card shadow-soft border-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Shared Content</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={copyText}
                  className="transition-smooth hover:shadow-soft"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
              </div>
              <Textarea
                value={sharedText}
                readOnly
                className="min-h-[300px] text-base bg-background/50 border-border/50 resize-none"
              />
            </Card>
          </div>
        )}

        {/* Not Found State */}
        {notFound && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            <Card className="p-8 gradient-card shadow-soft border-0 text-center border-destructive/20">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Code Not Found</h3>
              <p className="text-muted-foreground mb-4">
                The share code you entered doesn't exist or may have expired.
              </p>
              <p className="text-sm text-muted-foreground">
                Please check the code and try again, or ask the sender for a new code.
              </p>
            </Card>
          </div>
        )}

        {/* How it Works */}
        {!sharedText && !notFound && (
          <div className="max-w-2xl mx-auto mt-12">
            <Card className="p-6 gradient-card shadow-soft border-0">
              <h3 className="font-semibold mb-3 text-center">How it works</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">1</span>
                  <span>Someone shares text and receives a 6-character code</span>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">2</span>
                  <span>They share this code with you</span>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-semibold">3</span>
                  <span>Enter the code above to view their shared content</span>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewText;