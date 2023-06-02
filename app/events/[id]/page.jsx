"use client";

import '@styles/globals.css';
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const Event = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();
  const eventId = pathname.charAt(pathname.length - 1);
  const [event, setEvent] = useState({});
  const [poke, setPoke] = useState({});

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
    const data = await response.json();
  };
    // router.push(`/profile/${session.user.id}`);

// Funcoes anteriores, podem ser uteis
  // const handleEdit = (post) => {
  //   router.push(`/update-prompt?id=${post._id}`);
  // };

  // const handleDelete = async (post) => {
  //   const hasConfirmed = confirm(
  //     "Are you sure you want to delete this prompt?"
  //   );

  //   if (hasConfirmed) {
  //     try {
  //       await fetch(`/api/prompt/${post._id.toString()}`, {
  //         method: "DELETE",
  //       });

  //       const filteredPosts = myPosts.filter((item) => item._id !== post._id);

  //       setMyPosts(filteredPosts);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  return (
    <SessionProvider session={session}>
      <section className="feed text-white font-montserrat">
      <div className="mb-10 mt-10"></div>
      {/* <div className="w-full bg-cover bg-center" style={{backgroundImage: `url(${event.img})`}}>
      </div> */}
      {poke.png && (
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
      <div className='event_box flex justify-evenly items-center'>
        {/* <Image
          src={event.img}
          width={100}
          height={100}
          // className='rounded-full'
          alt={`${event.name} photo`}
          // onClick={() => setToggleDropdown(!toggleDropdown)}
        /> */}
        <div className='flex flex-col space-y-5 text-center'>    
          <h1 className='text-lg'>{event.name}</h1>
          {/* <p>{poke.c1}</p>
          <p>{poke.c2}</p> */}
          <p>{event.info}</p>
          <p>{new Date(event.date).toLocaleDateString()}</p>
          {/* <p>{event.price}</p>
          <p>{event.location}</p> */}
        </div>
        {event.img && (
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
        <button
          type='button'
          onClick={() => {
            buyEvent();
          }}
          className='black_btn w-1/4'
        >
          Comprar
      </button>
      </div>
    </section>
    </SessionProvider>
  );
};

export default Event;