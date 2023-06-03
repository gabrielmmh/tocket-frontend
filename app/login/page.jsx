'use client'
import React from 'react';
import { SessionProvider, getProviders, useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from "react";

const login = () => {
    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        (async () => {
          const res = await getProviders();
          setProviders(res);
        })();
      }, []);

    if (session) {
        return (
            <SessionProvider session={session}>
                <div>
                    <p>Welcome, {session.user.email}</p>
                    <button onClick={() => signOut()}>Sign Out</button>
                </div>
            </SessionProvider>
        );
    } else {
        return(
            <SessionProvider session={session}>
                <div>
                    <p> You are not signed in. </p>
                    {providers &&
                        Object.values(providers).map((provider) => (
                            <button
                            type='button'
                            key={provider.name}
                            onClick={() => {
                                signIn('google');
                            }}
                            className='white_btn'
                            >
                            Sign in
                            </button>
                        ))}
                    {/* <button onClick={() => signIn(provider.id)}>Sign In</button> */}
                </div>
            </SessionProvider>
        )
    }
    // <>
    //         {providers &&
    //           Object.values(providers).map((provider) => (
    //             <button
    //               type='button'
    //               key={provider.name}
    //               onClick={() => {
    //                 signIn(provider.id);
    //               }}
    //               className='black_btn'
    //             >
    //               Sign in
    //             </button>
    //           ))}
    //       </>
}

export default login