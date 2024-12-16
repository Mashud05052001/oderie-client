"use client";
import useDebounce from "@/src/hook_with_service/useDebounce";
import { Input } from "@nextui-org/input";
import { Select } from "antd";
import Search from "antd/es/input/Search";
import Hamburger from "hamburger-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OdButton from "../../UI/button/OdButton";
import { useGetAllCategories } from "@/src/hook_with_service/swrGet/category.fetch";
import { TSelectOption } from "../../UI/form/OdSelect";

const FilterProducts = () => {
  const { data: allCategoriesData, isLoading: categoriesLoading } =
    useGetAllCategories();
  const router = useRouter();
  const pathname = usePathname();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  const [categoryId, setCategoryId] = useState<string>("");
  const [sortPrice, setSortPrice] = useState<"asc" | "desc" | "default">(
    "default"
  );
  const debounceSearchTerm = useDebounce(search);
  let debounceMinPrice = useDebounce(minPrice);
  let debounceMaxPrice = useDebounce(maxPrice);

  const resetFilters = () => {
    setSearch("");
    setMaxPrice(0);
    setMinPrice(0);
    setSortPrice("default");
  };

  useEffect(() => {
    const priceFilter =
      debounceMinPrice !== 0 || debounceMaxPrice !== 0
        ? {
            price: [
              debounceMinPrice && debounceMinPrice !== 0
                ? `gte:${debounceMinPrice}`
                : null,
              debounceMaxPrice && debounceMaxPrice !== 0
                ? `lte:${debounceMaxPrice}`
                : null,
            ]
              .filter(Boolean) // Remove null values
              .join(","),
          }
        : {};

    const queryParams = new URLSearchParams({
      ...(debounceSearchTerm && { searchTerm: debounceSearchTerm }),
      ...(priceFilter?.price && priceFilter.price !== "" && priceFilter),
      ...(sortPrice !== "default" && { sortBy: "price", sortOrder: sortPrice }),
      ...(categoryId !== "" && { categoryId: categoryId }),
    });

    const queryString = queryParams.toString();
    console.log(queryString);
    router.replace(queryString ? `?${queryString}` : pathname);
  }, [
    debounceSearchTerm,
    sortPrice,
    router,
    pathname,
    debounceMaxPrice,
    debounceMinPrice,
    categoryId,
  ]);
  const categoriesOptions =
    allCategoriesData?.data?.map((item) => ({
      value: item.id,
      label: item.name,
    })) || [];

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
      {/* <div className="space-y-6 w-[100%] md:w-[85%]">
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
      </div> */}
      <div className="grid grid-cols-2 gap-x-4 w-[100%] md:w-[85%]">
        <Input
          placeholder="min"
          variant="underlined"
          size="sm"
          type="number"
          value={
            minPrice !== undefined && minPrice !== 0 ? minPrice.toString() : ""
          }
          min={0}
          onChange={(e) => {
            const value = Number(e.target.value);
            setMinPrice(value);
            // if (!isNaN(value)) {
            //   if (maxPrice && value > maxPrice) {
            //     setMaxPrice(value); // Swap values
            //     setMinPrice(maxPrice);
            //   } else {
            //     setMinPrice(value);
            //   }
            // } else {
            //   setMinPrice(undefined);
            // }
          }}
        />
        <Input
          placeholder="max"
          variant="underlined"
          size="sm"
          type="number"
          min={0}
          value={
            maxPrice !== undefined && maxPrice !== 0 ? maxPrice.toString() : ""
          }
          onChange={(e) => {
            const value = Number(e.target.value);
            setMaxPrice(value);
            // if (!isNaN(value)) {
            //   if (minPrice && value < minPrice) {
            //     setMinPrice(value); // Swap values
            //     setMaxPrice(minPrice);
            //   } else {
            //     setMaxPrice(value);
            //   }
            // } else {
            //   setMaxPrice(undefined);
            // }
          }}
        />
      </div>

      <div className="space-y-4">
        {/* Category */}
        <div className="w-[100%] md:w-[85%]">
          <Select
            allowClear
            optionFilterProp="label"
            className="w-full"
            value={categoryId}
            onChange={(value) => setCategoryId(value || "")}
            options={[
              {
                label: <span className="text-gray-500">Select Category</span>,
                value: "",
                disabled: true,
              },
              ...categoriesOptions,
            ]}
          />
        </div>
        {/* Price Sort */}
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
            <div className="absolute left-8 top-16 z-50 p-6 rounded-sm bg-slate-200 w-64">
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
