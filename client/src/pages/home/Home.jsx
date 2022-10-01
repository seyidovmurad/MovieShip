import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
        <Navbar />
        <div className="content">
          <Sidebar />
          <List />
        </div>
    </div>
  )
}

export default Home
