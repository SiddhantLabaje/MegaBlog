const conf = {
    appwriteUrl:          String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId:    String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteBucketId:     String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteDatabaseId:   String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}

// Catch the most common .env mistake: wrapping values in quotes.
// WRONG:  VITE_APPWRITE_URL='https://...'   → value becomes 'https://...' (with quotes)
// RIGHT:  VITE_APPWRITE_URL=https://...     → value becomes  https://...
Object.entries(conf).forEach(([key, value]) => {
    if (value.startsWith("'") || value.startsWith('"')) {
        console.error(
            `[config] "${key}" starts with a quote character.\n` +
            `  Current value: ${value}\n` +
            `  Fix your .env — remove the surrounding quotes:\n` +
            `  ${key}=${value.replace(/^['"]|['"]$/g, '')}`
        )
    }
    if (value === 'undefined') {
        console.error(`[config] "${key}" is undefined — check your .env file.`)
    }
})

export default conf
