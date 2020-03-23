import {
  Observable,
  BehaviorSubject,
  pipe,
  Subject,
  Subscription
} from "rxjs/";

import { interval } from "rxjs";
import { scan, takeWhile, timeout } from "rxjs/operators";
import { Tweets, Tweet } from "./Twitter";
import { GameScreen } from "./MainScreen";
import { GameAudio } from "./GameAudio";
const add = (acc, value) => acc + value;

export class Game {
  tweets = new Tweets();
  audio: GameAudio;
  //emit value in sequence every 1 second
  source: Observable<number> = interval(400);

  subscribe: Subscription;

  private boredom: BehaviorSubject<number> = new BehaviorSubject<number>(50);
  //   boredom$ = this.boredom.asObservable();
  boredomValue = this.boredom.pipe(
    scan(add, 0),
    takeWhile(v => v <= 100)
  );

  private anguish = new BehaviorSubject<number>(50);
  //   anguish$ = this.anguish.asObservable();
  anguishValue = this.anguish.pipe(
    scan(add, 0),
    takeWhile(v => v <= 100)
  );

  private addHoursElapsed = new BehaviorSubject<number>(0);
  hoursElapsed = this.addHoursElapsed.pipe(scan(add));

  onLoseByAnguish = (callback: () => void) =>
    this.anguishValue.subscribe({ complete: callback });
  onLoseByBoredom = (callback: () => void) =>
    this.boredomValue.subscribe({ complete: callback });

  constructor() {
    this.boredomValue.subscribe({
      complete: () => {
        this.screenSubject.next({ type: "lose", from: "boredom" });
        this.end();
      }
    });
    this.anguishValue.subscribe({
      complete: () => {
        this.screenSubject.next({ type: "lose", from: "anguish" });
        this.end();
      }
    });
  }

  private screenSubject = new Subject<GameScreen>();
  onScreenChange = this.screenSubject.asObservable();

  alreadyDisplayedTweets = [];
  currentTimeout: number;

  getTweet = () => {
    const tweet = this.tweets.getRandomTweet();
    this.boredom.next(-10);
    this.anguish.next(tweet.anguish);
    this.screenSubject.next({ type: "tweet", tweet });
    this.currentTimeout = setTimeout(
      () => this.screenSubject.next({ type: "menu" }),
      3000
    );
  };

  doSport = () => {
    this.screenSubject.next({ type: "sport" });
    this.boredom.next(15);
    this.anguish.next(-20);
    this.currentTimeout = setTimeout(
      () => this.screenSubject.next({ type: "menu" }),
      3000
    );
  };

  started = false;
  private startSubject = new Subject<void>();
  onStart = this.startSubject.asObservable();
  start = () => {
    if (!this.audio) {
      this.audio = new GameAudio(this);
    }
    if (!this.started) {
      this.started = true;
      this.startSubject.next();
      this.subscribe = this.source.subscribe(val => {
        this.boredom.next(4);
        this.anguish.next(0.5);
        this.addHoursElapsed.next(1);
      });
      this.audio.play();
    }
  };

  private end() {
    this.started = false;
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    this.subscribe.unsubscribe();
  }
}
