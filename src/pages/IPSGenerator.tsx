import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Download, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const IPSGenerator = () => {
  const [selectedClient, setSelectedClient] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPDF, setGeneratedPDF] = useState(false);

  const handleGenerate = () => {
    if (!selectedClient) {
      toast.error("Please select a client first");
      return;
    }
    
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPDF(true);
      toast.success("IPS generated successfully!");
    }, 2000);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">
          IPS Generator
        </h1>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Generator */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Client Selection</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Select Client</label>
                <Select value={selectedClient} onValueChange={setSelectedClient}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a client..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anna">Anna Williams</SelectItem>
                    <SelectItem value="marcus">Marcus Thompson</SelectItem>
                    <SelectItem value="sarah">Sarah Lakewood</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-gold hover:bg-gold-dark text-navy"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Generating IPS...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Investment Policy Statement
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* PDF Preview */}
          {generatedPDF && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">IPS Preview</h3>
                <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-navy">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
              
              <div className="border rounded-lg bg-muted/30 p-8 space-y-6 text-sm">
                <div className="border-b pb-4">
                  <h1 className="text-2xl font-bold text-navy mb-2">Investment Policy Statement</h1>
                  <p className="text-muted-foreground">
                    Prepared for: <span className="font-semibold text-foreground">Anna Williams</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Generated: November 2025 • Version 1.2</p>
                </div>

                <div>
                  <h4 className="font-semibold text-navy mb-2">1. Investment Objectives</h4>
                  <p className="text-muted-foreground">
                    The primary objective is to achieve long-term capital appreciation while maintaining a balanced approach to risk. Target annual return: 7-9% with moderate volatility tolerance.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-navy mb-2">2. Risk Tolerance</h4>
                  <p className="text-muted-foreground">
                    Moderate-to-aggressive risk profile. Client can withstand short-term volatility in pursuit of long-term growth objectives. Maximum acceptable drawdown: 25%.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-navy mb-2">3. Asset Allocation</h4>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="bg-background p-3 rounded">
                      <p className="text-xs text-muted-foreground">Equities</p>
                      <p className="font-bold text-lg">65%</p>
                    </div>
                    <div className="bg-background p-3 rounded">
                      <p className="text-xs text-muted-foreground">Fixed Income</p>
                      <p className="font-bold text-lg">25%</p>
                    </div>
                    <div className="bg-background p-3 rounded">
                      <p className="text-xs text-muted-foreground">Alternatives</p>
                      <p className="font-bold text-lg">7%</p>
                    </div>
                    <div className="bg-background p-3 rounded">
                      <p className="text-xs text-muted-foreground">Cash</p>
                      <p className="font-bold text-lg">3%</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-navy mb-2">4. Compliance Summary</h4>
                  <p className="text-muted-foreground">
                    This IPS complies with SEC and FINRA guidelines. All recommended strategies align with client's stated objectives and regulatory requirements.
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-xs text-muted-foreground">
                    Generated by riAI Capital's IPS Generator • Powered by AWS Bedrock GPT-4
                  </p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right Column - Metadata */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Clock className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-medium">Last Generated</p>
                <p className="text-xs text-muted-foreground">November 2025</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-xs text-muted-foreground">Advisor Approved ✓</p>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-navy/10 rounded-lg">
                <FileText className="h-5 w-5 text-navy" />
              </div>
              <div>
                <p className="text-sm font-medium">Version</p>
                <p className="text-xs text-muted-foreground">1.2 Compliant</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default IPSGenerator;
