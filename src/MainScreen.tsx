import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { debounce, map } from "rxjs/operators";
import { Game } from "./Game";
import { Tweet } from "./Twitter";
import flex from "../images/flex.gif";
import youlose from "../images/to-lose-a-game-png-s2e16-you-lose-png-1920.png";
import { GameManager } from "./GameManager";

export type GameScreen =
  | {
      type: "tweet";
      tweet: Tweet;
    }
  | { type: "lose"; from: "boredom" | "anguish" }
  | { type: "menu" }
  | { type: "sport" };

export function MainScreen({
  game,
  manager
}: {
  game: Game;
  manager: GameManager;
}) {
  const [boredom, setBoredom] = useState(1);
  const [anguish, setAnguish] = useState(0);
  const [hours, setHours] = useState(0);
  const [screen, setScreen] = useState<GameScreen>({ type: "menu" });

  useEffect(() => {
    game.boredomValue.subscribe(setBoredom);
    game.anguishValue.subscribe(setAnguish);
    game.hoursElapsed.subscribe(setHours);
    game.onScreenChange.subscribe(setScreen);
    game.onScreenChange.subscribe(console.log);
  }, []);

  return (
    <Fragment>
      <h1>Simulateur de C0NFIN3M3NT UwU</h1>
      <div class="container">
        <aside>
          <section class="nes-container with-title">
            <h3>Ennui</h3>
            <progress
              class="nes-progress is-primary"
              value={boredom}
              max="100"
            ></progress>
          </section>
          <section class="nes-container with-title">
            <h3>Angoisse</h3>
            <progress
              class="nes-progress is-primary"
              value={anguish}
              max="100"
            ></progress>
          </section>
          <section class="nes-container with-title">
            <h3>Temps écoulé</h3>
            {hours} Heures
          </section>
        </aside>
        <article>
          {screen.type === "menu" && (
            <Fragment>
              <button class="nes-btn is-primary" onClick={game.getTweet}>
                Aller sur twitter
              </button>
              <button class="nes-btn is-primary" onClick={game.doSport}>
                Faire du sport
              </button>
            </Fragment>
          )}
          {screen.type === "tweet" && (
            <div class="nes-container with-title is-centered">
              <h3>Twitter</h3>
              <img src={screen.tweet.image} />
              <p class="blinking">{screen.tweet.text}</p>
            </div>
          )}
          {screen.type === "sport" && (
            <div class="nes-container with-title is-centered">
              <h3>SPORTIF</h3>
              <img class="bigimage" src={flex} />
              <p class="blinking">TROP DUR LE SPORT MDR</p>
            </div>
          )}
          {screen.type === "lose" && (
            <div class="nes-container is-dark with-title is-centered">
              <h3>YOU LOSE</h3>
              {screen.from === "boredom" && (
                <Fragment>
                  <img class="bigimage" src={youlose} />
                  <p class="blinking-white">VOUS ETES MORT D'ENNUI</p>
                  <p>
                    Vous sortez de chez vous en hurlant en slip. 2700 euros
                    d'amende
                  </p>
                </Fragment>
              )}
              {screen.from === "anguish" && (
                <Fragment>
                  <img class="bigimage" src={youlose} />
                  <p class="blinking-white">VOUS ETES MORT D'ANGOISSE</p>
                  <p>
                    Vous vous grattez jusqu'à saigner et contracter le virus
                  </p>
                </Fragment>
              )}
              <h2>Score : {hours} heures en confinement</h2>
              <button class="nes-btn is-primary" onClick={manager.newGame}>
                CLICK HERE TO RESTART THE GAME
              </button>
            </div>
          )}
        </article>
      </div>
    </Fragment>
  );
}
