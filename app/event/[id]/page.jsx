"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


const Event = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const eventId = searchParams.get('id');

  const [event, setEvent] = useState({});

  useEffect(() => {
    const getEvent = async () => {
      const response = await fetch(`/event/${eventId}`); // placeholder api do caio
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
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Image
        src={event.photo}
        // width={37}
        // height={37}
        // className='rounded-full'
        alt={`${event.name} photo`}
        // onClick={() => setToggleDropdown(!toggleDropdown)}
      />
      <h1>{event.name}</h1>
      <p>{event.info}</p>
      <p>{event.date}</p>
      <p>{event.price}</p>
      <p>{event.location}</p>
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
  );
};

export default Event;