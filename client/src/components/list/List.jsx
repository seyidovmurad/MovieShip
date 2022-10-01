import './list.scss';
import Cart from "../cart/Cart";
import { FilterAlt } from '@mui/icons-material';
import Paginate from '../paginate/Paginate';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [docs, setDoc] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`http://localhost:5000/api/movie/page/${currentPage}`).then(res => {
        setDoc(res.data.movies);
        setLastPage(res.data.totalPage);
      })
      console.log(docs)
  }, [currentPage, docs])
  const onPageChange = (page) => {
    navigate(`/home/?page=${page}`)
    setCurrentPage(page)
  }
  return (
    <div className="list">
      <div className="head">
        <h2>List Title</h2>
        <div className="filter">
          <FilterAlt className="icon"/>
          Filter
        </div>
      </div>
      <div className="body" >
        {docs.map(d => (
          <Cart key={d._id} doc={d}/>
        ))}
      </div>
      <Paginate currentPage={currentPage} lastPage={lastPage} onChange={onPageChange} />
    </div>
  )
}

export default List
