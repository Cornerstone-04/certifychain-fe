import { Shield, Upload, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import "./landing.css";

export default function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 text-gray-800 dark:text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-3xl animate-bounce delay-500"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      {/* Header */}
      <header
        className={`relative w-full px-4 py-6 flex items-center justify-between max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center space-x-2 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-blue-500 transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-md animate-ping"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            CertifyChain
          </span>
        </div>
        <div className="flex gap-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="border-blue-500/50 text-blue-600 hover:text-white hover:bg-blue-500 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-lg backdrop-blur-sm bg-white/80 dark:bg-gray-800/80"
            >
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button className="text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-xl group">
              Get Started
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative text-center py-20 px-4 h-[90vh] flex flex-col justify-center">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="inline-block animate-fade-in-up">
              Blockchain-Powered
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block animate-fade-in-up delay-200">
              Certificate Verification
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-in-up delay-400">
            Upload, verify, and manage certificates with tamper-proof blockchain
            security that ensures authenticity and trust.
          </p>
          <div className="flex justify-center gap-4 flex-wrap animate-fade-in-up delay-600">
            <Button
              onClick={() => navigate("/register")}
              className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl group rounded-xl"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-1000"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-ping delay-1500"></div>
          <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-2000"></div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 px-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-200 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Why Choose CertifyChain?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <Feature
              icon={<Shield className="w-7 h-7" />}
              title="Secure & Immutable"
              description="Certificates are stored on a decentralized network for unmatched authenticity and security."
              delay="delay-300"
            />
            <Feature
              icon={<Upload className="w-7 h-7" />}
              title="Fast Upload"
              description="Upload and receive a unique CID instantly with our streamlined process."
              delay="delay-500"
            />
            <Feature
              icon={<CheckCircle className="w-7 h-7" />}
              title="Easy Verification"
              description="Verify any certificate using its unique CID in seconds with complete confidence."
              delay="delay-700"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative text-center py-8 text-gray-500 dark:text-gray-400 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm transition-all duration-1000 delay-800 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-sm">
            &copy; 2025 CertifyChain. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`group p-8 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 animate-fade-in-up ${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center items-center w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 text-blue-600 dark:text-blue-300 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
        <div
          className={`transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-200">
        {description}
      </p>

      {/* Hover effect line */}
      <div className="mt-4 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
    </div>
  );
}
