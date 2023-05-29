'use client'
import Feed from "@components/Feed";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState }from 'react';

const Home = () => {

  const [events, setEvents] = useState([]);
  const [eventDiv, setEventDiv] = useState();

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
    <section className="w-full flex-center flex-col">
      <Feed/>
      {eventDiv}
    </section>
  )
}

export default Home