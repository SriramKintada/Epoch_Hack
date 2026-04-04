// Epoch Applicant Deep Research Script
// Extracts LinkedIn, GitHub, Twitter data for all real applicants

import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });

// All real applicants with their profile URLs extracted from applications
const applicants = [
  {
    name: "Shashi Kant",
    linkedin: null,
    github: "https://github.com/shashitnak",
    twitter: null,
    city: "Jamshedpur",
    track: "STAGE 0"
  },
  {
    name: "Niraj Puran Rao",
    linkedin: "https://www.linkedin.com/in/niraj-rao/",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Aviral Sangal",
    linkedin: "https://www.linkedin.com/in/aviral-sangal-9b40a0322",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Basil Paulose",
    linkedin: "https://www.linkedin.com/in/basil-paulose-617b64261/",
    github: null,
    twitter: "https://x.com/BasilPaulo96381",
    city: "Mumbai",
    track: "STAGE 1"
  },
  {
    name: "Sahil",
    linkedin: "https://www.linkedin.com/in/sahil-9ab669306/",
    github: null,
    twitter: null,
    city: "Mahendragarh",
    track: "STAGE 1"
  },
  {
    name: "Bharat",
    linkedin: null,
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1",
    website: "https://markubees.com/"
  },
  {
    name: "Pritam Pawar",
    linkedin: null,
    github: "https://github.com/pritamp17",
    twitter: "https://x.com/PritamP70618628",
    city: "Ahmednagar",
    track: "STAGE 0",
    website: "https://alkemiilabs.com"
  },
  {
    name: "Varun Gupta",
    linkedin: "https://www.linkedin.com/in/varun-gupta-42b120263/",
    github: null,
    twitter: "https://x.com/varunguptapy",
    city: "Gurgaon",
    track: "STAGE 0"
  },
  {
    name: "Prasad Khake",
    linkedin: null,
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1",
    website: "https://prasadkhake.com"
  },
  {
    name: "Aswin D",
    linkedin: null,
    github: "https://github.com/Aswind12",
    twitter: null,
    city: "Salem",
    track: "STAGE 0"
  },
  {
    name: "Ganesh Jadhawar",
    linkedin: "https://www.linkedin.com/in/ganesh-jadhawar-591809214",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Rahul Dange",
    linkedin: null,
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0",
    website: "https://play.google.com/store/apps/details?id=in.sarvatra.app.cardsafe"
  },
  {
    name: "Parikshit Gavhane",
    linkedin: null,
    github: null,
    twitter: "https://x.com/ParikshitGavha1",
    city: "Pune",
    track: "STAGE 0",
    website: "https://elaborate-cendol-9f2f98.netlify.app"
  },
  {
    name: "Prasad Hajare",
    linkedin: "https://www.linkedin.com/in/prasad-hajare/",
    github: null,
    twitter: null,
    city: "Nagpur",
    track: "STAGE 1",
    website: "https://www.avianya.com/"
  },
  {
    name: "Neel Pote",
    linkedin: null,
    github: "https://github.com/neelpote",
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Harshit Chouhan",
    linkedin: "https://www.linkedin.com/in/h-chouhan/",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Yogendra Sharma",
    linkedin: "https://www.linkedin.com/in/syogendra/",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Nileshkumar Shegokar",
    linkedin: "https://www.linkedin.com/in/nilesh-kumar-s",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Ajinkya Takawale",
    linkedin: null,
    github: "https://github.com/ajinkyaT",
    twitter: "https://x.com/neo_ajinkya",
    city: "Pune",
    track: "STAGE 1",
    huggingface: "https://huggingface.co/ajinkyaT"
  },
  {
    name: "Tushar Kanavalli",
    linkedin: "https://www.linkedin.com/in/tushar-kanavalli-bb5589192",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Dhruv Gadiya",
    linkedin: null,
    github: null,
    twitter: "https://x.com/StackDhruv",
    city: "Pune",
    track: "STAGE 1",
    website: "https://dhruv.0xdevs.in"
  },
  {
    name: "Prashant Patil",
    linkedin: "https://www.linkedin.com/in/prashant-patil-b4126a13b",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Pritesh Kamdi",
    linkedin: null,
    github: null,
    twitter: "https://x.com/theprtsh",
    city: "Pune",
    track: "STAGE 0",
    website: "https://prtsh.com/about"
  },
  {
    name: "Raghvendra Dharmapurikar",
    linkedin: "https://www.linkedin.com/in/raghvendra-dharmapurikar/",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Almas",
    linkedin: null,
    github: null,
    twitter: "https://twitter.com/@titaniumals",
    city: "Pimpri-Chinchwad",
    track: "STAGE 0",
    website: "https://almas.pop.site/"
  },
  {
    name: "Suyash Dhumal",
    linkedin: null,
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Neel Rawal",
    linkedin: "https://www.linkedin.com/in/neel-rawal-711a8b294",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Aditya Jare",
    linkedin: null,
    github: "https://github.com/AdityaJare",
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Mayur Patil",
    linkedin: null,
    github: "https://github.com/mayur5204",
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Nilesh Varma",
    linkedin: "https://www.linkedin.com/in/nileshvarma",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1"
  },
  {
    name: "Harshada Yele",
    linkedin: "https://www.linkedin.com/in/harshada-yele-25623b273",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Nusrat Sayyad",
    linkedin: "https://www.linkedin.com/in/nusrat-sayyad-b91a87388",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Amol Rathod",
    linkedin: "https://www.linkedin.com/in/amol-rathod78/",
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 0"
  },
  {
    name: "Muhammed Umar Shaikh",
    linkedin: null,
    github: null,
    twitter: null,
    city: "Pune",
    track: "STAGE 1",
    website: "https://motor-iq-two.vercel.app/"
  },
  {
    name: "Ismail Patel",
    linkedin: "https://www.linkedin.com/in/ismail-patel-8a475518b/",
    github: null,
    twitter: "https://x.com/IsmailP99387049",
    city: "Pune",
    track: "STAGE 0"
  }
];

// Collect all LinkedIn URLs
const linkedinUrls = applicants
  .filter(a => a.linkedin)
  .map(a => a.linkedin);

console.log(`LinkedIn profiles to scrape: ${linkedinUrls.length}`);
console.log(JSON.stringify(linkedinUrls, null, 2));

// Collect all GitHub usernames
const githubUsers = applicants
  .filter(a => a.github && a.github.includes('github.com'))
  .map(a => {
    const parts = a.github.replace('https://', '').replace('http://', '').split('/');
    return { name: a.name, username: parts[1] };
  });

console.log(`\nGitHub profiles to check: ${githubUsers.length}`);
console.log(JSON.stringify(githubUsers, null, 2));

// Run LinkedIn scrape via Apify
console.log('\n--- Starting LinkedIn Scrape ---');
try {
  const run = await client.actor("Wpp1BZ6yGWjySadk3").call({
    urls: linkedinUrls,
    limitPerSource: 1,
    deepScrape: true,
    rawData: false
  });
  
  const { items } = await client.dataset(run.defaultDatasetId).listItems();
  
  // Save results
  const fs = await import('fs');
  fs.writeFileSync('linkedin-results.json', JSON.stringify(items, null, 2));
  console.log(`LinkedIn scrape complete: ${items.length} profiles fetched`);
  console.log('Saved to linkedin-results.json');
} catch (err) {
  console.error('LinkedIn scrape error:', err.message);
}
