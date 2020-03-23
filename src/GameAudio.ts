import { Howl } from "howler";
import track1 from "../music/(FREE) Freeze Corleone 667 Type Beat 2020 by Dyform.mp3";
import track2 from "../music/[FREE] Comethazine Valee Sheck Wes TYPE BEAT shoot the coup - [prod.lito].mp3";
import track3 from "../music/(FREE) COMETHAZINE TYPE BEAT DODGE.mp3";
import track4 from "../music/[FREE] SKI MASK THE SLUMP GOD TYPE BEAT GANG (prod. ESKRY).mp3";
import track5 from "../music/[FREE] Smokepurpp x Comethazine x Lil Pump Type Beat Get Em Homer Two Prod.By RolandJoeC.mp3";
import fail_boredom from "../music/FAIL SOUND EFFECT.mp3";
import fail_anguish from "../music/The Wilhelm scream sound effect.mp3";
import { Game } from "./Game";

export class GameAudio {
  private playlist;
  private anguishTrack = new Howl({
    preload: true,
    src: fail_anguish
  });

  private boredomTrack = new Howl({
    preload: true,
    src: fail_boredom
  });

  private currentPlaylist: Howl;

  private onTrackEnd = (index: number) => () => {
    const nextId = this.nextInPlaylist(index);
    this.currentPlaylist = this.playlist[nextId];
    this.currentPlaylist.play();
  };
  private nextInPlaylist = (index: number) => {
    if (index >= this.playlist.length - 2) {
      return 0;
    } else {
      return index + 1;
    }
  };

  constructor(game: Game) {
    game.onLoseByAnguish(this.loseByAnguish);
    game.onLoseByBoredom(this.loseByBoredom);
    this.playlist = [track1, track2, track3, track4, track5].map(
      (track, index) =>
        new Howl({
          preload: true,
          src: track,
          onend: this.onTrackEnd(index)
        })
    );
  }
  private loseByAnguish = () => {
    if (this.currentPlaylist) {
      this.currentPlaylist.pause();
    }
    this.anguishTrack.play();
  };

  private loseByBoredom = () => {
    if (this.currentPlaylist) {
      this.currentPlaylist.pause();
    }
    this.boredomTrack.play();
  };

  play() {
    if (!this.currentPlaylist) {
      this.currentPlaylist = this.playlist[0];
    }
    if (!this.currentPlaylist.playing) this.currentPlaylist.play();
  }
  stop() {
    if (this.currentPlaylist) {
      this.currentPlaylist.pause();
    }
  }
}
