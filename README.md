# RNStarter
This is a boilerplate to make it easier to start 

## Version of [react-native](https://github.com/facebook/react-native)
0.61.2

## TODO
- [x] request.js based on superagent
- [x] authorization logic based on react-navigation
- [x] maintain status of authorization
- [x] Jest and mocked native modules
- [x] react-native-splash-screen
- [x] code-push
- [x] put some configuration files exported to JS from native
- [x] storybook
- [x] i18n
- [ ] fastlane
- [ ] Android build script
- [ ] cli-tools like create-react-app

## Usage
### How to start a network request  
```javascript
import request from './helpers/request';
// POST JSON
request.post(url, jsonObject)

// GET, josonObject will be appended after url as query.
request.get(url, jsonObject)

// uploadFile with fileObject that consist of type and uri
request.uploadFile(url, fileObject, data)

```
### Manage your routes  
I put three routes in rootRoutes.  
**screens/EnterScreens**:  you can put some auth screens which could be Login, Register, forgetPassword.  
**screens/SettingScreens**: If you have to do something before entering HomeScreen, you can put some screens here.  
**screens/MainScreens**: Just put other screens here.

### Manage data for different part of project  
As for data related to auth such as userInfo, tokenInfo, you'd better to put it in stores/auth.js and it will be easier to get in every page.  
Same as auth but related to normal data and
you can put data which need to be shared between different screens in stores/main.js.
If you think it is necessary to maintain a single store to store data instead of state of Component, you can do this.

### About unit test  
I put directories named \_\_test\_\_ at each part of project

### How to use storybook  
rootProject/index.js
```javascript
const USE_STORYBOOK = false;
```
You'll develop components, screens, total app with storybook which makes it easier to adjust each Component when you set it into true.

`projectRoot/storybook/stories/index` is the path of tree of total stories.

### How to switch between different environments  
You can put more configs into configuration file which has already contained APP_MODE and BASE_BACKEND.

**iOS path:** `rootProject/ios/RNStarter/Config/AppDef.h`

**Android path:**  `rootProject/android/app/src/main/res/values/app.xml`  
You can put more keys from push, data analysis, map and more third-party service here and just replace it with different files to switch environment to deployment Staging or Production.

