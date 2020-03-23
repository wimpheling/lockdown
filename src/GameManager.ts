import { GameAudio } from "./GameAudio";
import { Subject } from "rxjs";
import { Game } from "./Game";

export class GameManager {
  private audio: GameAudio;
  private currentGame: Game;
  private startSubject = new Subject<Game>();
  onStart = this.startSubject.asObservable();

  init = () => {
    this.audio = new GameAudio(this);
    this.newGame();
  };

  newGame = () => {
    this.startSubject.next(new Game());
  };
}
