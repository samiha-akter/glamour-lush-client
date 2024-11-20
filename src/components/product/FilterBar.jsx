import { TbFilter } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";

export default function FilterBar({
  setBrand,
  setCategory,
  handleReset,
  uniqueBrand,
  uniqueCategory,
}) {
  return (
    <div className="bg-purple-200 h-full min-h-screen p-4 rounded-t-md">
      <div className="flex items-center gap-1">
        <TbFilter size={24} />
        <h2 className="text-xl font-semibold">Filters</h2>
      </div>
      <div className="mt-8 flex flex-col gap-2 items-center">
        <div className="w-full">
          <select
            className="p-[11px]   border border-purple-400 rounded-md"
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="" selected disabled>
              Brand
            </option>
            {uniqueBrand.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <select
            className="p-[11px]  border border-purple-400 rounded-md"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" selected disabled>
              Category
            </option>
            {uniqueCategory.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        className="btn bg-purple-400 text-white mt-4 w-full flex items-center"
        onClick={handleReset}
      >
        <p>Reset</p>
        <GrPowerReset />
      </button>
    </div>
  );
}
