
import React, { useState, useEffect, useRef } from "react";
import { Product } from "@/lib/products";
import { Link, useSearchParams } from "react-router-dom";
import { PackageSearch, Search, X, SlidersHorizontal, ChevronDown, Filter, ChevronUp } from "lucide-react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Under ₹200", min: 0, max: 199 },
  { label: "₹200 – ₹500", min: 200, max: 500 },
  { label: "₹500 – ₹1000", min: 500, max: 1000 },
  { label: "Above ₹1000", min: 1000, max: Infinity },
];

const SORT_OPTIONS = [
  { label: "Default Sort", value: "default" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name: A – Z", value: "name_asc" },
  { label: "Name: Z – A", value: "name_desc" },
];

const ProductGrid = ({ products }: ProductGridProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState(0);
  const [sortOption, setSortOption] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [isLoading, setIsLoading] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const categories = ["all", ...uniqueCategories];

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...products];

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
      }

      if (selectedCategory && selectedCategory !== "all") {
        result = result.filter((p) => p.category === selectedCategory);
      }

      const range = PRICE_RANGES[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price <= range.max);

      if (sortOption === "price_asc") result.sort((a, b) => a.price - b.price);
      else if (sortOption === "price_desc") result.sort((a, b) => b.price - a.price);
      else if (sortOption === "name_asc") result.sort((a, b) => a.name.localeCompare(b.name));
      else if (sortOption === "name_desc") result.sort((a, b) => b.name.localeCompare(a.name));

      setFilteredProducts(result);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedCategory, selectedPriceRange, sortOption, searchQuery, products]);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedPriceRange(0);
    setSortOption("default");
    setSearchQuery("");
  };

  const hasActiveFilters = !!selectedCategory || selectedPriceRange !== 0 || sortOption !== "default" || !!searchQuery;
  const activeFilterCount = (selectedCategory ? 1 : 0) + (selectedPriceRange !== 0 ? 1 : 0) + (sortOption !== "default" ? 1 : 0);

  return (
    <div className="space-y-4 sm:space-y-12">

      {/* ===== MOBILE: Compact Search + Filter Toggle Row ===== */}
      <div className="sm:hidden space-y-3">
        {/* Search + Filter button row */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A84C]/40" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-lg bg-white/[0.02] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 text-xs"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20">
                <X size={12} />
              </button>
            )}
          </div>
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider transition-all ${filtersOpen || hasActiveFilters
                ? 'bg-[#C9A84C] border-[#C9A84C] text-black'
                : 'bg-white/[0.02] border-white/10 text-white/50'
              }`}
          >
            <Filter size={12} />
            {activeFilterCount > 0 && (
              <span className="bg-black text-[#C9A84C] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">{activeFilterCount}</span>
            )}
            {filtersOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
          </button>
        </div>

        {/* Collapsible Filters */}
        {filtersOpen && (
          <div className="space-y-3 p-3 bg-white/[0.02] border border-white/5 rounded-xl animate-in slide-in-from-top-2 duration-200">
            {/* Categories - horizontal scroll */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category === "all" ? null : category)}
                  className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${(category === "all" && !selectedCategory) || category === selectedCategory
                      ? "bg-[#C9A84C] border-[#C9A84C] text-black"
                      : "bg-white/[0.01] border-white/5 text-white/30"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Price puls - horizontal scroll */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {PRICE_RANGES.map((range, idx) => (
                <button
                  key={range.label}
                  onClick={() => setSelectedPriceRange(idx)}
                  className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${selectedPriceRange === idx
                      ? "text-black border-[#C9A84C] bg-[#C9A84C]"
                      : "text-white/20 border-white/5 bg-white/[0.01]"
                    }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div ref={sortRef} className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-white/[0.02] border border-white/10 text-white text-[9px] font-bold uppercase tracking-wider"
              >
                <span className="flex items-center gap-2">
                  <SlidersHorizontal size={10} className="text-[#C9A84C]" />
                  {SORT_OPTIONS.find(o => o.value === sortOption)?.label}
                </span>
                <ChevronDown size={10} className={`text-[#C9A84C] transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#0B0B0B] border border-[#C9A84C]/20 rounded-lg p-1.5 z-[60] shadow-2xl">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => { setSortOption(opt.value); setSortOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded text-[9px] font-bold uppercase tracking-wider transition-all ${sortOption === opt.value ? 'bg-[#C9A84C] text-black' : 'text-white/40'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <button onClick={clearAllFilters} className="text-[9px] uppercase tracking-wider font-bold text-[#C9A84C] underline underline-offset-4">
                Clear All
              </button>
            )}
          </div>
        )}
      </div>

      {/* ===== DESKTOP: Slim Search & Sort Toolbar ===== */}
      <div className="hidden sm:flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-2xl">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C9A84C]/40 group-focus-within:text-[#C9A84C] transition-all" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white placeholder-white/10 focus:outline-none focus:border-[#C9A84C]/60 transition-all text-[9px] font-black uppercase tracking-[0.1em]"
          />
        </div>

        {/* Sort */}
        <div ref={sortRef} className="relative min-w-[160px]">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/[0.02] border border-white/10 text-white hover:border-[#C9A84C]/60 transition-all text-[8px] font-black uppercase tracking-widest"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={10} className="text-[#C9A84C]" />
              {SORT_OPTIONS.find(o => o.value === sortOption)?.label}
            </span>
            <ChevronDown size={10} className={`text-[#C9A84C] transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {sortOpen && (
            <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[#0B0B0B] border border-[#C9A84C]/20 rounded-xl p-1 z-[60] shadow-2xl">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setSortOption(opt.value); setSortOpen(false); }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${sortOption === opt.value ? 'bg-[#C9A84C] text-black' : 'text-white/40 hover:bg-white/5'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== DESKTOP: Filters Hub ===== */}
      <div className="hidden sm:block space-y-6">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === "all" ? null : category)}
              className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500 border ${(category === "all" && !selectedCategory) || category === selectedCategory
                  ? "bg-[#C9A84C] border-[#C9A84C] text-black shadow-lg shadow-[#C9A84C]/20"
                  : "bg-white/[0.02] border-white/10 text-white/30 hover:border-white/40 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Price Tiers */}
        <div className="flex flex-wrap items-center gap-6 py-8 border-y border-white/5">
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[#C9A84C]/40 mr-4 flex items-center gap-3">
            <Filter size={12} className="text-[#C9A84C]" /> Filter Price:
          </span>
          <div className="flex flex-wrap gap-3">
            {PRICE_RANGES.map((range, idx) => (
              <button
                key={range.label}
                onClick={() => setSelectedPriceRange(idx)}
                className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-700 border ${selectedPriceRange === idx
                    ? "text-black border-[#C9A84C] bg-[#C9A84C] shadow-[0_0_20px_rgba(201,168,76,0.3)]"
                    : "text-white/20 border-white/5 bg-white/[0.01] hover:text-white hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="h-[1px] w-4 sm:w-8 bg-[#C9A84C]"></div>
          <p className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-black text-white/40">
            <span className="text-white">{filteredProducts.length}</span> Products
          </p>
        </div>
        {hasActiveFilters && (
          <button onClick={clearAllFilters} className="text-[8px] sm:text-[9px] uppercase tracking-widest font-black text-[#C9A84C] hover:text-white transition-colors underline underline-offset-4 sm:underline-offset-8">
            Reset
          </button>
        )}
      </div>

      {/* Product Display */}
      <div className="relative min-h-[300px] sm:min-h-[500px]">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white/[0.02] rounded-xl sm:rounded-[2rem] aspect-[3/4] border border-white/5"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-32 text-center space-y-4 sm:space-y-8">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white/[0.02] rounded-full flex items-center justify-center text-white/10">
              <PackageSearch size={32} />
            </div>
            <div className="space-y-2 sm:space-y-4">
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-white">No items match your criteria</h3>
              <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 font-black">Refine your search or clear filters to view more.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Signature CTA */}
      <div className="mt-12 sm:mt-32 p-8 sm:p-16 rounded-2xl sm:rounded-[3rem] bg-gradient-to-br from-[#121212] to-black border border-white/5 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#C9A84C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        <div className="relative z-10 space-y-4 sm:space-y-8">
          <h4 className="text-xl sm:text-3xl md:text-5xl font-serif font-black text-white">Cannot find your desired scent?</h4>
          <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white/30 max-w-xl mx-auto font-black leading-loose hidden sm:block">
            We source the world's most exclusive attars and limited edition accessories. Let us curate your private collection.
          </p>
          <Link to="/request" className="inline-flex py-3 px-8 sm:py-5 sm:px-12 bg-white text-black rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-[#C9A84C] transition-all duration-700">
            Request Custom Curation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
