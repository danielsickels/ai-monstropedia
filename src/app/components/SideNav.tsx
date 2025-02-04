import { first50Monster, getFullMonstropediaNumber } from "../utils/index";
import { useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";

interface SideNavProps {
  selectedMonster: number;
  setSelectedMonster: (index: number) => void;
  handleCloseMenu: () => void;
  showSideMenu: boolean;
}

export default function SideNav({
  selectedMonster,
  setSelectedMonster,
  handleCloseMenu,
  showSideMenu,
}: SideNavProps) {
  const [searchValue, setSearchValue] = useState("");

  const filteredMonster = first50Monster.filter((ele: string, eleIndex: any) => {
    return (
      getFullMonstropediaNumber(eleIndex).includes(searchValue) ||
      ele.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <nav className={classNames({ open: !showSideMenu })}>
      <div className={classNames("header", { open: !showSideMenu })}>
        <button onClick={handleCloseMenu} className="open-nav-button">
          <FontAwesomeIcon icon={faArrowLeftLong} />
        </button>
        <h1 className="text-gradient">Monstropedia</h1>
      </div>

      <input
        placeholder="E.g. 001 or Monster1..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="p-2 border rounded w-full text-black"
      />

      {filteredMonster.map((Monster: string, MonsterIndex: number) => {
        const trueMonstropediaNumber = first50Monster.indexOf(Monster);

        return (
          <button
            key={MonsterIndex}
            onClick={() => {
              setSelectedMonster(trueMonstropediaNumber);
              handleCloseMenu();
            }}
            className={classNames("nav-card", {
              "nav-card-selected": MonsterIndex === selectedMonster,
            })}
          >
            <p>{getFullMonstropediaNumber(trueMonstropediaNumber)}</p>
            <p>{Monster}</p>
          </button>
        );
      })}
    </nav>
  );
}
