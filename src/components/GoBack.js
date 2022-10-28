import React from 'react';
import {TouchableOpacity} from 'react-native';

// plug-ins
import {SvgXml} from 'react-native-svg';

export default GoBack = props => {
  const {navigation, link, color, style, isinnerHeight} = props;
  return (
    <TouchableOpacity
      style={style || {}}
      onPress={() => (link ? link() : navigation.goBack())}>
      <SvgXml
        width={24}
        height={24}
        style={isinnerHeight && {transform: [{rotate: '90deg'}]}}
        fill={color || '#858585'}
        xml={
          '<svg viewBox="0 0 24 24"><path d="M9 12L8.29289 11.2929L7.58579 12L8.29289 12.7071L9 12ZM14.2929 5.29289L8.29289 11.2929L9.70711 12.7071L15.7071 6.70711L14.2929 5.29289ZM8.29289 12.7071L14.2929 18.7071L15.7071 17.2929L9.70711 11.2929L8.29289 12.7071Z"/></svg>'
        }
      />
    </TouchableOpacity>
  );
};
