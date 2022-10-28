import {View, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../styles/Styles';
import moment from 'moment';
const icons = {
  conclusion: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.001 30.25C21.5868 30.25 21.251 29.9142 21.251 29.5L21.251 19.6435L18.3641 22.5303C18.0712 22.8232 17.5964 22.8232 17.3035 22.5303C17.0106 22.2374 17.0106 21.7626 17.3035 21.4697L21.471 17.3022C21.6116 17.1615 21.8024 17.0825 22.0013 17.0825C22.2003 17.0825 22.391 17.1615 22.5317 17.3022L26.6984 21.4697C26.9912 21.7626 26.9912 22.2375 26.6982 22.5304C26.4053 22.8232 25.9305 22.8232 25.6376 22.5303L22.751 19.6431L22.751 29.5C22.751 29.9142 22.4152 30.25 22.001 30.25ZM28.667 15.25C29.0812 15.25 29.417 14.9142 29.417 14.5C29.417 14.0858 29.0812 13.75 28.667 13.75L15.3337 13.75C14.9194 13.75 14.5837 14.0858 14.5837 14.5C14.5837 14.9142 14.9194 15.25 15.3337 15.25L28.667 15.25Z" fill="url(#paint0_linear_344_174490)"/><defs><linearGradient id="paint0_linear_344_174490" x1="36.8337" y1="70.125" x2="17.7661" y2="4.46682" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
  replenishment: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 13.75C22.4142 13.75 22.75 14.0858 22.75 14.5V24.3555L25.6359 21.4697C25.9288 21.1768 26.4036 21.1768 26.6965 21.4697C26.9894 21.7626 26.9894 22.2374 26.6965 22.5303L22.5459 26.6809C22.4855 26.745 22.414 26.7984 22.3345 26.8381C22.2312 26.8899 22.1163 26.9175 21.9987 26.9175C21.7997 26.9175 21.609 26.8385 21.4683 26.6978L17.3016 22.5303C17.0088 22.2374 17.0088 21.7625 17.3018 21.4696C17.5947 21.1768 18.0696 21.1768 18.3624 21.4697L21.25 24.3579V14.5C21.25 14.0858 21.5858 13.75 22 13.75ZM15.333 28.75C14.9188 28.75 14.583 29.0858 14.583 29.5C14.583 29.9142 14.9188 30.25 15.333 30.25H28.6663C29.0806 30.25 29.4163 29.9142 29.4163 29.5C29.4163 29.0858 29.0806 28.75 28.6663 28.75H15.333Z" fill="url(#paint0_linear_344_174456)"/><defs><linearGradient id="paint0_linear_344_174456" x1="7.16634" y1="-26.125" x2="26.2339" y2="39.5332" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
};
export default Transaction = props => {
  const {data} = props;
  return (
    <View
      style={[
        styles.spaceBetween,
        {justifyContent: 'flex-start', width: '100%'},
      ]}>
      <SvgXml
        xml={data.type == 'conclusion' ? icons.conclusion : icons.replenishment}
        style={{marginRight: 16, flex: 1}}
      />
      <View style={[s.wrapper]}>
        <View>
          <Text style={s.text}>
            {data.type == 'conclusion' ? 'Вывод' : 'Пополнение'}
          </Text>
          <Text style={s.data}>{moment(data.date).format('LL')}</Text>
        </View>
        <View style={[styles.center]}>
          <Text style={[s.text, s.boldmore]}>
            <Text>{data.type == 'conclusion' ? '+ ' : '- '}</Text>
            {data.value}
          </Text>
          <Text style={s.text}>AW</Text>
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  text: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 24,
  },
  boldmore: {
    fontWeight: '700',
    marginRight: 3,
  },
  data: {
    color: '#5B5B5B',
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 20,
  },
  wrapper: {
    ...styles.spaceBetween,
    flex: 4,
    borderBottomColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1,
    paddingVertical: 16,
  },
});
