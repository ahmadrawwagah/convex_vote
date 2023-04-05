import { query } from "./_generated/server";

function compareFn(a, b) {
  if (a[0] > b[0]) {
    return -1;
  }
  if (a[0] < b[0]) {
    return 1;
  }
  return 0;
}


export default query(async ({ db }) => {
    const temp = await db.query("messages").collect();
    const map = new Map();
    for (var i=0; i < temp.length; i++) {
        const type = temp[i].author;
        const item = temp[i].body;
        console.log(type, item);
        if (!(map.has(item))) {
            map.set(item, [0, 0]);
        }
        if (type == 'upvote') {
            const votes = map.get(item);
            votes[0]++;
            map.set(item, votes);
        }
        else if (type == 'downvote') {
            const votes = map.get(item);
            votes[1]++;
            map.set(item, votes);
        }
    }
    console.log(map);
    const ranking = []
    for (let [key, value] of map) {
        const positive = value[0];
        const negative = value[1];
        const score = ((positive + 1.9208) / (positive + negative) -
                   1.96 * Math.sqrt((positive * negative) / (positive + negative) + 0.9604) /
                          (positive + negative)) / (1 + 3.8416 / (positive + negative))
        ranking.push([score, key, positive, negative]);
    }
    ranking.sort(compareFn);
    console.log(ranking);
    return ranking;
});
