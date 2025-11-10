'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import { Fragment } from 'react';
import Image from 'next/image';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import { Button } from '@/components/ui/Button';

export default function Navbar() {
  const { t } = useTranslation();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.home'), href: '/' },
    { name: t('navigation.services'), href: '/services' },
    { name: t('navigation.process'), href: '/process' },
    { name: t('navigation.tracking'), href: '/tracking' },
    { name: t('navigation.testimonials'), href: '/testimonials' },
    { name: t('navigation.about'), href: '/about' },
    { name: t('navigation.contact'), href: '/contact' },
  ];

  return (
    <header className="bg-brand-navy text-brand-white sticky top-0 z-50 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">JACXI Shipping</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-gold rounded-md flex items-center justify-center">
                <span className="text-brand-navy font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold text-brand-white">JACXI</span>
            </div>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-brand-white hover:text-brand-gold transition-colors relative group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-3">
          <LanguageSwitcher />
          {session ? (
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center space-x-2 text-sm font-medium text-brand-white hover:text-brand-gold transition-colors">
                <div className="w-8 h-8 bg-brand-gold rounded-full flex items-center justify-center">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={32}
                      height={32}
                      className="rounded-full"
                      unoptimized
                    />
                  ) : (
                    <UserIcon className="w-5 h-5 text-brand-navy" />
                  )}
                </div>
                <span>{session.user?.name}</span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-brand-white py-1 shadow-lg ring-1 ring-brand-gray focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/dashboard"
                        className={`${
                          active ? 'bg-brand-light-gray' : ''
                        } block px-4 py-2 text-sm text-brand-charcoal`}
                      >
                        Dashboard
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => signOut()}
                        className={`${
                          active ? 'bg-brand-light-gray' : ''
                        } block w-full text-left px-4 py-2 text-sm text-brand-charcoal`}
                      >
                        {t('auth.signOut')}
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  {t('auth.signIn')}
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">
                  {t('auth.signUp')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      <Transition
        as={Fragment}
        show={mobileMenuOpen}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-brand-navy px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-brand-gray">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">JACXI Shipping</span>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-brand-gold rounded-md flex items-center justify-center">
                    <span className="text-brand-navy font-bold text-lg">J</span>
                  </div>
                  <span className="text-xl font-bold text-brand-white">JACXI</span>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-brand-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-1.5 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-medium leading-7 text-brand-white hover:bg-brand-navy/80 hover:text-brand-gold transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <div className="flex flex-col space-y-4">
                    <LanguageSwitcher />
                    {session ? (
                      <>
                        <Link href="/dashboard">
                          <Button variant="outline" className="w-full">
                            Dashboard
                          </Button>
                        </Link>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => signOut()}
                        >
                          {t('auth.signOut')}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link href="/auth/signin">
                          <Button variant="outline" className="w-full">
                            {t('auth.signIn')}
                          </Button>
                        </Link>
                        <Link href="/auth/signup">
                          <Button className="w-full">
                            {t('auth.signUp')}
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </header>
  );
}