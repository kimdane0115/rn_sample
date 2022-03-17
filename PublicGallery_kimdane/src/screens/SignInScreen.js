import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignButtons from '~/components/SignButtons';
import SignInForm from '~/components/SignForm';
import {signIn, signUp} from '~/lib/auth';
import {getUser} from '~/lib/users';
import {useUserContext} from '../contexts/UserContext'

function SignInScreen({navigation, route}) {
    const {isSignUp} = route.params || {};
    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState();
    const {setUser} = useUserContext();

    // clean-up function
    // useEffect(() => {
    //     return () => setLoading(false);
    // }, []);

    const createChangeTextHandler = (name) => (value) => {
        setForm({...form, [name]: value});
    };

    const onSubmit = async () => {
        Keyboard.dismiss();
        const {email, password, confirmPassword} = form;

        if (isSignUp && password !== confirmPassword) {
            Alert.alert('실패', '비밀번호가 일치하지 않습니다.');
            return;
        }

        setLoading(true);
        const info = {email, password};
        
        try {
            const {user} = isSignUp ? await signUp(info) : await signIn(info);
            const profile = await getUser(user.uid);
            setLoading(false);
            
            if (!profile) {
                navigation.navigate('Welcome', {uid: user.uid});
            } else {
                setUser(profile);
            }
            console.log(user);
        } catch (e) {
            const message = {
                'auth/email-already-in-use': '이미 가입된 이메일입니다.',
                'auth/wrong-password' : '잘못된 비밀번호입니다.',
                'auth/user-not-found' : '존재하지 않는 계정입니다.',
                'auth/invalid-email' : '유효하지 않은 이메일 주소입니다.',
            };
            const msg = message[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
            Alert.alert('실패', msg);
            setLoading(false);
        }
        // Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
        // 아래 finally 에서 위의 Warning 발생
        // try문 안에서 api 호출을 하기전 loading이라는 state를 setLoading함수를 통해 true로 만들고 api 통신을 한 이후, success를 받고 router를 이동시킵니다.
        // 하지만 finally로 인해서 router가 이동한 후에(컴포넌트가 언마운트 된 후) setLoading을 한번더 하면서, 위에서 말한 발생 이유 1번 사항에 걸렸습니다.
        // } finally {
        //     setLoading(false);
        // }
        //console.log(form);
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.select({ios: 'padding'})}>
        <SafeAreaView style={styles.fullscreen}>
            <Text style={styles.text}>PublicGallery</Text>
            <View style={styles.form}>
                <SignInForm
                    isSignUp={isSignUp}
                    onSubmit={onSubmit}
                    form={form}
                    createChangeTextHandler={createChangeTextHandler}
                />
                <SignButtons
                    isSignUp={isSignUp}
                    onSubmit={onSubmit}
                    loading={loading}
                />
            </View>
        </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    fullscreen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    form: {
        marginTop: 64,
        width: '100%',
        paddingHorizontal: 16,
    },
});

export default SignInScreen;