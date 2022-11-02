import { atom, selector } from 'recoil';

interface IState {
  showViewport: boolean;
}

const state = atom({
  key: 'state',
  default: {
    showViewport: false,
  } as IState,
});

const appGridSpanSelector = selector({
  key: 'appGridSpanSelector',
  get: ({ get }) => {
    const { showViewport } = get(state);
    const terminalSpan = showViewport ? 6 : 12;
    const viewportSpan = showViewport ? 6 : 0;

    return {
      terminalSpan,
      viewportSpan,
    };
  },
});

export default { state, appGridSpanSelector };
