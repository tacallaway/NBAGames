function showTeamList() {
  document.getElementById("teamList").style.display = "block";
  document.getElementById("games").style.display = "none";
}

function getTeam(id, team) {
  const url = `https://www.balldontlie.io/api/v1/games?seasons[]=2019&team_ids[]=${id}`;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let backToTeamList = `<a href="javascript:showTeamList()">Back to Team List</a>`;
      let games = `${backToTeamList}<table cellpadding='10px'><tr><th>HOME TEAM</th><th>SCORE</th><th>VISITING TEAM</th><th>SCORE</th></tr>`;
      json.data.forEach(game => {
        let homeTeam = game.home_team;
        let visitorTeam = game.visitor_team;
        games += `<tr><td>${homeTeam.full_name}</td><td>${game.home_team_score}</td><td>${visitorTeam.full_name}</td><td>${game.visitor_team_score}</td></tr>`;
      });
      games += `</tr></table>${backToTeamList}`;
      let gamesElement = document.getElementById("games");
      gamesElement.innerHTML = games;
      gamesElement.style.display = "block";

      document.getElementById("teamList").style.display = "none";
    });
}

function getTeams() {
    const url = "https://www.balldontlie.io/api/v1/teams";
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        let teams = [];
        let count = 0;
        json.data.forEach(team => {
          let id = team.id;
          let name = team.full_name;
          teams[count++] = `<h2><a href="javascript:getTeam(${id}, '${name}')">${name}</a></h2>`;
        });
        let columnCount = teams.length / 3;
        if (teams.length % 3 > 0) {
          columnCount++;
        }
        let output = "<table cellpadding='10' style='margin: auto'>";
        for (i = 0; i < columnCount; i++) {
          let firstIndex = i;
          let secondIndex = i + columnCount;
          let thirdIndex = i + columnCount*2;

          output += `
            <tr>
              <td style="padding: 5px 30px">
                  ${teams[firstIndex]}
              </td>
              <td style="padding: 5px 30px">
                  ${teams.length > secondIndex && teams[secondIndex]}
              </td>
              <td style="padding: 5px 30px">
                  ${teams.length > thirdIndex && teams[thirdIndex]}
              </td>
            </tr>
          `;
        }
        output += "</table>";
        document.getElementById("teamList").innerHTML = output;
      });
  }

  getTeams();