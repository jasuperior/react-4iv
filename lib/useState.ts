import { state } from "@oneii3/4iv/public/api";
import { State } from "@oneii3/4iv/public/Model/model";
import React from "react";

export function useState<T>(init: T) {
    let [_, setValue] = React.useState(init);
    let value = React.useRef<State<T>>(state(init));
    React.useEffect(() => {
        value.current?.(setValue);
        return () => {
            value.current?.stop(setValue);
        };
    }, []);

    return value.current as State<T>;
}
