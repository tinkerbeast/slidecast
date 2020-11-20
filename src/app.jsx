import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

import {ColourRadioGroup} from "./components/bsRadioGroup"
import {SelectOptions} from "./components/bsRadioGroup"
import {D3Canvas} from "./components/d3Canvas"

import {SketchPad} from "./iface/Sketcher" 
import {SketchControl} from "./iface/Sketcher" 




const colours = ['8e44ad', '9b59b6', '2980b9', '3498db', 
    '27ae60', '2ecc71', '16a085', '1abc9c', 
    'f39c12', 'f1c40f', 'd35400', 'e67e22', 
    'c0392b', 'e74c3c', 'bdc3c7', 'ecf0f1', 
    '7f8c8d', '95a5a6', '2c3e50', '34495e', 'transparent'
];

function drawSketcher(skx, sky, width, height) {
    $('#mySketcher').remove();

    var sketcher = $('<canvas/>', 
        {'style': "z-index:10; position:absolute; top:" + sky + "px; left:" + skx + "px; border: 1px solid red; visibility: hidden;"})
        .attr({'width':width, 'height':height, 'id':'mySketcher'});

    $('body').append(sketcher);
}


function ReactDOM_replaceDiv(element, reactComponent) {
  const parent = document.createElement('div');
  return ReactDOM.render(reactComponent, parent, () => {
    element.replaceWith(...Array.from(parent.childNodes));
  });
}


$(document).ready(function() {


    // modify dom - prepager svg canvas
    let canvas = new D3Canvas("#myCanvas");


    const sketchOn = true;

    const sketchPad = ReactDOM.render(
        React.createElement(SketchPad, {
            target: document.getElementById('holder'), 
            checked: sketchOn,
            zidx: 10,
            id: 'mySketchPad'
        }, null),
        document.body.appendChild(document.createElement('div'))
    );

    ReactDOM.render(
        React.createElement(SketchControl, {
            checked: sketchOn,
            pad: sketchPad 
        }, null), 
        document.getElementById('mySketchControl')
    );



    
    // modify dom - render form elements
    let formName = '';
    let subName = '';

    ///////////////////////////////////////////////////////////////////////////////
    formName = 'myShapeForm';


    subName = 'shape';
    ReactDOM.render(
        React.createElement(SelectOptions, {values: canvas.getShapeNames()}, null),
        document.getElementById(formName + '-' + subName)
    );

    subName = 'fillcolour';
    ReactDOM.render(
        React.createElement(ColourRadioGroup, {formId: formName, name: subName, values: colours}, null),
        document.getElementById(formName + '-' + subName)
    );

    subName = 'strokecolour';
    ReactDOM.render(
        React.createElement(ColourRadioGroup, {formId: formName, name: subName, values: colours}, null),
        document.getElementById(formName + '-' + subName)
    );

    $('#' + formName).submit(function(e) {
        // do not submit this form
        e.preventDefault();
        // get an associative array of just the values.
        var values = {};
        $(this).serializeArray()
            .forEach(function(val, idx) {
              values[val.name] = val.value;
            });
        console.debug(JSON.stringify(values));
        // add to canvas
        canvas.addShape(values['shape'], values['size'], values['fillcolour'], values['stroke'], values['strokecolour']);
    });
    

});


