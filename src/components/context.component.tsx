"use client";
import ThemeSvcContext from "@/shared/services/theme/theme.context";
import ThemeService from "@/shared/services/theme/theme.service";

const themeSvc = new ThemeService();

export default function ContextComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeSvcContext.Provider value={themeSvc}>
      {children}
    </ThemeSvcContext.Provider>
  );
}
