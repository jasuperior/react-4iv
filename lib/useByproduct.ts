import { byproduct, product } from "@oneii3/4iv/public/api";
import { State } from "@oneii3/4iv/public/Model/model";
import React from "react";

export function useByproduct<T>(
    produce: (next?: T, last?: T) => T,
    derive: (next?: T, last?: T) => T,
    deps: State<any>[] = []
) {
    let [_, setValue] = React.useState();
    let value = React.useRef<State<T>>(byproduct(produce, derive, deps));
    React.useEffect(() => {
        value.current(setValue);
        return () => {
            value.current?.stop(setValue);
        };
    }, []);

    return value.current as State<T>;
}
