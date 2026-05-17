const Pagination = ({
  setPageNumber,
  pageNumber,
}: {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 ">
      <button
        className="bg-green-300 py-1 px-5 rounded-xl text-gray-900 cursor-pointer disabled:bg-gray-300"
        disabled={pageNumber === 0}
        onClick={() => setPageNumber((prev) => prev - 15)}
      >
        Prev
      </button>
      {pageNumber / 15 + 1}
      <button
        className="bg-green-300 py-1 px-5 rounded-xl text-gray-900 cursor-pointer"
        onClick={() => setPageNumber((prev) => prev + 15)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
