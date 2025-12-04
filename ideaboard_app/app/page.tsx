import Image from "next/image";

const Header = () => (
  <header className="site_header">
    <h1>Ideenboard</h1>
    <div className="user_account_header">
      <img src="https://via.placeholder.com/48" alt="Benutzerbild" />
    </div>
  </header>
)

const Main = () => (
  <main className="main_section">
    <nav></nav>
    <div className="idea_list">
      <p>Idea 1</p>
      <p>Idea 2</p>
      <p>Idea 3</p>
    </div>
  </main>
)

const Sidebar = ({username}) => (
    <aside className="sidebar">
      <div className="user_dashboard">
        <h2>{username}</h2>
        <p>Mein Name ist</p>
      </div>

      <div className="user_projects">
        <h2>Mein Projekt 1</h2>
        <p>Halloo das ist mein Projekt und so</p>
      </div>
    </aside>
)

const Footer = () => (
  <footer className="sticky top-full p-[8px] px-18 mt-18 text-center border-t-2 border-solid border-inherit">
    <h3>Impressum und so yay</h3>
  </footer>
)

export default function Home() {

  const username = "Lynette";

  return (
    <>
      <Header />
      <Main />
      <Sidebar username={username}/>
      <Footer />
    </>
  );  
}
