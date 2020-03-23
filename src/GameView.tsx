import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Game } from "./Game";
import title from "../images/83806c2d045fd0d7b0be73c6357708b9.jpg";
import { MainScreen } from "./MainScreen";

export function GameView({ game }: { game: Game }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    game.onStart.subscribe(() => setStarted(true));
  }, []);

  return (
    <Fragment>
      {started && <MainScreen game={game} />}
      {!started && (
        <div class="main-container">
          <img src={title} class="bigimage" />
          <button class="nes-btn is-primary" onClick={game.start}>
            CLICK HERE TO START THE GAME
          </button>
        </div>
      )}
    </Fragment>
  );
}
