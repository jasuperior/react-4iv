import { event } from "@oneii3/4iv/public/api";
import { Callback, State } from "@oneii3/4iv/public/Model/model";
import React from "react";

export function useEvent<T>(callback: Callback<T>) {
    let [_, setArgs] = React.useState();
    let [__, setResult] = React.useState();
    let [___, setPayload] = React.useState();
    let eventRef = React.useRef(event(callback));
    React.useEffect(() => {
        let [event, payload] = eventRef.current;
        let [args, result] = payload;
        payload.then(setPayload);
        //might not want to update args and result separately
        //might save rerenders
        args.then(setArgs);
        result.then(setResult);
        return () => {
            payload.stop(setPayload);
            args.stop(setArgs);
            result.stop(setResult);
        };
    }, []);

    return eventRef.current as [Callback<T>, State<any>];
}
