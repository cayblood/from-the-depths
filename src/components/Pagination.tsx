import { Link } from "@tanstack/react-router";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  /** Optional search string to append to links (e.g. "?tag=Mormonism") */
  search?: string;
}

function paginationTo(path: string, search?: string) {
  if (!search?.trim()) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${search.replace(/^\?/, "")}`;
}

/** Build path to a page (avoids "//page/2" when basePath is "/") */
function pagePath(basePath: string, pageNum: number): string {
  const base = basePath === "/" ? "" : basePath.replace(/\/$/, "");
  return `${base}/page/${pageNum}`;
}

export function Pagination({ currentPage, totalPages, basePath, search }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = [];
  const maxVisible = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  const endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav
      id="pagination"
      className="flex justify-center items-center gap-2 mt-8 mb-4"
      aria-label="Pagination"
    >
      {currentPage > 1 && (
        <Link
          to={paginationTo(
            currentPage === 2 ? basePath : pagePath(basePath, currentPage - 1),
            search
          )}
          className="px-4 py-2 bg-[#3e2427] text-[#d8bbbe] rounded hover:bg-[#603d41] transition-colors"
        >
          ← Previous
        </Link>
      )}

      {startPage > 1 && (
        <>
          <Link
            to={paginationTo(basePath, search)}
            className={`px-4 py-2 bg-[#3e2427] text-[#d8bbbe] rounded hover:bg-[#603d41] transition-colors ${
              1 === currentPage ? "bg-[#603d41] font-bold" : ""
            }`}
          >
            1
          </Link>
          {startPage > 2 && <span className="text-[#d8bbbe]">...</span>}
        </>
      )}

      {pages.map((page) => {
        const isCurrentPage = page === currentPage;
        const path = page === 1 ? basePath : pagePath(basePath, page);

        return (
          <Link
            key={page}
            to={paginationTo(path, search)}
            className={`px-4 py-2 bg-[#3e2427] text-[#d8bbbe] rounded hover:bg-[#603d41] transition-colors ${
              isCurrentPage ? "bg-[#603d41] font-bold" : ""
            }`}
          >
            {page}
          </Link>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-[#d8bbbe]">...</span>}
          <Link
            to={paginationTo(pagePath(basePath, totalPages), search)}
            className={`px-4 py-2 bg-[#3e2427] text-[#d8bbbe] rounded hover:bg-[#603d41] transition-colors ${
              totalPages === currentPage ? "bg-[#603d41] font-bold" : ""
            }`}
          >
            {totalPages}
          </Link>
        </>
      )}

      {currentPage < totalPages && (
        <Link
          to={paginationTo(pagePath(basePath, currentPage + 1), search)}
          className="px-4 py-2 bg-[#3e2427] text-[#d8bbbe] rounded hover:bg-[#603d41] transition-colors"
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
