import { action } from 'mobx';
export default class Main {
  instance = null;

  @action reset = () => {};

  static getInstance() {
    if (!this.instance) {
      this.instance = new Main();
    }
    return this.instance;
  }
}

// const hydrate = create({
//   storage: AsyncStorage,
// });

// hydrate('main', Main.getInstance())
//   .then(() => {
//     console.log('main store hydrate complete');
//   })
//   .catch(err => console.log('mobx-persist main store error : ', err.message));
