import { effect } from "@oneii3/4iv/public/api";
import { Effect, State } from "@oneii3/4iv/public/Model/model";
import React from "react";

export const useEffect = (e: Effect, deps: State<any>[]) => {
    React.useEffect(() => {
        effect(e, deps);

        return () => {
            deps.forEach((dep) => dep.stop(e));
        };
    }, []);
};
