import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const SIZE = width * 0.7;
export default Page = ({title, index, translateX}) => {
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
      borderRadius,
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256, 0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.squere, rStyle]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squere: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
});
