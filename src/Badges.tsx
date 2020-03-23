import { h, Fragment as div } from "preact";

export const Badges = ({
  anguish,
  boredom
}: {
  anguish: number;
  boredom: number;
}) => (
  <p>
    <div class="nes-badge is-splited">
      <span class="is-warning">Angoisse</span>
      <span class="is-dark">{anguish}</span>
    </div>
    <div class="nes-badge is-splited">
      <span class="is-success">Ennui</span>
      <span class="is-dark">{boredom}</span>
    </div>
  </p>
);
