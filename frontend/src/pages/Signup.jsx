import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { signupUser } from "@/api/authApi";

const Signup = () => {
    const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    setIsLoading(true);
    const res = await signupUser(formData);
    toast.success(res.data.message);
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <div className="w-full min-h-screen bg-green-100 flex items-center justify-center">
      <div className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-green-600">
            Create your account
          </h1>
          <p className="text-gray-600">
            Start organizing your thoughts and ideas today
          </p>
        </div>
        <Card className="w-full max-w-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-green-600">
              {" "}
              Sign up
            </CardTitle>
            <CardDescription className="text-center">
              Create your account to get started with Notes App
            </CardDescription>
          </CardHeader>
          <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Full Name</Label>
                  <Input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your userName"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4 text-gray-600" />
                      ) : (
                        <Eye className="w-4 h-4 text-gray-600" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
            onClick={handleSubmit}
              type="submit"
              className="w-full bg-green-600 hover:bg-green-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating
                  Account
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
