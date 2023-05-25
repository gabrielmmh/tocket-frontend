'use client';

import { useState, useEffect } from 'react';

import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setsearchText] = useState('');
  const [posts, setPosts] = useState([]);

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
  useEffect(() => {
    const fetchPosts = () => {
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

      setPosts(data);
    };

    // if (session?.user.id) fetchPosts();
  // }, [session?.user.id]);
  fetchPosts();

  }, []);

  return (
    <section className="feed">
      <form className="flex flex-row grow-1 w-full flex-center justify-evenly ">
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

    <div className="prompt_box flex flex-row justify-center flex-wrap">
      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </div>

      <h1 className='head_text_us text-center'>
        About Us
        <br className="max-md:hidden"/>
      </h1>
      <div className='about_card'>
        <p className='text-white' >A Tocket é um marketplace de ingressos, que possibilita a venda primária e secundária por meio de contratos inteligentes na blockchain. Somos um grupo de alunos de engenharia de computação no Insper com o objetivo de garantir ao máximo a segurança e praticidade na compra e venda de ingressos.</p>
      </div>

      
    </section>
  )
}

export default Feed