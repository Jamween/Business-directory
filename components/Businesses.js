import React from 'react';
import BusinessItem from './BusinessItem'; // Component for each business item.

function Businesses(props) {
  return (
    <>
      {props.myBusinesses.map((business) => (
        <BusinessItem
          myBusiness={business}
          key={business._id}
          Reload={props.ReloadData} // allow refreshing
        />
      ))}
    </>
  );
}

export default Businesses;
