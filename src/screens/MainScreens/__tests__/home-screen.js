/**
 * @format
 */
/**
 * https://stackoverflow.com/questions/36211739/invariant-violation-could-not-find-store-in-either-the-context-or-props-of-c
 * 1. 对于 dom 树的渲染测试，可以使用 enzyme 来测试。（分别有 shallow 和 mount 两种渲染方式），shallow 模式会依赖到 react-dom.
 * 2. 对于被高阶组件处理后的页面的处理，可以使用 enzyme 来实现，但是过程较为麻烦，会依赖到 redux-mock-store
 * 3. redux 官方推荐是独立导出需要测试的组件，如：
 * export X
 * export default connect(X)
 * 这样仅需要增加而非修改的操作。但是对于使用了装饰器部分的代码，最好也分开写。
 * 对于 Mobx 同样适用，对于需要测试的 screen 如是。
 */

import { HomeScreen } from '../HomeScreen';

describe('HomeScreen', () => {
  let instance = null;
  beforeEach(() => {
    instance = new HomeScreen();
  });
  test('testInComponent', () => {
    expect(instance.testInComponent()).toBe(2019);
  });
});
