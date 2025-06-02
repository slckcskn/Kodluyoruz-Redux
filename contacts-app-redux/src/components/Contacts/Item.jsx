import React from 'react'

import styles from './Contacts.module.css'

import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contactSlice'

import { Link } from 'react-router';

function Item({item}) {

  const dispatch = useDispatch()

  const handleDelete = (id) => {
      if(window.confirm('Are you sure?')){
        dispatch(deleteContact(id))
      }
  }

  return (
    <div>
    <li className={styles.item}>
        <span>{item.name}</span>
        <span>{item.phone_number}</span>
        <div className={styles.edit}>
          <span>
            <Link to={`/edit/${item.id}`}>Edit</Link>
          </span>
          <span className={styles.deleteBtn} onClick={() => handleDelete(item.id)}>x</span>
        </div>
        
    </li>
    </div>
  )
}

export default Item