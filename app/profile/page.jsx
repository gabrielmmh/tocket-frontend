"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  // const { data: session } = useSession();

  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    // const fetchPosts = async () => {
    const fetchPosts = () => {
      // const response = await fetch(`/api/users/${session?.user.id}/posts`);
      // const data = await response.json();
      // construcao de um data simulado
      const data = [
        {
          _id: "1",
          title: "Titulo 1",
          description: "Descricao 1",

          user: {
            name: "Nome 1",
            email: "nome1@mail.com"
          },
        },
        {
          _id: "2",
          title: "Titulo 2",
          description: "Descricao 2",

          user: {
            name: "Nome 2",
            email: "nome2@mail.com"
          },
        },
        {
          _id: "3",
          title: "Titulo 3",
          description: "Descricao 3",

          user: {
            name: "Nome 3",
            email: "nome3@mail.com"
          },
        },
        {
          _id: "4",
          title: "Titulo 4",
          description: "Descricao 4",

          user: {
            name: "Nome 4",
            email: "nome4@mail.com"
          },
        },
        {
          _id: "5",
          title: "Titulo 5",
          description: "Descricao 5",

          user: {
            name: "Nome 5",
            email: "nome5@mail.com"
          },
        }
      ];

      setMyPosts(data);
    };

    // if (session?.user.id) fetchPosts();
  // }, [session?.user.id]);
  fetchPosts();

  }, []);

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
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. See the shows you have saved'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;