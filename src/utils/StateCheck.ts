import { State } from "../flux/Store";

export function isStateValid(state: State): boolean {
    const garden = state.Plant?.userGarden;
    return Array.isArray(garden) && garden.length > 0 && garden.some(p => p.commonName.trim().length > 0);
}