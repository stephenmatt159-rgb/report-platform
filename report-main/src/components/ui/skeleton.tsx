import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-gray-700 animate-pulse rounded-md', className)}
      {...props}
    />
  );
}

interface SkeletonProps {
  count?: number;
}

const CardSkeleton: React.FC<SkeletonProps> = ({ count = 12 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative overflow-hidden border-2 border-white/50 rounded-xl"
        >
          {/* Image Placeholder */}
          <Skeleton className="w-full h-64 md:h-80" />

          {/* Bottom Content Placeholder */}
          <div className="absolute bottom-0 p-8 flex flex-col gap-y-4 w-full">
            {/* Title */}
            <Skeleton className="h-8 w-3/4" />

            {/* Tools */}
            <div className="flex gap-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-12" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const PeopleCardSkeleton: React.FC<SkeletonProps> = ({ count = 12 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className=" border shadow-sm rounded-xl p-5 flex flex-col gap-3"
        >
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-2/5" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-1/3" />
          <div className="flex gap-3 mt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      ))}
    </>
  );
};

export { Skeleton, CardSkeleton, PeopleCardSkeleton };
