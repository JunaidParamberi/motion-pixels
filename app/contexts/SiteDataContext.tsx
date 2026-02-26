"use client";

import React, { createContext, useContext } from "react";
import { siteData, type SiteData } from "@/app/data/site-data";

const SiteDataContext = createContext<SiteData | null>(null);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  return (
    <SiteDataContext.Provider value={siteData}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteData {
  const value = useContext(SiteDataContext);
  if (value == null) {
    throw new Error("useSiteData must be used within a SiteDataProvider");
  }
  return value;
}
