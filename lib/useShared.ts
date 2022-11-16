import { State } from "@oneii3/4iv/public/Model/model";
import React from "react";

export function useShared<T>(init: State<T>) {
    let [_, setValue] = React.useState(init.value);
    let value = React.useRef<State<T>>(init);

    React.useEffect(() => {
        value.current(() => setValue(value.current.valueOf()));
        return () => {
            value.current?.stop(setValue);
        };
    }, []);

    return value.current as State<T>;
}
