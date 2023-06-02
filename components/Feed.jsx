'use client';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState }from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="profile_layout">
      {data.map((post) => (
        <Link href={`/events/${post.id}`}>
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          classname={"prompt_card"}
          posts={data}
        />
        </Link>
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
  };

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
      <div className="mb-10 mt-10"></div>
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
          placeholder="Pesquisar eventos..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

    <div className="prompt_box">
      <PromptCardList
        data={events}
        handleTagClick={() => {}}
        />
        </div>
    
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
  <div className='dev_person'>
    <div 
      className='dev_img hover:animate-pulse'
      style={{ backgroundImage: "url('/assets/images/pedro.jpg')" }}
    />
    <p className='text-white font-montserrat p-1 mt-2'>Pedro Civita</p>
  </div>

  <div className='dev_person'>
    <div 
      className='dev_img hover:animate-pulse'
      style={{ backgroundImage: "url('/assets/images/arthur.jpg')" }}
    />
    <p className='text-white font-montserrat p-1 mt-2'>Arthur Tamm</p>
  </div>

  <div className='dev_person'>
    <div 
      className='dev_img hover:animate-pulse'
      style={{ backgroundImage: "url('/assets/images/gabriel.jpg')" }}
    />
    <p className='text-white font-montserrat p-1 mt-2'>Gabriel Hermida</p>
  </div>

  <div className='dev_person'>
    <div 
      className='dev_img hover:animate-pulse'
      style={{ backgroundImage: "url('/assets/images/caio.jpg')" }}
    />
    <p className='text-white font-montserrat p-1 mt-2'>Caio Bôa</p>
  </div>
</div>




      
    </section>
  )
}

export default Feed