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

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="flex flex-row grow-1 w-full flex-center justify-evenly ">
      <h1 className='head_text text-center'>
        Eventos
        <br className="max-md:hidden"/>
        <span className="purple_gradient text-center ml-3"> Bombando</span>
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

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />

      <h1 className='head_text_us text-center'>
        About Us
        <br className="max-md:hidden"/>
      </h1>
      <div className='prompt_card'>
        <p>A Tocket é um marketplace de ingressos, que possibilita a venda primária e secundária por meio de contratos inteligentes na blockchain. Somos um grupo de alunos de engenharia de computação no Insper com o objetivo de garantir ao máximo a segurança e praticidade na compra e venda de ingressos.</p>
      </div>

      
    </section>
  )
}

export default Feed