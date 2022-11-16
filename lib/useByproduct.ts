import { byproduct, product } from "@oneii3/4iv/public/api";
import { State, Effect } from "@oneii3/4iv/public/Model/model";
import React from "react";

export function useByproduct<T>(
    produce: (next?: T, last?: T) => T,
    derive: (next?: T, last?: T) => T,
    deps: State<any>[] = []
) {
    let [_, setValue] = React.useState();
    let value = React.useRef(byproduct(produce, derive, deps));
    React.useEffect(() => {
        value.current?.then(setValue as unknown as Effect<T>);
        return () => {
            value.current?.stop(setValue as unknown as Effect<T>);
        };
    }, []);

    return value.current as State<T>;
}
