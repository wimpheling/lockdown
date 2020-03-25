import { h, Component, createRef, render, Fragment } from "preact";
import hands from "../images/dua-hands.svg";
import Konva from "konva";
import { between } from "./helpers/random";
import { Badges } from "./Badges";

export class GameCanvas extends Component<
  {
    maxTime: number;
    numberOfSpots: number;
    level: number;
    onWin: () => void;
    onLose: () => void;
  },
  {
    counter: number;
    time: number;
    status: "playing" | "win" | "lose";
  }
> {
  canvas = createRef();

  width;
  height;
  timeout;
  timeCounter;
  increaseCounter = async () => {
    await this.setState({
      counter: this.state.counter + 1
    });
  };
  decreaseCounter = async (amount = 1) => {
    await this.setState({
      counter: this.state.counter - amount
    });
  };
  constructor(props) {
    super(props);
    this.state = { counter: props.numberOfSpots, time: 0, status: "playing" };
  }
  endTimeouts = () => {
    clearTimeout(this.timeout);
    clearTimeout(this.timeCounter);
  };
  win = () => {
    this.endTimeouts();
    this.setState({ status: "win" });
    setTimeout(() => {
      this.props.onWin();
    }, 2000);
  };
  lose = () => {
    this.endTimeouts();

    this.setState({ status: "lose" });
    setTimeout(() => {
      this.props.onLose();
    }, 2000);
  };
  componentDidMount() {
    this.width = this.canvas.current.offsetWidth;
    this.height = this.canvas.current.offsetHeight;
    console.log(this.height, this.canvas.current.offsetHeight);
    const { width, height } = this;
    const stage = new Konva.Stage({
      container: this.canvas.current,
      width,
      height
    });
    const background = new Konva.Layer();
    const spots = new Konva.Layer();
    let allSpots = [];
    const precision = 80;
    stage.on("touchmove", async e => {
      // @ts-ignore
      const x =
        e.evt.touches[0].clientX -
        this.canvas.current.getBoundingClientRect().x;
      // @ts-ignore
      const y =
        e.evt.touches[0].clientY -
        this.canvas.current.getBoundingClientRect().y;
      const touched = allSpots.filter(
        spot =>
          spot.attrs.x >= x - precision &&
          spot.attrs.x <= x + precision &&
          spot.attrs.y > y - precision &&
          spot.attrs.y <= y + precision
      );
      if (touched.length) {
        await this.decreaseCounter(touched.length);
        touched.map(spot => {
          spot.remove();
          allSpots = allSpots.filter(s => s != spot);
        });
      }

      if (this.state.counter === 0) {
        this.win();
      }
    });
    const addSpot = () => {
      const spot = new Konva.Circle({
        radius: between(15, 20),
        fill: "#8c6e2f",
        stroke: "blue",
        x: between(0, width - 10),
        y: between(0, height - 10),
        opacity: between(10, 80)
      });
      allSpots.push(spot);
      const onHover = async () => {
        console.log("klklkl");
        spot.remove();
        await this.decreaseCounter();
        if (this.state.counter === 0) {
          this.win();
        }
        spots.draw();
      };
      spot.on("mouseover", onHover);
      // spot.on("touchmove", onHover);
      // spot.on("touchenter", onHover);
      //   spot.on("touch", () => {
      //     spot.remove();
      //     this.decreaseCounter();
      //     spots.draw();
      //   });
      spots.add(spot);
    };

    for (let i = 0; i < this.state.counter; i++) {
      addSpot();
    }
    this.timeout = setInterval(async () => {
      addSpot();
      spots.draw();
      await this.increaseCounter();
      if (this.state.counter >= this.props.numberOfSpots + 20) {
        this.lose();
      }
    }, 800 - this.props.level * 75);

    this.timeCounter = setInterval(async () => {
      await this.setState({
        time: this.state.time + 1
      });
      if (this.state.time > this.props.maxTime) {
        this.lose();
      }
    }, 1000);

    stage.add(background);
    stage.add(spots);
    Konva.Image.fromURL(hands, image => {
      console.log(image);
      background.add(image);
      image.setAttrs({
        width,
        height
      });
      background.batchDraw();
    });
  }
  render({ level }, { status, counter, time }) {
    return (
      <div class="wash-container">
        {status === "playing" && (
          <Fragment>
            <div style="background:black;color:white;z-index: 100;width: 100%;">
              Niveau {level} - Germes : {counter}- Temps:{" "}
              {this.props.maxTime - time}
            </div>
            <div
              ref={this.canvas}
              style="background:white;width: 100%;height: 48vh;"
            ></div>
          </Fragment>
        )}
        {status === "win" && (
          <div>
            <h2 class="blinking">You WIN !!!</h2>
            <Badges anguish={-20} boredom={-10} />
          </div>
        )}
        {status === "lose" && (
          <div>
            <h2 class="blinking">You LOSE !!!</h2>
            <Badges anguish={20} boredom={-10} />
          </div>
        )}
      </div>
    );
  }
}
