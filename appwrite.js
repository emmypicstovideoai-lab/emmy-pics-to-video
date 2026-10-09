/*
 * Emmy Pics to Video AI
 * Shared Appwrite configuration
 */

const client = new Appwrite.Client();

client
    .setEndpoint("https://fra.cloud.appwrite.io/v1")
    .setProject("6a975ef6000f9770c542");

const account = new Appwrite.Account(client);
const tablesDB = new Appwrite.TablesDB(client);

/* Database */
const DATABASE_ID = "6a99f5b40038d7150d37";

/* Tables */
const USERS_TABLE_ID  = "users";
const VIDEOS_TABLE_ID = "6aa485420029fb0bc52e";
const PAYMENTS_TABLE_ID = "payments";

/* Helper: get current logged-in user (or null) */
async function getCurrentUser() {
    try {
        return await account.get();
    } catch (e) {
        return null;
    }
}

/* Helper: build a full URL on the current site (works on Netlify + custom domain) */
function siteUrl(path) {
    return window.location.origin + "/" + path.replace(/^\//, "");
}

/* Helper: get the users-table row for the currently logged-in user.
   Returns the row object, or null if not found. */
async function getCurrentUserRow() {
    const user = await getCurrentUser();
    if (!user) return null;

    // Try direct ID first (registration saves row with rowId = userId)
    try {
        return await tablesDB.getRow({
            databaseId: DATABASE_ID,
            tableId: USERS_TABLE_ID,
            rowId: user.$id
        });
    } catch (e) {
        // Fall through to query below
    }

    // Fallback: query by userId field
    try {
        const found = await tablesDB.listRows({
            databaseId: DATABASE_ID,
            tableId: USERS_TABLE_ID,
            queries: [Appwrite.Query.equal("userId", user.$id)]
        });
        if (found.rows && found.rows.length > 0) {
            return found.rows[0];
        }
    } catch (e) {
        // Fall through
    }

    return null;
}

/* Helper: is the currently logged-in user an admin? */
async function isCurrentUserAdmin() {
    const row = await getCurrentUserRow();
    return row && row.isAdmin === true;
}
