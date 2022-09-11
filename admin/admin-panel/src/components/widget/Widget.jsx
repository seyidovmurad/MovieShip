import './widget.scss'
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Widget = ({ type }) => {
  let data; 
  let amount = 0;
  let diff = 20;
  switch(type) {
    case "user":
        data = {
            title: "USER",
            isMoney: false,
            link: "See all users",
            icon: <AccountCircleOutlinedIcon className="icon"/> //give color and bacground-color style each element
        }
    break;
    case "product":
        data = {
            title: "USER",
            isMoney: false,
            link: "See all users",
            icon: <AccountCircleOutlinedIcon className="icon"/>
        }
    break;
    default: break;
  }
  return (
    <div className="widget">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.isMoney && "$"} {amount}</span>
            <span className="link">{data.link}</span>
        </div>
        <div className="right">
            <div className="percentage positive">
                <ArrowDropUpOutlinedIcon />
                {diff}%
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget