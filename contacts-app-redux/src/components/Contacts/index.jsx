import Form from './Form'
import List from './List'
import styles from './Contacts.module.css'

import { useSelector } from 'react-redux';
import { contactSelectors } from '../../redux/contactSlice'

function Contacts() {
  const total = useSelector(contactSelectors.selectTotal)

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Contacts : {total}</h1>
        <Form />
        <List />
    </div>
  )
}

export default Contacts