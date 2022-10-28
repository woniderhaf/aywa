import React, {useEffect, useMemo, useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableNativeFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import Template from '../../components/Template';
import {App} from '../../helpers/Index';
import styles from '../../styles/Styles';

export default PINcode = props => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(null);

  let ref = null;
  useEffect(() => {
    App.prepare(props.navigation, async user => {
      setLoading(false);
    });
    // ref.current.focus();
  }, []);
  const changePINcode = number => {
    if (!code) {
      setCode(number);
    } else {
      if (code.length < 4) {
        setCode(code + number);
      }
    }
  };
  useEffect(() => {
    if (code?.length === 4) {
      if (step === 0) {
        setTimeout(() => {
          setCode('');
        }, 200);
      }
      setStep(1);
    }
  }, [code]);

  return (
    <Template
      title="ПИН-код при входе"
      smallTitle={step == 1 ? 'Повторите новый код' : 'Введите новый код'}
      isheader={true}
      isinner={true}
      navigation={props.navigation}
      styles={styles}
      loading={loading}>
      {loading ? null : (
        <View style={s.container}>
          <View style={[styles.center, s.input]}>
            <Text style={s.inputText}>{code}</Text>
          </View>
          <View style={s.containerNumber}>
            <View style={s.wrapper}>
              <TouchableOpacity
                onPress={() => changePINcode('1')}
                style={s.numberBlock}>
                <Text style={s.numberText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('4')}
                style={s.numberBlock}>
                <Text style={s.numberText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('7')}
                style={s.numberBlock}>
                <Text style={s.numberText}>7</Text>
              </TouchableOpacity>
            </View>
            <View style={s.wrapper}>
              <TouchableOpacity
                onPress={() => changePINcode('2')}
                style={s.numberBlock}>
                <Text style={s.numberText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('5')}
                style={s.numberBlock}>
                <Text style={s.numberText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('8')}
                style={s.numberBlock}>
                <Text style={s.numberText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('0')}
                style={s.numberBlock}>
                <Text style={s.numberText}>0</Text>
              </TouchableOpacity>
            </View>
            <View style={s.wrapper}>
              <TouchableOpacity
                onPress={() => changePINcode('3')}
                style={s.numberBlock}>
                <Text style={s.numberText}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('6')}
                style={s.numberBlock}>
                <Text style={s.numberText}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => changePINcode('9')}
                style={s.numberBlock}>
                <Text style={s.numberText}>9</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </Template>
  );
};
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
  containerNumber: {
    backgroundColor: '#242424',
    borderRadius: 36,
    paddingVertical: 48,
    paddingHorizontal: 37,
    width,
    marginTop: 'auto',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...styles.spaceBetween,
    alignItems: 'flex-start',
  },
  wrapper: {},
  numberBlock: {
    ...styles.center,
    paddingVertical: 21,
    paddingHorizontal: 30,
    borderRadius: 200,
    backgroundColor: '#242424',
    marginBottom: 8,
  },
  numberText: {
    ...styles.white,
    fontSize: 28,
    fontWeight: '400',
    lineHeight: 33,
  },
  input: {
    width: 225,
    marginTop: 128,
    alignSelf: 'center',
  },
  inputText: {
    ...styles.white,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    textAlign: 'center',
    paddingRight: 5,
    borderRightColor: '#A03BEF',
    borderRightWidth: 2,
  },
});
