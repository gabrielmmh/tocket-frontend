import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className='head_text text-center'>
        Eventos
        <br className="max-md:hidden"/>
        <span className="purple_gradient text-center"> Bombando</span>
      </h1>
      <p className="desc text-center">
        Mineiro safadinho, que adora uma festinha e um bom papo.
      </p>

      <Feed/>
    </section>
  )
}

export default Home