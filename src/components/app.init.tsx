"use client";

import ThemeSvcContext from "@/shared/services/theme/theme.context";
import ThemeService from "@/shared/services/theme/theme.service";
import { useContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export default function AppInit({ children }: Props) {
  const themeSvc = useContext<ThemeService>(ThemeSvcContext);

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    themeSvc.loadTheme();

    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div>loading...</div>;
  }

  return <div>{children}</div>;
}
