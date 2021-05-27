import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';

const TermsAndConditions = ({navigation}) => {
    return <View></View>;
  }
 return (
    <SafeAreaView 
      style={{backgroundColor: COLORS.secondary, flex: 1}}>
        <View style={style.header}>
           <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
           <Text style={{fontSize: 20, fontWeight: 'bold'}}>Terms And Conditions</Text>
        </View>
    </SafeAreaView>
 );
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,

  }
});

export default TermsAndConditions;