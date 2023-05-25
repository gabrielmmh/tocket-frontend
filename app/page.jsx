'use client'
import Feed from "@components/Feed";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState }from 'react';

const Home = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await fetch(`api/eventos`);  // placeholder api do caio
      const data = await response.json();

      setEvents(data);
    };

    getEvents();
    const e = events.map(event => (
      <Link href={`/event/${event.id}`}>
        <Image
          src={event.photo}
          alt={`${event.name} photo`}
        />
      </Link>
    ).join(''));
    setEvents(e);

  }, []);

  return (
    <section className="w-full flex-center flex-col">
      <h1 className='head_text text-center'>
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p classsName="desc text-center">
        Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts
      </p>
      <Feed/>
      {events}
    </section>
  )
}

export default Home