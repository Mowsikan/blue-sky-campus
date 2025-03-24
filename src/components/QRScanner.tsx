
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Shield, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const QRScanner = ({ open, onOpenChange, onSuccess }: QRScannerProps) => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setScanning(true);
      setScanned(false);
      setError(null);
      
      // Mock scanner - in real app, this would use a camera API
      const timeout = setTimeout(() => {
        // Simulate a 70% success rate
        const success = Math.random() > 0.3;
        if (success) {
          handleSuccess();
        } else {
          handleError("Invalid or expired QR code. Please try again.");
        }
      }, 3000);
      
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleSuccess = () => {
    setScanning(false);
    setScanned(true);
    setError(null);
    
    toast({
      title: "Success!",
      description: "Attendance QR code scanned successfully.",
      variant: "default",
    });
    
    setTimeout(() => {
      onOpenChange(false);
      onSuccess();
    }, 1500);
  };

  const handleError = (message: string) => {
    setScanning(false);
    setScanned(false);
    setError(message);
    
    toast({
      title: "Error",
      description: message,
      variant: "destructive",
    });
  };

  const tryAgain = () => {
    setScanning(true);
    setError(null);
    
    // Mock scanner again
    setTimeout(() => {
      // Higher success rate on retry
      const success = Math.random() > 0.2;
      if (success) {
        handleSuccess();
      } else {
        handleError("Invalid or expired QR code. Please try again.");
      }
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Scan QR Code</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <div className="flex items-center mb-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 mr-1.5" />
            <span>Secure attendance validation</span>
          </div>
          
          <div className="w-full aspect-square max-w-[300px] rounded-lg border-2 border-dashed border-muted flex items-center justify-center overflow-hidden relative">
            {scanning && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 border-4 border-primary/30 rounded-lg"></div>
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary animate-[scan_3s_ease-in-out_infinite]"></div>
                  <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-primary/50" />
                </div>
                <div className="mt-4 text-center">
                  <p className="font-medium">Waiting to scan QR...</p>
                  <p className="text-sm text-muted-foreground mt-2">Position the QR code within the frame</p>
                </div>
              </div>
            )}
            
            {scanned && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-green-50 animate-fade-in">
                <CheckCircle2 className="w-20 h-20 text-green-500 animate-[pulse_1s_ease-in-out]" />
                <p className="mt-4 font-medium text-green-700">QR Code Verified!</p>
                <p className="text-sm text-green-600">Redirecting to attendance form...</p>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 animate-fade-in">
                <XCircle className="w-20 h-20 text-red-500" />
                <p className="mt-4 font-medium text-red-700">Scan Failed</p>
                <p className="text-sm text-red-600 text-center px-4">{error}</p>
              </div>
            )}
          </div>
          
          {error && (
            <Button 
              onClick={tryAgain} 
              variant="outline" 
              className="mt-4"
            >
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
