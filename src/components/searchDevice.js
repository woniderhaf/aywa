import React, {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  NativeModules,
  NativeEventEmitter,
  NativeAppEventEmitter,
  Dimensions,
} from 'react-native';
import Animated, {SharedValue, Easing} from 'react-native-reanimated';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import styles from '../styles/Styles';
import BleManager, {scan} from 'react-native-ble-manager';
const icons = {
  watch: `<svg width="142" height="252" viewBox="0 0 142 252" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.5"><path d="M37.9165 38H104.083C110.914 38 117.603 39.9298 123.366 43.5628C128.463 46.7764 132.66 51.2122 135.568 56.4595C138.476 61.7068 140 67.5961 140 73.582V176.418C140 182.404 138.476 188.293 135.568 193.541C132.661 198.788 128.464 203.224 123.366 206.437V206.437C117.603 210.07 110.914 212 104.083 212H37.9165C31.0859 212 24.3969 210.07 18.6341 206.437V206.437C13.5365 203.224 9.33969 198.788 6.43207 193.541C3.52446 188.293 2.00006 182.404 2 176.418V73.582C2.00001 67.5961 3.52436 61.7069 6.43193 56.4597C9.3395 51.2124 13.5363 46.7766 18.6339 43.5629V43.5629C24.3967 39.9298 31.0858 38 37.9165 38V38Z" stroke="#5B5B5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M122 208L116.379 231.021C115.058 236.43 111.934 241.243 107.509 244.686C103.084 248.128 97.6154 250 91.983 250H50.0171C44.3847 250 38.9161 248.128 34.4911 244.686C30.0661 241.243 26.942 236.43 25.6214 231.021L20 208" stroke="#5B5B5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 43L25.6214 20.5271C26.942 15.2468 30.0661 10.5485 34.491 7.18795C38.916 3.82743 44.3846 2.00011 50.017 2H91.9829C97.6153 2.00008 103.084 3.82736 107.509 7.18786C111.934 10.5484 115.058 15.2467 116.379 20.5269L122 42.9999" stroke="#5B5B5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`,
  loading: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.75" d="M50 74C36.746 74 26 63.254 26 50C26 36.746 36.746 26 50 26C63.254 26 74 36.746 74 50C74 63.254 63.254 74 50 74" stroke="#00FE00" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 86C30.119 86 14 69.881 14 50C14 30.119 30.119 14 50 14C69.881 14 86 30.119 86 50C86 69.881 69.881 86 50 86" stroke="#00FE00" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 98C23.492 98 2 76.508 2 50C2 23.492 23.492 2 50 2C76.508 2 98 23.492 98 50C98 76.508 76.508 98 50 98" stroke="#00FE00" stroke-opacity="0.25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.4" d="M61.2555 50H57.5039" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.8" d="M38.7461 50H42.4977" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.2" d="M50.0003 38.7451V42.4967" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.6" d="M50.0003 61.2545V57.5029" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.5" d="M57.959 57.9583L55.3066 55.3059" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M42.042 42.0415L44.6943 44.6939" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.3" d="M55.3066 44.6939L57.959 42.0415" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path opacity="0.7" d="M44.6943 55.3059L42.042 57.9583" stroke="#00FE00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  error: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.75" d="M50 74C36.746 74 26 63.254 26 50C26 36.746 36.746 26 50 26C63.254 26 74 36.746 74 50C74 63.254 63.254 74 50 74" stroke="#FB593B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M46.2944 39.3799H54.2058C55.0225 39.3799 55.8223 39.6128 56.5113 40.0513C57.1208 40.4391 57.6227 40.9745 57.9703 41.6078C58.318 42.2411 58.5002 42.9519 58.5002 43.6743V56.0858C58.5002 56.8082 58.318 57.519 57.9703 58.1523C57.6227 58.7856 57.1209 59.3209 56.5114 59.7088V59.7088C55.8223 60.1473 55.0225 60.3802 54.2058 60.3802H46.2944C45.4777 60.3802 44.6779 60.1473 43.9889 59.7088V59.7088C43.3794 59.3209 42.8776 58.7856 42.5299 58.1523C42.1823 57.519 42 56.8082 42 56.0858V43.6743C42 42.9519 42.1823 42.2411 42.5299 41.6078C42.8776 40.9745 43.3794 40.4391 43.9889 40.0513V40.0513C44.6779 39.6128 45.4777 39.3799 46.2944 39.3799V39.3799Z" stroke="#FB593B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M56.3771 59.918L55.7051 62.7038C55.5472 63.3583 55.1738 63.9407 54.6448 64.3573C54.1158 64.7739 53.4621 65.0004 52.7888 65.0004H47.772C47.0987 65.0004 46.4449 64.7739 45.9159 64.3573C45.3869 63.9407 45.0135 63.3583 44.8556 62.7038L44.1836 59.918" stroke="#FB593B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44.1602 39.9201L44.8347 37.2233C44.9932 36.5896 45.3681 36.0258 45.8991 35.6226C46.4301 35.2193 47.0864 35 47.7622 35H52.7982C53.4741 35 54.1304 35.2193 54.6614 35.6226C55.1924 36.0258 55.5673 36.5896 55.7257 37.2233L56.4003 39.9201" stroke="#FB593B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 86C30.119 86 14 69.881 14 50C14 30.119 30.119 14 50 14C69.881 14 86 30.119 86 50C86 69.881 69.881 86 50 86" stroke="#FB593B" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 98C23.492 98 2 76.508 2 50C2 23.492 23.492 2 50 2C76.508 2 98 23.492 98 50C98 76.508 76.508 98 50 98" stroke="#FB593B" stroke-opacity="0.25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bleOff: `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.75" d="M50 74C36.746 74 26 63.254 26 50C26 36.746 36.746 26 50 26C63.254 26 74 36.746 74 50C74 63.254 63.254 74 50 74" stroke="#0066E6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M42.5 56.25L56.25 44.375L48.75 38.75V61.25L56.25 55.625L42.5 43.75" stroke="#0066E6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 86C30.119 86 14 69.881 14 50C14 30.119 30.119 14 50 14C69.881 14 86 30.119 86 50C86 69.881 69.881 86 50 86" stroke="#0066E5" stroke-opacity="0.5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 98C23.492 98 2 76.508 2 50C2 23.492 23.492 2 50 2C76.508 2 98 23.492 98 50C98 76.508 76.508 98 50 98" stroke="#0066E5" stroke-opacity="0.25" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  arrowBottom: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66671 8.33398L10 11.6673L13.3334 8.33398" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  activePeripheral: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#A03BEF"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
export default class SearchDevide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Поиск устройства',
      loading: true,
      isBluetooth: true,
      error: null,
      devices: [],
      access: null,
      activePeripheral: null,
      errorConnect: false,
    };
  }

  scanNearByDevices = (seconds = 5) => {
    try {
      BleManager.scan([], seconds, false)
        .then(results => {
          console.log('Scanning...');
          // this.setState({scanning: true});
        })
        .catch(e => {
          console.log(e);
        });
      setTimeout(() => {
        this.stopScan();
      }, seconds * 1000);
    } catch (error) {
      console.log('scan error', error);
    }
  };
  getDiscoverdDevices = () => {
    return new Promise((resolve, reject) => {
      BleManager.getDiscoveredPeripherals()
        .then(devices => {
          console.log('Discovered devices:', devices);
        })
        .catch(error => {
          console.log('error fail: ', error);
          reject(error);
        });
    });
  };
  stopScan = () => {
    try {
      console.log('stopScan');
      BleManager.stopScan().then(res => {
        console.log(this.props.peripherals);
        if (!this.props.peripherals.length) {
          this.error();
        } else {
          this.isPeripherals();
        }
      });
    } catch (error) {}
  };
  repeatSearch = () => {
    if (this.state.isBluetooth) {
      this.setState({
        loading: true,
        error: null,
        errorConnect: false,
        title: 'Поиск устройства',
      });
      this.scanNearByDevices();
    }
  };
  checkState = () => {
    BleManager.checkState();
    bleManagerEmitter.addListener('BleManagerDidUpdateState', args => {
      if (args.state === 'off') {
        this.setState({
          title: 'Bluetooth выключен',
          isBluetooth: false,
          loading: false,
        });
      } else {
        this.setState({
          isBluetooth: true,
        });
        this.repeatSearch();
      }
    });
  };
  componentDidMount = async () => {
    console.log('cdm');
    try {
      this.scanNearByDevices();
      this.checkState();
      const {BleManagerEmitter} = this.props;
      // BleManagerEmitter.addListener(
      //   'BleManagerDiscoverPeripheral',
      //   this.handleDiscoverPeripheral,
      // );
      // BleManagerEmitter.addListener(
      //   'BleManagerStopScan',
      //   this.handleStopScan,
      // );
      BleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        this.handleDisconnectedPeripheral,
      );
      // BleManagerEmitter.addListener(
      //   'BleManagerDidUpdateValueForCharacteristic',
      //   this.handleUpdateValueForCharacteristic,
      // );
      // this.getDiscoverdDevices();
    } catch (error) {
      this.error();
    }
  };
  handleDisconnectedPeripheral = data => {
    this.setState({errorConnect: true});
    this.error('Не удалось подключиться');
  };
  isPeripherals = () => {
    this.setState({
      error: false,
      loading: false,
    });
  };
  error = title => {
    this.setState({
      error: true,
      loading: false,
      title: title || 'Устройство не найдено',
    });
  };
  clickPeripheral = i => {
    const {activePeripheral} = this.state;
    if (activePeripheral === i) {
      this.setState({activePeripheral: null});
    } else {
      this.setState({activePeripheral: i});
    }
  };
  connectPeripheral = id => {
    BleManager.connect(id)
      .then(() => {
        // Success code
        console.log('Connected');
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  };
  render() {
    const {activePeripheral} = this.state;
    const {errorConnect} = this.props;
    return (
      <>
        <Text style={s.title}>{this.state.title}</Text>
        <View style={s.wrapper}>
          {this.state.isBluetooth ? (
            <View
              style={[styles.center, {height: 260, alignItems: 'flex-start'}]}>
              {!this.props.peripherals.length || this.state.loading ? (
                <SvgXml xml={icons.watch} />
              ) : null}
              {this.state.loading == true ? (
                <View
                  style={{
                    position: 'absolute',
                  }}>
                  <SvgXml xml={icons.loading} style={{marginTop: 73}} />
                </View>
              ) : this.state.errorConnect ? (
                <>
                  <Text style={s.lightText}>
                    Мы не смогли подключиться к устройству
                  </Text>
                  <SvgXml
                    xml={icons.error}
                    style={{position: 'absolute', marginTop: 73}}
                  />
                </>
              ) : !this.props.peripherals.length ? (
                <SvgXml
                  xml={icons.error}
                  style={{position: 'absolute', marginTop: 73}}
                />
              ) : (
                <View style={{width: '100%'}}>
                  {this.props.peripherals.map((peripheral, i) => (
                    <>
                      <TouchableOpacity
                        activeOpacity={1}
                        key={i}
                        style={s.peripheral}
                        onPress={() => this.clickPeripheral(i)}>
                        {this.state.activePeripheral === i ? (
                          <SvgXml
                            xml={icons.activePeripheral}
                            style={{marginRight: 8}}
                          />
                        ) : (
                          <View style={s.ratio} />
                        )}
                        <Text style={{color: 'white'}}>{peripheral.name}</Text>
                      </TouchableOpacity>
                      {i === this.props.peripherals.length - 1 ? (
                        <></>
                      ) : (
                        <View key={Math.random()} style={s.peripheralLine} />
                      )}
                    </>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View style={{alignItems: 'center', height: 260}}>
              <Text style={s.lightText}>
                На вашем устройстве не включен Bluetooth. Включите его и
                повторите поиск
              </Text>
              <SvgXml xml={icons.bleOff} />
            </View>
          )}
        </View>
        {!this.state.devices.length &&
        !this.state.loading &&
        !this.state.error &&
        this.state.isBluetooth ? (
          <>
            {activePeripheral !== null ? (
              <TouchableOpacity
                style={[s.button]}
                onPress={() =>
                  this.connectPeripheral(
                    this.props.peripherals[activePeripheral].id,
                  )
                }>
                <Text style={s.whiteText}>Подключить</Text>
              </TouchableOpacity>
            ) : null}
            {activePeripheral === null ? (
              <View style={[s.button, {opacity: 0.2}]}>
                <Text style={s.whiteText}>Подключить</Text>
              </View>
            ) : null}
          </>
        ) : (!this.state.loading &&
            this.state.error &&
            !this.state.errorConnect) ||
          (!this.state.isBluetooth && !this.state.errorConnect) ? (
          <TouchableOpacity style={s.button} onPress={this.repeatSearch}>
            <Text style={s.whiteText}>Повторить поиск</Text>
          </TouchableOpacity>
        ) : this.state.errorConnect ? (
          <>
            <TouchableOpacity style={s.button} onPress={this.repeatSearch}>
              <Text style={s.whiteText}>Попробовать еще раз</Text>
            </TouchableOpacity>
          </>
        ) : null}
      </>
    );
  }
}
const radius = 36;
const {width} = Dimensions.get('window');
const s = StyleSheet.create({
  title: {
    ...styles.white,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    paddingVertical: 24,
    textAlign: 'center',
    backgroundColor: '#242424',
    borderRadius: 36,
    marginBottom: 4,
  },
  wrapper: {
    borderRadius: radius,
    backgroundColor: '#242424',
    padding: 30,
  },
  peripheralLine: {
    width: '92%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: '#A03BEF',
    borderRadius: 30,
    paddingVertical: 19,
    marginTop: 24,
    alignSelf: 'center',
    width: width - 48,
  },
  peripheral: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  whiteText: {
    ...styles.white,
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
  },
  ratio: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#5B5B5B',
    marginRight: 8,
  },
  lightText: {
    color: '#5B5B5B',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 21,
    textAlign: 'center',
    marginBottom: 24,
  },
});
