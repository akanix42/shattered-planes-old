import { IGame } from "typings/IGame";
import { Level } from "Level";

declare class LevelGenerator {
    theme: string;
    game: IGame;

    constructor(game:IGame);

generate(options?: any): Level
}

export {LevelGenerator};