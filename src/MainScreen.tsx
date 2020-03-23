import { h, Fragment } from "preact";
import { useState, useEffect } from "preact/hooks";
import { debounce, map } from "rxjs/operators";
import { Game } from "./Game";
import { Tweet } from "./Twitter";
import flex from "../images/flex.gif";
import youlose from "../images/to-lose-a-game-png-s2e16-you-lose-png-1920.png";

export type GameScreen =
  | {
      type: "tweet";
      tweet: Tweet;
    }
  | { type: "lose"; from: "boredom" | "anguish" }
  | { type: "menu" }
  | { type: "sport" };

export function MainScreen({ game }: { game: Game }) {
  const [boredom, setBoredom] = useState(1);
  const [anguish, setAnguish] = useState(0);
  const [screen, setScreen] = useState<GameScreen>({ type: "menu" });

  useEffect(() => {
    game.boredomValue.subscribe(setBoredom);
    game.anguishValue.subscribe(setAnguish);
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
                  <p class="blinking">VOUS ETES MORT D'ENNUI</p>
                </Fragment>
              )}
              {screen.from === "anguish" && (
                <Fragment>
                  <img class="bigimage" src={youlose} />
                  <p class="blinking">VOUS ETES MORT D'ANGOISSE</p>
                </Fragment>
              )}
              <button class="nes-btn is-primary" onClick={game.start}>
                CLICK HERE TO RESTART THE GAME
              </button>
            </div>
          )}
        </article>
      </div>
    </Fragment>
  );
}
