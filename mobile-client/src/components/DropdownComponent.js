import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export const DropdownComponent = ({data, setFormValue, placeholder, disableBtn, Icon}) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      disable={disableBtn}
      onChange={item => {
        setValue(item.value);
        setFormValue(item.value);
      }}
      renderLeftIcon={() => (Icon)}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    width: '50%',
    color: 'red',
    marginLeft: -5,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#F4F1FF',
    borderColor: '#D8D7FE',
    borderStyle: 'solid',
    borderWidth: 2,
    borderRadius:18,
    fontFamily: 'poppinsRegular',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray'
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});