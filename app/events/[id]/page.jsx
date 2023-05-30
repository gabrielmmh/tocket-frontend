"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";


const Event = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const eventId = searchParams.get('id');
  const pathname = usePathname();

  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      console.log("usePathName:", pathname);
      console.log("eventId:", eventId);
      const response = await fetch(`http://localhost:8000${pathname}`);
      const data = await response.json();

      setEvent(data);
    };

    getEvent();
  }, []);

  const buyEvent = async () => {
    const response = await fetch(`/event/${eventId}/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: session.user.id }),
    });
    const data = await response.json();
    // router.push(`/profile/${session.user.id}`);
  }
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
      <div>
        <Image
          src={event.img}
          width={100}
          height={100}
          // className='rounded-full'
          alt={`${event.name} photo`}
          // onClick={() => setToggleDropdown(!toggleDropdown)}
        />
        <h1>{event.name}</h1>
        <p>{event.info}</p>
        <p>{event.date}</p>
        {/* <p>{event.price}</p>
        <p>{event.location}</p> */}
        <button
          type='button'
          onClick={() => {
            buyEvent();
          }}
          className='mt-5 w-full black_btn'
        >
          Comprar
      </button>
      </div>
    </SessionProvider>
  );
};

export default Event;