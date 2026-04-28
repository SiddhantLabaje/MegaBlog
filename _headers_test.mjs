// Check ALL response headers for /view to understand why <img> might reject it
const url = 'https://nyc.cloud.appwrite.io/v1/storage/buckets/69d0ae810006d7ff7d6f/files/69ef7fcd0026a6457b67/view?project=69d0aa98000739c3d9e4';

const res = await fetch(url);
console.log('Status:', res.status);
console.log('\nAll response headers:');
for (const [k, v] of res.headers.entries()) {
    console.log(`  ${k}: ${v}`);
}
