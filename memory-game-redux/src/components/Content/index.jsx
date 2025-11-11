import React, { useEffect } from 'react'
import Card from '../Card'
import { useSelector, useDispatch } from 'react-redux';
import { correctMatch, closeCard } from '../../redux/memorySlice';
import './content.css';

function Content() {

  const displayCards = useSelector((state) => state.memory.cards);
  const selectedCards = useSelector((state) => state.memory.selectedCards);
  const dispatch = useDispatch();

  // İki kart seçildikten sonra eşleşip eşleşmediklerini kontrol et
  useEffect(() => {
    if (selectedCards.length === 2) {
      const [card1, card2] = selectedCards;
      
      // İsme göre karşılaştır
      if (card1.name === card2.name) {
        // Eşleştiyse:
        dispatch(correctMatch());
      } else {
        // Eşleşmediyse:
        const timer = setTimeout(() => {
          dispatch(closeCard());
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, [selectedCards, dispatch]);

  return (
    <div className='content'>
      {displayCards.map(card => (
        <Card key={card.id} item={card} />
      ))}
    </div>
  )
}

export default Content