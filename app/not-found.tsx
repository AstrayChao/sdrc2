import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen  flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                {/* 404 数字 */}
                <h1 className="text-8xl font-bold text-gray-800 mb-4">
                    404
                </h1>

                {/* 主要内容 */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            页面未找到
                        </h2>
                        <p className="text-gray-500">
                            抱歉，您访问的页面不存在或已被移动
                        </p>
                    </div>

                    {/* 按钮组 */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                        <Link
                            href={"/"}
                            className="px-6 py-3  text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
                        >
                            返回上页
                        </Link>
                    </div>

                    {/* 建议链接 */}
                    <div className="text-center mt-8 pt-6 border-t border-gray-200">
                        <p className="text-gray-500 text-sm mb-3">您也可以访问：</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm">
                                首页
                            </Link>
                            <Link href="/about" className="text-blue-600 hover:text-blue-800 text-sm">
                                关于我们
                            </Link>
                            <Link href="/contact" className="text-blue-600 hover:text-blue-800 text-sm">
                                联系我们
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}