import { h, render } from "preact";
import { MainScreen } from "./MainScreen";
import "nes.css/css/nes.min.css";
import "./less/index.less";
import { Game } from "./Game";
import { GameView } from "./GameView";

const game = new Game();
// game.boredomValue.subscribe(val => console.log(`aaa ${val}`));
// game.boredom.next(-59);
// game.boredom.next(+1);

render(<GameView game={game} />, document.getElementById("target"));
