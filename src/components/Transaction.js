import {View, Text, StyleSheet} from 'react-native';
import {SvgXml} from 'react-native-svg';
import styles from '../styles/Styles';
import moment from 'moment';
import {LAMPORTS_PER_SOL} from '@solana/web3.js';
import {useEffect, useState} from 'react';
const icons = {
  conclusion: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22.001 30.25C21.5868 30.25 21.251 29.9142 21.251 29.5L21.251 19.6435L18.3641 22.5303C18.0712 22.8232 17.5964 22.8232 17.3035 22.5303C17.0106 22.2374 17.0106 21.7626 17.3035 21.4697L21.471 17.3022C21.6116 17.1615 21.8024 17.0825 22.0013 17.0825C22.2003 17.0825 22.391 17.1615 22.5317 17.3022L26.6984 21.4697C26.9912 21.7626 26.9912 22.2375 26.6982 22.5304C26.4053 22.8232 25.9305 22.8232 25.6376 22.5303L22.751 19.6431L22.751 29.5C22.751 29.9142 22.4152 30.25 22.001 30.25ZM28.667 15.25C29.0812 15.25 29.417 14.9142 29.417 14.5C29.417 14.0858 29.0812 13.75 28.667 13.75L15.3337 13.75C14.9194 13.75 14.5837 14.0858 14.5837 14.5C14.5837 14.9142 14.9194 15.25 15.3337 15.25L28.667 15.25Z" fill="url(#paint0_linear_344_174490)"/><defs><linearGradient id="paint0_linear_344_174490" x1="36.8337" y1="70.125" x2="17.7661" y2="4.46682" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
  replenishment: `<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill="#313131"/><path fill-rule="evenodd" clip-rule="evenodd" d="M22 13.75C22.4142 13.75 22.75 14.0858 22.75 14.5V24.3555L25.6359 21.4697C25.9288 21.1768 26.4036 21.1768 26.6965 21.4697C26.9894 21.7626 26.9894 22.2374 26.6965 22.5303L22.5459 26.6809C22.4855 26.745 22.414 26.7984 22.3345 26.8381C22.2312 26.8899 22.1163 26.9175 21.9987 26.9175C21.7997 26.9175 21.609 26.8385 21.4683 26.6978L17.3016 22.5303C17.0088 22.2374 17.0088 21.7625 17.3018 21.4696C17.5947 21.1768 18.0696 21.1768 18.3624 21.4697L21.25 24.3579V14.5C21.25 14.0858 21.5858 13.75 22 13.75ZM15.333 28.75C14.9188 28.75 14.583 29.0858 14.583 29.5C14.583 29.9142 14.9188 30.25 15.333 30.25H28.6663C29.0806 30.25 29.4163 29.9142 29.4163 29.5C29.4163 29.0858 29.0806 28.75 28.6663 28.75H15.333Z" fill="url(#paint0_linear_344_174456)"/><defs><linearGradient id="paint0_linear_344_174456" x1="7.16634" y1="-26.125" x2="26.2339" y2="39.5332" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>`,
  usdt: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3473 13.4613L14.1323 15.8363C14.0844 15.8878 14.0264 15.929 13.9619 15.9572C13.8973 15.9854 13.8277 15.9999 13.7573 16H3.25735C3.20728 16 3.15829 15.9853 3.1164 15.9579C3.07451 15.9305 3.04153 15.8914 3.0215 15.8455C3.00146 15.7996 2.99525 15.7489 3.00362 15.6995C3.01199 15.6501 3.03457 15.6042 3.0686 15.5675L5.2811 13.1925C5.32901 13.1409 5.38702 13.0998 5.45154 13.0716C5.51606 13.0434 5.58569 13.0288 5.65609 13.0288H16.1561C16.2066 13.0277 16.2563 13.0416 16.2989 13.0688C16.3416 13.0959 16.3753 13.1351 16.3957 13.1813C16.4162 13.2276 16.4224 13.2788 16.4138 13.3286C16.4052 13.3784 16.3821 13.4246 16.3473 13.4613ZM14.1323 8.67753C14.0842 8.62618 14.0262 8.58518 13.9617 8.55702C13.8972 8.52887 13.8277 8.51416 13.7573 8.51379H3.25735C3.20728 8.51382 3.15829 8.52844 3.1164 8.55589C3.07451 8.58333 3.04153 8.62239 3.0215 8.66829C3.00146 8.71419 2.99525 8.76493 3.00362 8.8143C3.01199 8.86368 3.03457 8.90955 3.0686 8.94629L5.2811 11.3225C5.32918 11.3739 5.38725 11.4149 5.45172 11.443C5.51619 11.4712 5.58574 11.4859 5.65609 11.4863H16.1561C16.2061 11.486 16.2548 11.4712 16.2966 11.4437C16.3383 11.4161 16.3711 11.3771 16.3909 11.3312C16.4108 11.2854 16.4169 11.2347 16.4084 11.1854C16.4001 11.1362 16.3776 11.0904 16.3436 11.0538L14.1323 8.67753ZM3.25735 6.97129H13.7573C13.8277 6.97122 13.8973 6.95664 13.9619 6.92846C14.0264 6.9003 14.0844 6.85912 14.1323 6.80754L16.3473 4.43255C16.3821 4.39587 16.4052 4.34972 16.4138 4.29991C16.4224 4.2501 16.4162 4.19885 16.3957 4.15262C16.3753 4.10638 16.3416 4.06723 16.2989 4.04009C16.2563 4.01294 16.2066 3.99901 16.1561 4.00005H5.65609C5.58569 4.00013 5.51606 4.01471 5.45154 4.04288C5.38702 4.07105 5.32901 4.11222 5.2811 4.1638L3.0686 6.53879C3.03457 6.57553 3.01199 6.6214 3.00362 6.67078C2.99525 6.72015 3.00146 6.77089 3.0215 6.81679C3.04153 6.86269 3.07451 6.90175 3.1164 6.92919C3.15829 6.95664 3.20728 6.97126 3.25735 6.97129Z" fill="#5B5B5B"/></svg>`,
};
const code = 'BjqM71VidJ7W1kjAQLSSd9Yw3wTb8GB7haScdju8JGAG';
export default Transaction = props => {
  const {data} = props;
  const [count, setCount] = useState(null);
  const [SOL, setSOL] = useState(null);
  useEffect(() => {
    funCheckAmount();
  }, []);
  const funCheckAmount = () => {
    const instructions = data.transaction.message.instructions;
    if (data.slot == 160813264) {
      setCount(0);
    } else if (instructions[0].program === 'spl-associated-token-account') {
      setCount(0);
    } else if (
      instructions[1]?.program === 'system' &&
      instructions[1]?.parsed.info.destination === code
    ) {
      const count =
        Number(instructions[1]?.parsed.info.lamports) / LAMPORTS_PER_SOL;
      setSOL(count);
    } else if (
      instructions[0]?.program === 'system' &&
      instructions[0]?.parsed.info.source === code
    ) {
      const count =
        Number(instructions[0]?.parsed.info.lamports) / LAMPORTS_PER_SOL;
      setSOL(-count);
    } else if (
      instructions[0]?.program === 'spl-token' ||
      instructions[1]?.program === 'spl-token'
    ) {
      if (instructions[0].parsed.info.tokenAmount) {
        setCount(
          -instructions[0].parsed.info.tokenAmount.amount / LAMPORTS_PER_SOL,
        );
      } else {
        const res =
          (Number(instructions[0].parsed.info.amount) -
            Number(
              instructions[1]?.parsed.info.amount ||
                2 * instructions[0].parsed.info.amount,
            )) /
          LAMPORTS_PER_SOL;
        setCount(res);
      }
    }
  };
  if (count === 0) {
    return null;
  }
  return (
    <View
      style={[
        styles.spaceBetween,
        {justifyContent: 'flex-start', width: '100%'},
      ]}>
      <SvgXml
        xml={
          (count < 0 && !SOL) || SOL < 0
            ? icons.conclusion
            : icons.replenishment
        }
        style={{marginRight: 16, flex: 1}}
      />
      <View style={[s.wrapper]}>
        <View>
          <Text style={s.text}>
            {(count < 0 && !SOL) || SOL < 0 ? 'Вывод' : 'Пополнение'}
          </Text>
          <Text style={s.data}>
            {moment.unix(data.blockTime).format('lll')}
          </Text>
        </View>
        <View style={[styles.center]}>
          <Text style={[s.text, s.boldmore]}>{SOL ? SOL : count}</Text>
          {SOL ? (
            <Text style={s.text}>SOL</Text>
          ) : (
            <Text style={s.text}>AW</Text>
          )}
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
