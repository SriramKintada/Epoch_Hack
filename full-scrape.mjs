// Full scrape: GitHub deep dive (languages, contribution patterns, notable repos)
// For each user: fetch profile, all repos, check for README, pinned repos

const githubUsers = [
  { name: "Shashi Kant", username: "shashitnak" },
  { name: "Pritam Pawar", username: "pritamp17" },
  { name: "Aswin D", username: "Aswind12" },
  { name: "Neel Pote", username: "neelpote" },
  { name: "Ajinkya Takawale", username: "ajinkyaT" },
  { name: "Aditya Jare", username: "AdityaJare" },
  { name: "Mayur Patil", username: "mayur5204" },
  // Additional from application links that look like GitHub
  { name: "Pritesh Kamdi", username: "theprtsh" },
  { name: "Prasad Khake", username: "robertlangdonn" }, // from web search
];

const results = {};

for (const user of githubUsers) {
  try {
    const profileRes = await fetch(`https://api.github.com/users/${user.username}`);
    const profile = await profileRes.json();
    
    // Fetch ALL repos (paginated)
    let allRepos = [];
    let page = 1;
    while (true) {
      const reposRes = await fetch(`https://api.github.com/users/${user.username}/repos?per_page=100&page=${page}&sort=updated`);
      const repos = await reposRes.json();
      if (!Array.isArray(repos) || repos.length === 0) break;
      allRepos = allRepos.concat(repos);
      if (repos.length < 100) break;
      page++;
    }

    // Analyze repos
    const languages = {};
    const originalRepos = allRepos.filter(r => !r.fork);
    const forkedRepos = allRepos.filter(r => r.fork);
    
    for (const r of allRepos) {
      if (r.language) {
        languages[r.language] = (languages[r.language] || 0) + 1;
      }
    }

    // Top original repos by stars
    const topOriginal = originalRepos
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
        url: r.html_url,
        created: r.created_at
      }));

    // Recent activity (repos updated in last 90 days)
    const now = new Date();
    const ninetyDaysAgo = new Date(now - 90 * 24 * 60 * 60 * 1000);
    const recentlyActive = allRepos.filter(r => new Date(r.updated_at) > ninetyDaysAgo).length;

    // Notable forked repos (shows interests)
    const notableForks = forkedRepos
      .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 5)
      .map(r => ({ name: r.name, description: r.description?.substring(0, 100), stars: r.stargazers_count }));

    results[user.name] = {
      username: user.username,
      bio: profile.bio,
      company: profile.company,
      location: profile.location,
      blog: profile.blog,
      created_at: profile.created_at,
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      stats: {
        totalRepos: allRepos.length,
        originalRepos: originalRepos.length,
        forkedRepos: forkedRepos.length,
        recentlyActive,
        languages: Object.entries(languages).sort((a, b) => b[1] - a[1]).slice(0, 8)
      },
      topOriginalRepos: topOriginal,
      notableForks,
    };
    
    console.log(`✅ ${user.name} (@${user.username}): ${allRepos.length} total repos (${originalRepos.length} original), ${recentlyActive} active last 90d, ${profile.followers} followers`);
  } catch (err) {
    console.error(`❌ ${user.name}: ${err.message}`);
    results[user.name] = { error: err.message };
  }
}

import fs from 'fs';
fs.writeFileSync('github-deep.json', JSON.stringify(results, null, 2));
console.log('\nSaved to github-deep.json');
