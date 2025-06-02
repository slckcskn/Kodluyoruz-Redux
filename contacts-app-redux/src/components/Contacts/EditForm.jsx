import { useState } from 'react'
import styles from './Contacts.module.css'
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux'
import { updateContact } from '../../redux/contactSlice'

function EditForm({contact}) {
    const [name, setName] = useState(contact.name)
    const [number, setNumber] = useState(contact.phone_number)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!name || !number) return false

        dispatch(updateContact({
            id: contact.id,
            changes: {
                name,
                phone_number:number
            }
        }))

        navigate('/')
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
                <button type='submit' className={styles.button}>Update</button>
            </form>
        </div>
  )
}

export default EditForm