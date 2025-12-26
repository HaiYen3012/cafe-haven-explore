import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getAllCafes } from "@/lib/mock-data";
import { CafeCard } from "@/components/CafeCard";
import { FilterPanel } from "@/components/FilterPanel";
import { SearchBar } from "@/components/SearchBar";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Coffee } from "lucide-react";
import { flexibleMatch } from "@/lib/normalize-text";

const Search = () => {
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";
  
  const [sortBy, setSortBy] = useState("rating");
  const [filters, setFilters] = useState({
    dogFriendly: false,
    catFriendly: false,
    wifi: false,
    powerOutlets: false,
    outdoor: false,
    cheap: false,
    moderate: false,
    expensive: false,
  });

  const handleFilterChange = (key: string, value: boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredAndSortedCafes = () => {
    const allCafes = getAllCafes();
    let results = allCafes.filter((cafe) => {
      // Text search with Vietnamese diacritic support
      if (queryParam) {
        const matchesQuery =
          flexibleMatch(cafe.name, queryParam) ||
          flexibleMatch(cafe.address, queryParam) ||
          cafe.tags.some((tag) => flexibleMatch(tag, queryParam));
        if (!matchesQuery) return false;
      }

      // Type filters
      if (filters.dogFriendly && !cafe.tags.some(t => t.toLowerCase().includes("dog"))) return false;
      if (filters.catFriendly && !cafe.tags.some(t => t.toLowerCase().includes("cat"))) return false;

      // Amenity filters
      if (filters.wifi && !cafe.tags.includes("Wi-Fi")) return false;
      if (filters.powerOutlets && !cafe.tags.includes("Power Outlets")) return false;
      if (filters.outdoor && !cafe.tags.includes("Outdoor")) return false;

      // Price filters (OR logic if any price is selected)
      const priceFilters = [filters.cheap, filters.moderate, filters.expensive];
      const anyPriceSelected = priceFilters.some(f => f);
      if (anyPriceSelected) {
        const matchesPrice =
          (filters.cheap && cafe.price_range === "cheap") ||
          (filters.moderate && cafe.price_range === "moderate") ||
          (filters.expensive && cafe.price_range === "expensive");
        if (!matchesPrice) return false;
      }

      return true;
    });

    // Sorting
    results.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "distance") return (a.distance || 0) - (b.distance || 0);
      if (sortBy === "price-low") {
        const priceOrder = { cheap: 1, moderate: 2, expensive: 3 };
        return priceOrder[a.price_range] - priceOrder[b.price_range];
      }
      return 0;
    });

    return results;
  };

  const results = filteredAndSortedCafes();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Search Bar Section */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <SearchBar defaultValue={queryParam} variant="compact" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block">
            <FilterPanel
              sortBy={sortBy}
              filters={filters}
              onSortChange={setSortBy}
              onFilterChange={handleFilterChange}
              resultCount={results.length}
            />
          </aside>

          {/* Results Grid */}
          <main>
            {queryParam && (
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">
                  Search results for "{queryParam}"
                </h1>
                <p className="text-muted-foreground mt-1">
                  {results.length} café{results.length !== 1 ? "s" : ""} found
                </p>
              </div>
            )}

            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((cafe) => (
                  <CafeCard key={cafe.id} cafe={cafe} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Coffee className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-2">No cafés found</h2>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Link to="/search">
                  <Button variant="outline">Clear all filters</Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Toggle (placeholder for future implementation) */}
      <div className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40">
        <Button className="shadow-hover bg-primary hover:bg-primary/90">
          Filters & Sort ({results.length})
        </Button>
      </div>
    </div>
  );
};

export default Search;
