import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { Ghost } from "lucide-react";

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <Ghost className="h-16 w-16 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted-foreground text-sm">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")} className="mt-4">
          Go Back Home
        </Button>
      </div>
    </div>
  );
}
