import { Shield, Upload, CheckCircle } from "lucide-react";
import { ActivityItemProps, StatsCardProps } from "./types";

export const stats: StatsCardProps[] = [
  {
    icon: <Upload className="w-6 h-6" />,
    title: "Uploaded",
    value: "12",
    description: "Certificates uploaded",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Verified",
    value: "12",
    description: "Successful verifications",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Security",
    value: "100%",
    description: "Blockchain secured",
    gradient: "from-purple-500 to-pink-500",
  },
];

export const activities: ActivityItemProps[] = [
  {
    action: "Certificate uploaded",
    time: "2 hours ago",
    status: "success",
  },
  {
    action: "Certificate verified",
    time: "5 hours ago",
    status: "success",
  },
  {
    action: "Verification attempt",
    time: "1 day ago",
    status: "pending",
  },
];
