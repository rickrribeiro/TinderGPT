import axios from "axios";

const url = "http://127.0.0.1:3001";

export default class DataService {
  async getNewMatches() {
    const matches = await axios.get(url + "/newMatches", {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
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
    // const recommendations = await axios.get(
    //   url + "/recommendations/:id",
    //   {
    //     headers: { "Access-Control-Allow-Origin": "*" },
    //   }
    // );
    // return recommendations.data;
    return [];
  }

  async getNewMatchesRecommendations() {
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
  }

  async getChatMessages(matchId) {
    const matches = await axios.get(url + `/messages/${matchId}`, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
    return matches.data;
  }

  async sendMessage() {}
}
