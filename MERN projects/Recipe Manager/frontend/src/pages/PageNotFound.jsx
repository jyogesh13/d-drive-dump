
export default function PageNotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-6">
      <div className="text-center">

        <img
          src="https://cdn.pixabay.com/photo/2022/09/12/15/31/cooking-pot-7449657_1280.png"
          alt="Cooking pot"
          className="w-20 mx-auto animate-bounce"
        />

        <h1 className="text-6xl font-bold text-gray-800 mt-2">404</h1>
        <p className="text-xl text-gray-600 mt-2">Page not found</p>
        <p className="text-gray-500 mt-1">This page is not available</p>

        <div className="mt-6 space-x-4">
          <a
            href="/"
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Home
          </a>

          <a
            href="/recipes"
            className="px-6 py-3 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-200 transition"
          >
            View recipes
          </a>
        </div>

      </div>
    </div>
  );
}
