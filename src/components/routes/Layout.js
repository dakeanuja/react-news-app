import {Outlet} from "react-router-dom";
import NavBar from "../NavBar";
import { useState } from "react";

export default function Layout(){
  const [searchQuery, setSearchQuery] = useState("");
  
    return(
        <>
        <NavBar onSearch={setSearchQuery} clearSearch={() => setSearchQuery("")}/>
         <div className="container my-4" >
        <Outlet context={{searchQuery}}/> {/* All pages will be rendered here */}
      </div>
        </>

    );
}