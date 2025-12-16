import { forgotPassword } from "@/api/authApi";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    const res = await forgotPassword(email);
    toast.success(res.data.message);
    navigate(`/verify-otp/${email}`);
  } catch (err) {
    toast.error(err.response?.data?.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="w-full min-h-screen bg-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">
            Reset your password
          </h1>
          <p className="text-muted-foreground">
            Enter your email and we’ll send reset instructions
          </p>
        </div>

        <Card className="bg-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-green-600">
              Forgot Password
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email address to receive a password reset link"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitted ? (
              <div className="py-6 flex flex-col items-center text-center space-y-4">
                <div className="bg-green-100 rounded-full p-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Check your inbox</h3>
                  <p className="text-muted-foreground">
                    We’ve sent a reset link to{" "}
                    <span className="font-medium text-foreground">
                      {email}
                    </span>
                  </p>

                  <p className="text-sm">
                    Didn’t get the email?{" "}
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-green-600 hover:underline font-medium"
                    >
                      Try again
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending reset link...
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </Button>
              </form>
            )}
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-green-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
