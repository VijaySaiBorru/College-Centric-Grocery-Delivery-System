import clothing from "../../assets/clothing.png";
import bakery from "../../assets/bakery.png";
import chips from "../../assets/chips.png";
import electronics from "../../assets/electronics.png";
import fruits from "../../assets/fruits.png";
import groceries from "../../assets/groceries.png";
import soft_drinks from "../../assets/soft_drinks.png";
import stationary from "../../assets/stationary.png";
import vegetables from "../../assets/vegetables.png";
import medicine from "../../assets/medicine.png";
import { Link } from 'react-router-dom';

const Teams = () => {
  const teams = [
    { name: 'Clothing and Accessories', path: 'clothing', image: clothing },
    { name: 'Bakery Items', path: 'bakery', image: bakery },
    { name: 'Chips and Fried Items', path: 'chips', image: chips },
    { name: 'Electronic Gadgets', path: 'electronics', image: electronics },
    { name: 'Fruits', path: 'fruits', image: fruits },
    { name: 'Groceries', path: 'groceries', image: groceries },
    { name: 'Soft Drinks and Juices', path: 'soft_drinks', image: soft_drinks },
    { name: 'Stationary', path: 'stationary', image: stationary },
    { name: 'Vegeetables', path: 'vegetables', image: vegetables },
    { name: 'Medicine', path: 'medicine', image: medicine },
  ];

  return (
    <>
    <div className="team__grid">
        {teams.map((team) => (
          <Link key={team.name} to={`/teams/${team.path}`} className="team__card categories__card">
            <img src={team.image} alt={team.name} />
            <h4>{team.name}</h4>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Teams;
