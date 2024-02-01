import axios from "axios";

const url = "http://127.0.0.1:3001";

export default class DataService {
  async getNewMatches(minDistance = 0, maxDistance = 40000) {
    const matches = await axios.get(
      url + `/newMatches?minDistance=${minDistance}&maxDistance=${maxDistance}`,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    return matches.data;
  }
  async getMatchesWithUnreadMessages() {
    const matches = await axios.get(url + "/matchesWithUnreadMessages", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return matches.data;
  }
  //   async getUserProfile() {} // n sei se vai precisar
  async getRecommendations(userId) {
    try {
      const recommendations = await axios.get(
        url + "/recommendations/match/" + userId,
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
      const recs = recommendations.data
        .split("\n")
        .map((el) => el.replace('["', "").replace('"]', ""))
        .filter((e) => e !== "");

      return recs;
    } catch (err) {
      console.log("error to get recommendations");
      console.log(err);
    }
  }

  async getNewMatchesRecommendations() {
    try {
      const recommendations = await axios.get(
        url + "/recommendations/newmatches",
        {
          headers: { "Access-Control-Allow-Origin": "*" },
        }
      );
      const recs = recommendations.data
        .split("\n")
        .map((el) => el.replace('["', "").replace('"]', ""))
        .filter((e) => e !== "");

      return recs;
    } catch (err) {
      console.log("err to get new matches recommendations");
      console.log(err);
    }
  }

  async getChatMessages(matchId) {
    const matches = await axios.get(url + `/messages/${matchId}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return matches.data;
  }

  async sendMessage(users, message) {
    const payload = {
      users,
      message,
    };
    await axios.post(url + `/sendMessages`, payload, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}
