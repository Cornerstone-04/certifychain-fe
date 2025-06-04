import { ReactNode } from "react";

export type ActivityItemProps = {
  action: string;
  time: string;
  status: "success" | "pending" | "error";
};

export type StatsCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  description: string;
  gradient: string;
};
