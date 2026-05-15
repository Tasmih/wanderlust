import DestinationCard from '@/components/DestinationCard';
import React from 'react';

const DestinationsPage =async () => {
    const res =await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`)
    const destinations = await res.json();
    console.log(destinations);
    return (
        <div className='max-w-7xl mx-auto' >
          <h1>All Destinations</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {destinations.map(destination=> <DestinationCard key={destination._id} destination={destination}/>)

            
            }
          </div>
        </div>
    );
};

export default DestinationsPage;