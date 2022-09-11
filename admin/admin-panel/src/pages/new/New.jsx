import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './new.scss';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';

const New = () => {
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src="https://media.istockphoto.com/vectors/photo-coming-soon-image-icon-vector-illustration-isolated-on-white-vector-id1193046541?k=20&m=1193046541&s=612x612&w=0&h=XTXTZG9mJPnczJf_U_k2hJqIxu2kc-eRJ0nW1HiV7-8=" alt="noimage" />
          </div>
          <div className="right">
            <form >
            <div className="formInput">
                <label htmlFor="file">
                  Image <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" style={{display: "none"}}/>
              </div>
              <div className="formInput">
                <label >Username</label>
                <input type="text" placeholder="joe_doe" />
              </div>
              {/* {inputs.map((input) => (
                <div className="formInput">
                  <label >{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder}/>
                </div>
              ))} */}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New