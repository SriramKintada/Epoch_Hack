// Parse linkedin-results.json to extract useful profile data from posts
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('linkedin-results.json', 'utf8'));

const profiles = {};

for (const item of data) {
  if (item.error) {
    // Extract the URL from inputUrl
    const slug = item.inputUrl?.split('/in/')[1]?.replace(/\/$/, '');
    profiles[slug || item.inputUrl] = { error: item.error, url: item.inputUrl };
    continue;
  }
  
  // Extract profile info from the post's author data
  const authorUrl = item.authorProfileUrl || item.profileUrl || '';
  const slug = authorUrl.split('/in/')[1]?.replace(/\/$/, '') || item.inputUrl?.split('/in/')[1]?.replace(/\/$/, '');
  
  if (!profiles[slug]) {
    profiles[slug] = {
      url: authorUrl || item.inputUrl,
      name: item.authorName || item.profileName || '',
      headline: item.authorHeadline || item.profileHeadline || '',
      profilePicture: item.authorProfilePicture || item.profilePicture || '',
      followers: item.authorFollowerCount || null,
      posts: []
    };
  }
  
  profiles[slug].posts.push({
    text: item.text?.substring(0, 500),
    reactions: item.totalReactionCount || item.numLikes || 0,
    comments: item.totalCommentCount || item.numComments || 0,
    timeSincePosted: item.timeSincePosted || '',
    type: item.type || ''
  });
}

console.log(JSON.stringify(profiles, null, 2));
