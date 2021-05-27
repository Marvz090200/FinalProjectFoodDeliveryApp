import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/colors';
import { SecondaryButton } from '../components/Buttons';


const DetailsScreen = ({navigation,route}) => {
     const item = route.params
     
    return (
      <SafeAreaView style={{backgroundColor: COLORS.white}}>
         <View style={style.header}>
           <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
           <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
         </View>
         <ScrollView showsVerticalScrollIndicator={false}>
            <View 
              style={{
                justifyContent: 'center', 
                alignItems: 'center', 
                height: 280,
              }}>
                <Image source={item.image} style={{height: 220, width: 320}} />
              </View>
              <View style={style.details}>
                <View 
                  style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                 }}>
                   <Text style={{fontSize: 25, fontWeight: 'bold', color: COLORS.dark}}>{item.name}</Text>
                   <View style={style.iconContainer}>
                     <Icon name="favorite-border" color={COLORS.primary} size={25} />
                   </View>
                 </View>
                 <Text style ={style.detailsText}>
                    Hey!!! Did you like this food? If you do, just check out
                    and wait for our delivery service to bring your food freshly cooked.
                 </Text>
                 <View style={{marginTop: 40, marginHorizontal: 40}}>
                     <SecondaryButton title="Add to Cart" />
                 </View>
              </View>
         </ScrollView>
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
  details: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 130,
    backgroundColor: COLORS.secondary,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
  },
  iconContainer:{
    backgroundColor: COLORS.white,
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  detailsText: {
    marginTop: 10,
    lineHeight: 22,
    fontSize: 20,
    color: COLORS.white,
  },
});
export default DetailsScreen;