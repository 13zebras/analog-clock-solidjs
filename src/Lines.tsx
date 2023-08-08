import { Component, For, splitProps } from 'solid-js';

import { Hand } from './Hand';

type LinesProps = {
  numberOfLines: number;
  class: string;
  length: number;
  width: number;
};

const rotate = (index: number, length: number) => `rotate(${(360 * index) / length})`;

export const Lines: Component<LinesProps> = (props) => {
  const [local, rest] = splitProps(props, ['numberOfLines']);

  return (
    <For each={new Array(local.numberOfLines)}>
      {(_, index) => <Hand rotate={rotate(index(), local.numberOfLines)} {...rest} fixed={true} />}
    </For>
  );
};
