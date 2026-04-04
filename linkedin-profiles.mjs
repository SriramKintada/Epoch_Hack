// LinkedIn PROFILE scraper (not posts) for Epoch applicants
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

const linkedinUrls = [
  "https://www.linkedin.com/in/niraj-rao/",
  "https://www.linkedin.com/in/aviral-sangal-9b40a0322",
  "https://www.linkedin.com/in/basil-paulose-617b64261/",
  "https://www.linkedin.com/in/sahil-9ab669306/",
  "https://www.linkedin.com/in/varun-gupta-42b120263/",
  "https://www.linkedin.com/in/ganesh-jadhawar-591809214",
  "https://www.linkedin.com/in/prasad-hajare/",
  "https://www.linkedin.com/in/h-chouhan/",
  "https://www.linkedin.com/in/syogendra/",
  "https://www.linkedin.com/in/nilesh-kumar-s",
  "https://www.linkedin.com/in/tushar-kanavalli-bb5589192",
  "https://www.linkedin.com/in/prashant-patil-b4126a13b",
  "https://www.linkedin.com/in/raghvendra-dharmapurikar/",
  "https://www.linkedin.com/in/neel-rawal-711a8b294",
  "https://www.linkedin.com/in/nileshvarma",
  "https://www.linkedin.com/in/harshada-yele-25623b273",
  "https://www.linkedin.com/in/nusrat-sayyad-b91a87388",
  "https://www.linkedin.com/in/amol-rathod78/",
  "https://www.linkedin.com/in/ismail-patel-8a475518b/"
];

// Use the LinkedIn Profile Scraper actor
// Actor: 2SyF0bMFpETj5GALM (LinkedIn Profile & Company Scraper)
console.log(`Scraping ${linkedinUrls.length} LinkedIn profiles...`);

try {
  const run = await client.actor("2SyF0bMFpETj5GALM").call({
    urls: linkedinUrls,
    proxy: { useApifyProxy: true },
    maxDelay: 5,
    minDelay: 1
  });

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  const fs = await import('fs');
  fs.writeFileSync('linkedin-profiles.json', JSON.stringify(items, null, 2));
  console.log(`Done: ${items.length} profiles scraped`);
} catch (err) {
  console.error('Error:', err.message);
  
  // Try alternate actor: kVT3S9rYn9JhMGpLD (Linkedin Profile Scraper)
  console.log('Trying alternate actor...');
  try {
    const run = await client.actor("kVT3S9rYn9JhMGpLD").call({
      profileUrls: linkedinUrls
    });
    const { items } = await client.dataset(run.defaultDatasetId).listItems();
    const fs = await import('fs');
    fs.writeFileSync('linkedin-profiles.json', JSON.stringify(items, null, 2));
    console.log(`Alternate actor done: ${items.length} profiles`);
  } catch (err2) {
    console.error('Alternate also failed:', err2.message);
  }
}
