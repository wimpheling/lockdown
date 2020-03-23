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
import { getWhatsAppMessage } from "./Whatsapp";
const add = (acc, value) => acc + value;

export class Game {
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

  uid = Math.random().toString();
  tweets = new Tweets();
  //emit value in sequence every 1 second
  source: Observable<number> = interval(1000);

  subscribe: Subscription = this.source.subscribe(val => {
    this.boredom.next(1);
    this.anguish.next(0.5);
    this.addHoursElapsed.next(1);
  });

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

  private screenSubject = new Subject<GameScreen>();
  onScreenChange = this.screenSubject.asObservable();

  currentTimeout: number;
  goBackToMain = () => {
    if (Math.random() < 0.05) {
      return () => {
        this.currentTimeout = setTimeout(
          () => this.screenSubject.next({ type: "menu" }),
          4000
        );
        const message = getWhatsAppMessage();
        this.screenSubject.next({
          type: "whatsapp",
          message
        });
        this.boredom.next(message.boredom);
      };
    } else {
      return () => this.screenSubject.next({ type: "menu" });
    }
  };
  getTweet = () => {
    const tweet = this.tweets.getRandomTweet();
    this.screenSubject.next({ type: "tweet", tweet });
    this.currentTimeout = setTimeout(this.goBackToMain(), 4000);

    this.boredom.next(-10);
    this.anguish.next(tweet.anguish);
  };

  doSport = () => {
    this.screenSubject.next({ type: "sport" });
    this.currentTimeout = setTimeout(this.goBackToMain(), 4000);
    this.boredom.next(15);
    this.anguish.next(-20);
  };

  private end = () => {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
    this.subscribe.unsubscribe();
  };
}
