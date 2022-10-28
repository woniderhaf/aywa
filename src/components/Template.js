import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

// components
import Loader from '../components/Loader';
import Header from '../components/Header';
import HeaderInner from '../components/HeaderInner';
import Tabs from '../components/Tabs';

// helpers
import {Utils} from '../helpers/Index';

export default class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: this.props.loading,
    };
  }
  panel = null;

  componentDidMount = async () => {};
  render() {
    const {
      styles,
      title,
      smallTitle,
      navigation,
      page,
      link,
      children,
      isheader,
      isinner,
      isinnerHeight,
      loading,
      headerContext,
      bg,
    } = this.props;
    return (
      <View style={[styles.wrapper]}>
        <View style={[styles.container, s.container]}>
          {isheader ? (
            isinner ? (
              <HeaderInner
                title={title}
                smallTitle={smallTitle}
                styles={styles}
                navigation={Utils.empty(page) ? navigation : null}
                link={link}
                context={headerContext}
                isinnerHeight={isinnerHeight}
                bg={bg}
              />
            ) : (
              <Header title={title} styles={styles} context={headerContext} />
            )
          ) : null}
          {loading ? <Loader styles={styles} /> : children}
        </View>
        {page ? (
          <Tabs
            styles={styles}
            page={page.toLowerCase()}
            navigation={navigation}
          />
        ) : null}
      </View>
    );
  }
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
});
