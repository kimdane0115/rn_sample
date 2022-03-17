import React from 'react';
import {StyleSheet, View} from 'react-native';
import { useUserContext } from '~/contexts/UserContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import Icon from 'react-native-vector-icons/MaterialIcons'
import CameraButton from '~/components/CameraButton';

const Tab = createBottomTabNavigator();

function MainTab() {
    const {user} = useUserContext();
    return (
        <>
        <View style={styles.block}>
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#6200ee',
            }}>
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: ({color}) => <Icon name="home" size={24} color={color} />,
                }}
            />
            <Tab.Screen
                name="MyProfileStack"
                component={MyProfileStack}
                options={{
                    tabBarIcon: ({color}) => (
                    <Icon name="person" size={24} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
        </View>
        <CameraButton />
        </>
        // <View style={styles.block}>
        //     {/* {user.photoURL && (
        //         <Image
        //             source={{uri: user.photoURL}}
        //             style={{width: 128, height: 128, marginBottom: 16}}
        //             resizeMode="cover"
        //         />
        //     )} */}
        //     {/* {user.photoURL ? (
        //         <Image
        //             source={{uri: user.photoURL}}
        //             style={{width: 128, height: 128, marginBottom: 16}}
        //             resizeMode="cover"
        //         />
        //     ) : (
        //         <Image
        //             source={require('../assets/user.png')}
        //             style={{width: 128, height: 128, marginBottom: 16}}
        //             resizeMode="cover"
        //         />
        //     )} */}
        //     <Image
        //         source={
        //             user.photoURL ? {uri: user.photoURL} : require('../assets/user.png')
        //         }
        //         style={{width: 128, height: 128, marginBottom: 16}}
        //         resizeMode="cover"
        //     />
        //     <Text style={styles.text}>Hello, {user.displayName}</Text>
        // </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        zIndex: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default MainTab;