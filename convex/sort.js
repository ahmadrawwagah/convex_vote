import { query } from "./_generated/server";

export default query(async ({ db }) => {
const temp =  db.query("messages").collect();
return temp[0];
});
