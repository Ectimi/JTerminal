import { atom } from 'recoil';

interface IState {
  showViewport: boolean;
}

const state = atom({
  key: 'state',
  default: {
    showViewport: false,
  } as IState,
});

export default state;
