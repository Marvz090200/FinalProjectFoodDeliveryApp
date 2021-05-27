import React, {useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View, Dimensions, FlatList, ScrollView, TextInput, TouchableOpacity, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import categories from '../../consts/categories';
import foods from '../../consts/foods';
import COLORS from '../../consts/colors';

import { Entypo } from '@expo/vector-icons';
import firebase from "firebase";
import * as Facebook from 'expo-facebook';
import "firebase/auth";
import { retrieveAUser, saveAUser } from '../screens/firebaseHelper';
import { Zocial } from '@expo/vector-icons';
// import * as Google from 'expo-google-app-auth';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';

const {width} = Dimensions.get("screen");
const cardWidth = width/2 - 20;

const HomeScreen = ({navigation}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const [loading, setLoading] = useState(false);

    const onFacebookSigninPress = async () => {
        setLoading(true);
        try {
            await Facebook.initializeAsync({
                appId: '1726554707531440',
            }); // enter your Facebook App Id 
            const { type,
                token, 
                expirationDate,
                permissions,
                declinedPermissions,
                } = await Facebook.logInWithReadPermissionsAsync({
                    permissions: ['public_profile', 'email'],
                });
            if (type === 'success') {   
                // SENDING THE TOKEN TO FIREBASE TO HANDLE AUTHyarn

                const credential = firebase.auth.FacebookAuthProvider.credential(token);
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(() => {
                        return firebase.auth().signInWithCredential(credential)
                            .then(user => {
                                // All   the details about user are in here returned from firebase            
                                // console.log("fb signin", user);   
                                console.log("facebook login ", user, user.additionalUserInfo);
                                let userData = {
                                    provider: user.additionalUserInfo.providerId,
                                    family_name: user.additionalUserInfo.profile.last_name,
                                    given_name: user.additionalUserInfo.profile.first_name,
                                    displayName: user.additionalUserInfo.profile.name,
                                    email: user.additionalUserInfo.profile.email,
                                    lastLoginAt: new Date().toString(),
                                    photoURL: user.additionalUserInfo.profile.picture.data.url,
                                    uid: user.user.uid,

                                }
                                console.log("userdata", userData)
                                saveAUser(userData);
                                navigation.navigate("HomeScreen");
                                // onLoginSuccess(userData);
                            })
                            .catch((error) => {
                                console.log('Error occurred ', error)
                                setLoading(false);
                            });
                    });


            } else {
                // type === 'cancel'
                setLoading(false);
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }



    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
          clientId: '152519783024-2ulbl7lkv688anrqhdghp2fde79pneo9.apps.googleusercontent.com',
          },
      );
    
      React.useEffect(() => {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          
          const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
          firebase.auth().signInWithCredential(credential)
          .then(user => {
              console.log("successful google signin, who is user", user, user.additionalUserInfo);
              let userData = {
                provider: user.additionalUserInfo.providerId,
                displayName: user.additionalUserInfo.profile.name,
                email: user.additionalUserInfo.profile.email,
                lastLoginAt: new Date().toString(),
                uid: user.user.uid,

            }
            console.log("userdata", userData)
            saveAUser(userData);
            navigation.navigate("Home");
          });
        }
      }, [response]);
    

  const ListCategories = () =>{
    return (
      <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles}>
      {categories.map((category, index) => (
        <TouchableOpacity 
        key={index} 
        activeOpacity={0.8}
        onPress={() => setSelectedCategoryIndex(index)}>
          <View 
            style={{
            backgroundColor:selectedCategoryIndex== index
            ? COLORS.primary
            : COLORS.white,
            ...styles.categoryBtn,
          }}>
            <View style={styles.categoryBtnImgCon}>
              <Image 
                source={category.image}
                style={{height: 23, width: 27, resizeMode: 'center'}}
              />
            </View>
            <Text 
              style={{
                fontSize: 15, 
                fontWeight: 'bold', 
                marginLeft: 10, 
                color:
                  selectedCategoryIndex == index 
                  ? COLORS.white
                  : COLORS.primary
              }}>
              {category.name}
              </Text>
          </View>
        </TouchableOpacity>
      ))}
      </ScrollView>
    );
  };
  const Card = ({food}) => {
   return (
     <TouchableHighlight 
       underlayColor={COLORS.white} 
       activeOpacity={0.9} 
       onPress={() => navigation.navigate('DetailsScreen', food)}>
       <View style={styles.card}>
         <View style={{alignItems: 'center', top: 0}}>
          <Image source={food.image} style={{height: 100, width: 136}}/>
       </View>
       <View style={{marginHorizontal: 20}}>
         <Text style={{fontSize: 15, fontWeight: 'bold'}}>{food.name}</Text>
         <Text style={{fontSize: 13, color: COLORS.grey, marginTop: 2}}>
           {food.includings}
         </Text>
       </View>
       <View 
         style={{
           marginTop: 10, 
           marginHorizontal: 20, 
           flexDirection: 'row', 
           justifyContent: 'space-between'
         }}>
           <Text style={{fontSize: 18, fontWeight: 'bold'}}>${food.price}</Text>
           <View style={styles.addToCartbtn}>
           <Icon name="add" size={20} color={COLORS.white}/>
           </View>
         </View>
     </View>
     </TouchableHighlight>
     
   );
  };
  return (

  <SafeAreaView style={{flex: 1, backgroundColor: COLORS.secondary}}>
        <View styles={styles.header}>
        <View>
         <View style={styles.container1} >
           
<Text style= {styles.text}>Login using </Text>
<Entypo name="facebook" size={30} color="blue" onPress={onFacebookSigninPress}/>
<Text style= {styles.text}> or </Text>
<Zocial name="gmail" size={30} color="red" onPress={() => {promptAsync();}}/>

        </View></View>
            <View>
              <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: 28}}>Welcome to </Text>
                  <Text style={{fontSize: 28,fontWeight:'bold',marginRight: 20}}>
                  Order N' Eat.
                 </Text>
              </View>
              <Text style={{marginTop:5,fontSize:20, color: COLORS.dark}}>
                 What do you want to buy?
              </Text>
           </View>
        </View>
        <View 
          style={{
           marginTop: 20,
           flexDirection: 'row',
           paddingHorizontal: 20,
           }}>
           <View style={styles.inputContainer}>
              <Icon name="search" size={28} />
              <TextInput
                style={{flex: 1, fontSize: 18}}
                placeholder="Search for food"
              />
            </View>
            <View style={styles.sortBtn}>
              <Icon name="tune" size={28} color={COLORS.white} />
            </View>
          </View>
          <View>
            <ListCategories />
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            numColumns={2}
            data={foods}
            renderItem={({item})=><Card food={item}/>}
          />
     </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 22,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingHorizontal: 20,
  },
  inputContainer: {
     flex: 1,
     height: 50,
     borderRadius: 10,
     flexDirection: 'row',
     backgroundColor: COLORS.white,
     alignItems: 'center',
     paddingHorizontal: 20,
  },
  sortBtn:{
    width: 50,
    height: 50,
    marginLeft: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesListContainer: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  categoryBtn: {
    height: 45,
    width: 120,
    marginRight: 7,
    borderRadius: 30,
    alignItems:'center',
    paddingHorizontal: 5,
    flexDirection: 'row',
  },
  categoryBtnImgCon: {
    height: 35,
    width: 35,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    height: 220,
    width: cardWidth,
    marginHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15,
    elevation: 13,
    backgroundColor: COLORS.white,
  },
  addToCartbtn:{
    height: 25,
    width: 25,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
    container: {
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    text: {
        fontSize: 25,
        color: 'green'
    },
});
export default HomeScreen;