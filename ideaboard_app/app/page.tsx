import Image from "next/image";
import {Main} from "./Main";


const Header = () => (
  <header className="flex flex-row gap-(--flex-gap) items-center border-b-2 border-solid border-(--border)">
    <div className="flex-1"></div>  
    <h1 className="text-[30px] font-bold">Ideenboard</h1>
    <div className="flex flex-1 justify-end">
      <button className="p-[8px] m-[8px] text-left border-2 border-solid rounded-(--border-radius) border-(--border) hover:bg(--hover-background)">
        <img src="https://via.placeholder.com/48" alt="Benutzerbild" />
      </button>
    </div>
  </header>
);



const Sidebar = ({username}) => (
    <aside className="flex flex-col flex-1 justify-end gap-(--flex-gap) items-stretch">
      <div className="p-[8px] m-[8px] h-[40%] text-left border-2 border-solid rounded-(--border-radius) border-(--border)">
      <h2>Benutzername:</h2>  
      <p>{username}</p>
      </div>

      <div className="p-[8px] m-[8px] h-[60%] text-left border-2 border-solid rounded-(--border-radius) border-(--border)">
        <h2>Mein Projekt 1</h2>
        <p>Halloo das ist mein Projekt und so</p>
      </div>
    </aside>
);

const Footer = () => (
  <footer className="sticky top-full p-[8px] px-18 text-center border-t-2 border-solid  border-(--border)">
    <h3>Impressum und so yay</h3>
  </footer>
);

export default function Home() {

  const username = "Lynette";

  return (
    <div className="h-full flex flex-col gap-(--flex-gap)">
      <Header />
      <div className="flex flex-row flex-1 gap-(--flex-gap)">
        <Main />
        <Sidebar username={username}/>
      </div>
      <Footer />
    </div>
  );  
}
