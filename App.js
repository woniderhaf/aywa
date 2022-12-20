/*
 * (c) pavit.design, 2022
 */

import React, {Component} from 'react';
import {
  NativeModules,
  NativeEventEmitter,
  PermissionsAndroid,
  Text
} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from 'react-navigation-stack';
// plug-ins
import BleManager from 'react-native-ble-manager';
import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
import {enableLatestRenderer} from 'react-native-maps';

// screen
import Loading from './src/screens/Loading/Index';

import Start from './src/screens/Start/Index';

import Login from './src/screens/Login/Index';

import Remind from './src/screens/Remind/Index';
import RemindCode from './src/screens/RemindCode/Index';
import RemindPassword from './src/screens/RemindPassword/Index';

import Register from './src/screens/Register/Index';

import Main from './src/screens/Main/Index';
import Meditations from './src/screens/Meditations/Index';
import MeditationPlayer from './src/screens/MeditationPlayer/Index';

import Shop from './src/screens/Shop/Index';
import ShopCategories from './src/screens/ShopCategories/Index';
import ShopDetails from './src/screens/ShopDetails/Index';
import ShopDetailsAccessoriesScreen from './src/screens/ShopDetailsAccessories/Index';

import Wallet from './src/screens/Wallet/Index';
import Exchange from './src/screens/Exchange/Index';

// import Network from './src/screens/Network/Index';

import Profile from './src/screens/Profile/Index';
import PersonalData from './src/screens/PersonalData/Index';
import SettingsScreen from './src/screens/Settings/Index';
import Safety from './src/screens/Safety/Index';
import PINcode from './src/screens/PINcode/Index';

import BLE from './src/screens/BLE/Index';

// helpers
import {Http, Storage, Utils} from './src/helpers/Index';

// globals
import {API} from './src/globals/Сonstants';
// import {DataProvider} from './src/providers/DataProvider';
// import StoryContainer from './src/components/stories/StoryContainer';
import {Easing} from 'react-native-reanimated';
import {User} from './src/models/Index';
import {StatusBar} from 'react-native';

// constants
const duration = 320;

//config
const config = {
  animation: 'timing',
  config: {
    duration,
    easing: Easing.linear,
  },
  cardStyle: {
    backgroundColor: 'transparent',
  },
};
const closeConfig = {
  animation: 'timing',
  config: {
    duration,
    easing: Easing.linear,
  },
  cardStyle: {
    backgroundColor: 'transparent',
  },
};

// options
const options = {
  headerMode: 'none',
  mode: 'modal',
};
const transitionSpec = {
  open: config,
  close: closeConfig,
};
// blocks
const startBlock = createStackNavigator(
  {
    Start: Start,
    Login: Login,
    Remind: Remind,
    RemindCode: RemindCode,
    RemindPassword: RemindPassword,
    Register: Register,
  },
  options,
  (options.initialRouteName = 'Start'),
  (Register.navigationOptions = {
    animationEnabled: true,
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
  (Login.navigationOptions = {
    animationEnabled: true,
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
  (RemindPassword.navigationOptions = {
    animationEnabled: true,
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
  (RemindCode.navigationOptions = {
    animationEnabled: true,
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
);
const mainBlock = createStackNavigator(
  {
    Main: Main,
    Meditations: Meditations,
    MeditationPlayer: MeditationPlayer,
    BLE,
  },
  options,
  (options.initialRouteName = 'Main'),
                // (options.initialRouteName = 'BLE'),
  (Meditations.navigationOptions = {
    animationEnabled: true,
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
  (MeditationPlayer.navigationOptions = {
    transitionSpec,
    animationTypeForReplace: 'pop',
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
);
const shopBlock = createStackNavigator(
  {
    Shop: Shop,
    ShopCategories: ShopCategories,
    ShopDetails: ShopDetails,
    ShopDetailsAccessories: ShopDetailsAccessoriesScreen,
  },
  options,
  (options.initialRouteName = 'Shop'),
  (ShopCategories.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
  (ShopDetails.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
  (ShopDetailsAccessoriesScreen.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
);
const walletBlock = createStackNavigator(
  {
    Wallet,
    Exchange,
  },
  options,
  (options.initialRouteName = 'Wallet'),
  (Exchange.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
);
// const networkBlock = createStackNavigator(
//   {
//     Network: Network,
//   },
//   options,
//   (options.initialRouteName = 'Network'),
// );

const profileBlock = createStackNavigator(
  {
    Profile: Profile,
    PersonalData: PersonalData,
    Settings: SettingsScreen,
    Safety: Safety,
    PINcode: PINcode,
  },
  options,
  (options.initialRouteName = 'Profile'),
  (SettingsScreen.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
  (Safety.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
  (PINcode.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  }),
  (PersonalData.navigationOptions = {
    transitionSpec,
    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
  }),
);
const AppNavigator = screen =>
  createSwitchNavigator(
    {
      Loading: Loading,
      Start: startBlock,
      Main: mainBlock,
      Shop: shopBlock,
      Wallet: walletBlock,
      // Network: networkBlock,
      Profile: profileBlock,
    },
    options,
    (options.initialRouteName = screen),
  );

// start
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'Loading',
      loading: true,
    };

    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(API.pushKey);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response);
    });
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification);
      const data = {
        title: notification.notification.title,
        body: notification.notification.body,
        data: notification.notification.additionalData,
      };
      const {actionID} = notification.action;
      if (data.data) {
        if (data.data.type === 'REQUEST' && actionID === 'accept') {
          ParkingRequestsModel.update(data.data.id, {
            status: parkingRequestStatus.HOLD,
          });
          PushesModel.add(
            'Заявка подтверждена!',
            '',
            data.body,
            data.data.requesterId,
            null,
            {type: 'REQUEST', id: data.data.id},
          );
        }
        if (data.data.type === 'REQUEST' && actionID === 'cancel') {
          ParkingRequestsModel.update(data.data.id, {
            status: parkingRequestStatus.IN_ACTIVE,
          });
          PushesModel.add(
            'Отмена заявки',
            '',
            data.body,
            data.data.requesterId,
          );
          data.data.type = null;
        }
      }
      // Storage.set('push_data', JSON.stringify(data));
      this.setState({screen: 'Shop'});
    });
    NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      if (!state.isConnected) this.setState({screen: 'NoInternet'});
    });

    enableLatestRenderer();
  }
  componentDidMount = async () => {
    NetInfo.fetch().then(async state => {
      let screen = 'NoInternet';
      if (state.isConnected) {
        screen = await Storage.get('startScreen');
        const oldUser = await Storage.get('user');
        if (oldUser && oldUser !== null) {
          const user = JSON.parse(oldUser);

          if (user?._id) {
            const updateUser = await User.get(user?._id);
            Storage.set('user', updateUser);
          }
        }

        if (Utils.empty(screen)) screen = 'Start';
      }
      if (
        screen === 'NoInternet'
        // screen === 'Pushes' ||
        // screen === 'ParkingDetails'
      )
        this.setState({loading: false, screen});
      else {
        this.setState({screen: 'Loading'}, () => {
          setTimeout(() => {
            this.setState({loading: false, screen});
          }, 3000);
        });
      }
    });
  };
  render() {
    const AppContainer = createAppContainer(AppNavigator(this.state.screen));
    return (
      <>
        <StatusBar backgroundColor={'#090909'} />
        <AppContainer />

      </>

    );
  }
}
