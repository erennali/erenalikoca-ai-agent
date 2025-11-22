// Simple test to check if the prompt includes GitHub and Medium data
const fs = require('fs');

// Read the fetched data
const fetchedData = JSON.parse(fs.readFileSync('./lib/fetched-data.json', 'utf8'));

console.log('GitHub repos count:', fetchedData.githubRepos.length);
console.log('Medium articles count:', fetchedData.mediumArticles.length);

console.log('\nFirst few GitHub repos:');
fetchedData.githubRepos.slice(0, 3).forEach(repo => {
  console.log(`- ${repo.name}: ${repo.description}`);
});

console.log('\nFirst few Medium articles:');
fetchedData.mediumArticles.slice(0, 3).forEach(article => {
  console.log(`- ${article.title}`);
});
