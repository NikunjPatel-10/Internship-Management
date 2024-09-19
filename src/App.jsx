import { Container, Flex } from "@mantine/core";
import Sidebar from "./core/components/sidebar/Sidebar";
import Header from "./core/components/header/Header";
import Routing from "./App.routing";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import "./App.css"

function App() {


  return (
    <>
 
        <Flex className="main-wrapper">
          <Sidebar />
          <Flex
            style={{ width: "100%", height: "100%", overflow: "hidden" }}
            direction="column"
          >
            <Header />
            <Routing></Routing>
          </Flex>
        </Flex>
    </>
  );
}

export default App;
