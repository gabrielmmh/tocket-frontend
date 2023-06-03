import PromptCard from './PromptCard'
import '@styles/globals.css';
import Link from 'next/link'


const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="profile_layout_myevents">
      {data.map((post) => (
        
        <PromptCard
          key={post._id}
          post={post}
          // handleTagClick={handleTagClick}
          classname={"prompt_card"}
          posts={data}
        />
        
      ))}
    </div>
  )
}

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
      <section className='feed text-white font-montserrat'>
        <div className="mb-10 mt-10"></div>
        <div className='flex flex-col w-full'>
          <h1 className='head_text'>Seus Eventos</h1>
          {/* <p className='head_text text-sm'>Veja quais eventos você salvou</p> */}
        </div>
          <div className="prompt_box_profile">
            <PromptCardList
              data={data}
              // handleTagClick={() => {}}
            />
        </div>
    </section>
  )
}

export default Profile