import React from 'react'
import './card.css';
import { useDispatch, useSelector } from 'react-redux';
import { openCard } from '../../redux/memorySlice';


function Card({ item }) {

  const dispatch = useDispatch();
  const selectedCardsCount = useSelector((state) => state.memory?.selectedCards?.length ?? 0);

  const handleClick = () => {
    // Tıklandığında:
    // Henüz çevrilmemiş ve eşleştirilmemiş kartlara tıklamaya izin ver
    // İki kart seçilmemişse tıklamaya izin ver
    if (!item.isFlipped && !item.isMatched && selectedCardsCount < 2) {
      dispatch(openCard(item.id));
    }
  };

  return (
    <div className={`memo-card${item.isFlipped ? ' flipped' : ''}`} onClick={handleClick}>
      <div className="card-inner">
       <div className="card-front">?</div>
        <div className="card-back">
          {
            <img src={item.image} alt="logo" className="card-img" />
          }
        </div>
       </div>
    </div>
  )
}

export default Card