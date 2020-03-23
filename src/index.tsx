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
import track1 from "../music/(FREE)_Freeze_Corleone_667_Type_Beat_2020_by_Dyform.mp3";
import track2 from "../music/(FREE)_Comethazine_Valee_Sheck_Wes_TYPE_BEAT_shoot_the_coup_-_prodlito.mp3";
import track3 from "../music/(FREE)_COMETHAZINE_TYPE_BEAT_DODGE.mp3";
import track4 from "../music/(FREE)_SKI_MASK_THE_SLUMP_GOD_TYPE_BEAT_GANG_(prod._ESKRY).mp3";
import track5 from "../music/(FREE)_Smokepurpp_x_Comethazine_x_Lil_Pump_Type_Beat_Get_Em_Homer_Two_Prod.By_RolandJoeC.mp3";

const manager = new GameManager();
// game.boredomValue.subscribe(val => console.log(`aaa ${val}`));
// game.boredom.next(-59);
// game.boredom.next(+1);
(async () => {
  const items = [flex, youlose, macron, title];
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
