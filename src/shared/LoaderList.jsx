import { Skeleton } from "@/components/ui/skeleton";
import { LoaderCircle } from "lucide-react";

const LoaderList = () => {
    return (
        <>
            <div className="flex items-center justify-center py-8">
                <LoaderCircle className="animate-spin mr-4" /> Loading...
            </div>
            <div className="space-y-4">
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-1/2 h-8" />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-1/2 h-8" />
                <Skeleton className="w-full h-16" />
                <Skeleton className="w-1/2 h-8" />
            </div>
        </>
    );
};

export default LoaderList;
