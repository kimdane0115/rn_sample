import { useNavigation } from "@react-navigation/native";
import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparentCircleButton from "./TransparentCircleButton";

function WriteHeader({onSave}) {
    const navigation = useNavigation();

    const onGoBack = () => {
        navigation.pop();
    };

    return (
        <View style={styles.block}>
            <View style={styles.iconButtonWrapper}>
                <TransparentCircleButton
                    onPress={onGoBack}
                    name="arrow-back"
                    color="#424242"
                />
            </View>
            <View style={styles.buttons}>
                <TransparentCircleButton
                    name="delete-forever"
                    color="#ef5350"
                    hasMarginRight
                />
                <TransparentCircleButton
                    name="check"
                    color="#009688"
                    onPress={onSave}
                />
            </View>
        </View>
    );

    // retrun (
    //     <View style={styles.block}>
    //         <View style={styles.iconButtonWrapper}>
    //             <Pressable
    //                 style={styles.iconButton}
    //                 onPress={onGoBack}
    //                 android_ripple={{color: '#ededed'}}>
    //                 <Icon name="arrow-back" size={24} color="#424242" />
    //             </Pressable>
    //         </View>
    //         <View style={styles.buttons}>
    //             <View style={[styles.iconButtonWrapper, styles.marginRight]}>
    //                 <Pressable
    //                     style={[styles.iconButton]}
    //                     android_ripple={{color: '#ededed'}}>
    //                     <Icon name="delete-forever" size={24} color="#ef5350" />
    //                 </Pressable>
    //             </View>
    //             <View style={styles.iconButtonWrapper}>
    //                 <Pressable
    //                     style={styles.iconButton}
    //                     android_ripple={{color: '#ededed'}}>
    //                     <Icon name="check" size={24} color="#009688" />
    //                 </Pressable>
    //             </View>
    //         </View>
    //     </View>
    // );
}

const styles = StyleSheet.create({
    block: {
        height: 48,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

// const styles = StyleSheet.create({
//     block: {
//         height: 48,
//         paddingHorizontal: 8,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//     },
//     iconButtonWrapper: {
//         width: 32,
//         height: 32,
//         borderRadius: 16,
//         overflow: 'hidden',
//     },
//     iconButton: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 32,
//         height: 32,
//         borderRadius: 16,
//     },
//     buttons: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     marginRight: {
//         marginRight: 8,
//     },
// });

export default WriteHeader;