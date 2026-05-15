"use client";

import { refreshBookings } from "@/app/Action";
import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { useRouter } from "next/navigation";

import { IoTrashBinOutline } from "react-icons/io5";

export function BookingCancelAlert({bookingId}) {

   
  const router = useRouter();
    const handleCancelBooking =async()=>{
      const {data:tokenData} = await authClient.token()
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,{
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                authorization:`Bearer ${tokenData?.token}`
            }
        })
        const data = await res.json()
        console.log(data)
        await refreshBookings()
        router.refresh()

    }
  return (
    <AlertDialog>
     <Button
    className={"rounded-none border border-red-500 text-red-500 flex items-center gap-2"}
    variant="outline"
>
    <IoTrashBinOutline />
    Cancel
    </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>booking</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            
              
              <Button onClick={handleCancelBooking} slot="close" variant="danger">
                Delete
              </Button>
            
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}