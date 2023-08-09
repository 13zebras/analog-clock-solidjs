import type { Accessor, Component } from 'solid-js';
import { createSignal, onCleanup } from 'solid-js';

import { Hand } from './Hand';
import { Lines } from './Lines';
import { createAnimationLoop } from './utils';

const getSecondsSinceMidnight = (): number => (Date.now() - new Date().setHours(0, 0, 0, 0)) / 1000;

type ClockFaceProps = {
  hour: string;
  minute: string;
  second: string;
  subsecond: string;
};

export const ClockFace: Component<ClockFaceProps> = (props) => (
  <svg viewBox="0 0 200 200" width="95vh">
    <g transform="translate(100, 100)">
      {/* static */}
      <circle class="text-neutral-900" r="99" fill="#000" stroke="currentColor" />
      <Lines numberOfLines={60} class="tick-minutes" length={2} width={1} />
      <Lines numberOfLines={12} class="tick-hour" length={5} width={2} />
      {/* dynamic */}

      <Hand rotate={props.hour} class="hour" length={40} width={5} />
      <Hand rotate={props.minute} class="minute" length={70} width={4} />
      <Hand rotate={props.second} class="second" length={80} width={1} />

      <circle class="text-neutral-900" r="1.6" fill="#000" stroke="#000" />
    </g>
  </svg>
);

export const Clock: Component = () => {
  const [time, setTime] = createSignal<number>(getSecondsSinceMidnight());
  const dispose = createAnimationLoop(() => {
    setTime(getSecondsSinceMidnight());
  });
  onCleanup(dispose);

  const rotate = (rotate: number, fixed: number = 1) => `rotate(${(rotate * 360).toFixed(fixed)})`;

  const subsecond = () => rotate(time() % 1);
  const second = () => rotate((time() % 60) / 60);
  const minute = () => rotate(((time() / 60) % 60) / 60);
  const hour = () => rotate(((time() / 60 / 60) % 12) / 12);

  return (
    <div class="clock">
      <ClockFace hour={hour()} minute={minute()} second={second()} subsecond={subsecond()} />
    </div>
  );
};
