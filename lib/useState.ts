import { state } from "@oneii3/4iv";
import { State } from "@oneii3/4iv/public/Model/model";
import React from "react";

export function useState<T>(init: T) {
    let [_, setValue] = React.useState(init);
    let value = React.useRef<State<T>>(state(init));
    React.useEffect(() => {
        value.current?.then(setValue);
        return () => {
            value.current?.stop(setValue);
        };
    }, []);

    return value.current as State<T>;
}
