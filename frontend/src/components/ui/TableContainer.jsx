import GlassCard from "./GlassCard";

function TableContainer({ children }) {
  return (
    <GlassCard className="overflow-hidden">
      {children}
    </GlassCard>
  );
}

export default TableContainer;