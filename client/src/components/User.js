import {useContext} from 'react'
import UserContext from '../context/User/UserContext';

const User = async () => {
const context = useContext(UserContext)
  const {getUser} = context
  const User = await getUser()
  console.log(User)
  return User
}

export default User