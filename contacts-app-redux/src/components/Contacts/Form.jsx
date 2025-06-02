import {useState} from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactSlice'
import styles from './Contacts.module.css'

function Form() {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name || !number) return false

        dispatch(addContact({id: nanoid(), name, phone_number: number}))
        
        setName('')
        setNumber('')
    }

  return (
    <div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
                className={styles.input}
                placeholder='name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                className={styles.input}
                placeholder='phone number' 
                value={number}  
                onChange={(e) => setNumber(e.target.value)}
            />
            <button type='submit' className={styles.button}>Add</button>
        </form>
    </div>
  )
}

export default Form