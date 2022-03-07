import { useNavigation } from "@react-navigation/native";
import {format} from 'date-fns';
import {ko} from 'date-fns/locale';
import React, {useState, useReducer} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TransparentCircleButton from "./TransparentCircleButton";
import DateTimePickerModal from "react-native-modal-datetime-picker";

// method 2. useReducer
const initialState = {mode: 'date', visible: false};
function reducer(state, action) {
    switch (action.type) {
        case 'open':
            return {
                mode: action.mode,
                visible: true,
            };
        case 'close':
            return {
                ...state,
                visible: false,
            };
        default:
            throw new Error('Unhandled action type');
    }
}

function WriteHeader({onSave, onAskRemove, isEditing, date, onChangeDate}) {
    const navigation = useNavigation();

    const onGoBack = () => {
        navigation.pop();
    };

    // method 1. useState
    // const [mode, setMode] = useState('date');
    // const [visible, setVisible] = useState(false);

    // const onPressDate = () => {
    //     setMode('date');
    //     setVisible(true);
    // };

    // const onPressTime = () => {
    //     setMode('time');
    //     setVisible(true);
    // };

    // const onConfirm = (selectedDate) => {
    //     setVisible(false);
    //     onChangeDate(selectedDate);
    // };

    // const onCancel = () => {
    //     setVisible(false);
    // };

    // method 2. useReducer
    const [state, dispatch] = useReducer(reducer, initialState);
    const open = (mode) => dispatch({type: 'open', mode});
    const close = () => dispatch({type: 'close'});

    const onConfirm = (selectedDate) => {
        close();
        onChangeDate(selectedDate);
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
                {isEditing && (
                    <TransparentCircleButton
                        name="delete-forever"
                        color="#ef5350"
                        hasMarginRight
                        onPress={onAskRemove}
                    />
                )}
                <TransparentCircleButton
                    name="check"
                    color="#009688"
                    onPress={onSave}
                />
            </View>
            <View style={styles.center}>
                {/* <Pressable onPress={onPressDate}> */}
                <Pressable onPress={() => open('date')}>
                    <Text>
                        {format(new Date(date), 'PPP', {
                            locale: ko,
                        })}
                    </Text>
                </Pressable>
                <View style={styles.separator} />
                {/* <Pressable onPress={onPressTime}> */}
                <Pressable onPress={() => open('time')}>
                    <Text>{format(new Date(date), 'p', {locale: ko})}</Text>
                </Pressable>
            </View>
            <DateTimePickerModal
                // isVisible={visible}
                isVisible={state.visible}
                //mode={mode}
                mode={state.mode}
                onConfirm={onConfirm}
                onCancel={close}
                date={date}
            />
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
    center: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: -1,
        flexDirection: 'row',
    },
    separator: {
        width: 8,
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