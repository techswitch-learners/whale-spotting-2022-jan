import { getLeaderboard, LeaderboardEntry } from "../../clients/apiClients";
import { useState, useEffect } from "react";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdbreact";
import "../../styles/constants.scss";
import "./Leaderboard.scss";

export function Leaderboard(): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<Array<LeaderboardEntry>>([]);
  useEffect(() => {
    getLeaderboard().then(setLeaderboard);
  }, []);

  return (
    <div className="leaderboard__body">
      <h1 className="leaderboard__title">🏆 Whale Spotting Leaderboard 🏆</h1>
      <MDBTable className="leaderboard__table text-center min-vw-200">
        <MDBTableHead className="leaderboard__headers">
          <tr>
            <th>Rank #</th>
            <th>Username</th>
            <th>Sightings</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {leaderboard.map((l, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{l.username}</td>
              <td>{l.count}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
}
