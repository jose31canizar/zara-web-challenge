"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

const SEARCH_DEBOUNCE_MS = 250;

export function FormSearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get("search") ?? "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  useEffect(() => {
    setSearchValue(currentSearch);
  }, [currentSearch]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const query = searchValue.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (query) params.set("search", query);
      else params.delete("search");

      router.replace(`/?${params.toString()}`, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [router, searchParams, searchValue]);

  return (
    <input
      type="search"
      placeholder="Search for a smartphone..."
      value={searchValue}
      onChange={handleSearchChange}
      className="w-full border-b border-neutral-300 bg-transparent px-0 py-4 text-lg outline-none placeholder:text-neutral-400"
      aria-label="Search by brand or name"
    />
  );
}
