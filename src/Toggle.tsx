export default function Toggle({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: React.MouseEventHandler;
}) {
  return (
    <span
      onClick={onClick}
      className={`border rounded-full border-rose-500 flex items-center cursor-pointer w-10 ${
        isActive ? "bg-rose-300 justify-end" : "justify-start"
      } `}
    >
      <span className="rounded-full border w-3 h-3 m-0.5 border-grey bg-rose-500"></span>
    </span>
  );
}
