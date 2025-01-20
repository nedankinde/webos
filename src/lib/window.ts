import { createSignal } from "solid-js"

let window_count = 0;

export class Window {
  size
  setSize
  position
  setPosition
  zIndex
  setZIndex
  key: number;
  name?: string;

  constructor(appName?: string) {
    this.key = window_count++;
    const [size, setSize] = createSignal({x: 500, y: 500});
    this.size = size;
    this.setSize = setSize;
    const [position, setPosition] = createSignal({x: 0, y: 0})
    this.position = position;
    this.setPosition = setPosition;
    const [zIndex, setZIndex] = createSignal<number>(0)
    this.zIndex = zIndex
    this.setZIndex = setZIndex
    this.name = appName
  }
}
