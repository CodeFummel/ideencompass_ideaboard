import Image from "next/image";
import {Main} from "./Main";
import {Footer} from "./Footer";
import {Header} from "./Header";
import {Sidebar} from "./Sidebar";

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
