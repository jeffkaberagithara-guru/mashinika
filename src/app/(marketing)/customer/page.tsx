import type { Metadata } from "next"
import { CustomerDashboard } from "@/features/customer/customer-dashboard"

export const metadata: Metadata = {
  title: "My rescues",
  description: "Track your Mashinika rescue requests.",
}

export default function CustomerPage() {
  return <CustomerDashboard />
}