"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import '@styles/globals.css';
import Profile from "@components/Profile";



const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [myEvents, setMyEvents] = useState([]);

  useEffect(() => {
    const getEvents = async (session) => {
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
    
    getEvents(session);
  }, [session?.user]);

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

        const filteredPosts = myEvents.filter((item) => item._id !== post._id);

        setMyEvents(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Profile
      data={myEvents}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;