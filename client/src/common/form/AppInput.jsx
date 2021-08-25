import React from 'react';
import CoreTextArea from '../CoreUI.textarea';

import {useFormikContext} from 'formik';

function AppFormField({name,width, ...otherProps}) {

  const {handleChange , handleSubmit,errors,setFieldTouched,touched} =useFormikContext();
  return (
    // {name,error,label,placeholder,value,onChange,visible}
    <>
      <CoreTextArea
        name
        label
        placeholder
        value
        onChangeText = {handleChange(name)}
        visible ={touched[name]}
      />
    </>

  );
}

export default AppFormField;
