import Image from 'next/image';
import React from 'react';
import { LuMapPin } from "react-icons/lu";
import { FcCalendar } from "react-icons/fc";
import { Button } from '@heroui/react';
import { GoArrowUpRight } from 'react-icons/go';
import Link from 'next/link';

const DestinationCard = ({destination}) => {
    const { destinationName, country,     category,price, duration,departureDate, imageUrl,description,_id} = destination;
    return (
        <div className='border p-4 shadow-md bg-white'>
           <Image className='w-full h-[250px] object-cover'
           alt={destinationName}
           src={imageUrl}
           height={400}
           width={400}
           /> 
           <div className='p-2'>
            <div className='flex items-center gap-1'>
                {" "}
                <LuMapPin/><span>{country}</span>
                </div> 
              <div className='flex justify-between'>
                <div>  <div>
                    <h2 className='text-xl font-bold'>{destinationName}</h2>
                </div>
                <div className='flex gap-2 items-center'><FcCalendar />{duration}</div></div>
                <div><h3 className='text-2xl font-bold'>${price}</h3>
                </div>

                
              </div>

              <Link href={`/destinations/${_id}`}>
               <Button variant='ghost' className={'mt-1 text-cyan-500'} > Book Now <GoArrowUpRight /></Button>
              </Link>
           </div>
          
        </div>
    );
};

export default DestinationCard;