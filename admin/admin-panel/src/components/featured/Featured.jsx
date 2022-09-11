import './featured.scss';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Featured</h1> 
            <MoreVertOutlinedIcon fontSize="small"/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth="5"/>
            </div>
            <p className="title">Total sales made today</p>
            <p className="amount">$430</p>
            <p className="desc">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, ut?.</p>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult positive">
                        <ArrowDropUpOutlinedIcon /> 
                        <div className="resultAmount">$12.5k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    <div className="itemResult positive">
                        <ArrowDropUpOutlinedIcon /> 
                        <div className="resultAmount">$12.5k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult negative">
                        <ArrowDropDownOutlinedIcon /> 
                        <div className="resultAmount">$12.5k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured