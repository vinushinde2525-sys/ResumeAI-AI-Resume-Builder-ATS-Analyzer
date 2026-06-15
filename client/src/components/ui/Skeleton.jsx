import { cn } from '../../lib/utils'

const Skeleton = ({ className = '', ...props }) => (
  <div
    className={cn(
      'animate-pulse rounded-md bg-slate-200',
      className
    )}
    {...props}
  />
)

// Pre-built skeleton for resume cards
Skeleton.ResumeCard = () => (
  <div className="bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
    <Skeleton className="h-5 w-2/3 mb-3" />
    <Skeleton className="h-4 w-1/3 mb-4" />
    <Skeleton className="h-24 w-full mb-3" />
    <div className="flex gap-2">
      <Skeleton className="h-8 w-20" />
      <Skeleton className="h-8 w-20" />
    </div>
  </div>
)

export default Skeleton
