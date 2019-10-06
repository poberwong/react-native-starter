import React, { PureComponent } from 'react';
import { enterEntrance } from '../../helpers/config';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './LoginScreen.js';

const SCREENS = {
  LoginScreen,
};
/**
 * React.PureComponent is similar to React.Component. The difference between them is that React.Component doesn’t
 * implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.
 *
 * If your React component’s render() function renders the same result given the same props and state,
 * you can use React.PureComponent for a performance boost in some cases.
 *
 * Note
 * React.PureComponent’s shouldComponentUpdate() only shallowly compares the objects. If these contain complex data structures,
 * it may produce false-negatives for deeper differences. Only extend PureComponent when you expect to have simple props and state,
 * or use forceUpdate() when you know deep data structures have changed. Or, consider using immutable objects to facilitate fast comparisons of nested data.
 * Furthermore, React.PureComponent’s shouldComponentUpdate() skips prop updates for the whole component subtree. Make sure all the children components are also “pure”.
 * 主要是此组件一旦被重新渲染，其路由栈内的页面都会被销毁重建
 * 因为 PureComponent 只是针对 nextProps 和 currentProps 进行的浅层对比，同时会忽略其自组件的渲染（这不是废话么），因此在使用 PureComponent 时，需要考虑清楚自己想要的是什么。
 * 它主要是实现了 shouldComponentUpdate 这个周期方法，默认返回 true，也就是说自组件是必然会递归渲染的。
 * 以后如果出现顶层状态的更新无法影响到具体组件的更新，这段注释或许对这个问题有帮助
 */
export default class extends PureComponent {
  addProps = SomeComponent => {
    return class extends SomeComponent {
      render() {
        return <SomeComponent {...this.props} />; // u can add more props here
      }
    };
  };

  /**
   * 注意不要去修改 SCREENS，否则二次渲染会导致脱离组件生命周期的对象二次被处理，这也是纯函数的使用应用（不能有副作用）。
   */
  getScreens() {
    const screens = {};
    Object.keys(SCREENS).forEach(key => {
      screens[key] = {
        screen: this.addProps(SCREENS[key]),
      };
    });
    return screens;
  }

  render() {
    const Navigator = createAppContainer(
      createStackNavigator(this.getScreens(), {
        initialRouteName: enterEntrance,
        headerMode: 'none',
        navigationOptions: {
          gesturesEnabled: true,
        },
      }),
    );
    return <Navigator />;
  }
}
