'use client';

import { navigation } from '@/constants/navigation';
import { routes } from '@/lib/routes';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { NavItem } from './sidebar';
import { usePathname, useRouter } from 'next/navigation';
import { clearSessionStorage } from '@/storage/useSessionStorage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const pageTitle =
    navigation.find((item) => pathname.startsWith(item.link))?.name ??
    'overview';

  const handleLogout = () => {
    clearSessionStorage(); // clear session
    setIsOpen(false); // close mobile menu (if open)
    router.push(routes.home()); // redirect
  };

  return (
    <section className="border-b border-accent padder w-full">
      <div className="h-14 flex items-center justify-between w-full">
        <Link href={routes.dashboardOverview()} className="flex md:hidden">
          <Image
            width={100}
            height={100}
            src={'/logo.png'}
            className="h-9 w-9"
            alt="site logo"
          />
        </Link>

        <p className="hidden md:flex capitalize font-bold text-xl">
          {pageTitle}
        </p>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="bg-[#D8CEFD] rounded-[10px] w-10 h-10 flex items-center justify-center lg:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <button
          onClick={handleLogout}
          className="hover:text-red-500 hidden lg:block"
        >
          <p>Log out</p>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-[#1a1c22]">
          <div className="h-14 flex justify-between items-center padder border-b border-accent padder w-full">
            <Link href={routes.dashboardOverview()}>
              <Image
                width={100}
                height={100}
                src={'/logo.png'}
                className="h-9 w-9"
                alt="site logo"
              />
            </Link>

            <button
              onClick={() => setIsOpen(false)}
              className=" bg-[#D8CEFD] rounded-[10px] w-10 h-10 flex items-center justify-center"
            >
              <X size={24} />
            </button>
          </div>
          <div className="padder pt-6">
            <nav className="flex flex-col gap-6">
              {navigation.map((item, index) => (
                <NavItem
                  onClick={() => setIsOpen(false)}
                  item={item}
                  key={`${item.name}-${index}`}
                />
              ))}

              <button onClick={handleLogout} className="text-red-500">
                <p>Log out</p>
              </button>
            </nav>
          </div>
        </div>
      )}
    </section>
  );
};

export default Navbar;
