import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutDialogProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
  className?: string;
}

export function LogoutDialog({ onLogout, onNavigate, className }: LogoutDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className={cn(
            "w-full justify-start text-destructive hover:bg-destructive/10",
            "lg:w-auto lg:size-sm lg:text-red-500 lg:hover:text-red-600 lg:hover:bg-red-50",
            className
          )}
        >
          <LogOut className="w-5 h-5 lg:w-4 lg:h-4 lg:mr-2" />
          <span className="ml-3 lg:ml-0">Logout</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[90vw] sm:w-[425px] rounded-lg fixed left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to login again to access your dashboard and monitoring data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onLogout}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}