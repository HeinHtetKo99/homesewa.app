'use client'

type prop ={
  currentPage: number,
  onPageChange: (page: number) => void;
  totalPages : number,
  color: string,
}
const Pagination:React.FC<prop> = ({ 
  currentPage, 
  totalPages = 5, 
  onPageChange ,
  color
}) => {
  // Generate page numbers with ellipsis for large page counts
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsisThreshold = 7;

    if (totalPages <= showEllipsisThreshold) {
      // Show all pages if total is small
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show first page
    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    // Show pages around current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 text-4xl pb-3 md:w-10 md:h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
       ‹
      </button>
      
      {pageNumbers.map((page, index) => (
        page === '...'  ? (
          <span key={`ellipsis-${index}`} className="px-2 text-gray-500 hidden sm:inline">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-md flex items-center justify-center text-xs md:text-sm font-semibold transition-colors ${
              currentPage === page
                ? `${color} text-white border-0`
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            } ${currentPage === page ? '' : (page as number > 3 && page as number < totalPages - 2 ? 'hidden sm:flex' : '')}`}
          >
            {page}
          </button>
        )
      ))}
      
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 text-4xl pb-3 md:w-10 md:h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;