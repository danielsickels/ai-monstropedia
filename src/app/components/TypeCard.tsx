import { MonsterTypeColors } from "../utils/index";

interface TypeCardProps {
  type: string;
}

export default function TypeCard({ type }: TypeCardProps) {
  return (
    <div
      className="type-tile"
      style={{
        color: MonsterTypeColors?.[type]?.color || "#000",
        background: MonsterTypeColors?.[type]?.background || "#fff",
      }}
    >
      <p>{type}</p>
    </div>
  );
}
