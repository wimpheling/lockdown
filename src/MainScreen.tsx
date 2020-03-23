import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { debounce, map } from "rxjs/operators";
import { Game } from "./Game";
import { Tweet } from "./Twitter";
import flex from "../images/flex.gif";
import youlose from "../images/to-lose-a-game-png-s2e16-you-lose-png-1920.png";
import { GameManager } from "./GameManager";
import { WhatsAppMessage } from "./Whatsapp";
import { Badges } from "./Badges";

export type GameScreen =
  | {
      type: "tweet";
      tweet: Tweet;
    }
  | { type: "lose"; from: "boredom" | "anguish" }
  | { type: "menu" }
  | { type: "whatsapp"; message: WhatsAppMessage }
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
    game.onScreenChange.subscribe(screen => {
      if (screen.type === "lose") {
        if (screen.from === "anguish") {
          setAnguish(100);
        } else setBoredom(100);
      }
    });
  }, []);

  return (
    <div>
      <h1>Simulateur de C0NFIN3M3NT UwU</h1>
      <div class="container">
        <aside>
          <section class="nes-container with-title">
            <h3>Ennui</h3>
            <progress
              class="nes-progress is-success"
              value={boredom}
              max="100"
            ></progress>
          </section>
          <section class="nes-container with-title">
            <h3>Angoisse</h3>
            <progress
              class="nes-progress is-warning"
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
            <div class="menu">
              <button class="nes-btn is-primary" onClick={game.getTweet}>
                Aller sur twitter
              </button>
              <button class="nes-btn is-primary" onClick={game.doSport}>
                Faire du sport
              </button>
            </div>
          )}
          {screen.type === "tweet" && (
            <div class="nes-container with-title is-centered">
              <h3>Twitter</h3>
              <div class="tweet">
                <img src={screen.tweet.image} />
                <div class="content">
                  <p class="name">{screen.tweet.name}</p>
                  <p class="blinking">{screen.tweet.text}</p>
                  <Badges anguish={screen.tweet.anguish} boredom={-10} />
                </div>
              </div>
            </div>
          )}
          {screen.type === "whatsapp" && (
            <div class="nes-container with-title is-centered">
              <h3>GROUPE WHATSAPP FAMILIAL</h3>
              <p class="blinking">Notification ! Message de tonton </p>
              <img class="bigimage" src={screen.message.meme} />
              <Badges anguish={0} boredom={screen.message.boredom} />
            </div>
          )}
          {screen.type === "sport" && (
            <div class="nes-container with-title is-centered">
              <h3>SPORTIF</h3>
              <img class="bigimage" src={flex} />
              <p class="blinking">TROP DUR LE SPORT MDR</p>
              <Badges anguish={-20} boredom={15} />
            </div>
          )}
          {screen.type === "lose" && (
            <div class="nes-container is-dark with-title is-centered">
              <h3>YOU LOSE</h3>
              {screen.from === "boredom" && (
                <div>
                  <p class="blinking-white">VOUS ETES MORT D'ENNUI</p>
                  <p>
                    Vous sortez de chez vous en hurlant en slip. 2700 euros
                    d'amende
                  </p>
                </div>
              )}
              {screen.from === "anguish" && (
                <div>
                  <p class="blinking-white">VOUS ETES MORT D'ANGOISSE</p>
                  <p>
                    Vous vous grattez jusqu'à saigner et contracter le virus
                  </p>
                </div>
              )}
              <h2>Score : {hours} heures en confinement</h2>
              <button class="nes-btn is-primary" onClick={manager.newGame}>
                CLICK HERE TO RESTART THE GAME
              </button>
              <img class="bigimage" src={youlose} />
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
