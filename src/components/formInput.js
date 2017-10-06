import React from 'react';

const FormInput = (props) => {
    return (
        <div className={"input-wrapper " + props.className + "-wrapper"}>
            <input
                type={props.type}
                name={props.name}
                className={props.className + " form-input"}
                onChange={props.onInputChange}
                required={props.required}
                value={props.value}
                placeholder={props.placeholder}
            />
            { props.labelName ? <label htmlFor={props.type}>{props.labelName}</label> : '' }
            <div className="bar"></div>
        </div>
    );

};

export default FormInput;
