import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import foods from '../../consts/foods';

const CartScreen = ({navigation}) => {
  const CartCard = () => {
    return <View></View>;
  }
 return (
    <SafeAreaView 
      style={{backgroundColor: COLORS.secondary, flex: 1}}>
        <View style={style.header}>
           <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
           <Text style={{fontSize: 20, fontWeight: 'bold'}}>Cart</Text>
        </View>
        <FlatList 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{paddingBottom: 80}}
        data={foods}
        renderItem={({item}) => <CartCard item={item} />}
      />
    </SafeAreaView>
 );
};
const style = StyleSheet.create({
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cartCard: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default CartScreen;