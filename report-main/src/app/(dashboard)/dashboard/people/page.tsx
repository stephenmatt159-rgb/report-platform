'use client';

import { BsArrowUpRight, BsLinkedin } from 'react-icons/bs';
import { routes } from '@/lib/routes';
import useGetPeople from '@/store/queries/useGetPeople';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ShowView from '@/components/show-view';
import { Pagination } from '@/components/pagination';
import { BiSearch } from 'react-icons/bi';
import { useDebounce } from '@/store/useDebounce';
import { PeopleCardSkeleton } from '@/components/ui/skeleton';

export default function PeoplePage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);

  const payload = () => {
    if (debouncedSearch) return { search: debouncedSearch };
  };

  const { data, isLoading, isError } = useGetPeople(debouncedSearch, page);

  // Ref to track initial load
  const isInitialLoad = useRef(true);

  // Set search and page from URL on first load
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const newSearch = searchParams.get('search') || '';
    const newPage = Number(searchParams.get('page')) || 1;

    if (debouncedSearch) setSearch(debouncedSearch);
    setPage(newPage);

    if (newSearch) {
      setSearch(newSearch);
    }

    isInitialLoad.current = false;
  }, []);

  // Sync current search + page to URL
  useEffect(() => {
    if (isInitialLoad.current) return;

    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', search);
    if (page !== 1) params.set('page', page.toString());

    const queryString = params.toString().replace(/\+/g, '%20');
    router.replace(`${routes.people()}${queryString ? `?${queryString}` : ''}`);
  }, [debouncedSearch, page, router]);

  const people = data?.data ?? [];
  const pagination = data?.pagination || {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
  };

  return (
    <div className="dashboard-padder min-h-screen text-white">
      <div className="flex items-center gap-1 mb-3">
        <h1 className="text-3xl font-semibold text-accent">People Directory</h1>
        <h1 className="p-1 rounded-full text-2xl">{pagination?.total || ''}</h1>
      </div>

      <div className="flex-1 flex items-center gap-1 dark:text-gray-50 bg-brand-gray-100 border dark:border-gray-900 dark:bg-dark-blue-900 rounded-[100px] py-2 px-3 min-h-10.25 lg:w-100 w-full mb-6">
        <BiSearch className="h-5 w-5" />
        <input
          className="border-none bg-transparent focus:outline-0 focus:border-brand-gray-100 border-transparent w-full"
          placeholder="Search test name"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          data-test="state-and-capital-search-query"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PeopleCardSkeleton />
        </div>
      )}

      {isError && <p className="text-red-500">Failed to fetch people.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {people.map((person: any) => (
          <div
            key={person.id}
            className="capitalize bg-slate-800 border border-gray-600 shadow-sm rounded-xl p-5 hover:shadow-md transition flex flex-col gap-2"
          >
            <h2 className="text-xl font-semibold text-gray-200 truncate">
              {person.firstName} {person.lastName}
            </h2>
            <p className="text-gray-400 text-[16px] capitalize line-clamp-3">
              {person.businessName},{person.city}, {person.province},{' '}
              {person.country}
            </p>

            <p className="text-blue-600">{person.jobTitle}</p>

            {person.businessCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 py-2 overflow-hidden max-h-12.5 line-clamp-3">
                {person.businessCategories.map((cat: any, idx: number) => (
                  <span
                    key={idx}
                    className=" text-white pr-3 py-1 rounded-full text-xs font-medium capitalize truncate"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center gap-3">
              <Link
                href={person.linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:underline p-2 flex items-center justify-center w-fit"
              >
                <BsLinkedin className="text-blue-500" />
              </Link>
              <Link
                href={routes.peopleDetails(person.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-6 h-6 flex justify-center items-center"
              >
                <BsArrowUpRight />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && !isError && people.length === 0 && (
        <div className="min-h-[75vh] flex w-full items-center justify-center">
          <div className="text-center mt-10">
            <p className="text-gray-300 text-lg">😕 Sorry, no results found.</p>
            <p className="text-sm text-gray-600 mt-2">
              Try a different name or company.
            </p>
          </div>
        </div>
      )}

      <ShowView when={pagination.total > 12}>
        <Pagination
          currentPage={page}
          lastPage={pagination.last_page}
          onPageChange={setPage}
        />
      </ShowView>
    </div>
  );
}
