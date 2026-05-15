"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  console.log(user);

  const handleSignOut = async()=>{
    await authClient.signOut();
  };

  return (
    <nav className="flex items-center justify-between bg-white pb-3">
      
      
      <ul className="flex gap-3 items-center">
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/destinations">Destinations</Link>
        </li>

        <li>
          <Link href="/my-bookings">My Bookings</Link>
        </li>

        <li>
          <Link href="/add-destination">Add Destination</Link>
        </li>

        <li>
          <Link href="/admin">Admin</Link>
        </li>
      </ul>


      <div>
        <Image
          src="/assets/Wanderlast.png"
          height={200}
          width={200}
          alt="logo"
        />
      </div>


      <ul className="flex items-center gap-3">
        <li>
          <Link href="/profile">Profile</Link>
        </li>

        {user ? (
          <>
            <li>
              <Avatar>
                <AvatarImage referrerPolicy="no-referrer" alt="john Doe" src={user?.image} />
                <AvatarFallback>
                  {user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </li>

            <li>
             <Button onClick={handleSignOut} variant="danger" className={"rounded-none"}>Logout</Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>

            <li>
              <Link href="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;