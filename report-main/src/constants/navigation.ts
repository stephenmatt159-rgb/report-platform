import type { LucideIcon } from 'lucide-react';
import { House, ChartLine, Users, SearchIcon, Newspaper } from 'lucide-react';
import { routes } from '@/lib/routes';

export type NavigationItem = {
  name: string;
  icon: LucideIcon;
  link: string;
};

export const navigation: NavigationItem[] = [
  {
    name: 'overview',
    icon: House,
    link: routes.dashboardOverview(),
  },
  {
    name: 'analytics',
    icon: ChartLine,
    link: routes.dashboardAnalytics(),
  },
  {
    name: 'blog',
    icon: Newspaper,
    link: routes.dashboardBlog(),
  },
  {
    name: 'clients',
    icon: Users,
    link: routes.dashboardClients(),
  },
  {
    name: 'People',
    icon: SearchIcon,
    link: routes.people(),
  },
];
