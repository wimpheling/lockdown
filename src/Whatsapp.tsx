import boomer1 from "../images/memeboomer1.jpg";
import boomer2 from "../images/memeboomer2.jpg";
import boomer3 from "../images/memeboomer3.jpg";
import boomer4 from "../images/memeboomer4.jpg";
import boomer5 from "../images/memeboomer5.jpg";
import { between } from "./helpers/random";

export interface WhatsAppMessage {
  boredom: number;
  meme: string;
}
const messages = [
  { boredom: 5, meme: boomer1 },
  { boredom: 15, meme: boomer2 },
  { boredom: 5, meme: boomer3 },
  { boredom: 10, meme: boomer4 },
  { boredom: 5, meme: boomer5 }
];

export function getWhatsAppMessage() {
  const index = between(0, messages.length);
  return messages[index];
}
