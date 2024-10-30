import React from 'react';

import { chapters } from '../../../data/documentationData/data';
import { Link } from 'react-scroll';
const DocSidebar = () => {


  return (


    <aside className="w-64 p-4 bg-gray-900 rounded-r-xl md:block hidden">
      <ul>
        {
          chapters.map((data, i) => (
            <li className='cursor-pointer' key={i}><Link to={data.link}>{data.name}</Link></li>

          ))
        }
       

      </ul>
    </aside>

  )


}

export default DocSidebar;
