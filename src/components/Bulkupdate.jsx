import React from 'react';

export default function Bulkupdate({el,handeleditbulkchange}) {
  return <div>
     
      <input
        type="text"
        id={`${el._id}`}
        name="name"
        required="required"
        value={el.name}
        onChange={handeleditbulkchange}
      />
      <input
        type="text"
        name="type"
        required="required"
        value={el.type}
        onChange={handeleditbulkchange}
        id={`${el._id}`}
      />
      <input
        type="text"
        name="company"
        required="required"
        value={el.company}
        onChange={handeleditbulkchange}
        id={`${el._id}`}
      />
      
  </div>;
}
