import type { Metadata } from "next";
import CustomToursContent from "@/components/CustomToursContent";

export const metadata: Metadata = {
  title: "Custom & Group Tours",
  description: "Plan a bespoke tour of Northern Pakistan with Shamaal Tourism — corporate retreats, honeymoon packages, family tours, and fully custom itineraries.",
};

export default function CustomToursPage() {
  return <CustomToursContent />;
}
