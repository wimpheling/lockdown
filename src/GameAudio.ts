import { Howl } from "howler";
import track1 from "../music/(FREE)_Freeze_Corleone_667_Type_Beat_2020_by_Dyform.mp3";
import track2 from "../music/(FREE)_Comethazine_Valee_Sheck_Wes_TYPE_BEAT_shoot_the_coup_-_prodlito.mp3";
import track3 from "../music/(FREE)_COMETHAZINE_TYPE_BEAT_DODGE.mp3";
import track4 from "../music/(FREE)_SKI_MASK_THE_SLUMP_GOD_TYPE_BEAT_GANG_(prod._ESKRY).mp3";
import track5 from "../music/(FREE)_Smokepurpp_x_Comethazine_x_Lil_Pump_Type_Beat_Get_Em_Homer_Two_Prod.By_RolandJoeC.mp3";
import fail_boredom from "../music/FAIL_SOUND_EFFECT.mp3";
import fail_anguish from "../music/The_Wilhelm_scream_sound_effect.mp3";
import { Game } from "./Game";
import { Subscription } from "rxjs";
import { GameManager } from "./GameManager";
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}
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

  anguishSubscription: Subscription;
  boredomSubscription: Subscription;

  constructor(manager: GameManager) {
    this.playlist = shuffle([track1, track2, track3, track4, track5]).map(
      (track, index) =>
        new Howl({
          preload: true,
          src: track,
          onend: this.onTrackEnd(index)
        })
    );
    manager.onStart.subscribe(this.subscribe);
  }

  subscribe = (game: Game) => {
    this.play();
    if (this.anguishSubscription) {
      this.anguishSubscription.unsubscribe();
    }
    if (this.boredomSubscription) {
      this.boredomSubscription.unsubscribe();
    }
    this.anguishSubscription = game.onLoseByAnguish(this.loseByAnguish);
    this.boredomSubscription = game.onLoseByBoredom(this.loseByBoredom);
  };

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
    this.currentPlaylist.play();
  }
  stop() {
    if (this.currentPlaylist) {
      this.currentPlaylist.pause();
    }
  }
}
