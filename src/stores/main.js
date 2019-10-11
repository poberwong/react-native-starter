/**
 * Same as auth but related to normal data and
 * you can put data which need to be shared between different screens.
 */
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
