import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Game } from "./Game";
import title from "../images/83806c2d045fd0d7b0be73c6357708b9.jpg";
import { MainScreen } from "./MainScreen";
import { GameManager } from "./GameManager";

export function GameView({ manager }: { manager: GameManager }) {
  const [game, setGame] = useState<Game>(null);

  useEffect(() => {
    manager.onStart.subscribe(setGame);
  }, []);

  return (
    <Fragment>
      {game && <MainScreen game={game} key={game.uid} manager={manager} />}
      {!game && (
        <div class="main-container">
          <img src={title} class="bigimage" />
          <button class="nes-btn is-primary" onClick={manager.init}>
            CLICK HERE TO START THE GAME
          </button>
        </div>
      )}
    </Fragment>
  );
}
