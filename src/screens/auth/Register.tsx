import { ChangeEvent, FormEvent, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { useRegister } from "@/hooks/useRegister";
import { getPasswordStrength } from "@/utils/passwordStrength";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    universityName: "", // Changed from firstName, lastName
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
        onSuccess: () => navigate("/admin/upload"), // Redirect to admin upload page after successful registration
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-lg">
          <div className="text-center mb-8">
            <Button
              onClick={handleReturnToHome}
              variant={"ghost"}
              className="absolute top-2 left-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FaArrowLeft />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex justify-center items-center">
              Register Admin Account
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              For your university/institution
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Replaced first and last name with University Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
              {formData.password && (
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 w-3/4 rounded bg-gray-200 dark:bg-gray-700">
                    <div
                      className={`h-full rounded transition-all duration-300 ${passwordStrength.color}`}
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
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
              className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
              disabled={registerMutation.status === "pending"}
            >
              {registerMutation.status === "pending"
                ? "Registering..."
                : "Create Admin Account"}
            </Button>
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an admin account?{" "}
              <Link
                to="/admin/login" // Updated link to admin login
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