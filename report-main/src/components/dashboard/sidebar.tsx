import { navigation, NavigationItem } from '@/constants/navigation';
import { routes } from '@/lib/routes';
import Image from 'next/image';
import Link from 'next/link';

export function NavItem({
  item,
  onClick,
}: {
  item: NavigationItem;
  onClick?: () => void;
}) {
  const Icon = item.icon;

  return (
    <Link href={item.link} className="flex gap-2 items-center">
      <Icon className="h-5 w-5 text-blue-600" />
      <p className="capitalize">{item.name}</p>
    </Link>
  );
}

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-4 min-h-full min-w-4 padder">
      <Link href={routes.dashboardOverview()}>
        <Image
          width={100}
          height={100}
          src={'/logo.png'}
          className="h-9 w-9"
          alt="site logo"
        />
      </Link>
      {navigation.map((item, index) => (
        <NavItem item={item} key={`${item.name}-${index}`} />
      ))}
    </div>
  );
};

export default Sidebar;
