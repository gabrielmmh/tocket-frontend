'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState }from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="profile_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          classname={"prompt_card"}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventDiv, setEventDiv] = useState();

  const handleSearchChange = (e) => {
  }

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch('/api/prompt');
  //     const data = await response.json();

  //     setPosts(data);
  //   }
  //   fetchPosts();
  // }, []);

  // useEffect(() => {
  //   const fetchPosts = () => {
  //     const data = [
  //       {
  //         _id: "1",
  //         title: "Titulo 1",
  //         description: "Descricao 1",

  //         user: {
  //           name: "Nome 1",
  //           email: "nome1@mail.com"
  //         },
  //       },
  //       {
  //         _id: "2",
  //         title: "Titulo 2",
  //         description: "Descricao 2",

  //         user: {
  //           name: "Nome 2",
  //           email: "nome2@mail.com"
  //         },
  //       },
  //       {
  //         _id: "3",
  //         title: "Titulo 3",
  //         description: "Descricao 3",

  //         user: {
  //           name: "Nome 3",
  //           email: "nome3@mail.com"
  //         },
  //       },
  //       {
  //         _id: "4",
  //         title: "Titulo 4",
  //         description: "Descricao 4",

  //         user: {
  //           name: "Nome 4",
  //           email: "nome4@mail.com"
  //         },
  //       },
  //       {
  //         _id: "5",
  //         title: "Titulo 5",
  //         description: "Descricao 5",

  //         user: {
  //           name: "Nome 5",
  //           email: "nome5@mail.com"
  //         },
  //       },
        
  //       {
  //         _id: "6",
  //         title: "Titulo 6",
  //         description: "Descricao 6",

  //         user: {
  //           name: "Nome 6",
  //           email: "nome6@mail.com"
  //         },
  //       }
  //     ];

  //     setPosts(data);
  //   };

  //   // if (session?.user.id) fetchPosts();
  // // }, [session?.user.id]);
  // fetchPosts();

  // }, []);

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

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch("http://localhost:8000/events/");
      const data = await response.json();

      setEvents(data);
    };
    getEvents();

  }, []);

  useEffect(() => {
    console.log(events);
    const e = events.map(event => (
      <Link href={`/events/${event.id}`}>
        <Image
          src={event.img}
          alt={`${event.name} photo`}
          width={100}
          height={100}
        />
      </Link>
    ));
    setEventDiv(e);
  }, [events]);

  return (
    <section className="feed">
      <form className="flex flex-row grow-1 w-full flex-center justify-evenly">
      <h1 className='head_text text-center'>
        Eventos Bombando
        {/*
        <br className="max-md:hidden"/>
        <span className="purple_gradient text-center ml-3"> Bombando</span>
        */}
      </h1>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

    {/* <div className="prompt_box">
      <PromptCardList
        data={events}
        handleTagClick={() => {}}
      />
    </div> */}
    {eventDiv}

    <button className="marketplace hover:animate-pulse">
      Marketplace
    </button>


      <h1 className='head_text_us text-center'>
        About Us
        <br className="max-md:hidden"/>
      </h1>
      <div className='about_card'>
        <p className='text-white text-center' >A Tocket é um marketplace de ingressos, que possibilita a venda primária e secundária por meio de contratos inteligentes na blockchain. Somos um grupo de alunos de engenharia de computação no Insper com o objetivo de garantir ao máximo a segurança e praticidade na compra e venda de ingressos.</p>
      </div>

      <div className='dev_card'>
        <img 
          src='/assets/images/profilePlaceHolder.jpg'
          alt='Profile1'
          width={120}
          height={40}
          className='dev_img'
        />      
          
        <img 
          src='/assets/images/profilePlaceHolder.jpg'
          alt='Profile2'
          width={120}
          height={40}
          className='dev_img'
        />

        <img 
          src='/assets/images/profilePlaceHolder.jpg'
          alt='Profile3'
          width={120}
          height={40}
          className='dev_img'
        />

        <img 
          src='/assets/images/profilePlaceHolder.jpg'
          alt='Profile4'
          width={120}
          height={40}
          className='dev_img'
        />

      </div>

      
    </section>
  )
}

export default Feed