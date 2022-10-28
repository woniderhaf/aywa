import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../../styles/Styles';

const icons = {
  play: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195708)"><path d="M9.60044 5.24276L18.5182 10.5172C19.6461 11.1833 19.6461 12.8167 18.5182 13.4828L9.60044 18.7572C8.45184 19.4372 7 18.6079 7 17.2732V6.72676C7 5.39208 8.45184 4.56279 9.60044 5.24276Z" fill="url(#paint0_linear_344_195708)"/></g><defs><linearGradient id="paint0_linear_344_195708" x1="0.817927" y1="-28.8333" x2="17.2403" y2="26.7203" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><clipPath id="clip0_344_195708"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
  playPink: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_344_195855)"><path d="M9.60044 5.24276L18.5182 10.5172C19.6461 11.1833 19.6461 12.8167 18.5182 13.4828L9.60044 18.7572C8.45184 19.4372 7 18.6079 7 17.2732V6.72676C7 5.39208 8.45184 4.56279 9.60044 5.24276Z" fill="#CA86FF"/></g><defs><clipPath id="clip0_344_195855"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>`,
};
export default TrackItem = props => {
  return (
    <View style={[s.wrapper, props.disabled ? s.disabled : null]}>
      {props.availability ? (
        <TouchableOpacity
          disabled={props.disabled}
          style={[s.play, styles.center]}
          onPress={() =>
            props.goto('MeditationPlayer', {
              time: props.time,
              trackIndex: props.trackIndex,
            })
          }>
          <SvgXml xml={icons.playPink} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={[s.play, styles.center]}>
          <SvgXml xml={icons.play} />
        </TouchableOpacity>
      )}
      <View>
        <Text style={s.title}>{props.title}</Text>
        <Text style={s.time}>{props.time}</Text>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  wrapper: {
    backgroundColor: '#242424',
    borderRadius: 36,
    paddingVertical: 22,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  play: {
    width: 44,
    height: 44,
    borderRadius: 44,
    backgroundColor: '#313131',
    marginRight: 16,
  },
  title: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 24,
  },
  time: {
    color: '#5b5b5b',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.4,
  },
});
