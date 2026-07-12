type BrandProps = {
  light?: boolean;
  centered?: boolean;
};

export default function Brand({
  light = false,
  centered = false,
}: BrandProps) {
  return (
    <div
      className={`flex items-center gap-3 ${
        centered ? "justify-center" : ""
      }`}
    >
      {/* Replace this element with your real logo later */}
      <div className="grid size-11 place-items-center rounded-2xl bg-linear-to-br from-emerald-400 via-cyan-500 to-blue-700 text-xl font-black text-white shadow-lg shadow-cyan-950/20">
        B
      </div>

      <span
        className={`text-xl font-bold tracking-tight ${
          light ? "text-white" : "text-slate-950"
        }`}
      >
        BizMarketplace
      </span>
    </div>
  );
}