import * as usersService from '../../utilities/users-service';
import { checkToken } from '../../utilities/users-service';

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    checkToken()
    const expDate =  await usersService.checkToken()
    console.log(expDate)
  }
  
  return (
      <main>
        <>
        <h1>OrderHistoryPage</h1>
        <button onClick={handleCheckToken}>Check When My Login Expires</button>
        </>
      </main>
  );
}

