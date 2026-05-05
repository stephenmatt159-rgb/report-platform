import { Button } from '@/components/ui/button';
import { JSX } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (Page: number) => void;
}

export const Pagination = ({
  currentPage,
  lastPage,
  onPageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers: JSX.Element[] = [];

    if (lastPage <= 6) {
      for (let i = 0; i < lastPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => onPageChange(i + 1)}
            variant="transparent"
            className={`p-2 rounded-full h-7.5 w-7.5 default-bg-color text-gray-400 ${
              i + 1 === currentPage && ' bg-brand-blue-t-5 text-brand-blue-500'
            }`}
          >
            {i + 1}
          </Button>
        );
      }
    } else {
      for (let i = 0; i < 3; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => onPageChange(i + 1)}
            variant="transparent"
            className={`p-2 rounded-full h-7.5 w-7.5 default-bg-color text-gray-400 ${
              i + 1 === currentPage && ' bg-brand-blue-t-5 text-brand-blue-500'
            }`}
          >
            {i + 1}
          </Button>
        );
      }

      if (currentPage > 5) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      }

      for (
        let i = Math.max(4, currentPage - 1);
        i <= Math.min(currentPage + 1, lastPage - 3);
        i++
      ) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            variant="transparent"
            className={`p-2 rounded-full h-7.5 w-7.5 default-bg-color text-gray-400 ${
              i === currentPage && ' bg-brand-blue-t-5 text-brand-blue-500'
            }`}
          >
            {i}
          </Button>
        );
      }

      if (currentPage < lastPage - 4) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }

      for (let i = lastPage - 2; i <= lastPage; i++) {
        pageNumbers.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            variant="transparent"
            className={`p-2 rounded-lg h-7.5 w-7.5 default-bg-color text-gray-400 ${
              i === currentPage && ' bg-brand-blue-t-5 text-brand-blue-500'
            }`}
          >
            {i}
          </Button>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div
      className={`flex items-center gap-5 ${
        lastPage <= 6 ? 'justify-end' : 'justify-between'
      } p-5 overflow-x-auto`}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline"
        className="flex items-center gap-2 rounded-[1000px] border-brand-gray dark:border-gray-900 border default-bg-color text-gray-200 disabled:bg-gray-800"
      >
        <BsArrowLeft className="h-5 w-5" />
        <p>Previous</p>
      </Button>

      <div className="flex items-center gap-4">{renderPageNumbers()}</div>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        variant="outline"
        disabled={currentPage >= lastPage}
        className="flex items-center gap-2 rounded-[1000px] border-brand-gray dark:border-gray-900 border default-bg-color text-gray-200 disabled:bg-gray-800"
      >
        <p>Next</p>
        <BsArrowRight className="h-5 w-5" />
      </Button>
    </div>
  );
};
