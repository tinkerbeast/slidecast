import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./components/Welcome"
import RadioGroup from "./components/bsRadioGroup"
import {ColourRadioGroup} from "./components/bsRadioGroup"

//ReactDOM.render(<Welcome name='sarah conner' />, wrapper);


const radioValues = [
    {value: "val1", text: "val1 text"},
    {value: "val2", text: "val2 text"},
    {value: "val3", text: "val3 text"},
    {value: "val4", text: "val4 text"}    
];
//ReactDOM.render(<RadioGroup formId="root" name="colour" values="{radioValues}" />, wrapper);
/*
ReactDOM.render(
    React.createElement(RadioGroup, {formId: 'root', name: 'colour', values: radioValues}, null),
    wrapper
);
*/


const formName = 'myShapeForm';
let subName = '';

subName = 'colour';
const colours = ['8e44ad', '9b59b6', '2980b9', '3498db', 
    '27ae60', '2ecc71', '16a085', '1abc9c', 
    'f39c12', 'f1c40f', 'd35400', 'e67e22', 
    'c0392b', 'e74c3c', 'bdc3c7', 'ecf0f1', 
    '7f8c8d', '95a5a6', '2c3e50', '34495e'
];
ReactDOM.render(
    React.createElement(ColourRadioGroup, {formId: formName, name: subName, values: colours}, null),
    document.getElementById(formName + '-' + subName)
);


