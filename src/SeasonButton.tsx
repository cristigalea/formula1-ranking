export default function SeasonButton({
  isActive = false,
  children,
  onClick,
}: {
  isActive?: boolean;
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg bg-slate-100 px-5 py-2 border-2  ${
        isActive ? "border-rose-500" : "border-slate-100"
      } hover:border-2 hover:border-rose-500 hover:drop-shadow-glow`}
    >
      {children}
    </button>
  );
}
