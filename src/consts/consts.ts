export const CATEGORIES = [
  "Market",
  "Nəqliyyat",
  "Alış-veriş",
  "Əyləncə",
  "Restoran",
] as const;

export const STORAGE_KEY = "expenses";
export const GOALS_KEY = "goals";

export const COLORS: readonly string[] = [
  "#14B8A6",
  "#8B5CF6",
  "#F59E0B",
  "#EF4444",
  "#3B82F6",
  "#10B981",
  "#EC4899",
] as const;

export const navItems = [
  { label: "Ana Səhifə", path: "/", emoji: "🏠" },
  { label: "Xərclər", path: "/expenses", emoji: "📋" },
  { label: "Analitika", path: "/analytics", emoji: "📊" },
  { label: "Statistika", path: "/stats", emoji: "📈" },
  { label: "Hədəf", path: "/goals", emoji: "🎯" },
  { label: "CSV Export", path: "/csv", emoji: "📥" },
];
