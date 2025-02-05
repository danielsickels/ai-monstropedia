import { useEffect, useState } from "react";
import { getFullMonstropediaNumber } from "../utils/index";
import TypeCard from "./TypeCard";
import Modal from "./Modal";
import Image from "next/image";

interface MonsCardProps {
  selectedMonster: number;
  disableFetch?: boolean;
}

export default function MonsCard({ selectedMonster, disableFetch = false }: MonsCardProps) {
  const [data, setData] = useState<Record<string, any> | null>(null);
  const [skill, setSkill] = useState<{ name: string; description: string } | null>(null);

  useEffect(() => {
    if (disableFetch) {
      setData({
        name: "Monster1",
        types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
        sprites: { front_default: "/placeholder.png" },
        stats: [
          { stat: { name: "hp" }, base_stat: 45 },
          { stat: { name: "attack" }, base_stat: 49 },
          { stat: { name: "defense" }, base_stat: 49 },
        ],
        moves: [
          { move: { name: "tackle", url: "" } },
          { move: { name: "vine whip", url: "" } },
        ],
      });
    }
  }, [disableFetch]);

  if (!data) return <h4>Loading...</h4>;

  return (
    <div className="Mons-card">
      {skill && (
        <Modal handleCloseModal={() => setSkill(null)}>
          <h6>Name</h6>
          <h2 className="skill-name">{skill.name.replaceAll("-", " ")}</h2>
          <h6>Description</h6>
          <p>{skill.description}</p>
        </Modal>
      )}
      <h4>#{getFullMonstropediaNumber(selectedMonster)}</h4>
      <h2>{data.name}</h2>
      <div className="type-container">
        {data.types.map((typeObj: { type: { name: string } }, typeIndex: number) => (
          <TypeCard key={typeIndex} type={typeObj.type.name} />
        ))}
      </div>
      <Image className="default-img" src={data.sprites.front_default} alt={`${data.name}-img`} width={240} height={240} />
      <h3>Stats</h3>
      <div className="stats-card">
        {data.stats.map((statObj: { stat: { name: string }; base_stat: number }, statIndex: number) => (
          <div key={statIndex} className="stat-item">
            <p>{statObj.stat.name.replaceAll("-", " ")}</p>
            <h4>{statObj.base_stat}</h4>
          </div>
        ))}
      </div>
      <h3>Moves</h3>
      <div className="Monster-move-grid">
        {data.moves.map((moveObj: { move: { name: string } }, moveIndex: number) => (
          <button
            key={moveIndex}
            className="button-card Monster-move"
            onClick={() => setSkill({ name: moveObj.move.name, description: "No description available" })}
          >
            <p>{moveObj.move.name.replaceAll("-", " ")}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
