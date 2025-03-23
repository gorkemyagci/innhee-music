import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { pageUrls } from '@/lib/constants/page-urls'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <div className="h-2 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto my-6 rounded-full"></div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Page Not Found</h2>
        <p className="text-gray-600 mb-8">The page you are looking for doesn&apos;t exist or has been moved.</p>
        <Link 
          href={pageUrls.DASHBOARD}
          className={cn(
            "inline-flex items-center justify-center gap-2 px-6 py-4 h-12 w-full sm:w-auto sm:min-w-[200px] disabled:cursor-auto group rounded-[10px] text-white text-sm cursor-pointer font-medium relative overflow-hidden transition-all bg-gradient-to-b from-[#20232D]/90 to-[#20232D] border border-[#515256] shadow-[0_1px_2px_0_rgba(27,28,29,0.05)]"
          )}
        >
          <div className="absolute top-0 left-0 w-full h-3 group-hover:h-5 transition-all duration-500 bg-gradient-to-b from-[#FFF]/[0.09] group-hover:from-[#FFF]/[0.12] to-[#FFF]/0" />
          <ArrowLeft size={18} />
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}