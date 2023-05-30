import React, {useState} from 'react';
import CheckboxField from "../checkboxField/CheckboxField";
import InputTextField from "../inputField/InputField";

interface IInputPhoneNumber {
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputPhoneNumber = ({value, handleChange}: IInputPhoneNumber) => {
    const [typeNumber, setTypeNumber] = useState<boolean>(false);

    return (
        <div className="inputPhoneNumber">
            <CheckboxField id="typeNumber"
                           value={typeNumber}
                           changeHandler={() => setTypeNumber(!typeNumber)}
                           name="typeNumber"/>
            <InputTextField value={value}
                            changeHandler={handleChange}
                            type="text"
                            name="typeNumber"/>

        </div>
    );
};

export default InputPhoneNumber;