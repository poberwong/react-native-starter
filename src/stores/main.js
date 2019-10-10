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
