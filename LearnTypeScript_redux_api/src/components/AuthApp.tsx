import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import useAuthActions from '~/hooks/useAuthActions';
import useUser from '~/hooks/useUser';
// import { RootState } from '~/slices';
// import { authorize, logout } from '~/slices/auth';

function AuthStatus() {
    const user = useUser();
    //const user = useSelector((state: RootState) => state.auth.user);
    //const user = useSelector((state) => state.auth.user);

    return (
        <View style={styles.status}>
            <Text style={styles.text}>
                {user ? user.displayName: '로그인하세요'}
            </Text>
        </View>
    );
}

function AuthButtons() {
    const {authorize, logout} = useAuthActions();
    const onPressLogin = () => {
        authorize({
            id: 1,
            username: 'johndoe',
            displayName: 'John Doe',
        });
    };
    // const dispatch = useDispatch();
    // const onPressLogin = () => {
    //     dispatch(
    //         authorize({
    //             id: 1,
    //             username: 'johndoe',
    //             displayName: 'John Doe',
    //         }),
    //     );
    // };
    // const onPressLogout = () => {
    //     dispatch(logout());
    // };

    return (
        <View>
            <Button title="로그인" onPress={onPressLogin} />
            <Button title="로그아웃" onPress={logout} />
            {/* <Button title="로그아웃" onPress={onPressLogout} /> */}
        </View>
    );
}

function AuthApp() {
    return (
        <SafeAreaView style={styles.block}>
            <AuthStatus />
            <AuthButtons />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    block: {flex: 1},
    status: {flex: 1, alignItems: 'center', justifyContent: 'center'},
    text: {fontSize: 20},
});

export default AuthApp;