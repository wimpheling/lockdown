import macron from "../images/macron.jpg";

export interface Tweet {
  image: string;
  name: string;
  text: string;
  anguish: number;
}
const tweets: Tweet[] = [
  {
    image: macron,
    text: "Je viens te chercher",
    name: "President",
    anguish: 10
  },
  {
    image: macron,
    text: "Interdiction de se reproduire. 20932 euros d'amende",
    name: "President",
    anguish: 10
  }
];

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
export class Tweets {
  private alreadyDisplayed = [];
  getRandomTweet() {
    if (this.alreadyDisplayed.length === tweets.length) {
      this.alreadyDisplayed = [];
    }
    let index = between(0, tweets.length);
    while (this.alreadyDisplayed.includes(index)) {
      index = between(0, tweets.length);
    }
    return tweets[index];
  }
}
