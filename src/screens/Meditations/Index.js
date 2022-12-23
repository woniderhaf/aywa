import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  Dimensions,
} from 'react-native';

// components
import Template from '../../components/Template';
import TrackItem from './TrackItem';
import {App} from '../../helpers/Index';
// plugins
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {SvgXml} from 'react-native-svg';
import TrackPlayer, {State} from 'react-native-track-player';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  useAnimatedGestureHandler,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
// styles
import styles from '../../styles/Styles';

// icons
const icons = {
  watch: `<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C3.89543 0 3 0.89543 3 2V2.17071C1.83481 2.58254 1 3.69378 1 5V6.13378C0.701099 6.30669 0.5 6.62986 0.5 7V8C0.5 8.37014 0.701099 8.69331 1 8.86622V13C1 14.3062 1.83481 15.4175 3 15.8293V16C3 17.1046 3.89543 18 5 18H9C10.1046 18 11 17.1046 11 16V15.8293C12.1652 15.4175 13 14.3062 13 13V5C13 3.69378 12.1652 2.58254 11 2.17071V2C11 0.895431 10.1046 0 9 0H5ZM4.25 3.25C3.14543 3.25 2.25 4.14543 2.25 5.25V12.75C2.25 13.8546 3.14543 14.75 4.25 14.75H9.75C10.8546 14.75 11.75 13.8546 11.75 12.75V5.25C11.75 4.14543 10.8546 3.25 9.75 3.25H4.25Z" fill="url(#paint0_linear_369_31001)"/><defs><linearGradient id="paint0_linear_369_31001" x1="-5.75" y1="-43.5" x2="19.833" y2="24.5501" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
};
const images = {
  watch: require('./Images/watch.png'),
  bgButton: require('./Images/bgButton.png'),
  levelOne: require('./Images/levelOne.png'),
};
const radius = 36;

const tracks = [
  {
    url: require('../MeditationPlayer/tracks/GAYAZOV_BROTHER_-_MALINOVAYA_LADA_73214200.mp3'),
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    duration: 402, // Duration in seconds
  },
  {
    url: require('../MeditationPlayer/tracks/Tones_and_I_-_Dance_Monkey_66175914.mp3'), // Load media from the network
    title: 'Avaritia',
    artist: 'deadmau5',
    album: 'while(1<2)',
    genre: 'Progressive House, Electro House',
    date: '2014-05-20T07:00:00+00:00', // RFC 3339
    duration: 402, // Duration in seconds
  },
];
export default Meditations = props => {
  const goto = (link, data) => props.navigation.navigate(link, data);
  let panel = null;
  let scroll = null;
  let scrollTouch = null;

  const [user, setUser] = useState(null);
  const [isWatch, setIsWatch] = useState(false);
  const [levelCount, setLevelCount] = useState([
    'I',
    'II',
    'III',
    'IV',
    'V',
    'VI',
    'VII',
    'VIII',
    'IX',
    'X',
  ]);

  const [activeLevel, setActiveLevel] = useState(0);
  const [availability, setAvailability] = useState(true);
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [loading, setLoading] = useState(true);

  const showDetail = () => {
    setIsShowDetail(true);
  };
  const setUpPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add(tracks);
    } catch (error) {
      console.log('error Player', error);
    }
  };

  useEffect(() => {
    setUpPlayer();
    App.prepare(props.navigation, async user => {
      // setUser(user);
      setUser(user);
      setLoading(false);
    });
  }, []);
  //animated
  const translateX = useSharedValue(width * user?.level || 0);
  const rStyle = index =>
    useAnimatedStyle(() => {
      const opacity = interpolate(
        translateX.value,
        [(index - 1) * width, index * width, (index + 1) * width],
        [0.2, 1, 0.2],
        Extrapolate.CLAMP,
      );
      return {
        opacity,
      };
    });

  const scrollAnimated = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
    const level = Math.round(event.contentOffset.x / width);
    if (level !== activeLevel) {
      // setActiveLevel(level);
    }
  });
  //return
  return (
    <>
      <Template
        title="Медитации"
        styles={styles}
        navigation={props.navigation}
        isheader={true}
        isinner={true}
        loading={loading}
        headerContext={
          <TouchableOpacity
            style={s.watchwrapper}
            onPress={() => panel.snapToIndex(0)}>
            <View style={[s.isWatchBlock, styles.center]}>
              <View
                style={[
                  s.isWatch,
                  {
                    backgroundColor: isWatch ? '#00FE00' : '#FB593B',
                  },
                ]}></View>
            </View>
            <SvgXml
              xml={`<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5 0C3.89543 0 3 0.89543 3 2V2.17071C1.83481 2.58254 1 3.69378 1 5V6.13378C0.701099 6.30669 0.5 6.62986 0.5 7V8C0.5 8.37014 0.701099 8.69331 1 8.86622V13C1 14.3062 1.83481 15.4175 3 15.8293V16C3 17.1046 3.89543 18 5 18H9C10.1046 18 11 17.1046 11 16V15.8293C12.1652 15.4175 13 14.3062 13 13V5C13 3.69378 12.1652 2.58254 11 2.17071V2C11 0.895431 10.1046 0 9 0H5ZM4.25 3.25C3.14543 3.25 2.25 4.14543 2.25 5.25V12.75C2.25 13.8546 3.14543 14.75 4.25 14.75H9.75C10.8546 14.75 11.75 13.8546 11.75 12.75V5.25C11.75 4.14543 10.8546 3.25 9.75 3.25H4.25Z" fill="url(#paint0_linear_369_31001)"/><defs><linearGradient id="paint0_linear_369_31001" x1="-5.75" y1="-43.5" x2="19.833" y2="24.5501" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`}
            />
          </TouchableOpacity>
        }>
        <View style={s.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={s.levelBlockWrapper}>
              <Animated.ScrollView
                onScroll={scrollAnimated}
                horizontal
                pagingEnabled
                ref={r => {
                  scroll = r;
                  scroll?.scrollTo({
                    x: width * (user?.level - 1) || 0,
                    animated: false,
                  });
                }}
                scrollEventThrottle={10}
                showsHorizontalScrollIndicator={false}>
                {levelCount.map((v, i) => (
                  <View key={v} style={s.levelBlock}>
                    <View style={[s.circle, styles.center]}>
                      <Image source={images.levelOne} />
                    </View>
                    {user?.level < i + 1 ? (
                      <View style={[styles.center, s.closeBlock]}>
                        <SvgXml
                          xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 9V7C16 4.791 14.209 3 12 3C9.791 3 8 4.791 8 7V9" stroke="#FB593B" stroke-width="1.4031" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M7 21H17C18.105 21 19 20.105 19 19V11C19 9.895 18.105 9 17 9H7C5.895 9 5 9.895 5 11V19C5 20.105 5.895 21 7 21ZM10.0001 15C9.98812 13.9 10.8881 13 11.9881 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12.0001 17C10.9001 17 10.0001 16.1 10.0001 15Z" fill="#FB593B"/></svg>`}
                        />
                      </View>
                    ) : null}
                    <Text style={s.levelTitle}>Уровень {v}</Text>
                  </View>
                ))}
              </Animated.ScrollView>
            </View>

            <ScrollView
              ref={ref => {
                scrollTouch = ref;
                scrollTouch?.scrollTo({
                  x: (width * (user?.level - 1)) / 10 || 0,
                  animated: false,
                });
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {levelCount.map((v, i) => (
                <View
                  onPress={() => setActiveLevel(i)}
                  key={v}
                  style={[{paddingVertical: 9}]}>
                  <Animated.View
                    style={[
                      s.levelIndecator,
                      // activeLevel === i ? s.completedLevel : {},
                      rStyle(i),
                    ]}></Animated.View>
                </View>
              ))}
            </ScrollView>
            <View style={[styles.spaceBetween]}>
              <View style={[s.blockDescr, {marginRight: 4}]}>
                <View
                  style={{
                    paddingLeft: 12,
                    paddingRight: 9,
                    paddingVertical: 24,
                  }}>
                  <SvgXml
                    xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195649)"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.35486 3C9.35486 2.58579 9.69064 2.25 10.1049 2.25H11.9999H13.8999C14.3141 2.25 14.6499 2.58579 14.6499 3C14.6499 3.41421 14.3141 3.75 13.8999 3.75H12.7499V5.842C12.7499 5.85437 12.7496 5.86668 12.749 5.8789C13.9833 6.0015 15.1728 6.42571 16.2106 7.11909C17.4569 7.95188 18.4283 9.13556 19.002 10.5204C19.5756 11.9053 19.7257 13.4292 19.4333 14.8994C19.1408 16.3696 18.419 17.72 17.3591 18.78C16.2991 19.8399 14.9487 20.5617 13.4785 20.8542C12.0083 21.1466 10.4844 20.9965 9.09954 20.4229C7.71466 19.8492 6.53098 18.8778 5.69819 17.6315C4.8654 16.3851 4.4209 14.9198 4.4209 13.4208C4.4209 11.4107 5.2194 9.48297 6.64074 8.06164C7.8844 6.81797 9.51577 6.05116 11.2508 5.87889C11.2502 5.86667 11.2499 5.85437 11.2499 5.842V3.75H10.1049C9.69064 3.75 9.35486 3.41421 9.35486 3ZM19.3592 4.56147C19.0663 4.26857 18.5914 4.26857 18.2985 4.56147C18.0056 4.85436 18.0056 5.32923 18.2985 5.62213L19.7985 7.12213C20.0914 7.41502 20.5663 7.41502 20.8592 7.12213C21.1521 6.82923 21.1521 6.35436 20.8592 6.06147L19.3592 4.56147ZM5.70123 4.56147C5.99412 4.85436 5.99412 5.32923 5.70123 5.62213L4.20123 7.12213C3.90834 7.41502 3.43346 7.41502 3.14057 7.12213C2.84768 6.82923 2.84768 6.35436 3.14057 6.06147L3.89039 5.31165L4.64057 4.56147C4.93346 4.26857 5.40834 4.26857 5.70123 4.56147ZM9.16824 10.4761C9.45759 10.1797 9.93243 10.174 10.2288 10.4633L12.4553 12.637H15.3349C15.7491 12.637 16.0849 12.9728 16.0849 13.387C16.0849 13.8012 15.7491 14.137 15.3349 14.137H12.1499C11.9541 14.137 11.7661 14.0604 11.626 13.9237L9.18097 11.5367C8.88458 11.2473 8.87888 10.7725 9.16824 10.4761Z" fill="url(#paint0_linear_344_195649)"/></g><defs><linearGradient id="paint0_linear_344_195649" x1="-6.15808" y1="-43.062" x2="14.1743" y2="32.3599" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_344_195649"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
                  />
                  <Text style={s.blockTitle}>Доступность</Text>
                  <Text style={s.blockText}>
                    Вы исчерпали лимит. Доступ к прослушиваю откроется через
                  </Text>
                </View>
                <View style={[s.blockBottom, styles.spaceBetween]}>
                  {!isShowDetail ? (
                    <>
                      <TouchableOpacity style={s.detail} onPress={showDetail}>
                        <Text style={[s.detailText, styles.white]}>
                          Подробнее
                        </Text>
                      </TouchableOpacity>
                      {/* <Text>
                        <SvgXml
                          xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195688)"><path d="M17.3018 6.71094L6.70223 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82319 6.7227L17.3035 6.69513L17.2759 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_344_195688"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
                        />
                      </Text> */}
                    </>
                  ) : (
                    <>
                      <Text
                        style={[
                          s.detailText,
                          styles.white,
                          {paddingVertical: 12},
                        ]}>
                        12 час. 35 мин.
                      </Text>
                      <TouchableOpacity>
                        <Text>
                          <SvgXml
                            xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195666)"><path d="M12 21C7.029 21 3 16.971 3 12C3 7.029 7.029 3 12 3C16.971 3 21 7.029 21 12C21 16.971 16.971 21 12 21Z" fill="#FB593B"/><path d="M14.8299 9.16992L9.16992 14.8299" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M14.8299 14.8299L9.16992 9.16992" stroke="#242424" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_344_195666"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
                          />
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
              <View style={s.blockDescr}>
                <View
                  style={{
                    paddingLeft: 12,
                    paddingRight: 9,
                    paddingVertical: 24,
                  }}>
                  <SvgXml
                    xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195674)"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 12C3 16.971 7.029 21 12 21C16.971 21 21 16.971 21 12C21 7.029 16.971 3 12 3C7.029 3 3 7.029 3 12ZM11.996 7C11.444 7 10.996 7.448 11 8C11 8.552 11.448 9 12 9C12.552 9 13 8.552 13 8C13 7.448 12.552 7 11.996 7ZM10.25 11C10.25 10.5858 10.5858 10.25 11 10.25H12C12.4142 10.25 12.75 10.5858 12.75 11V16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16V11.75H11C10.5858 11.75 10.25 11.4142 10.25 11Z" fill="url(#paint0_linear_344_195674)"/></g><defs><linearGradient id="paint0_linear_344_195674" x1="-6" y1="-40.5" x2="12.9831" y2="32.2119" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_344_195674"><rect width="24" height="24" fill="white"/></clipPath></defs></svg> `}
                  />
                  <Text style={s.blockTitle}>Описание</Text>
                  <Text style={s.blockText}>
                    Давайте познакомимся с данным уровнем немного больше
                  </Text>
                </View>
                <View style={[s.blockBottom, styles.spaceBetween]}>
                  <TouchableOpacity style={s.detail}>
                    <Text style={[s.detailText, styles.white]}>Подробнее</Text>
                  </TouchableOpacity>
                  {/* <Text>
                    <SvgXml
                      xml={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195688)"><path d="M17.3018 6.71094L6.70223 17.3105" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.82319 6.7227L17.3035 6.69513L17.2759 15.1755" stroke="#5B5B5B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></g><defs><clipPath id="clip0_344_195688"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`}
                    />
                  </Text> */}
                </View>
              </View>
            </View>
            <Text style={[s.detailText, s.accessoriesTitle]}>АКСЕССУАРЫ</Text>
            {tracks.map((v, i) => (
              <TrackItem
                disabled={user?.level < activeLevel + 1}
                key={i}
                trackIndex={i}
                title={v.title}
                time={v.duration}
                availability={availability}
                goto={goto}
              />
            ))}

            <View style={styles.lastrowlarge}></View>
          </ScrollView>
        </View>
      </Template>
      <BottomSheet
        ref={r => (panel = r)}
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
            <TouchableOpacity style={s.plug}>
              <ImageBackground source={images.bgButton} style={s.plug}>
                <Text style={s.plugText}>подключить</Text>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </>
  );
};
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  levelBlockWrapper: {
    width,
    backgroundColor: '#1D1D1D',
    borderRadius: radius,
    // paddingHorizontal: 80,
    // paddingVertical: 40,
    alignItems: 'center',
  },
  levelBlock: {
    width,
    alignItems: 'center',

    paddingHorizontal: 80,
    paddingVertical: 40,
  },

  levelTitle: {
    marginTop: 32,
    ...styles.white,
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 26,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: 'rgba(91, 91, 91, 0.6)',
    borderWidth: 1,
    overflow: 'hidden',
  },
  levelIndecator: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'white',
    marginRight: 4,
  },
  completedLevel: {
    backgroundColor: 'white',
  },

  blockDescr: {
    backgroundColor: '#242424',
    borderRadius: radius,
    width: '50%',
    overflow: 'hidden',
  },
  blockTitle: {
    marginTop: 16,
    marginBottom: 8,
    ...styles.white,
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '500',
  },
  blockText: {
    color: '#5b5b5b',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14,
    maxWidth: 153,
  },
  blockBottom: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  detail: {
    backgroundColor: '#A03BEF',
    padding: 12,
    borderRadius: 30,
  },
  detailText: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 16,
  },
  accessoriesTitle: {
    color: '#5b5b5b',
    marginTop: 36,
    marginLeft: 16,
    marginBottom: 8,
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
  closeBlock: {
    backgroundColor: '#313131',
    borderRadius: 12,
    padding: 6,
    position: 'absolute',
    right: 24,
    top: 24,
  },
  closeMeditations: {},
});
