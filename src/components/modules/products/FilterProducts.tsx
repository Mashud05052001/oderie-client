"use client";
import { Select, Slider } from "antd";
import Search from "antd/es/input/Search";
import Hamburger from "hamburger-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import OdButton from "../../UI/button/OdButton";
import useDebounce from "@/src/hook_with_service/useDebounce";

const FilterProducts = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const debounceSearchTerm = useDebounce(search);

  const updateQueryInUrl = useCallback(() => {
    const queryParams = new URLSearchParams({
      ...(debounceSearchTerm && { searchTerm: debounceSearchTerm }),
      ...(priceRange[0] !== 0 || priceRange[1] !== 1000000
        ? {
            price: `gt:${priceRange[0]},lt:${priceRange[1]}`,
          }
        : {}),
      ...(sortPrice !== "default" && { sortBy: "price", sortOrder: sortPrice }),
    });

    const queryString = queryParams.toString();
    router.replace(queryString ? `?${queryString}` : pathname);
  }, [debounceSearchTerm, priceRange, sortPrice, router, pathname]);

  const resetFilters = () => {
    setSearch("");
    setPriceRange([0, 1000000]);
    setSortPrice("default");
  };

  useEffect(() => {
    updateQueryInUrl();
  }, [debounceSearchTerm, priceRange, sortPrice, updateQueryInUrl]);

  const filterItems = (
    <div className="md:max-w-52 md:min-w-52 mt-0 md:mt-12 space-y-8">
      {/* Search Field */}
      <div className="w-[100%] md:w-[85%]">
        <Search
          placeholder="Search products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onSearch={setSearch}
        />
      </div>

      {/* Price Range Slider */}
      <div className="space-y-6 w-[100%] md:w-[85%]">
        <p className="-mb-1 font-medium">Filter By Price Range</p>
        <Slider
          min={0}
          max={1000000}
          range
          value={priceRange}
          onChange={setPriceRange}
        />
        <p className="text-xs -mt-1 text-gray-500">
          Selected Range: {priceRange[0]} to {priceRange[1]}
        </p>
      </div>

      {/* Sort Price Select */}
      <div className="w-[100%] md:w-[85%]">
        <Select
          allowClear
          optionFilterProp="label"
          className="w-full"
          value={sortPrice}
          onChange={(value) => setSortPrice(value || "default")}
          options={[
            {
              label: <span className="text-gray-500">Sort by price</span>,
              value: "default",
              disabled: true,
            },
            { label: <span>Low to high</span>, value: "asc" },
            { label: <span>High to low</span>, value: "desc" },
          ]}
        />
      </div>

      {/* Reset Button */}
      <OdButton
        buttonText="Reset"
        className="w-[100%] md:w-[85%]"
        onClick={resetFilters}
        variant="ghost"
        size="sm"
      />
    </div>
  );

  return (
    <div>
      {/* Mobile Filter Modal */}
      <div className="md:hidden">
        <div className="h-10 w-fit">
          <Hamburger
            size={18}
            toggled={openFilterModal}
            toggle={setOpenFilterModal}
          />
          {openFilterModal && (
            <div className="absolute left-8 top-16 z-50 p-6 rounded-sm bg-slate-200">
              {filterItems}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Filters */}
      <div className="hidden md:block">{filterItems}</div>
    </div>
  );
};

export default FilterProducts;
