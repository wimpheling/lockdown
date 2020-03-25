import { h } from "preact";

export const About = ({ exit }: { exit: () => void }) => (
  <div class="main-container" style="color:white; align-items:center;">
    <h1>Confinement simulator by AL BEDO</h1>
    <p>
      Jeu réalisé à l'aide de
      <ul>
        <li>Preact</li>
        <li>RxJS</li>
        <li>Parcel.js</li>
        <li>Typescript</li>
        <li>Less CSS</li>
        <li>Nes.css</li>
        <li>Quelques images honteusement volées sur le net</li>
      </ul>
      <h3>Musiques</h3>
      <ul>
        <li>
          <a href="https://www.youtube.com/watch?v=c0F8gV-GWaI" target="_blank">
            (FREE) COMETHAZINE TYPE BEAT "DODGE"
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=BUoa75y0vmk" target="_blank">
            [FREE] Comethazine / Valee / Sheck Wes | TYPE BEAT | "shoot the
            coup" - [prod.lito]
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=eVrKAHPHUWs" target="_blank">
            (FREE) Freeze Corleone 667 Type Beat 2020 | by Dyform
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=H15r9jws3kU" target="_blank">
            [FREE] SKI MASK THE SLUMP GOD TYPE BEAT "GANG" (prod. ESKRY)
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/watch?v=Hl6ywRljPFo" target="_blank">
            [FREE] Smokepurpp x Comethazine x Lil Pump Type Beat "Get Em Homer
            Two" Prod.By RolandJoeC
          </a>
        </li>
        <li>
          <a
            href="https://notificationsounds.com/featured-sounds/just-saying-593"
            target="_blank"
          >
            https://notificationsounds.com/featured-sounds/just-saying-593
          </a>
        </li>
      </ul>
      Le code source est disponible ici :{" "}
      <a href="https://github.com/wimpheling/lockdown" target="_blank">
        https://github.com/wimpheling/lockdown
      </a>
    </p>
    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
        Freepik
      </a>
      from
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </div>
    <div class="buttons">
      <button class="nes-btn is-primary" onClick={exit}>
        Retour
      </button>
    </div>
  </div>
);
