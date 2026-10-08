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
