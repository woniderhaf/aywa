/*
 * (c) pavit.design, 2022
 */

import React, {Component, useCallback} from 'react';
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
  TextInput,
} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';
import 'moment/locale/ru';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
// components
import Template from '../../components/Template';
import CardItem from '../Shop/CardItem';
import CardItemLoader from '../Shop/CardItemLoader';
// helpers
import {App, Http, Storage, Utils} from '../../helpers/Index';

// globals
import {rarity} from '../../globals/Сonstants';

// styles
import styles from '../../styles/Styles';

// icons
const icons = {
  coins:
    '<svg width="20" height="20" viewBox="0 0 20 20"><path d="M11.6667 13.3333C9.08933 13.3333 7 11.244 7 8.66667C7 6.08933 9.08933 4 11.6667 4C14.2453 4 16.3333 6.08933 16.3333 8.66667C16.3333 11.244 14.2453 13.3333 11.6667 13.3333Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.44 6.69141C4.97067 6.81141 3 8.83541 3 11.3341C3 13.9114 5.08933 16.0007 7.66667 16.0007C9.52933 16.0007 11.124 14.9021 11.8733 13.3234" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  placeholder:
    '<svg width="72" height="72" viewBox="0 0 72 72"><path d="M29.6367 42.363C30.6832 43.4098 31.9718 44.1824 33.3882 44.6122C34.8046 45.042 36.3052 45.1159 37.7569 44.8272C39.2087 44.5385 40.5669 43.8962 41.7111 42.9572C42.8553 42.0182 43.7503 40.8114 44.3167 39.4439C44.8831 38.0763 45.1034 36.5902 44.9582 35.1172C44.813 33.6441 44.3068 32.2296 43.4843 30.999C42.6618 29.7683 41.5484 28.7595 40.2429 28.062C38.9373 27.3645 37.4799 26.9997 35.9997 27" stroke="url(#paint0_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9083 16.908C12.4912 21.325 9.74238 27.1369 9.13007 33.3534C8.51776 39.5699 10.0799 45.8064 13.5503 51.0002C17.0206 56.1941 22.1846 60.024 28.1622 61.8373C34.1398 63.6507 40.5612 63.3352 46.3323 60.9448C52.1034 58.5544 56.8672 54.2369 59.8118 48.7279C62.7565 43.2189 63.6999 36.8593 62.4813 30.7328C61.2627 24.6062 57.9575 19.0917 53.1288 15.1289C48.3002 11.166 42.2469 9.00005 36.0003 9" stroke="url(#paint1_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 18C39.5601 18 43.0402 19.0557 46.0003 21.0335C48.9603 23.0114 51.2675 25.8226 52.6298 29.1117C53.9922 32.4008 54.3487 36.02 53.6541 39.5116C52.9596 43.0033 51.2453 46.2106 48.7279 48.7279C46.2106 51.2453 43.0033 52.9596 39.5116 53.6541C36.02 54.3487 32.4008 53.9922 29.1117 52.6298C25.8226 51.2675 23.0114 48.9603 21.0335 46.0003C19.0557 43.0402 18 39.5601 18 36" stroke="url(#paint2_linear_263_8081)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><defs><linearGradient id="paint0_linear_263_8081" x1="21.9543" y1="-16.5" x2="43.6767" y2="54.5241" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint1_linear_263_8081" x1="-18" y1="-121.5" x2="38.9491" y2="96.6357" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient><linearGradient id="paint2_linear_263_8081" x1="-4.25242e-06" y1="-69" x2="37.9661" y2="76.4238" gradientUnits="userSpaceOnUse"><stop stop-color="white"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient></defs></svg>',
  arrowBottom: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.66671 8.33398L10 11.6673L13.3334 8.33398" stroke="#858383" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  cleaner: `<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18.4761C5.8575 18.4761 2.5 15.1186 2.5 10.9761C2.5 6.83357 5.8575 3.47607 10 3.47607C14.1425 3.47607 17.5 6.83357 17.5 10.9761C17.5 15.1186 14.1425 18.4761 10 18.4761Z" fill="#242424"/><path d="M12.3583 8.61865L7.6416 13.3353" stroke="#A03BEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.3583 13.3353L7.6416 8.61865" stroke="#A03BEF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
};
// start
export default class ShopCategoriesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: this.props.navigation.getParam('data'),
      category: this.props.navigation.getParam('category'),
      title: this.props.navigation.getParam('title'),
      loading: true,
      tab: 0,
      modalTitle: null,
      activeRatio: null,
      values: [0, 100],
      levels: [0, 10],
      //sort
      rare: [],
      isprice: false,
      scrollEnabled: true,
      mbActiveCategories: [
        {title: 'Цена', isActive: false},
        {title: 'Редкость', isActive: false},
        {title: 'Уровень', isActive: false},
      ],
    };
  }
  // otherCategories = [{title: 'Валюта'}, {title: 'Сортировка'}];
  otherCategories = [];
  panel = null;
  componentDidMount = async () => {
    if (this.state.category === 'accessories') {
      this.setState({
        mbActiveCategories: [
          {title: 'Цена', isActive: false},
          {title: 'Редкость', isActive: false},
        ],
      });
    }
    App.prepare(this.props.navigation, async user => {
      this.setMinMaxPrice();
      if (!this.state.data?.length) {
        const data = await Http.get('mat/add');
        this.setState({user: user, loading: false, data});
      } else {
        this.setState({user: user, loading: false});
      }
    });
  };
  setMinMaxPrice = () => {
    const values = this.props.navigation
      .getParam('data')
      ?.map((v, i) => v.cost);
    if (!values.length) {
      return null;
    }
    if (values.length > 1) {
      this.setState({values: [Math.min(...values), Math.max(...values)]});
    } else {
      this.setState({values: [0, values[0]]});
    }
  };
  goto = (link, data) => this.props.navigation.navigate(link, data);

  tabSet = tab => this.setState({tab});
  handleFilter = (modalTitle, tab) => {
    this.setState({modalTitle, tab}, () => this.panel.snapToIndex(0));
  };
  //кнопка применить
  apply = () => {
    const {mbActiveCategories} = this.state;
    const activeIndex = mbActiveCategories.findIndex(
      v => v.title === this.state.modalTitle,
    );
    if (activeIndex !== -1) {
      mbActiveCategories[activeIndex].isActive = true;
      this.setState({mbActiveCategories, loading: true}, () => {
        this.panel.close();
        this.sorting();
      });
    }
    //
    // if (this.state.modalTitle == 'Редкость') {
    //   if (this.state.activeRatio === null) {
    //     this.setState({data: this.props.navigation.getParam('data')}, () => {
    //       this.panel.close();
    //     });
    //   } else {
    //     this.setState({rarity: rarity[this.state.activeRatio]}, () => {
    //       this.setState(
    //         {
    //           data: this.props.navigation
    //             .getParam('data')
    //             .filter(v => v.rare === this.state.rarity),
    //         },
    //         () => this.panel.close(),
    //       );
    //     });
    //   }
    // } else if (this.state.modalTitle === 'Цена') {
    //   const data = this.props.navigation
    //     .getParam('data')
    //     .filter(
    //       (v, i) =>
    //         v.cost >= this.state.values[0] && v.cost <= this.state.values[1],
    //     );
    //   this.setState({data, isprice: true}, () => {
    //     this.panel.close();
    //   });
    // }
    // this.setState({loading: true}, this.sorting);
  };
  clear = () => {
    const {modalTitle} = this.state;
    if (modalTitle === 'Редкость') {
      this.setState({rare: []});
    } else if (modalTitle === 'Цена') {
      this.setMinMaxPrice();
    } else if (modalTitle === 'Уровень') {
      this.setState({levels: [0, 10]});
    }
  };
  clearActive = title => {
    const activeIndex = this.state.mbActiveCategories.findIndex(
      v => v.title === title,
    );
    const mbActiveCategories = this.state.mbActiveCategories;
    mbActiveCategories[activeIndex].isActive = false;

    // this.setState({mbActiveCategories});
    if (title === 'Цена') {
      this.setMinMaxPrice();
      this.setState({mbActiveCategories, loading: true}, this.sorting);
    } else if (title === 'Редкость') {
      this.setState(
        {mbActiveCategories, rare: [], loading: true},
        this.sorting,
      );
    } else if (title === 'Уровень') {
      this.setState(
        {mbActiveCategories, levels: [0, 10], loading: true},
        this.sorting,
      );
    }
  };
  enableScroll = () => this.setState({scrollEnabled: true});
  disableScroll = () => this.setState({scrollEnabled: false});
  changePrice = values => {
    this.setState({values});
  };
  changeLevel = levels => {
    this.setState({levels});
  };
  rareClick = rarity => {
    const {rare} = this.state;
    if (this.state.rare.includes(rarity)) {
      const index = rare.indexOf(rarity);
      const newRare = [
        ...rare.slice(0, index),
        ...rare.slice(index + 1, rare.length),
      ];
      this.setState({rare: newRare});
    } else {
      rare.push(rarity);
      this.setState({rare});
    }
  };
  //функция сортировки по всем параметрам
  sorting = async () => {
    let data = this.props.navigation.getParam('data');
    const time = setTimeout(() => {
      this.state.mbActiveCategories.map((v, i) => {
        if (v.isActive) {
          if (v.title === 'Цена') {
            data = data.filter(
              (item, i) =>
                item.cost >= this.state.values[0] &&
                item.cost <= this.state.values[1],
            );
          } else if (v.title === 'Редкость') {
            data = data.filter((item, i) => {
              if (this.state.rare.length) {
                // return this.state.data.map(
                //   (dataItem, i) =>
                //     this.state.rare.find(dataItem.rare) && dataItem,
                // );
                const rarityItem = rarity[item.rare];
                if (this.state.rare.includes(rarityItem)) {
                  return item;
                }
              } else {
                this.clearActive('Редкость');
                return item;
              }
            });
          } else if (v.title === 'Уровень') {
            const {levels} = this.state;
            data = data.filter(
              (item, i) =>
                item.level >= levels[0] && item.level <= levels[1] && item,
            );
          }
        }
      });

      this.setState({data, loading: false});
    }, 1000);
  };
  render() {
    return (
      <>
        <Template
          title={this.state.title}
          styles={styles}
          navigation={this.props.navigation}
          isheader={true}
          isinner={true}>
          <View style={s.container}>
            <ScrollView contentContainerStyle={s.items}>
              <View style={s.description}>
                <Text style={[styles.text, styles.boldlight]}>
                  Отправляйте только токены{' '}
                  <Text style={styles.boldmore}>AW</Text> на этот адрес.
                  Отправка любых других токенов может привести к их
                  безвозвратной потере.
                </Text>
              </View>
              <View style={s.tabs}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {this.state.mbActiveCategories.map((v, i) => (
                    <TouchableOpacity
                      key={v.title}
                      style={[s.tab, v.isActive && s.tabactive]}
                      onPress={() => {
                        this.handleFilter(v.title, i);
                      }}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.bold,
                          {marginRight: 8},
                        ]}>
                        {v.title}
                      </Text>
                      {v.isActive ? (
                        <TouchableOpacity
                          onPress={() => this.clearActive(v.title)}>
                          <SvgXml xml={icons.cleaner} />
                        </TouchableOpacity>
                      ) : (
                        <SvgXml xml={icons.arrowBottom} />
                      )}
                    </TouchableOpacity>
                  ))}
                  {this.otherCategories.map((v, i) => (
                    <TouchableOpacity
                      key={v.title}
                      style={[s.tab]}
                      onPress={() => {
                        this.handleFilter(v.title, i);
                      }}>
                      <Text
                        style={[
                          styles.text,
                          styles.middle,
                          styles.bold,
                          {marginRight: 8},
                        ]}>
                        {v.title}
                      </Text>

                      {/* <TouchableOpacity onPress={this.clear}>
                          <SvgXml xml={icons.cleaner} />
                        </TouchableOpacity> */}
                      <SvgXml xml={icons.arrowBottom} />
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              {this.state.loading ? (
                // ? new Array(4).map((v, i) => <CardItemLoader key={i} />)
                <>
                  <CardItemLoader key={new Date() + 1} />
                  <CardItemLoader key={new Date() + 2} />
                  <CardItemLoader key={new Date() + 3} />
                  <CardItemLoader key={new Date() + 4} />
                  <CardItemLoader key={new Date() + 5} />
                  <CardItemLoader key={new Date() + 6} />
                </>
              ) : (
                this.state.data?.map((v, i) => (
                  <CardItem
                    key={v._id}
                    v={v}
                    goto={this.goto}
                    type={this.state.category}
                  />
                ))
              )}
            </ScrollView>
          </View>
        </Template>
        <BottomSheet
          ref={r => (this.panel = r)}
          index={-1}
          snapPoints={[600]}
          backgroundStyle={{backgroundColor: '#0F0F0F', borderRadius: 36}}
          handleComponent={null}
          enablePanDownToClose={true}
          onChange={this.changeBottomSheet}
          backdropComponent={p => (
            <BottomSheetBackdrop
              {...p}
              pressBehavior={'close'}
              disappearsOnIndex={-1}
              opacity={0.7}
              appearsOnIndex={0}
            />
          )}>
          <>
            <Text style={s.title}>{this.state.modalTitle}</Text>
            <View style={s.main}>
              {this.state.modalTitle == 'Редкость'
                ? rarity.map((v, i) => (
                    <>
                      <TouchableOpacity
                        key={v}
                        onPress={() => this.rareClick(v)}
                        style={s.ratioBlock}>
                        {this.state.rare.find((rare, idx) => rare === v) ? (
                          <SvgXml
                            style={{marginRight: 8}}
                            xml={`<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="18" rx="9" fill="#A03BEF"/><path d="M5 9.736L7.167 11.903L7.153 11.889L12.042 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
                          />
                        ) : (
                          <View style={[s.ratio]}></View>
                        )}
                        <Text style={s.text}>{v}</Text>
                      </TouchableOpacity>
                      {rarity.length - 1 !== i ? (
                        <View key={i} style={s.hr}></View>
                      ) : null}
                    </>
                  ))
                : null}
              {this.state.modalTitle == 'Цена' ? (
                <>
                  <View style={s.priceBlock}>
                    <View style={[s.priceWrapper, {marginRight: 12}]}>
                      <Text style={s.priceText}>от</Text>
                      <Text style={s.PriceCount}>
                        {Math.floor(this.state.values[0])}
                      </Text>
                    </View>
                    <View style={s.priceWrapper}>
                      <Text style={s.priceText}>до</Text>
                      <Text style={s.PriceCount}>
                        {Math.floor(this.state.values[1])}
                      </Text>
                    </View>
                  </View>
                  <MultiSlider
                    values={[this.state.values[0], this.state.values[1]]}
                    min={this.state.values[0]}
                    max={this.state.values[1]}
                    sliderLength={width - 72}
                    onValuesChange={this.changePrice}
                    containerStyle={{
                      height: 40,
                      borderRadius: 32,
                      backgroundColor: '#5B5B5B',
                      paddingLeft: 4,
                    }}
                    trackStyle={{
                      backgroundColor: 'transparent',
                      height: 32,
                      borderRadius: 32,
                    }}
                    selectedStyle={{
                      backgroundColor: '#A03BEF',
                    }}
                    minMarkerOverlapDistance={28}
                    customMarkerLeft={e => (
                      <View
                        style={{
                          marginTop: 32,
                          marginLeft: 32,
                          width: 28,
                          height: 28,
                          borderRadius: 28,
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                    customMarkerRight={e => (
                      <View
                        style={{
                          marginTop: 32,
                          marginRight: 32,
                          width: 28,
                          height: 28,
                          borderRadius: 28,
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                    isMarkersSeparated={true}
                  />
                </>
              ) : null}
              {this.state.modalTitle == 'Уровень' ? (
                <>
                  <View style={s.priceBlock}>
                    <View style={[s.priceWrapper, {marginRight: 12}]}>
                      <Text style={s.priceText}>от</Text>
                      <Text style={s.PriceCount}>{this.state.levels[0]}</Text>
                    </View>
                    <View style={s.priceWrapper}>
                      <Text style={s.priceText}>до</Text>
                      <Text style={s.PriceCount}>{this.state.levels[1]}</Text>
                    </View>
                  </View>
                  <MultiSlider
                    values={[this.state.levels[0], this.state.levels[1]]}
                    min={this.state.levels[0]}
                    max={this.state.levels[1]}
                    sliderLength={width - 72}
                    onValuesChange={this.changeLevel}
                    containerStyle={{
                      height: 40,
                      borderRadius: 32,
                      backgroundColor: '#5B5B5B',
                      paddingLeft: 4,
                    }}
                    trackStyle={{
                      backgroundColor: 'transparent',
                      height: 32,
                      borderRadius: 32,
                    }}
                    selectedStyle={{
                      backgroundColor: '#A03BEF',
                    }}
                    minMarkerOverlapDistance={28}
                    customMarkerLeft={e => (
                      <View
                        style={{
                          marginTop: 32,
                          marginLeft: 32,
                          width: 28,
                          height: 28,
                          borderRadius: 28,
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                    customMarkerRight={e => (
                      <View
                        style={{
                          marginTop: 32,
                          marginRight: 32,
                          width: 28,
                          height: 28,
                          borderRadius: 28,
                          backgroundColor: 'white',
                        }}
                      />
                    )}
                    isMarkersSeparated={true}
                  />
                </>
              ) : null}
            </View>
            <View style={s.buttonBlock}>
              <TouchableOpacity
                style={[
                  s.modalButton,
                  {backgroundColor: '#313131'},
                  styles.mr10,
                ]}
                onPress={this.clear}>
                <Text style={styles.white}>Очистить</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[s.modalButton, {backgroundColor: '#A03BEF'}]}
                onPress={this.apply}>
                <Text style={styles.white}>Применить</Text>
              </TouchableOpacity>
            </View>
          </>
        </BottomSheet>
      </>
    );
  }
}

const {width, height} = Dimensions.get('window');
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: styles.black.color,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingBottom: 40,
  },
  description: {
    marginHorizontal: 15,
    paddingBottom: 20,
  },
  item: {
    width: width / 2 - 5,
    height: 228,
    marginBottom: 10,
    borderRadius: 36,
    backgroundColor: styles.black2.color,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 162,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: styles.blacklight.color,
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
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
  },
  tab: {
    marginRight: 5,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 22,
    backgroundColor: styles.black2.color,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabactive: {
    backgroundColor: styles.violet.color,
  },
  title: {
    ...styles.white,
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 32,
    backgroundColor: '#242424',
    borderRadius: 36,
    paddingVertical: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  main: {
    backgroundColor: '#242424',
    borderRadius: 32,
    paddingVertical: 43,
    paddingHorizontal: 32,
  },
  buttonBlock: {
    marginTop: 24,
    flexDirection: 'row',
    alignItem: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  modalButton: {
    paddingVertical: 19,
    paddingHorizontal: 32,
    borderRadius: 30,
    textAlign: 'center',
  },
  ratioBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  ratio: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: '#5B5B5B',
    marginRight: 8,
  },
  hr: {
    flexDirection: 'row',
    height: 1,
    backgroundColor: 'rgba(255,255,255, 0.05)',
    // marginVertical: 16,
    width: width - 64 - 27,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 19,
    ...styles.white,
  },
  //price
  priceBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  priceWrapper: {
    width: '50%',
  },
  priceText: {
    color: '#5B5B5B',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 17,
  },
  PriceCount: {
    ...styles.white,
    fontWeight: '400',
    fontSize: 24,
    lineHeight: 31,
  },
});
