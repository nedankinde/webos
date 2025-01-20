import { createWithSignal } from 'solid-zustand'
import { Window } from './window'

interface WMState {
  windows: Window[]
  minimized: Window[]
  create: (appName?: string) => void
  bringToFront: (key: number) => void
  remove: (key: number) => void
  minimize: (key: number) => void
  unminimize: (key: number) => void
}

const useWMStore = createWithSignal<WMState>(set => ({
  windows: [new Window("editor")],
  minimized: [],
  create: (appName?: string) => set(state => ({
    windows: [...state.windows, new Window(appName)]
  })),
  bringToFront: (key) => set(state => {
    const targetWindow = state.windows.find(win => win.key === key);

    if (!targetWindow) return {};  // If no window with the key is found, exit early.

    const updatedWindows = state.windows.filter(win => win.key !== key);
    updatedWindows.push(targetWindow);

    updatedWindows.forEach((win, index) => {
      win.setZIndex(index + 1);
    });

    return {};
  }),
  remove: (key: number) => set(state => ({
    windows: state.windows.filter(win => win.key !== key)
  })),
  minimize: (key: number) => set(state => ({
    windows: state.windows.filter(win => win.key !== key),
    minimized: [...state.minimized, state.windows.find(win => win.key === key)!]
  })),
  unminimize: (key: number) => set(state => ({
    windows: [...state.windows, state.minimized.find(win => win.key === key)!],
    minimized: state.minimized.filter(win => win.key !== key)
  }))
}))

export default useWMStore
