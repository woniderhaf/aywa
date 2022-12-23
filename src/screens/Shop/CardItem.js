import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {SvgXml} from 'react-native-svg';

//styles
import styles from '../../styles/Styles';

// icons
const icons = {
  coins:
    '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M11.6667 13.3333C9.08933 13.3333 7 11.244 7 8.66667C7 6.08933 9.08933 4 11.6667 4C14.2453 4 16.3333 6.08933 16.3333 8.66667C16.3333 11.244 14.2453 13.3333 11.6667 13.3333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.44 6.69141C4.97067 6.81141 3 8.83541 3 11.3341C3 13.9114 5.08933 16.0007 7.66667 16.0007C9.52933 16.0007 11.124 14.9021 11.8733 13.3234" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  placeholder:
    '<svg width="72" height="72" viewBox="0 0 72 72"><path d="M29.6367 42.363C30.6832 43.4098 31.9718 44.1824 33.3882 44.6122C34.8046 45.042 36.3052 45.1159 37.7569 44.8272C39.2087 44.5385 40.5669 43.8962 41.7111 42.9572C42.8553 42.0182 43.7503 40.8114 44.3167 39.4439C44.8831 38.0763 45.1034 36.5902 44.9582 35.1172C44.813 33.6441 44.3068 32.2296 43.4843 30.999C42.6618 29.7683 41.5484 28.7595 40.2429 28.062C38.9373 27.3645 37.4799 26.9997 35.9997 27" stroke="url(#paint0_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9083 16.908C12.4912 21.325 9.74238 27.1369 9.13007 33.3534C8.51776 39.5699 10.0799 45.8064 13.5503 51.0002C17.0206 56.1941 22.1846 60.024 28.1622 61.8373C34.1398 63.6507 40.5612 63.3352 46.3323 60.9448C52.1034 58.5544 56.8672 54.2369 59.8118 48.7279C62.7565 43.2189 63.6999 36.8593 62.4813 30.7328C61.2627 24.6062 57.9575 19.0917 53.1288 15.1289C48.3002 11.166 42.2469 9.00005 36.0003 9" stroke="url(#paint1_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 18C39.5601 18 43.0402 19.0557 46.0003 21.0335C48.9603 23.0114 51.2675 25.8226 52.6298 29.1117C53.9922 32.4008 54.3487 36.02 53.6541 39.5116C52.9596 43.0033 51.2453 46.2106 48.7279 48.7279C46.2106 51.2453 43.0033 52.9596 39.5116 53.6541C36.02 54.3487 32.4008 53.9922 29.1117 52.6298C25.8226 51.2675 23.0114 48.9603 21.0335 46.0003C19.0557 43.0402 18 39.5601 18 36" stroke="url(#paint2_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_263_8081" x1="21.9543" y1="-16.5" x2="43.6767" y2="54.5241" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_263_8081" x1="-18" y1="-121.5" x2="38.9491" y2="96.6357" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint2_linear_263_8081" x1="-4.25242e-06" y1="-69" x2="37.9661" y2="76.4238" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
};

//start
export default CardItem = ({v, goto, type}) => {
  return (
    <TouchableOpacity
      style={s.item}
      onPress={() =>
        goto(type == 'mat' ? 'ShopDetails' : 'ShopDetailsAccessories', {
          data: v,
        })
      }>
      {v.image ? (
        <Image
          source={{uri: `data:image/png;base64,${v.image}`}}
          style={[s.image]}
        />
      ) : (
        <View style={s.image}>
          <SvgXml xml={icons.placeholder} />
        </View>
      )}
      <View style={s.info}>
        <View style={s.coins}>
          <SvgXml xml={icons.coins} />
          <Text style={[styles.text, styles.middle, styles.bold, styles.ml5]}>
            {v.cost}
          </Text>
        </View>
        <Text
          style={[styles.text, styles.middle, styles.boldlight, styles.brown]}>
          {type == 'mat' || v.level  ? `Level ${v.level}` : `#${v.number}`}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  item: {
    width: width / 2 - 5,
    height: 228,
    marginBottom: 10,
    borderRadius: 36,
    backgroundColor: styles.black2.color,
    overflow: 'hidden',
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  coins: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 16,
    backgroundColor: styles.violet.color,
    borderRadius: 30,
  },
  image: {
    width: '100%',
    height: 162,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: styles.blacklight.color,
  },
});
