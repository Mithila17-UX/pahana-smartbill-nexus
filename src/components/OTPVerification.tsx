
import React, { useState, useEffect } from 'react';
import { Shield, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';

interface OTPVerificationProps {
  email: string;
  onVerificationSuccess: () => void;
  onBack: () => void;
}

export const OTPVerification: React.FC<OTPVerificationProps> = ({
  email,
  onVerificationSuccess,
  onBack
}) => {
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const { toast } = useToast();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP code.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    // Mock OTP verification - in real app, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any 6-digit code
    if (otp === '123456' || otp.length === 6) {
      toast({
        title: "Verification Successful",
        description: "Your account has been verified successfully.",
      });
      onVerificationSuccess();
    } else {
      toast({
        title: "Verification Failed",
        description: "Invalid OTP code. Please try again.",
        variant: "destructive",
      });
    }
    
    setIsVerifying(false);
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setCountdown(30);
    setOtp('');
    
    // Mock resend OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your email.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Verify Your Account
          </CardTitle>
          <CardDescription>
            We've sent a 6-digit verification code to {email}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button 
              onClick={handleVerify} 
              className="w-full" 
              disabled={isVerifying || otp.length !== 6}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>

          <div className="text-center space-y-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?
            </div>
            
            <Button
              variant="outline"
              onClick={handleResendOTP}
              disabled={!canResend}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {canResend ? "Resend OTP" : `Resend in ${countdown}s`}
            </Button>

            <Button
              variant="ghost"
              onClick={onBack}
              className="w-full text-sm"
            >
              Back to Registration
            </Button>
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            For demo purposes, use code: <strong>123456</strong>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
