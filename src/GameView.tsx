import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Game } from "./Game";
import title from "../images/83806c2d045fd0d7b0be73c6357708b9.jpg";
import mp3 from "../images/mpr.png";
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
          <div>
            <button class="nes-btn is-primary" onClick={manager.init}>
              CLICK HERE TO START THE GAME
            </button>
          </div>
          <div style="color:white;padding-top: 5em;">
            Brought to you by{" "}
            <a href="http://www.mespropresrecherches.com">
              <img src={mp3} />
            </a>
          </div>
        </div>
      )}
    </Fragment>
  );
}
