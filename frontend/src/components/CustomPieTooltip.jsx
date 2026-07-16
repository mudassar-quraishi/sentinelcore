function CustomPieTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;

  const item = payload[0];

  return (
    <div
      className="
        bg-slate-900
        border border-slate-700
        rounded-xl
        px-5
        py-3
        shadow-2xl
      "
    >
      <p
        className="font-bold text-lg"
        style={{ color: item.payload.fill }}
      >
        {item.name}
      </p>

      <p className="text-slate-300 mt-1">
        Count :
        <span className="text-white font-bold ml-2">
          {item.value}
        </span>
      </p>
    </div>
  );
}

export default CustomPieTooltip;