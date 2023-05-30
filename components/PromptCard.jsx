"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick, classname }) => {
  // const { data: session } = useSession();
  const data = post;
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  // const PromptCardList = ({ data, handleTagClick }) => {
  //   return(
  //     <div className="profile_layout">
  //       {data.map((post) => (
  //         <PromptCard
  //           key={post._id}
  //           post={post}
  //           handleTagClick={handleTagClick}
  //           classname={"prompt_card"}
  //         />
  //       ))}
  //     </div>
  //   )
  // }

  // Estrutura do dicionário
//   [
//     {
//         "id": 1,
//         "name": "Tequilada Insper",
//         "info": "We are all Freaks",
//         "img": "https://d106p58duwuiz5.cloudfront.net/event/cover/5539e5abffa0d9e4fa5e960bf1148c45.jpg",
//         "date": "2023-07-20T21:00:00Z"
//     },
//     {
//         "id": 2,
//         "name": "Baile do Tubarão",
//         "info": "Fabrica de Funk",
//         "img": "https://images.sympla.com.br/6237362d0c2fb-xs.jpg",
//         "date": "2023-08-26T20:00:00Z"
//     },
//     {
//         "id": 3,
//         "name": "Festa da Uva",
//         "info": "9 Expo Vinhos Jundiaí",
//         "img": "https://www.baressp.com.br/eventos/fotos2/festa-da-uva-jundiai-baressp-min.jpg0NDQ0NDQ0NDQ0NDQ0N",
//         "date": "2023-08-13T10:00:00Z"
//     },
//     {
//         "id": 4,
//         "name": "Rock in Rio 2024",
//         "info": "Rock no Rio",
//         "img": "https://portalpopline.com.br/wp-content/uploads/2022/08/rock-in-rio-2.jpg",
//         "date": "2024-10-29T12:00:00Z"
//     },
//     {
//         "id": 5,
//         "name": "Baile do Hawaii",
//         "info": "Festa dos uculele",
//         "img": "https://s3.guicheweb.com.br/imagenseventos/20-10-2022_13-54-45.png",
//         "date": "2023-09-30T18:00:00Z"
//     },
//     {
//         "id": 6,
//         "name": "Farofada Universitária - Festa do Branco",
//         "info": "Varios Artista",
//         "img": "https://d106p58duwuiz5.cloudfront.net/event/cover/902b5f2346eb75e92e0df56e75a5b7d1.png",
//         "date": "2023-07-14T21:00:00Z"
//     },
//     {
//         "id": 7,
//         "name": "Telegram Party",
//         "info": "sla festa do telegram kkkkkkkkk",
//         "img": "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6889166b-339a-41b5-8801-db89bd2182e7/dchekoq-7f569aac-10ea-459a-ac3a-63b4fc829451.jpg/v1/fill/w_800,h_800,q_75,strp/telegram_party_flyer___psd",
//         "date": "2023-06-05T19:00:00Z"
//     },
//     {
//         "id": 8,
//         "name": "UFC 289",
//         "info": "Nunes x Aldana",
//         "img": "https://dmxg5wxfqgb4u.cloudfront.net/styles/inline/s3/2023-05/289_SG_POR_SMA_POR_1200x1200.jpg?itok=cVorxDHu",
//         "date": "2023-06-22T01:00:00Z"
//     },
//     {
//         "id": 9,
//         "name": "Expo Serra",
//         "info": "sindicato rural de Tangara da Serra",
//         "img": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhETEhEVFhUVEhoYGBUSGBoSFhUYFRUXGBUWGBcYKCggGholGxgZITEtJSkrLi46GCEzODMsNygtLisBCgoKDg0OGxAQGi0lICUtLS0vLy4tLy0vLS0tNy0tLS0tLS0tLS0rLS4tL",
//         "date": "2023-10-11T11:00:00Z"
//     }
// ]
  return (
    // <div className={classname}>
    //   <div className='items-center flex-around'>
    
    //     <div
    //       className='flex flex-col gap-3 cursor-pointer items-center'
    //       onClick={handleProfileClick}
    //     >
    //         <h3 className='font-montserrat text-white/80'>
    //           {post.name}
    //         </h3>
    //         {/* <p className='font-montserrat text-white/70 text-sm '>
    //           {post.info}
    //         </p> */}
      
            <Image
              src={post.img}
              alt={`${post.name} photo`}
              width={400}
              height={200}
              className='rounded-lg'
            />
          
  //       </div>
  //     </div>  
  //     {/* )} */}
  // </div>
  );
};

export default PromptCard;