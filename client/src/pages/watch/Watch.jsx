import "./watch.scss"
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { Add, Videocam } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";

const Watch = () => {
  const [doc, setDoc] = useState({});
  const {id} = useParams();
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movie/${id}`).then(res => {
      setDoc(res.data);
    })
  }, [id])
  console.log("nese");
  return (
    <div className="watch">
      <Navbar />
      <div className="menu">
        <Sidebar />
        <div className="content">
            <div className="video">
                <iframe src={doc?.source_link} title={doc?.name}  frameborder="0"></iframe>
            </div>
            <div className="contentInfo">
                <div className="poster">
                    <img src={doc?.cover_link} alt={doc?.name} />
                </div>
                <div className="info">
                    <div className="infoBtns">
                        <button><Videocam /><span>Trailer</span></button>
                        <button>IMDB<span>{doc?.imdb_rating}</span></button>
                    </div>
                    <div className="body">
                        <h2>Title</h2>
                        <p><span>Released</span> {doc?.year}</p>
                        <p><span>Country</span> {doc?.country}</p>
                        <p><span>Genre</span> {doc?.genre?.map(g => g.name).join(",")}</p>
                        <p><span>Duration</span> {doc?.duration}</p>
                        <p className="desc">{doc?.description}</p>
                    </div>
                </div>
                <div className="actions">
                    <button><Add /> Add Favorite</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Watch
