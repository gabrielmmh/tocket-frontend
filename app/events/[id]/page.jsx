"use client";

import '@styles/globals.css';
import { SessionProvider, useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Event = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const eventId = pathname.charAt(pathname.length - 1);
  const [event, setEvent] = useState({});
  const [poke, setPoke] = useState({});
  const [processing, setProcessing] = useState(false);
  const [providers, setProviders] = useState(null);
  let [myEvents, setMyEvents] = useState([]);
  let [buttonSelected, setButtonSelected] = useState(false);

  const getPoke = async () => {
    console.log(event.name)
    const response = await fetch(`http://localhost:8000/poke/event/${event.name}`);
    const data = await response.json();
    setPoke(data);
  };

  const getEvent = async () => {
    const response = await fetch(`http://localhost:8000${pathname}`);
    const data = await response.json();
    setEvent(data);
  };

  useEffect(() => {
    getEvent();
  }, []);

  useEffect(() => {
    if (event.name){
      getPoke();
    }
  }, [event.name]);

  const buyEvent = async () => {
    // console.log("--------------------------------")
    // console.log("password: ", session.user.id, "  type: ", typeof(session.user.id))
    // console.log("event_id: ", eventId, "  type: ", typeof(eventId))
    const response = await fetch("http://localhost:8000/users/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_id: eventId, password: session.user.id})
    },
    );
    const data = response;
  };

  const sellEvent = async () => {
    const response = await fetch("http://localhost:8000/users/event/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event_id: eventId, password: session.user.id})
    },
    );
    const data = response;
  };


  useEffect(() => {

    const getUserEvents = async (session) => {
      // console.log("---------------- password: ", session?.user.id)
      const response = await fetch("http://localhost:8000/users/event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: session?.user.id, })
      },
      );
      const data = await response.json();
      console.log(data);
      setMyEvents(data);
    };
    
    getUserEvents(session);
  }, [session?.user]);

  function checkEvent(){
    for (let i = 0; i < myEvents.length; i++){
      if (myEvents[i].name == event.name){
        console.log("true")
        return true;
      }
    }
    console.log("false")
    return false;
  }

  const handleClick = async () => {
    setProcessing(true);

    if (!checkEvent()) {
      await buyEvent();
    } else {
      await sellEvent();
    }

    const getUserEvents = async (session) => {
      // console.log("---------------- password: ", session?.user.id)
      const response = await fetch("http://localhost:8000/users/event/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: session?.user.id, })
      },
      );
      const data = await response.json();
      console.log(data);
      setMyEvents(data);
    };
    
    await getUserEvents(session);
    setProcessing(false);
  };

  useEffect(() => {
    if (checkEvent()){
      checkEvent();
    }
  }, [myEvents]);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      {session?.user ? (
        <div>
    <SessionProvider session={session}>
      <section className="feed text-white font-montserrat">
    
      {event.img && poke.png && (
      <div className="mb-10 mt-10"></div>
      )}

      {event.img && poke.png && (
          <Image
          className='rounded-lg hover:animate-pulse'
          src={event.img}
          width={600}
          height={300}
          // className='rounded-full'
          alt={`${event.name} photo`}
          // onClick={() => setToggleDropdown(!toggleDropdown)}
        />
        )}

      {event.img && poke.png && (
      <div className='event_box flex justify-evenly items-center'>
        {event.img && poke.png && (
          <div className='flex flex-col space-y-5 text-center'>    
            <h1 className='text-lg'>{event.name}</h1>
            {/* <p>{poke.c1}</p>
            <p>{poke.c2}</p> */}
            <p>{event.info}</p>
            <p>{new Date(event.date).toLocaleDateString()}</p>
            {/* <p>{event.price}</p>
            <p>{event.location}</p> */}
          </div>
        )}
          {event.img && poke.png && (
            <div className='flex flex-col justify-center items-center text-center'>
              <h1 className='text-lg'>Pokémon do Evento:</h1>
              <h1 className='text-md'>{poke.pokemon}</h1>
              <Image
              className='hover:animate-spin'
              src={poke.png}
              width={100}
              height={100}
              // className='rounded-full'
              alt={`${poke.pokemon} photo`}
              // onClick={() => setToggleDropdown(!toggleDropdown)}
            />
          </div>
          )}

          {!checkEvent() && !processing && event.img && poke.png && (
          <button
            type='button'
            onClick={() => {
              buyEvent();
              handleClick();
            }}
            className='white_btn w-1/4'
          >
            Comprar
        </button>)}
        {checkEvent() && !processing && event.img && poke.png &&(
          <button
            type='button'
            onClick={() => {
              sellEvent();
              handleClick();
            }}
            className='black_btn w-1/4'
          >
            Vender
        </button>)}

        {processing && event.img && poke.png &&(
          <button
          type='button'
          className='gray_btn w-1/4'
        >
        <svg class="animate-bounce mt-1 h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          <circle class="opacity-1000" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      </svg>
          Processando...
      </button>
        )}
      </div>
      )}
      
    </section>
    </SessionProvider>
    </div>
      ) : (
        <div>
        <section className="feed text-white font-montserrat">
      
        {event.img && poke.png && (
        <div className="mb-10 mt-10"></div>
        )}
  
        {event.img && poke.png && (
            <Image
            className='rounded-lg hover:animate-pulse'
            src={event.img}
            width={600}
            height={300}
            // className='rounded-full'
            alt={`${event.name} photo`}
            // onClick={() => setToggleDropdown(!toggleDropdown)}
          />
          )}
  
        {event.img && poke.png && (
        <div className='event_box flex justify-evenly items-center'>
          {event.img && poke.png && (
            <div className='flex flex-col space-y-5 text-center'>    
              <h1 className='text-lg'>{event.name}</h1>
              <p>Um evento {poke.c1} para um público {poke.c2}</p>
              {/* <p>{event.info}</p> */}
              <p>{new Date(event.date).toLocaleDateString()}</p>
              {/* <p>{event.price}</p>
              <p>{event.location}</p> */}
            </div>
          )}
            {event.img && poke.png && (
              <div className='flex flex-col justify-center items-center text-center'>
                <h1 className='text-lg'>Pokémon do Evento:</h1>
                <h1 className='text-md'>{poke.pokemon}</h1>
                <Image
                className='hover:animate-spin'
                src={poke.png}
                width={100}
                height={100}
                // className='rounded-full'
                alt={`${poke.pokemon} photo`}
                // onClick={() => setToggleDropdown(!toggleDropdown)}
              />
            </div>
            )}

          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                  postUser(session?.user);
                }}
                className='white_btn w-1/4'
              >
                Comprar
              </button>
          ))}
          
        </div>
        )}
        
      </section>
    </div>
    )}
  </>
  );
};

export default Event;