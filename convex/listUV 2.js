import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db.query("messages").filter(q => q.eq(q.field("author"), "upvote")).collect();
});
