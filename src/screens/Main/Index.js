/*
 * (c) pavit.design, 2022
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  PermissionsAndroid,
  Image,
  Platform,
  StatusBar,
  ImageBackground,
  Vibration,
} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import moment from 'moment';
import 'moment/locale/ru';
import LinearGradient from 'react-native-linear-gradient';
import InstaStory from 'react-native-insta-story';
// components
import Template from '../../components/Template';

// models
import {User} from '../../models/Index';

// helpers
import {App, Storage, Utils} from '../../helpers/Index';

import {MAPS} from '../../globals/Сonstants';

// styles
import styles from '../../styles/Styles';
import SearchDevice from '../../components/searchDevice';
import Stories from '../../components/stories/Stories';
// icons
const icons = {
  back: '<svg width="32" height="32" viewBox="0 0 24 24"><path d="M14 8L10 12L14 16" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  next: '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M10 16L14 12L10 8" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  watch: `<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C3.89543 0 3 0.89543 3 2V2.17071C1.83481 2.58254 1 3.69378 1 5V6.13378C0.701099 6.30669 0.5 6.62986 0.5 7V8C0.5 8.37014 0.701099 8.69331 1 8.86622V13C1 14.3062 1.83481 15.4175 3 15.8293V16C3 17.1046 3.89543 18 5 18H9C10.1046 18 11 17.1046 11 16V15.8293C12.1652 15.4175 13 14.3062 13 13V5C13 3.69378 12.1652 2.58254 11 2.17071V2C11 0.895431 10.1046 0 9 0H5ZM4.25 3.25C3.14543 3.25 2.25 4.14543 2.25 5.25V12.75C2.25 13.8546 3.14543 14.75 4.25 14.75H9.75C10.8546 14.75 11.75 13.8546 11.75 12.75V5.25C11.75 4.14543 10.8546 3.25 9.75 3.25H4.25Z" fill="url(#paint0_linear_369_31001)"/><defs><linearGradient id="paint0_linear_369_31001" x1="-5.75" y1="-43.5" x2="19.833" y2="24.5501" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
  clockTime: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1_10033)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.79584 2.5C7.79584 2.15482 8.07566 1.875 8.42084 1.875H10H11.5833C11.9285 1.875 12.2083 2.15482 12.2083 2.5C12.2083 2.84518 11.9285 3.125 11.5833 3.125H10.625V4.86833C10.625 4.87864 10.6248 4.8889 10.6243 4.89909C11.6529 5.00125 12.6442 5.35475 13.5089 5.93257C14.5476 6.62657 15.3571 7.61297 15.8351 8.76703C16.3131 9.9211 16.4382 11.191 16.1945 12.4162C15.9508 13.6413 15.3493 14.7667 14.466 15.65C13.5827 16.5333 12.4573 17.1348 11.2322 17.3785C10.007 17.6222 8.73714 17.4971 7.58307 17.0191C6.429 16.541 5.44261 15.7315 4.74861 14.6929C4.05462 13.6543 3.6842 12.4332 3.6842 11.184C3.6842 9.50893 4.34962 7.90248 5.53407 6.71803C6.57045 5.68164 7.92993 5.04264 9.37576 4.89907C9.37527 4.88889 9.37502 4.87864 9.37502 4.86833V3.125H8.42084C8.07566 3.125 7.79584 2.84518 7.79584 2.5ZM16.1328 3.80122C15.8887 3.55714 15.493 3.55714 15.2489 3.80122C15.0048 4.0453 15.0048 4.44103 15.2489 4.68511L16.4989 5.93511C16.743 6.17918 17.1387 6.17918 17.3828 5.93511C17.6269 5.69103 17.6269 5.2953 17.3828 5.05122L16.1328 3.80122ZM4.75115 3.80122C4.99522 4.0453 4.99522 4.44103 4.75115 4.68511L3.50115 5.93511C3.25707 6.17918 2.86134 6.17918 2.61726 5.93511C2.37318 5.69103 2.37318 5.2953 2.61726 5.05122L3.24211 4.42637L3.86726 3.80122C4.11134 3.55714 4.50707 3.55714 4.75115 3.80122ZM7.64032 8.73006C7.88145 8.48307 8.27715 8.47832 8.52414 8.71945L10.3795 10.5308H12.7792C13.1244 10.5308 13.4042 10.8107 13.4042 11.1558C13.4042 11.501 13.1244 11.7808 12.7792 11.7808H10.125C9.96187 11.7808 9.80518 11.717 9.68843 11.603L7.65093 9.61388C7.40394 9.37275 7.39919 8.97705 7.64032 8.73006Z" fill="#FB593B"/></g><defs><clipPath id="clip0_1_10033"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>`,
};
const images = {
  cards: require('./Images/cards.png'),
  play: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 10C17.5 14.1425 14.1425 17.5 10 17.5C5.8575 17.5 2.5 14.1425 2.5 10C2.5 5.8575 5.8575 2.5 10 2.5C14.1425 2.5 17.5 5.8575 17.5 10Z" fill="white"/><path d="M9.11716 7.549L12.3522 9.46234C12.7613 9.704 12.7613 10.2965 12.3522 10.5382L9.11716 12.4515C8.70049 12.6982 8.17383 12.3973 8.17383 11.9132V8.08734C8.17383 7.60317 8.70049 7.30234 9.11716 7.549Z" fill="#A03BEF"/></svg>`,
  watch: require('./Images/watch.png'),
  bgButton: require('./Images/bgButton.png'),
};
// vars
stories = [
  require('./Images/stories/1.png'),
  require('./Images/stories/2.png'),
];
const data = [
  // {
  //   user_id: 1,
  //   user_image:
  //     'https://pbs.twimg.com/profile_images/1222140802475773952/61OmyINj.jpg',
  //   user_name: 'Ahmet Çağlar Durmuş',
  //   stories: [
  //     {
  //       story_id: 1,
  //       story_image: stories[0].src,
  //       swipeText: 'Custom swipe text for this story',
  //       onPress: () => console.log('story 1 swiped'),
  //     },
  //     {
  //       story_id: 2,
  //       story_image:
  //         'https://image.freepik.com/free-vector/mobile-wallpaper-with-fluid-shapes_79603-601.jpg',
  //     },
  //   ],
  // },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://sun9-east.userapi.com/sun9-35/s/v1/ig2/VJotuXMnf9HnG6811fqvFgesa2efWxtIlDlpMXizcGa9lJfm3sK6DJE_Y0e-Lm77snXupfF2GSftMi-PCweWLhEd.jpg?size=1080x1440&quality=96&type=album',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
  {
    user_id: 2,
    user_image:
      'https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80',
    user_name: 'Test User',
    stories: [
      {
        story_id: 1,
        story_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjORKvjcbMRGYPR3QIs3MofoWkD4wHzRd_eg&usqp=CAU',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 1 swiped'),
      },
      {
        story_id: 2,
        story_image:
          'https://files.oyebesmartest.com/uploads/preview/vivo-u20-mobile-wallpaper-full-hd-(1)qm6qyz9v60.jpg',
        swipeText: 'Custom swipe text for this story',
        onPress: () => console.log('story 2 swiped'),
      },
    ],
  },
];

// start
export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: null,
      loading: true,
      isWatch: false,
      meditation: true,
      isSearchDevices: false,
      visibleStories: false,
    };
  }
  panel = null;
  searchDevice = null;
  componentDidMount = async () => {
    App.prepare(this.props.navigation, async user => {
      this.setState({user, loading: false});
    });
  };
  goto = (link, data) => this.props.navigation.navigate(link, data);

  playLastMeditation = () => {
    this.setState({meditation: false});
  };
  searchDevices = () => {
    this.panel.close();
    this.searchDevice.snapToIndex(0);
  };
  handlPlug = async () => {
    // клик на подключение устройства
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({access: true, isSearchDevices: true}, () => {
          this.searchDevices();
        });
      } else {
        console.log('ble permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  render() {
    return (
      <>
        <Template
          title={
            this.state.user ? `Добрый день, ${this.state.user.firstName}` : ''
          }
          styles={styles}
          page={'Main'}
          navigation={this.props.navigation}
          isheader={true}
          headerContext={
            <TouchableOpacity
              style={s.watchwrapper}
              onPress={() => this.panel.snapToIndex(0)}>
              <View style={[s.isWatchBlock, styles.center]}>
                <View
                  style={[
                    s.isWatch,
                    {
                      backgroundColor: this.state.isWatch
                        ? '#00FE00'
                        : '#FB593B',
                    },
                  ]}></View>
              </View>
              <SvgXml xml={icons.watch} />
            </TouchableOpacity>
          }
          loading={this.state.loading}>
          {this.state.loading ? null : (
            <View style={s.container}>
              <ScrollView style={s.list} showsVerticalScrollIndicator={false}>
                <Stories />

                <TouchableOpacity
                  style={s.category}
                  onPress={() =>
                    this.goto('Meditations', {
                      title: 'медитации',
                    })
                  }>
                  <Text
                    style={[
                      styles.text,
                      styles.middle,
                      styles.boldlight,
                      styles.brown,
                      styles.upper,
                    ]}>
                    медитации
                  </Text>
                  <SvgXml xml={icons.next} />
                </TouchableOpacity>
                <View style={s.openLevelWrapper}>
                  <View style={s.openLevel}>
                    <Text style={s.openLevelTitle}>Открыто уровней</Text>
                    <View style={s.partyNumber}>
                      <Text
                        style={[
                          s.openLevelNumber,
                          {color: 'rgba(255,255,255,0.5)'},
                        ]}>
                        <Text style={s.openLevelNumber}>
                          {this.state.user?.level}
                        </Text>
                        /9
                      </Text>
                    </View>
                  </View>
                  <Text style={s.openLevelText}>
                    Медитируйте каждый день и зарабатывайте{' '}
                    <Text style={s.aywa}>AYWA.</Text>
                    {'\n'}
                    Мы уведомим тебя о возможности медитации
                  </Text>
                  {this.state.meditation ? (
                    <TouchableOpacity
                      onPress={this.playLastMeditation}
                      style={[styles.spaceBetween, s.lastMeditationsButton]}>
                      <SvgXml xml={images.play} />

                      <Text style={s.lastMeditations}>Последняя медитация</Text>
                    </TouchableOpacity>
                  ) : (
                    <View style={[s.lastMeditationsButtonDisabled]}>
                      <SvgXml xml={icons.clockTime} style={{marginRight: 8}} />

                      <Text style={s.lastMeditations}>
                        Будет доступна через 12 час. 43 мин.
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={s.cardsHeading}>метафорические карты</Text>
                <View style={s.metaphoricalsCards}>
                  <Image
                    source={images.cards}
                    style={{
                      alignSelf: 'center',
                      marginLeft: -50,
                    }}
                  />
                  <Text style={s.cardsTitle}>метафорические карты</Text>
                  <View style={s.cardsWrapper}>
                    <Text style={s.cardsText}>
                      Это набор карточек, на которых изображены животные,
                      сюжеты, пейзажи, фигуры или абстракции.
                    </Text>
                    <TouchableOpacity style={s.cardsButton}>
                      <Text style={[s.lastMeditations, {textAlign: 'center'}]}>
                        Получить
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.lastrowlarge}></View>
                <View style={styles.lastrowlarge}></View>
                <View style={styles.lastrowlarge}></View>
              </ScrollView>
            </View>
          )}
        </Template>

        <BottomSheet
          ref={r => (this.panel = r)}
          index={-1}
          snapPoints={[480]}
          backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: radius}}
          handleComponent={null}
          enablePanDownToClose={true}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'close'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
          <View style={s.BSStyle}>
            <Image source={images.watch} style={{alignSelf: 'center'}} />
            <Text style={s.BSTitle}>Подключение браслета</Text>
            <View style={styles.spaceBetween}>
              <Text style={s.BSText}>
                Для работы приложения Вам{'\n'}необходимо подключиться{'\n'}к
                фитнес-трекеру
              </Text>
              <TouchableOpacity style={s.plug} onPress={this.handlPlug}>
                <ImageBackground source={images.bgButton} style={s.plug}>
                  <Text style={s.plugText}>подключить</Text>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
        <BottomSheet
          ref={r => (this.searchDevice = r)}
          index={-1}
          snapPoints={[500]}
          backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: radius}}
          handleComponent={null}
          enablePanDownToClose={true}
          onChange={e => {
            e === -1 ? this.setState({isSearchDevices: false}) : null;
          }}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'close'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
          {this.state.isSearchDevices && <SearchDevice />}
        </BottomSheet>
      </>
    );
  }
}

const marginTop = styles.pbx.paddingBottom ? 20 : 0;
const radius = 36;
const {width, height} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: styles.black.color,
  },
  story: {
    borderRadius: 24,
    borderColor: '#242424',
    borderWidth: 1,
    padding: 4,
    marginHorizontal: 6,
  },
  storyActive: {
    borderColor: 'rgb(160, 59, 239)',
  },
  storyImage: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: 'gray',
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  //openLevel
  openLevelWrapper: {
    backgroundColor: '#1D1D1D',
    borderRadius: 36,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  openLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  openLevelTitle: {
    ...styles.white,
    lineHeight: 24,
    fontSize: 15,
    fontWeight: '500',
  },
  openLevelNumber: {
    fontWeight: '700',
    ...styles.white,
    fontSize: 12,
    lineHeight: 15,
  },
  partyNumber: {
    backgroundColor: '#313131',
    borderRadius: 12,
    paddingVertical: 2,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  openLevelText: {
    marginTop: 8,
    color: '#5B5B5B',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
  },
  aywa: {
    fontSize: 16,
    fontWeight: '600',
  },
  lastMeditations: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: '500',
    ...styles.white,
  },
  lastMeditationsButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#a03bef',
    borderRadius: 66,
    width: 200,
    marginTop: 24,
  },
  lastMeditationsButtonDisabled: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#313131',
    borderRadius: 66,
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardsHeading: {
    marginTop: 24,
    textTransform: 'uppercase',
    color: '#5B5B5B',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: 16,
  },
  cardsTitle: {
    textTransform: 'uppercase',
    color: '#5B5B5B',
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 26,
    ...styles.white,
    marginTop: 32,
  },
  metaphoricalsCards: {
    marginTop: 8,
    backgroundColor: '#1d1d1d',
    borderRadius: radius,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingVertical: 32,
  },
  cardsText: {
    color: '#5b5b5b',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    flex: 2,
  },
  cardsButton: {
    backgroundColor: '#C5AA80',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 30,
    flex: 1,
  },
  cardsWrapper: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  watchwrapper: {
    position: 'relative',
    padding: 7,
  },
  isWatchBlock: {
    width: 12,
    height: 12,
    borderRadius: 15,
    position: 'absolute',
    backgroundColor: '#090909',
    top: 2,
    right: 0,
    zIndex: 2,
  },
  isWatch: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },
  BSStyle: {
    backgroundColor: 'rgba(33, 33, 33, 1)',
    borderRadius: radius,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 0,
  },
  BSTitle: {
    marginTop: 32,
    ...styles.white,
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 26,
  },
  BSText: {
    color: '#5B5B5B',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
  },
  plug: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
  },
  plugText: {
    ...styles.white,
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 16,
  },
});
