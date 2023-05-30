"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [burgerDropdown, setBurgerDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const postUser = async (sessionId) => {
    const response = await fetch("http://localhost:8000/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sessionId),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <nav className='flex-between w-full mb-16 pt-3 pb-3 px-16 bg-gradient-to-r from-[#040666] to-[#490a8b]'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/tocketLogoPlaceHolder2.png'
          alt='logo'
          width={120}
          height={40}
          className='object-contain'
        />
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden items-center'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5 items-center'>
            <button type='button' onClick={signOut} className='black_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <div className='flex gap-3 md:gap-5 items-center'>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    postUser(session?.user.name, session?.user.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}

            <div className='relative'>
              <div onClick={() => setBurgerDropdown(!burgerDropdown)}>
                <div className='h-0.5 w-5 bg-white mb-1.5'></div>
                <div className='h-0.5 w-5 bg-white mb-1.5'></div>
                <div className='h-0.5 w-5 bg-white'></div>
              </div>
              {burgerDropdown && (
                <div className='dropdown bg-[#010130] opacity-90'>
                  <p className='dropdown_link'>Text 1</p>
                  <p className='dropdown_link'>Text 2</p>
                  <p className='dropdown_link'>Text 3</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href='/create-prompt'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    postUser(session?.user.name, session?.user.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;