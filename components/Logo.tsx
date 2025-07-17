import Link from "next/link";

export default function Logo() {
    return <Link href="/" className="flex items-center space-x-3 mr-6 group">
        <div
            className="h-10 w-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200 flex items-center justify-center relative overflow-hidden">
            {/* 背景轨道环 */}
            <div className="absolute inset-2 border border-blue-300 rounded-full opacity-40"></div>
            <div className="absolute inset-1 border border-blue-400 rounded-full opacity-30 transform rotate-60"></div>

            {/* 中心原子核 - 绝对居中 */}
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>

            {/* 电子点 */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-blue-600 rounded-full animate-pulse"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-blue-400 rounded-full animate-pulse"
                 style={{ animationDelay: '0.5s' }}></div>
        </div>
        <div className="hidden sm:block">
            <h1 className="text-lg font-semibold text-gray-900">科学数据库权威目录</h1>
            <p className="text-xs text-gray-500">Scientific Data Repository Hub</p>
        </div>
    </Link>
}