'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/components/pagination';
import ShowView from '@/components/show-view';
import useGetAnalytics from '@/store/queries/useGetAnalytics';
import useGetVisitors from '@/store/queries/useGetVisitors';
import { useDebounce } from '@/store/useDebounce';
import { formatDate } from '@/utils/format-date';
import { cn } from '@/lib/utils';

export default function AnalyticsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search);

  const { data, isLoading } = useGetAnalytics();
  const { data: visitorsData, isLoading: isVisitorsLoading } = useGetVisitors(
    debouncedSearch,
    page
  );

  const pagination = visitorsData?.pagination || {
    total: 0,
    per_page: 0,
    current_page: 0,
    last_page: 0,
  };

  // SUMMARY CARD CONFIG
  const summaryCards = [
    { title: 'Last 6 Hours', value: data?.data.totals.last_6_hours ?? 0 },
    { title: 'Last 24 Hours', value: data?.data.totals.last_24_hours ?? 0 },
    { title: 'Last 7 Days', value: data?.data.totals.last_7_days ?? 0 },
    {
      title: 'Last 30 Days',
      value: data?.data.totals.last_30_days ?? 0,
    },
  ];

  // TOP TAB CONFIG
  const topTabs = [
    {
      value: 'referrers',
      label: 'Referrers',
      items: data?.data.top_referrers ?? [],
      field: 'referrer',
    },
    {
      value: 'pages',
      label: 'Pages',
      items: data?.data.top_pages ?? [],
      field: 'url',
    },
    {
      value: 'countries',
      label: 'Countries',
      items: data?.data.top_countries ?? [],
      field: 'country',
    },
    {
      value: 'States',
      label: 'States',
      items: data?.data.top_region ?? [],
      field: 'region',
    },
    {
      value: 'browsers',
      label: 'Browsers',
      items: data?.data.top_browsers ?? [],
      field: 'browser',
    },
    { value: 'os', label: 'OS', items: data?.data.top_os ?? [], field: 'os' },
  ];

  // TABLE COLUMN CONFIG
  const visitorColumns = [
    { label: 'OS', field: 'os' },
    { label: 'Referrer', field: 'page.referrer' },
    { label: 'Browser', field: 'browser' },
    { label: 'IP', field: 'ip' },
    { label: 'Region', field: 'region' },
    { label: 'Country', field: 'country' },
    { label: `Client's Time`, field: 'clientTimestamp' },
    { label: 'Timezone', field: 'timezone' },
    { label: 'Time visited', field: 'serverTimestamp' },
  ];

  const getValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  };

  return (
    <div className="dashboard-padder space-y-6">
      {/* HEADER */}
      <div className="flex md:hidden flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="h-4 w-32 bg-slate-200 rounded"></CardTitle>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))
          : summaryCards.map((card) => (
              <Card key={card.title}>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-3xl font-bold">
                  {card.value}
                </CardContent>
              </Card>
            ))}
      </div>

      {/* TOP DATA TABS */}
      <Card>
        <CardHeader>
          <CardTitle>Top Analytics</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="referrers" className="flex flex-col gap-5">
            <div className="overflow-x-auto overflow-y-hidden min-w-full md:w-fit min-h-full">
              <TabsList className="flex gap-3  text-left">
                {topTabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {topTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <TopList
                  title={tab.label}
                  items={tab.items}
                  field={tab.field}
                />
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* VISITORS TABLE */}
      <Card>
        <CardHeader className="flex flex-col gap-5 md:flex-row items-center justify-between">
          <div className="w-full">
            <CardTitle>
              Visitors{' '}
              <span className="ml-1 font-bold text-lg px-2 py-1 rounded-full border">
                {pagination.total}
              </span>
            </CardTitle>
          </div>

          <Input
            placeholder="Search visitors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-md"
          />
        </CardHeader>

        <CardContent>
          {isVisitorsLoading ? (
            <Skeleton className="h-[50vh] w-full" />
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {visitorColumns.map((col) => (
                    <TableHead key={col.label}>{col.label}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>

              <TableBody>
                {(visitorsData?.data ?? []).map((v: any) => (
                  <TableRow key={v.ip}>
                    {visitorColumns.map((col) => (
                      <TableCell
                        key={col.field}
                        className={cn(
                          `${!getValue(v, 'page.referrer') && 'capitalize'}`
                        )}
                      >
                        {col.field === 'serverTimestamp'
                          ? formatDate(
                              v.serverTimestamp,
                              'hh:mm A | Do MMMM, YYYY'
                            )
                          : (getValue(v, col.field) ?? 'Unknown')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <ShowView when={pagination.total > pagination.per_page}>
            <Separator className="my-4" />
            <Pagination
              currentPage={page}
              lastPage={pagination.last_page}
              onPageChange={setPage}
            />
          </ShowView>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------ TopList Component ------------------------------ */
function TopList({
  title,
  items,
  field,
}: {
  title: string;
  items: any[];
  field: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {items.map((item, idx) => (
        <Card key={`${title}-${idx}`}>
          <CardHeader>
            <CardTitle className="text-sm text-wrap wrap-break-word overflow-hidden">
              {item[field] ?? 'Unknown'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xl font-bold">{item.visits}</CardContent>
        </Card>
      ))}
    </div>
  );
}
