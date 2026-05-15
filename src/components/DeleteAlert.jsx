"use client";

import { AlertDialog, Button } from "@heroui/react";
import { IoTrashBin } from "react-icons/io5";
import { useRouter } from "next/navigation";

export function DeleteAlert({ destination }) {
  const router = useRouter();
  const { _id, destinationName } = destination;

  const handleDelete = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();

    console.log(data);
    router.push("/");
  };

  return (
    <AlertDialog>
      <Button
        variant="danger"
        className="flex items-center justify-end gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-300 border border-red-300 rounded-lg transition-all duration-200"
      >
        {" "}
        <IoTrashBin /> Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete destination permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{destinationName}</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}