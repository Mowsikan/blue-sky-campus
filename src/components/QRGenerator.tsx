
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface QRGeneratorProps {
  className?: string;
}

const QRGenerator = ({ className }: QRGeneratorProps) => {
  const [counter, setCounter] = useState(30);
  const [qrKey, setQrKey] = useState(generateRandomQrKey());
  
  // Function to generate random QR key (for demo purposes)
  function generateRandomQrKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  
  // Reset counter and generate new QR code
  const refreshQR = () => {
    setCounter(30);
    setQrKey(generateRandomQrKey());
  };
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => {
        if (prev <= 1) {
          refreshQR();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Create a visual "QR code" using CSS for demo
  // In a real app, you'd use a QR code generation library
  const renderMockQR = () => {
    const size = 7; // 7x7 grid for the mock QR
    const cells = [];
    
    // Use the qrKey to determine which cells are filled
    const qrSeed = qrKey.split('').map(char => char.charCodeAt(0));
    
    for (let i = 0; i < size * size; i++) {
      const isFilled = qrSeed[i % qrSeed.length] % 2 === 0;
      cells.push(
        <div 
          key={i}
          className={cn(
            "aspect-square",
            isFilled ? "bg-primary" : "bg-transparent"
          )}
        />
      );
    }
    
    return (
      <div className={cn(
        "grid gap-1 p-4 bg-white rounded-lg shadow-sm", 
        `grid-cols-${size}`
      )} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {cells}
      </div>
    );
  };
  
  return (
    <Card className={cn("w-full max-w-md mx-auto", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Present this QR for student attendance</CardTitle>
          <div className="bg-primary/10 text-primary rounded-full h-10 w-10 flex items-center justify-center font-medium">
            {counter}
          </div>
        </div>
        <CardDescription className="flex items-center">
          <Shield className="h-4 w-4 mr-1.5" />
          <span>QR code refreshes every 30 seconds</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center p-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center -m-4">
            <RefreshCw className={cn(
              "h-8 w-8 text-primary/50 transition-opacity",
              counter <= 5 ? "animate-spin opacity-100" : "opacity-0"
            )} />
          </div>
          <div className={cn(
            "transition-all duration-200",
            counter <= 5 ? "opacity-50 scale-95" : "opacity-100 scale-100"
          )}>
            {renderMockQR()}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Class ID: MATH101 • {new Date().toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default QRGenerator;
