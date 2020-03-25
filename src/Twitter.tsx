import macron from "../images/macron.jpg";
import newspaper from "../images/newspaper.jpg";
import ufo from "../images/ufo.jpg";
import doctor from "../images/docteur.jpg";
import { between } from "./helpers/random";

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
    name: "Président",
    anguish: 15
  },
  {
    image: macron,
    text: "Interdiction de se reproduire. 20932 euros d'amende",
    name: "Président",
    anguish: 10
  },
  {
    image: newspaper,
    text: "La maladie est toujours plus grave",
    name: "Le girafo",
    anguish: 8
  },
  {
    image: newspaper,
    text: "Une guerre se prépare",
    name: "Le girafo",
    anguish: 5
  },
  {
    image: newspaper,
    text: "Bientôt une guerre mondiale",
    name: "Le girafo",
    anguish: 5
  },
  {
    image: newspaper,
    text: "L'abonnement netflix augmente à 100 euros par mois",
    name: "Le girafo",
    anguish: 15
  },
  {
    image: newspaper,
    text: "Bolsonaro vainc le coronavirus à mains nues",
    name: "Le girafo",
    anguish: 7
  },
  {
    image: ufo,
    text: "Le virus serait une création des atlantes",
    name: "Conspinews",
    anguish: 15
  },
  {
    image: ufo,
    text: "Le virus est devenu intelligent et passe un doctorat de philo",
    name: "Conspinews",
    anguish: 5
  },
  {
    image: ufo,
    text: "Le virus se retire suite à des tweets raciste et homophobes",
    name: "Conspinews",
    anguish: -10
  },
  {
    image: ufo,
    text: "le coronavirus attaque le cerveau des porteurs sains",
    name: "Conspinews",
    anguish: 10
  },
  {
    image: ufo,
    text: "la masturbation provoque le coronavirus",
    name: "Conspinews",
    anguish: 6
  },
  {
    image: doctor,
    text: "Le gel hydroalcoolique homéopathique: remède miracle ?",
    name: "Dr. Miaoult",
    anguish: 12
  },
  {
    image: doctor,
    text: "EXCLU Médicale : le niqab protège du virus",
    name: "Dr. Miaoult",
    anguish: 5
  },
  {
    image: doctor,
    text: "EXCLU : Aucun remède possible pour le virus",
    name: "Dr. Miaoult",
    anguish: 20
  }
];

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
