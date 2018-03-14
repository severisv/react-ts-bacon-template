import React from "react";
import { printDiff } from "utils/debug";

export type UpdateFn<TState> = (fn: (state: TState) => TState) => void;

interface Lifecycles<TOutprops> {
  componentDidMount?: (props: TOutprops) => any;
}

interface OutProps<TProps, TState> {
  state: TState;
  update: (fn: (state: TState) => TState) => void;
  props: TProps;
}

export default function component<TProps, TState>(
  initialState: TState,
  lifecycles: Lifecycles<OutProps<TProps, TState>> = {}
) {
  return (
    Component: ((outprops: OutProps<TProps, TState>) => React.ReactNode)
  ) =>
    class ComponentProvider extends React.Component<TProps, TState> {
      state = initialState;

      getOutProps = () => ({
        props: this.props,
        state: this.state,
        update: this.update
      });

      lifecycle = (fn?: (props: OutProps<TProps, TState>) => any) =>
        fn ? fn(this.getOutProps()) : undefined;

      componentDidMount() {
        this.lifecycle(lifecycles.componentDidMount);
      }

      update = (fn: (state: TState) => TState) => {
        if (process.env.NODE_ENV !== "production") {
          const prevState = this.state;
          this.setState(fn, () => {
            printDiff(prevState, this.state, "Component state");
          });
        } else {
          this.setState(fn);
        }
      };

      render() {
        return Component(this.getOutProps());
      }
    };
}
