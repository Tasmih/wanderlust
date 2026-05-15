import BookingCard from '@/components/BookingCard';
import { DeleteAlert } from '@/components/DeleteAlert';
import { EditModal } from '@/components/EditModal';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaCheck, FaStar } from 'react-icons/fa';
import { FcCalendar } from 'react-icons/fc';
import { LuMapPin } from 'react-icons/lu';

const DestinationDetailsPage = async({params}) => {
    const {id} = await params;
    const {token}= await auth.api.getToken({
        headers: await headers()
    })
    console.log(token);
    const res =await fetch (`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,{
        headers:{
            authorization:`Bearer ${token}` 
        }
    });
    const destination =await res.json()
    const { destinationName, country,     category,price, duration,departureDate, imageUrl,description,_id} = destination;
    
    return (
           <div className="max-w-4xl mx-auto pb-16">
          <div className='flex items-center gap-3 justify-end mt-5 mb-3'>
              <EditModal destination={destination} />
            <DeleteAlert destination={destination} />
          </div>

            <div className="w-full h-72 overflow-hidden">
                <Image
                    className="w-full h-full object-cover"
                    alt={destinationName}
                    src={imageUrl}
                    height={300}
                    width={800}
                    priority
                />
            </div>

           <div className='flex justify-between'>
             <div className="px-6 pt-5">

                <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                    <LuMapPin className="text-pink-500" />
                    <span>{country}</span>
                </div>

                <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
                            {destinationName}
                        </h1>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <FcCalendar />
                            <span>{duration}</span>
                        </div>
                    </div>
                   
                </div>

                <hr className="border-gray-200 mb-6" />

                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">Overview</h2>
                    <p className="text-gray-500 leading-relaxed">{description}</p>
                </section>

            </div>
            <BookingCard destination={destination}/>
           </div>
        </div>
    );
};

export default DestinationDetailsPage;