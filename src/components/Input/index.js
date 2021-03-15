import React from 'react';
import { Input as ElementInput } from 'react-native-elements';
import inputStyles from './style';

const Input = (props) => {
    return (
        <ElementInput
            {...props}
            ref={props.inputRef}
            labelStyle={{
                color: 'black',
                fontFamily: 'Montserrat-Medium',
                fontWeight: 'normal'
            }}
            containerStyle={inputStyles.containerStyle}
            placeholderTextColor={'#9AA1B1'}
            inputContainerStyle={inputStyles.inputContainerStyle}
            inputStyle={inputStyles.inputStyle}
        />
    );
}
export default Input;