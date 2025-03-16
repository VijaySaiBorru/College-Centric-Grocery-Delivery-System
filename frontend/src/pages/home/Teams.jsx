import chennaiSuperKings from "../../assets/chennai-super-kings.jpg";
import mumbaiIndians from "../../assets/mumbai-indians.jpg";
import kolkataKnightRiders from "../../assets/kolkata-knight-riders.jpg";
import royalChallengersBangalore from "../../assets/royal-challengers-bangalore.jpg";
import gujaratTitans from "../../assets/gujarat-titans.jpg";
import lucknowSuperGiants from "../../assets/lucknow-super-giants.jpg";
import sunrisersHyderabad from "../../assets/sunrisers-hyderabad.jpg";
import rajasthanRoyals from "../../assets/rajasthan-royals.jpg";
import punjabKings from "../../assets/punjab-kings.jpg";
import delhiCapitals from "../../assets/delhi-capitals.jpg";
import { Link } from 'react-router-dom';

const Teams = () => {
  const teams = [
    { name: 'Chennai Super Kings', path: 'chennai-super-kings', image: chennaiSuperKings },
    { name: 'Mumbai Indians', path: 'mumbai-indians', image: mumbaiIndians },
    { name: 'Kolkata Knight Riders', path: 'kolkata-knight-riders', image: kolkataKnightRiders },
    { name: 'Royal Challengers Bangalore', path: 'royal-challengers-bangalore', image: royalChallengersBangalore },
    { name: 'Gujarat Titans', path: 'gujarat-titans', image: gujaratTitans },
    { name: 'Lucknow Super Giants', path: 'lucknow-super-giants', image: lucknowSuperGiants },
    { name: 'Sunrisers Hyderabad', path: 'sunrisers-hyderabad', image: sunrisersHyderabad },
    { name: 'Rajasthan Royals', path: 'rajasthan-royals', image: rajasthanRoyals },
    { name: 'Punjab Kings', path: 'punjab-kings', image: punjabKings },
    { name: 'Delhi Capitals', path: 'delhi-capitals', image: delhiCapitals },
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
