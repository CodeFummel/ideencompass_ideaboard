import Image from "next/image";

const Header = () => (
  <header className="px-18 flex flex-row item-center border-b-2 border-solid border-inherit">
    <h1 className="font-36px font-bold justify-center">Ideenboard</h1>
    <div className="p-[8px] m-[8px] text-left justify-end border-2 border-solid rounded-(--border-radius) border-inherit ">
      <img src="https://via.placeholder.com/48" alt="Benutzerbild" />
    </div>
  </header>
)

const Main = () => (
  <main className="p-[8px] m-[8px] text-left flex justify-start border-2 border-solid rounded-(--border-radius) border-inherit ">
    <nav className="justify-start">
      <button className="navButton">Beste Ideen</button>
      <button className="navButton">Neue Ideen</button>
      <button className="navButton">Projekte</button>
      <button className="navButton">Umfragen</button>
    </nav>
    <div className="idea_list">
      <p>Idea 1</p>
      <p>Idea 2</p>
      <p>Idea 3</p>
    </div>
  </main>
)

const Sidebar = ({username}) => (
    <aside className="sidebar flex flex-col justify-end">
      <div className="p-[8px] m-[8px] text-left border-2 border-solid rounded-(--border-radius) border-inherit ">
        <h2>{username}</h2>
        <p>Mein Name ist</p>
      </div>

      <div className="p-[8px] m-[8px] text-left border-2 border-solid rounded-(--border-radius) border-inherit ">
        <h2>Mein Projekt 1</h2>
        <p>Halloo das ist mein Projekt und so</p>
      </div>
    </aside>
)

const Footer = () => (
  <footer className="sticky top-full p-[8px] px-18 mt-18 text-center border-t-2 border-solid  border-inherit">
    <h3>Impressum und so yay</h3>
  </footer>
)

export default function Home() {

  const username = "Lynette";

  return (
    <>
      <Header />
      <div className="flex">
        <Main />
        <Sidebar username={username}/>
      </div>
      <Footer />
    </>
  );  
}
