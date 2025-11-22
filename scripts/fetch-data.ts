import fs from 'fs';
import path from 'path';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_USERNAME = 'erennali'; // Derived from existing data.ts
const MEDIUM_USERNAME = 'erenali'; // Derived from existing data.ts

async function fetchGitHubRepos() {
  console.log('Fetching GitHub repos...');
  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const repos = await response.json();
    return repos
      .filter((repo: any) => !repo.fork) // Filter out forks if desired, or keep them
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at,
        topics: repo.topics,
      }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}

async function fetchMediumArticles() {
  console.log('Fetching Medium articles...');
  try {
    // Using rss2json to convert Medium RSS feed to JSON
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`);
    
    if (!response.ok) {
      throw new Error(`Medium RSS error: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status === 'ok') {
      return data.items.map((item: any) => ({
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        thumbnail: item.thumbnail,
        categories: item.categories,
        description: item.description.replace(/<[^>]*>/g, '').slice(0, 200) + '...', // Strip HTML and truncate
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching Medium articles:', error);
    return [];
  }
}

async function main() {
  const githubRepos = await fetchGitHubRepos();
  const mediumArticles = await fetchMediumArticles();

  const data = {
    githubRepos,
    mediumArticles,
    lastUpdated: new Date().toISOString(),
  };

  const outputPath = path.join(process.cwd(), 'lib', 'fetched-data.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
  console.log(`Data written to ${outputPath}`);
}

main();
