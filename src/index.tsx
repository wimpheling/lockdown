import { h, render } from "preact";
import { MainScreen } from "./MainScreen";
import "nes.css/css/nes.min.css";
import "./less/index.less";
import { Game } from "./Game";
import { GameView } from "./GameView";
import { GameManager } from "./GameManager";

import flex from "../images/flex.gif";
import youlose from "../images/to-lose-a-game-png-s2e16-you-lose-png-1920.png";
import title from "../images/83806c2d045fd0d7b0be73c6357708b9.jpg";
import macron from "../images/macron.jpg";
import newspaper from "../images/newspaper.jpg";
import ufo from "../images/ufo.jpg";

const manager = new GameManager();

//Preloader
(async () => {
  const items = [flex, youlose, macron, title, newspaper, ufo];
  await Promise.all(
    items.map(
      image =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = image;
          img.onload = resolve;
        })
    )
  );
  render(<GameView manager={manager} />, document.getElementById("target"));
})();
