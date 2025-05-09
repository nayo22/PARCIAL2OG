import { State } from "../flux/Store";

export function isStateValid(state: State): boolean {
    if (state.Plant === null) {
        return false;
    }

    const { name } = state.Plant;
    return name.trim().length > 0;
}