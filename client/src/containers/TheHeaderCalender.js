import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import {
   CBadge,
   CDropdown,
   CDropdownItem,
   CDropdownMenu,
   CDropdownToggle,
 } from '@coreui/react'
import CIcon from '@coreui/icons-react'

const TheHeaderDropdownMssg = () => {
  const [value, onChange] = useState(new Date());

   return (
      <CDropdown
      inNav
      className="c-header-nav-item mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">0</CBadge>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
            <CDropdownItem>
               <Calendar
                  onChange={onChange}
                  value={value}
               />
            </CDropdownItem>
      </CDropdownMenu>
      </CDropdown>
    
   );
   // return (
   //    <CDropdown
   //      inNav
   //      className="c-header-nav-item mx-2"
   //      direction="down"
   //    >
   //      <CDropdownToggle className="c-header-nav-link" caret={false}>
   //        <CIcon name="cil-envelope-open" /><CBadge shape="pill" color="info">0</CBadge>
   //      </CDropdownToggle>
   //      <CDropdownMenu className="pt-0" placement="bottom-end">
   //        <CDropdownItem
   //          header
   //          tag="div"
   //          color="light"
   //        ></CDropdownItem>
   //        <CDropdownItem href="#" className="text-center border-top"><strong>No messages</strong></CDropdownItem>
   //      </CDropdownMenu>
   //    </CDropdown>
   //  )
}

export default TheHeaderDropdownMssg;