"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick, classname, posts }) => {
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
    // <Link href={`/events/${event.id}`}>
    //     //   <Image
    //     //     src={event.img}
    //     //     alt={`${event.name} photo`}
    //     //     width={100}
    //     //     height={100}
    //     //   />
    //     // </Link>
            <Image
              src={post.img}
              alt={`${post.name} photo`}
              width={400}
              height={200}
              className='rounded-lg hover:animate-pulse'
            />
          
  //       </div>
  //     </div>  
  //     {/* )} */}
  // </div>
  );
};

export default PromptCard;