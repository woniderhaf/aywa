import React, {useEffect, useState} from 'react';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
//plugins
import {SvgXml} from 'react-native-svg';
import Template from '../../components/Template';
import {Slider} from '@miblanchard/react-native-slider';
import TrackPlayer, {
  Capability,
  Event,
  RepeatMode,
  State,
  usePlaybackState,
  useProgress,
  useTrackPlayerEvents,
} from 'react-native-track-player';

//styles
import styles from '../../styles/Styles';

//images
const images = {
  watch: require('../Main/Images/watch.png'),
  bgButton: require('../Main/Images/bgButton.png'),
};
const track1 = {
  url: require('./tracks/GAYAZOV_BROTHER_-_MALINOVAYA_LADA_73214200.mp3'), // Load media from the network
  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  duration: 402, // Duration in seconds
};
const track2 = {
  url: require('./tracks/Tones_and_I_-_Dance_Monkey_66175914.mp3'), // Load media from the network
  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  duration: 402, // Duration in seconds
};

export default MeditationPlayer = props => {
  const playBackState = usePlaybackState();
  const [loading, setLoading] = useState(true);
  const [isWatch, setIsWatch] = useState(true);
  const [value, setValue] = useState(0);
  const [duration, setDuration] = useState(props.navigation.getParam('time'));
  let panel = null;
  const progress = useProgress();
  useEffect(() => {
    const updateIndexPlayer = async () => {
      try {
        const trackIndex = props.navigation.getParam('trackIndex');
        await TrackPlayer.skip(trackIndex);
        const duration = await TrackPlayer.getDuration();
        setDuration(duration);
        TrackPlayer.play();
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    updateIndexPlayer();
    return () => {
      setValue(0);
      progress.position = 0;
    };
  }, []);
  useEffect(() => {
    setValue(Math.floor(progress.position));
  }, [progress.position]);
  return (
    <>
      <Template
        styles={styles}
        navigation={props.navigation}
        isheader={true}
        isinner={true}
        isinnerHeight={true}
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
        {loading ? null : (
          <View style={s.container}>
            <Image source={require('./Images/circle.png')} style={s.image} />
            <View style={s.timeBlock}>
              <View style={[styles.spaceBetween, {marginBottom: 24}]}>
                <Text style={s.time}>{value}</Text>
                <Text style={s.time}>{Math.floor(duration)}</Text>
              </View>
              <Slider
                value={progress.position}
                onValueChange={v => setValue(v)}
                minimumValue={0}
                maximumValue={duration}
              />
            </View>
            <TouchableOpacity
              style={s.stop}
              onPress={() => TrackPlayer.pause()}>
              <Text style={s.stopText}>Остановить</Text>
            </TouchableOpacity>
          </View>
        )}
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
const radius = 36;
const s = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  image: {
    alignSelf: 'center',
    marginBottom: 123,
  },
  time: {
    ...styles.white,
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 31,
  },
  watchwrapper: {
    position: 'relative',
    padding: 7,
  },
  stop: {
    borderRadius: 30,
    backgroundColor: '#A03BEF',
    width: width - 48,
    alignSelf: 'center',
    paddingVertical: 19,
  },
  stopText: {
    ...styles.white,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18,
  },
  timeBlock: {
    backgroundColor: '#242424',
    borderRadius: 36,
    padding: 32,
    marginBottom: 24,
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
