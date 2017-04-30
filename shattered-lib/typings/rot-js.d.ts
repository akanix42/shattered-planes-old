/** Declaration file generated by dts-gen */

export class Display {
  constructor(options: any);

  DEBUG(x: any, y: any, what: any): void;

  clear(): void;

  computeFontSize(availWidth: any, availHeight: any): any;

  computeSize(availWidth: any, availHeight: any): any;

  draw(x: any, y: any, ch: any, fg: any, bg: any, ov: any): void;

  drawText(x: any, y: any, text: any, maxWidth: any): any;

  eventToPosition(e: any): any;

  getContainer(): any;

  getOptions(): any;

  setOptions(options: any): any;

}

export class Engine {
  constructor(scheduler: any);

  lock(): any;

  start(): any;

  unlock(): any;

}

export class EventQueue {
  constructor();

  add(event: any, time: any): void;

  clear(): any;

  get(): any;

  getEventTime(event: any): any;

  getTime(): any;

  remove(event: any): any;

}

export class FOV {
  constructor(lightPassesCallback: any, options: any);

  compute(x: any, y: any, R: any, callback: any): void;

}

export class Lighting {
  constructor(reflectivityCallback: any, options: any);

  clearLights(): void;

  compute(lightingCallback: any): any;

  reset(): any;

  setFOV(fov: any): any;

  setLight(x: any, y: any, color: any): any;

  setOptions(options: any): any;

}

export class Map {
  constructor(width: any, height: any);

  create(callback: any): void;

}

export class Noise {
  constructor();

  get(x: any, y: any): void;

}

export class Path {
  constructor(toX: any, toY: any, passableCallback: any, options: any);

  compute(fromX: any, fromY: any, callback: any): void;

}

export class Scheduler {
  constructor();

  add(item: any, repeat: any): any;

  clear(): any;

  getTime(): any;

  getTimeOf(item: any): any;

  next(): any;

  remove(item: any): any;

}

export class StringGenerator {
  constructor(options: any);

  clear(): void;

  generate(): any;

  getStats(): any;

  observe(string: any): void;

}

export const DEFAULT_HEIGHT: number;

export const DEFAULT_WIDTH: number;

export const DIRS: {
  "4": (number[])[];
  "6": (number[])[];
  "8": (number[])[];
};

export const VK_0: number;

export const VK_1: number;

export const VK_2: number;

export const VK_3: number;

export const VK_4: number;

export const VK_5: number;

export const VK_6: number;

export const VK_7: number;

export const VK_8: number;

export const VK_9: number;

export const VK_A: number;

export const VK_ACCEPT: number;

export const VK_ADD: number;

export const VK_ALT: number;

export const VK_ALTGR: number;

export const VK_AMPERSAND: number;

export const VK_ASTERISK: number;

export const VK_AT: number;

export const VK_B: number;

export const VK_BACK_QUOTE: number;

export const VK_BACK_SLASH: number;

export const VK_BACK_SPACE: number;

export const VK_C: number;

export const VK_CANCEL: number;

export const VK_CAPS_LOCK: number;

export const VK_CIRCUMFLEX: number;

export const VK_CLEAR: number;

export const VK_CLOSE_BRACKET: number;

export const VK_CLOSE_CURLY_BRACKET: number;

export const VK_CLOSE_PAREN: number;

export const VK_COLON: number;

export const VK_COMMA: number;

export const VK_CONTEXT_MENU: number;

export const VK_CONTROL: number;

export const VK_CONVERT: number;

export const VK_D: number;

export const VK_DECIMAL: number;

export const VK_DELETE: number;

export const VK_DIVIDE: number;

export const VK_DOLLAR: number;

export const VK_DOUBLE_QUOTE: number;

export const VK_DOWN: number;

export const VK_E: number;

export const VK_EISU: number;

export const VK_END: number;

export const VK_ENTER: number;

export const VK_EQUALS: number;

export const VK_ESCAPE: number;

export const VK_EXCLAMATION: number;

export const VK_EXECUTE: number;

export const VK_F: number;

export const VK_F1: number;

export const VK_F10: number;

export const VK_F11: number;

export const VK_F12: number;

export const VK_F13: number;

export const VK_F14: number;

export const VK_F15: number;

export const VK_F16: number;

export const VK_F17: number;

export const VK_F18: number;

export const VK_F19: number;

export const VK_F2: number;

export const VK_F20: number;

export const VK_F21: number;

export const VK_F22: number;

export const VK_F23: number;

export const VK_F24: number;

export const VK_F3: number;

export const VK_F4: number;

export const VK_F5: number;

export const VK_F6: number;

export const VK_F7: number;

export const VK_F8: number;

export const VK_F9: number;

export const VK_FINAL: number;

export const VK_G: number;

export const VK_GREATER_THAN: number;

export const VK_H: number;

export const VK_HANGUL: number;

export const VK_HANJA: number;

export const VK_HASH: number;

export const VK_HELP: number;

export const VK_HOME: number;

export const VK_HYPHEN_MINUS: number;

export const VK_I: number;

export const VK_INSERT: number;

export const VK_J: number;

export const VK_JUNJA: number;

export const VK_K: number;

export const VK_KANA: number;

export const VK_KANJI: number;

export const VK_L: number;

export const VK_LEFT: number;

export const VK_LESS_THAN: number;

export const VK_M: number;

export const VK_META: number;

export const VK_MODECHANGE: number;

export const VK_MULTIPLY: number;

export const VK_N: number;

export const VK_NONCONVERT: number;

export const VK_NUMPAD0: number;

export const VK_NUMPAD1: number;

export const VK_NUMPAD2: number;

export const VK_NUMPAD3: number;

export const VK_NUMPAD4: number;

export const VK_NUMPAD5: number;

export const VK_NUMPAD6: number;

export const VK_NUMPAD7: number;

export const VK_NUMPAD8: number;

export const VK_NUMPAD9: number;

export const VK_NUM_LOCK: number;

export const VK_O: number;

export const VK_OPEN_BRACKET: number;

export const VK_OPEN_CURLY_BRACKET: number;

export const VK_OPEN_PAREN: number;

export const VK_P: number;

export const VK_PAGE_DOWN: number;

export const VK_PAGE_UP: number;

export const VK_PAUSE: number;

export const VK_PERCENT: number;

export const VK_PERIOD: number;

export const VK_PIPE: number;

export const VK_PLUS: number;

export const VK_PRINT: number;

export const VK_PRINTSCREEN: number;

export const VK_Q: number;

export const VK_QUESTION_MARK: number;

export const VK_QUOTE: number;

export const VK_R: number;

export const VK_RETURN: number;

export const VK_RIGHT: number;

export const VK_S: number;

export const VK_SCROLL_LOCK: number;

export const VK_SELECT: number;

export const VK_SEMICOLON: number;

export const VK_SEPARATOR: number;

export const VK_SHIFT: number;

export const VK_SLASH: number;

export const VK_SLEEP: number;

export const VK_SPACE: number;

export const VK_SUBTRACT: number;

export const VK_T: number;

export const VK_TAB: number;

export const VK_TILDE: number;

export const VK_U: number;

export const VK_UNDERSCORE: number;

export const VK_UP: number;

export const VK_V: number;

export const VK_W: number;

export const VK_WIN: number;

export const VK_X: number;

export const VK_Y: number;

export const VK_Z: number;

export function isSupported(): any;

export namespace Color {
  function add(color1: any, color2: any, ...args: any[]): any;

  function add_(color1: any, color2: any, ...args: any[]): any;

  function fromString(str: any): any;

  function hsl2rgb(color: any): any;

  function interpolate(color1: any, color2: any, factor: any, ...args: any[]): any;

  function interpolateHSL(color1: any, color2: any, factor: any, ...args: any[]): any;

  function multiply(color1: any, color2: any, ...args: any[]): any;

  function multiply_(color1: any, color2: any, ...args: any[]): any;

  function randomize(color: any, diff: any): any;

  function rgb2hsl(color: any): any;

  function toHex(color: any): any;

  function toRGB(color: any): any;

}

export namespace Display {
  class Backend {
    constructor(context: any);

    compute(options: any): void;

    computeFontSize(availWidth: any, availHeight: any): void;

    computeSize(availWidth: any, availHeight: any): void;

    draw(data: any, clearBefore: any): void;

    eventToPosition(x: any, y: any): void;

  }

  class Hex {
    constructor(context: any);

    compute(options: any): void;

    computeFontSize(availWidth: any, availHeight: any): any;

    computeSize(availWidth: any, availHeight: any): any;

    draw(data: any, clearBefore: any): void;

    eventToPosition(x: any, y: any): any;

  }

  class Rect {
    constructor(context: any);

    compute(options: any): void;

    computeFontSize(availWidth: any, availHeight: any): any;

    computeSize(availWidth: any, availHeight: any): any;

    draw(data: any, clearBefore: any): void;

    eventToPosition(x: any, y: any): any;

    static cache: boolean;

  }

  class Term {
    constructor(context: any);

    compute(options: any): void;

    computeFontSize(availWidth: any, availHeight: any): any;

    computeSize(availWidth: any, availHeight: any): any;

    draw(data: any, clearBefore: any): void;

    eventToPosition(x: any, y: any): any;

  }

  class Tile {
    constructor(context: any);

    compute(options: any): void;

    computeFontSize(availWidth: any, availHeight: any): any;

    computeSize(availWidth: any, availHeight: any): any;

    draw(data: any, clearBefore: any): void;

    eventToPosition(x: any, y: any): any;

  }

  namespace Term {
    class Color {
      constructor(context: any);

      clearToAnsi(bg: any): void;

      colorToAnsi(fg: any, bg: any): void;

      positionToAnsi(x: any, y: any): void;

    }

    class Xterm {
      constructor(context: any);

      clearToAnsi(bg: any): any;

      colorToAnsi(fg: any, bg: any): any;

      positionToAnsi(x: any, y: any): any;

    }

  }

}

export namespace FOV {
  class DiscreteShadowcasting {
    constructor(lightPassesCallback: any, options: any);

    compute(x: any, y: any, R: any, callback: any): void;

  }

  class PreciseShadowcasting {
    constructor(lightPassesCallback: any, options: any);

    compute(x: any, y: any, R: any, callback: any): void;

  }

  class RecursiveShadowcasting {
    constructor(lightPassesCallback: any, options: any);

    compute(x: any, y: any, R: any, callback: any): void;

    compute180(x: any, y: any, R: any, dir: any, callback: any): void;

    compute90(x: any, y: any, R: any, dir: any, callback: any): void;

    static OCTANTS: (number[])[];

  }

}

export namespace Map {
  class Arena {
    constructor(width: any, height: any);

    create(callback: any): any;

  }

  class Cellular {
    constructor(width: any, height: any, options: any);

    connect(callback: any, value: any, connectionCallback: any): void;

    create(callback: any): void;

    randomize(probability: any): any;

    serviceCallback(callback: any): void;

    set(x: any, y: any, value: any): void;

    setOptions(options: any): void;

  }

  class Digger {
    constructor(width: any, height: any, options: any);

    create(callback: any): any;

  }

  class DividedMaze {
    constructor(width: any, height: any);

    create(callback: any): any;

  }

  class Dungeon {
    constructor(width: any, height: any);

    getCorridors(): any;

    getRooms(): any;

  }

  class EllerMaze {
    constructor(width: any, height: any);

    create(callback: any): any;

  }

  class Feature {
    constructor();

    create(digCallback: any): void;

    debug(): void;

    isValid(canBeDugCallback: any): void;

    static createRandomAt(x: any, y: any, dx: any, dy: any, options: any): void;

  }

  class IceyMaze {
    constructor(width: any, height: any, regularity: any);

    create(callback: any): any;

  }

  class Rogue {
    constructor(width: any, height: any, options: any);

    create(callback: any): any;

  }

  class Uniform {
    constructor(width: any, height: any, options: any);

    create(callback: any): any;

  }

  namespace Feature {
    class Corridor {
      constructor(startX: any, startY: any, endX: any, endY: any);

      create(digCallback: any): any;

      createPriorityWalls(priorityWallCallback: any): void;

      debug(): void;

      isValid(isWallCallback: any, canBeDugCallback: any): any;

      static createRandomAt(x: any, y: any, dx: any, dy: any, options: any): any;

    }

    class Room {
      constructor(x1: any, y1: any, x2: any, y2: any, doorX: any, doorY: any, ...args: any[]);

      addDoor(x: any, y: any): any;

      addDoors(isWallCallback: any): any;

      clearDoors(): any;

      create(digCallback: any): void;

      debug(): void;

      getBottom(): any;

      getCenter(): any;

      getDoors(callback: any): any;

      getLeft(): any;

      getRight(): any;

      getTop(): any;

      isValid(isWallCallback: any, canBeDugCallback: any): any;

      static createRandom(availWidth: any, availHeight: any, options: any): any;

      static createRandomAt(x: any, y: any, dx: any, dy: any, options: any): any;

      static createRandomCenter(cx: any, cy: any, options: any): any;

    }

  }

}

export namespace Noise {
  class Simplex {
    constructor(gradients: any);

    get(xin: any, yin: any): any;

  }

}

export namespace Path {
  class AStar {
    constructor(toX: any, toY: any, passableCallback: any, options: any);

    compute(fromX: any, fromY: any, callback: any): void;

  }

  class Dijkstra {
    constructor(toX: any, toY: any, passableCallback: any, options: any);

    compute(fromX: any, fromY: any, callback: any): void;

  }

}

export namespace RNG {
  function clone(): any;

  function getNormal(mean: any, stddev: any): any;

  function getPercentage(): any;

  function getSeed(): any;

  function getState(): any;

  function getUniform(): any;

  function getUniformInt(lowerBound: any, upperBound: any): any;

  function getWeightedValue(data: any): any;

  function setSeed(seed: any): any;

  function setState(state: any): any;

}

export namespace Scheduler {
  class Action {
    constructor();

    add(item: any, repeat: any, time: any): any;

    clear(): any;

    next(): any;

    remove(item: any): any;

    setDuration(time: any): any;

  }

  class Simple {
    constructor();

    add(item: any, repeat: any): any;

    next(): any;

  }

  class Speed {
    constructor();

    add(item: any, repeat: any, time: any): any;

    next(): any;

  }

}

export namespace Text {
  const RE_COLORS: RegExp;

  const TYPE_BG: number;

  const TYPE_FG: number;

  const TYPE_NEWLINE: number;

  const TYPE_TEXT: number;

  function measure(str: any, maxWidth: any): any;

  function tokenize(str: any, maxWidth: any): any;

}

declare global {
  export interface Array<T> {
    random(): T
    randomize(): Array<T>
  }
}