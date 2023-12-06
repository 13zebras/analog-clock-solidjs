import type { Accessor, Component } from 'solid-js';
import { createSignal, onCleanup } from 'solid-js';

import { Hand } from './Hand';
import { Lines } from './Lines';
import { SecondHand } from './SecondHand';
import { createAnimationLoop } from './utils';

const getSecondsSinceMidnight = (): number => (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

type ClockFaceProps = {
  hour: string;
  minute: string;
  second: string;

};

export const ClockFace: Component<ClockFaceProps> = (props) => (
  <div id="clockface">
    <svg viewBox="0 0 200 200" width="95vh">
      <g transform="translate(100, 100)">
        {/* static */}
        <circle r="99" fill="#000" stroke="currentColor" />
        <Lines numberOfLines={60} class="tick-minutes" length={2} width={1} />
        <Lines numberOfLines={12} class="tick-hour" length={5} width={2} />
        {/* dynamic */}

        <Hand rotate={props.hour} class="hour" length={45} width={4} />
        <Hand rotate={props.minute} class="minute" length={85} width={3} />
        <SecondHand rotate={props.second} class="second" length={6} width={3} />

        <circle r="3.1" fill="#300" stroke="#300" />
      </g>
    </svg>
  </div>
);

export const Dimmer: Component = () => (
  // button to set opacity of clock
  <button class="dimmer-btn"
    onClick={() => {
      const clock = document.querySelector('#clockface');
      if (clock) clock.classList.toggle('dimmed');
    }}
  >
    Dimmer
  </button>
);

export const DimmerBtns: Component = () => (
  // create plus and minus buttons to raise and lower opacity of clock
  <button class="plus-btn"
    onClick={() => {
      const clock = document.querySelector('.clockface');
      if (clock) {
        // if clock opacity is < 0.7, increase by 0.3
        // if clock opacity is > 0.7, increase to 1.0

      }
    }}
  >
    +
  </button>

);

export const Clock: Component = () => {
  const [time, setTime] = createSignal<number>(getSecondsSinceMidnight());
  const dispose = createAnimationLoop(() => {
    setTime(getSecondsSinceMidnight());
  });
  onCleanup(dispose);

  const rotate = (rotate: number, fixed: number = 1) => `rotate(${(rotate * 360).toFixed(fixed)})`;

  // const subsecond = () => rotate(time() % 1);
  const second = () => rotate((time() % 60) / 60);
  const minute = () => rotate(((time() / 60) % 60) / 60);
  const hour = () => rotate(((time() / 60 / 60) % 12) / 12);

  return (
    <div id="clock">
      <ClockFace hour={hour()} minute={minute()} second={second()} />
      <Dimmer />
    </div>
  );
};
