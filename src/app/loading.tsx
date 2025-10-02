"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center py-20">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-600 border-t-transparent" />
    </div>
  );
}
