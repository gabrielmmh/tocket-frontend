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
    <nav className='flex-between w-full mb-16 pt-3 pb-3 px-16 bg-gradient-to-r from-[#040666] to-[#490a8b] fixed top-0 left-0 right-0 mb-15 z-10'>
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
    <div className='flex gap-3 md:gap-5'>
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
    <>
      {providers &&
        Object.values(providers).map((provider) => (
          <button
            type='button'
            key={provider.name}
            onClick={() => {
              signIn(provider.id);
              postUser(session?.user);
            }}
            className='black_btn'
          >
            Sign in
          </button>
        ))}
    </>
  )}
  <div className='relative ml-4'>
    <div onClick={() => setBurgerDropdown(!burgerDropdown)}>
      {burgerDropdown ? (
        <div className='w-5 h-5 relative'>
          <div
            className='absolute h-0.5 w-full bg-white transition-all duration-500 ease-in-out'
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%) rotate(45deg)' 
            }}
          ></div>
          <div
            className='absolute h-0.5 w-full bg-white transition-all duration-500 ease-in-out'
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%) rotate(-45deg)' 
            }}
          ></div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <div className='h-0.5 w-5 bg-white transition-all duration-500 ease-in-out'></div>
          <div className='h-0.5 w-5 bg-white transition-all duration-500 ease-in-out mt-1.5 mb-1.5'></div>
          <div className='h-0.5 w-5 bg-white transition-all duration-500 ease-in-out'></div>
        </div>
      )}
    </div>
    {burgerDropdown && (
      <div className='dropdown'>
        <p className='dropdown_link'>Eventos Bombando</p>
        <p className='dropdown_link'>Marketplace</p>
        <p className='dropdown_link'>About Us</p>
      </div>
    )}
  </div>
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
        <div className='ml-4 mt-1.5'>
    <div onClick={() => setBurgerDropdown(!burgerDropdown)}>
      {burgerDropdown ? (
        <div className='w-5 h-5 relative'>
          <div
            className='absolute h-0.5 w-full bg-white transition-all duration-500 ease-in-out'
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%) rotate(45deg)' 
            }}
          ></div>
          <div
            className='absolute h-0.5 w-full bg-white transition-all duration-500 ease-in-out'
            style={{ 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%) rotate(-45deg)' 
            }}
          ></div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center'>
          <div className='h-0.5 w-5 bg-white transition-all duration-500 ease-in-out'></div>
          <div className='h-0.5 w-5 bg-white transition-all duration-500 ease-in-out mt-1.5 mb-1.5'></div>
          <div className='h-0.5 w-5 bg-white transition-all duration-500 ease-in-out'></div>
        </div>
      )}

    {burgerDropdown && (
      <div className='dropdown'>
        <p className='dropdown_link'>Eventos Bombando</p>
        <p className='dropdown_link'>Marketplace</p>
        <p className='dropdown_link'>About Us</p>
      </div>
    )}
      
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;