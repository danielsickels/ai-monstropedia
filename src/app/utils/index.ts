export const first50Monster: string[] = Array.from({ length: 50 }, (_, i) => `Monster${i + 1}`);

export interface MonsterTypeColors {
  readonly [key: string]: {
    color: string;
    background: string;
  };
}

export const MonsterTypeColors = {
  normal: { color: "#6C6C6C", background: "#A8A77A" },
  fire: { color: "#FFFFFF", background: "#EE8130" },
  water: { color: "#FFFFFF", background: "#6390F0" },
  electric: { color: "#000000", background: "#F7D02C" },
  grass: { color: "#FFFFFF", background: "#7AC74C" },
  ice: { color: "#000000", background: "#96D9D6" },
  fighting: { color: "#FFFFFF", background: "#C22E28" },
  poison: { color: "#FFFFFF", background: "#A33EA1" },
  ground: { color: "#FFFFFF", background: "#E2BF65" },
  flying: { color: "#000000", background: "#A98FF3" },
  psychic: { color: "#FFFFFF", background: "#F95587" },
  bug: { color: "#000000", background: "#A6B91A" },
  rock: { color: "#FFFFFF", background: "#B6A136" },
  ghost: { color: "#FFFFFF", background: "#735797" },
  dragon: { color: "#FFFFFF", background: "#6F35FC" },
  dark: { color: "#FFFFFF", background: "#705746" },
  steel: { color: "#000000", background: "#B7B7CE" },
  fairy: { color: "#000000", background: "#D685AD" }
} as const;

export function getMonstropediaNumber(index: number): number {
  return index + 1;
}

export function getFullMonstropediaNumber(index: number): string {
  return (index + 1).toString().padStart(3, "0");
}
