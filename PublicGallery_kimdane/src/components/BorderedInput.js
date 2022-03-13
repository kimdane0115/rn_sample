import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

//function BorderedInput({hasMarginBottom, onChangeText, value, placeholder}) {
function BorderedInput({hasMarginBottom, ...rest}, ref) {
    return (
        <TextInput style={[styles.input, hasMarginBottom && styles.margin]}
            // onChangeText={onChangeText}
            // value={value}
            // placeholder={placeholder}
            ref={ref}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderColor: '#bdbdbd',
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 4,
        height: 48,
        backgroundColor: 'white',
    },
    margin: {
        marginBottom: 16,
    },
});

//export default BorderedInput;
export default React.forwardRef(BorderedInput);