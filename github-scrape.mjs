// GitHub profile + repos scraper for Epoch applicants
const githubUsers = [
  { name: "Shashi Kant", username: "shashitnak" },
  { name: "Pritam Pawar", username: "pritamp17" },
  { name: "Aswin D", username: "Aswind12" },
  { name: "Neel Pote", username: "neelpote" },
  { name: "Ajinkya Takawale", username: "ajinkyaT" },
  { name: "Aditya Jare", username: "AdityaJare" },
  { name: "Mayur Patil", username: "mayur5204" }
];

const results = {};

for (const user of githubUsers) {
  try {
    // Fetch profile
    const profileRes = await fetch(`https://api.github.com/users/${user.username}`);
    const profile = await profileRes.json();
    
    // Fetch repos sorted by stars
    const reposRes = await fetch(`https://api.github.com/users/${user.username}/repos?sort=stars&per_page=30`);
    const repos = await reposRes.json();
    
    const topRepos = (Array.isArray(repos) ? repos : [])
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 10)
      .map(r => ({
        name: r.name,
        description: r.description,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        topics: r.topics,
        updated: r.updated_at,
        url: r.html_url
      }));

    results[user.name] = {
      username: user.username,
      bio: profile.bio,
      company: profile.company,
      location: profile.location,
      blog: profile.blog,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      created_at: profile.created_at,
      topRepos
    };
    
    console.log(`✅ ${user.name} (@${user.username}): ${profile.public_repos} repos, ${profile.followers} followers`);
  } catch (err) {
    console.error(`❌ ${user.name}: ${err.message}`);
    results[user.name] = { error: err.message };
  }
}

const fs = await import('fs');
fs.writeFileSync('github-results.json', JSON.stringify(results, null, 2));
console.log('\nSaved to github-results.json');
