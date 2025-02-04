export const first50Monster: string[] = [
  "Monster1", "Monster2", "Monster3", "Monster4", "Monster5",
  "Monster6", "Monster7", "Monster8", "Monster9", "Monster10",
  "Monster11", "Monster12", "Monster13", "Monster14", "Monster15",
  "Monster16", "Monster17", "Monster18", "Monster19", "Monster20",
  "Monster21", "Monster22", "Monster23", "Monster24", "Monster25",
  "Monster26", "Monster27", "Monster28", "Monster29", "Monster30",
  "Monster31", "Monster32", "Monster33", "Monster34", "Monster35",
  "Monster36", "Monster37", "Monster38", "Monster39", "Monster40",
  "Monster41", "Monster42", "Monster43", "Monster44", "Monster45",
  "Monster46", "Monster47", "Monster48", "Monster49", "Monster50"
];

  export interface MonsterTypeColors {
    [key: string]: {
      color: string;
      background: string;
    };
  }
  
  export const MonsterTypeColors: MonsterTypeColors = {
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
  };
  
  export function getMonstropediaNumber(index: number): number {
    return index + 1;
  }
  
  export function getFullMonstropediaNumber(index: number): string {
    return `${index + 1 > 99 ? index + 1 : index + 1 > 9 ? `0${index + 1}` : `00${index + 1}`}`;
  }
  