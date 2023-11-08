/* eslint-disable react/prop-types */
import './listcard.scss';
import { BiChevronLeft, BiChevronRight, BiTrash, BiEditAlt } from 'react-icons/bi';
import { arrowClick, deleteItem } from '../../redux/projectSlice';
import { useDispatch } from 'react-redux';

const ListCard = (items) => {
    const { item } = items;

    const dispatch = useDispatch();

    const ArrowClick = (string) => {
        dispatch(arrowClick(item, string));
    };
    const handleDelete = () => {
        dispatch(deleteItem(item._id));
    };

    const handleEdit = () => {
    };

    return (
        <div>
            <ul className={` ${item.status === 'Completed' ? 'completed menu' : 'menu'}`}>
                {/* <li>
                    <p>{item._id}</p>
                </li> */}
                <li>
                    <p>{item.name}</p>
                </li>
                <li>
                    <p>{item.desc}</p>
                </li>
                <li>
                    <p>{item.department}</p>
                </li>
                <li>
                    <p>{item.startDate}</p>
                </li>
                <li>
                    <p>{item.endDate}</p>
                </li>
                <li>
                    <p>{item.status}</p>
                </li>
                <li>
                    <button
                        disabled={item.status === 'backlog'}
                        onClick={() => ArrowClick('left')}
                    >
                        <BiChevronLeft />
                    </button>
                    <button
                        disabled={item.status === 'Completed'}
                        onClick={() => ArrowClick('right')}
                    >
                        <BiChevronRight />
                    </button>
                    <button onClick={handleDelete}>
                        <BiTrash />
                    </button>
                    <button onClick={handleEdit}>
                        <BiEditAlt />
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default ListCard;
