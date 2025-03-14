"use client";
import { useState, useTransition } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./alert-dialog";
import { Button } from "./button";
import { toast } from "sonner";
import { Loader, Trash } from "lucide-react";

const DeleteDialog = ({
    id,
    action,
}: {
    id: string;
    action: (id: string) => Promise<{ success: boolean; message: string }>;
}) => {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const handleDelete = async () => {
        startTransition(async () => {
            const res = await action(id);
            if (!res.success) {
                toast.error(res.message);
            } else {
                setOpen(false);
                toast.success(res.message);
            }
        });
    };
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant={"destructive"} className="ml-2">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action can&apos;t be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                        variant={"destructive"}
                        size={"sm"}
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        {isPending ? (
                            <Loader className="animate-spin" />
                        ) : (
                            <div className="flex items-center justify-center gap-2">
                                <Trash /> Delete
                            </div>
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteDialog;
