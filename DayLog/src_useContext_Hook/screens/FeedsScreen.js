import React, {useContext} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

import LogContext from '~/contexts/LogContext';

function FeedsScreen() {
    const {text, setText} = useContext(LogContext);
    return (
        <View style={styles.block}>
            {/* <LogContext.Consumer>
                {(value) => <Text>{value}</Text>}
            </LogContext.Consumer> */}
            {/* children Props(RenderProps)
            <Box>
                {(value) => <Text>{value}</Text>}
            </Box> */}
            <TextInput
                value={text}
                onChangeText={setText}
                placeholder="텍스트를 입력하세요."
                style={styles.input}
            />
        </View>
    );
}

function Box({children}) {
    return <View style={styles.box}>{children('Hello World')}</View>;
}

const styles = StyleSheet.create({
    block: {},
    box: {
        borderWidth: 2,
        padding: 16,
        borderBottomColor: 'black',
        marginBottom: 16,
    },
    input: {
        padding: 16,
        backgroundColor: 'white',
    },
});

export default FeedsScreen;