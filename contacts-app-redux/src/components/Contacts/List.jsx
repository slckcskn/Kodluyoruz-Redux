import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { contactSelectors, deleteAllContacts } from '../../redux/contactSlice';
import Item from './Item';
import styles from './Contacts.module.css'

function List() {
    const contacts = useSelector(contactSelectors.selectAll)
    const total = useSelector(contactSelectors.selectTotal)
    const dispatch =useDispatch()
    const handleDeleteAll = () => {
      if(window.confirm('Are you sure?')){
      dispatch(deleteAllContacts())
      }
    }

  return (
    <div>
      {
        total > 0 && <div className={styles.deleteAllBtn} onClick={handleDeleteAll}>Delete All</div>
      }
      
    <ul className={styles.list}>
        {
            contacts.map((contact) => (
            <Item key={contact.id} item={contact}/>
        ))
        }
    </ul>
    </div>
  )
}

export default List