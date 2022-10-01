import "./paginate.scss";
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const Paginate = ({ currentPage, lastPage, onChange}) => {
    const sibling = 5; //can be changed
    const itemCount = sibling + 3;
    const pageArray = Array(itemCount).fill().map((_, index) => {
        if(index === 0)
            return 1;
        if(index === itemCount - 2 && currentPage < lastPage - Math.floor(sibling/2) )
            return "...";
        if(index === itemCount - 1)
            return lastPage;
        if(currentPage > Math.ceil(sibling/2)) {
            if(index === 1)
                return "..."
            if(currentPage >= lastPage - Math.ceil(sibling/2) - 1) 
                return lastPage - sibling + (index) -2
            return currentPage - Math.ceil(sibling/2) + index;
        }
        return index + 1
    });


    return (
        <div className="paginate">
        <ul>
          <li onClick={ () => onChange(currentPage - 1) } ><ArrowBackIos className="icon"/></li>
          { pageArray.map( (page, index) => (
            <li key={index} onClick={ () => onChange(page === "..." ? currentPage : page ) } className={page === currentPage ? "active" : ""}>{page}</li>
          ))}
          <li onClick={ () => onChange(currentPage + 1) } ><ArrowForwardIos className="icon"/></li>
        </ul>
      </div>
    )
}

export default Paginate
