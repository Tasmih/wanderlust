"use server";

import { revalidatePath } from "next/cache";

export async function refreshBookings() {
  revalidatePath("/my-bookings");
}