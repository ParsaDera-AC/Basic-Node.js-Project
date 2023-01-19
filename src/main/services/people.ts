
/** 
import { Person } from '../models/Person';

export async function getPeople() {
  // you can use fetch or axios to make a request to the server here
  // and return the people array
  const response = await fetch('your-api-url');
  const data = await response.json();
  const people: Person[] = data.people;
  return { people };
}
*/