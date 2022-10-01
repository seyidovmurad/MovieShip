import { HomeOutlined, MovieCreation, Rocket, Search, Tv } from "@mui/icons-material"
import { useSelector } from "react-redux"
import { selectDisplay } from "../../features/menu/menuSlice"
import "./sidebar.scss"

const Sidebar = () => {
  const dispaly = useSelector(selectDisplay);
  return (
    <div className={dispaly ? "sidebar" : "sidebar d-none"}>
      <div className="search">
        <input type="text" placeholder="Search" />
        <Search className="icon" />
      </div>
      <div className="nav">
        <ul>
            <li>
                <HomeOutlined className="icon"/>
                <span>Home</span>
            </li>
            <li>
                <Rocket className="icon" />
                <span>Top IMDB</span>
            </li>
            <li>
                <MovieCreation className="icon" />
                <span>Movies</span>
            </li>
            <li>
                <Tv className="icon" />
                <span>Tv Shows</span>
            </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
