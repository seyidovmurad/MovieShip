import "./cart.scss";
import { PlayArrow } from "@mui/icons-material";
import { Link } from 'react-router-dom'
const Cart = ({ doc }) => {
  return (
    <div className="cart">
        <div className="poster">
            <Link to={`/movie/${doc._id}`} >
                <div className="play">
                    <PlayArrow className="icon"/>
                </div>
            </Link>
            <img src={doc.cover_link} alt="" />
        </div>
      <div className="bottom">
        <h3>{doc.name.slice(0, 23)}{doc.name.length > 23 && "..." }</h3>
        <div className="cartInfo">
            <span className="quality">HD</span>
            <span>{doc.year}</span>
            <div className="dot"></div>
            <span>1h 2m</span>
        </div>
      </div>
    </div>
  )
}

export default Cart
