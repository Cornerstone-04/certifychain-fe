import { ChangeEvent, FormEvent, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, RefreshCw } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useRegister } from "@/hooks/useRegister";
import { getPasswordStrength } from "@/utils/passwordStrength";
import { toast } from "sonner";
import { generateStrongPassword } from "@/utils/generatePassword";

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    universityName: "",
    email: "",
    password: "",
  });
  const passwordStrength = useMemo(
    () => getPasswordStrength(formData.password),
    [formData.password]
  );

  const handleReturnToHome = () => navigate("/");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleRandomisePassword = () => {
    setFormData({
      ...formData,
      password: generateStrongPassword(),
    });
    setShowPassword(true);
    toast.success("Strong password generated. Store it somewhere secure.");
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (passwordStrength.score < 3) {
      toast.error("Please choose a stronger password.");
      return;
    }
    // Updated data sent to mutate
    registerMutation.mutate(
      {
        email: formData.email,
        password: formData.password,
        universityName: formData.universityName,
      },
      {
        onSuccess: () => navigate("/verify"),
      }
    );
  };

  return (
    <div className="fintech-shell flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="fintech-panel p-8">
          <div className="text-center mb-8">
            <Button
              onClick={handleReturnToHome}
              variant={"ghost"}
              className="absolute top-2 left-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft />
            </Button>
            <p className="fintech-kicker mb-3">Institution onboarding</p>
            <h1 className="text-3xl font-black uppercase tracking-[-0.06em] text-slate-950 dark:text-white mb-2 flex justify-center items-center">
              Register Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              For your university/institution
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Replaced first and last name with University Name */}
            <div className="space-y-2">
              <label className="fintech-label">
                University/Institution Name
              </label>
              <Input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleInputChange}
                placeholder="e.g., University of Lagos"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="fintech-label">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="admin@youruniversity.edu"
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="fintech-label">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRandomisePassword}
                className="w-full"
              >
                <RefreshCw />
                Randomise Password
              </Button>
              {formData.password && (
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-full rounded transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.score / 6) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span
                    className={`ml-3 text-xs font-medium ${passwordStrength["text-color"]}`}
                  >
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 uppercase tracking-[0.12em] text-xs"
              disabled={registerMutation.status === "pending"}
            >
              {registerMutation.status === "pending"
                ? "Registering..."
                : "Create Account"}
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/admin/login"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
