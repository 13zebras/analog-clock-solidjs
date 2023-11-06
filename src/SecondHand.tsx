import { Component, splitProps } from 'solid-js';

type SecondHandProps = { rotate: string; class: string; length: number; width: number; fixed?: boolean };

export const SecondHand: Component<SecondHandProps> = (props) => {
  const [local, rest] = splitProps(props, ['rotate', 'length', 'width', 'fixed']);
  return (
    <line
      y1={local.length - 100}
      // y1={local.fixed ? local.length - 95 : -95}
      y2={-(100 - local.length)}
      stroke="currentColor"
      stroke-width={local.width}
      stroke-linecap="round"
      transform={local.rotate}
      {...rest}
    />
  );
};
