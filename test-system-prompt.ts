import { generateSystemPrompt } from './lib/prompt';

const prompt = generateSystemPrompt('en');

console.log('System prompt length:', prompt.length);
console.log('Contains GitHub repos:', prompt.includes('github.com/erennali'));
console.log('Contains Medium articles:', prompt.includes('medium.com'));
console.log('Contains RISE-Technology-Staj-Case:', prompt.includes('RISE-Technology-Staj-Case'));
console.log('Contains Screenshot protection article:', prompt.includes('Screenshot & Screen Recording Protection'));

// Show a snippet of the GitHub repos section
const githubSection = prompt.split('## GitHub Repositories (LIVE DATA - USE THIS)')[1]?.split('##')[0];
console.log('\nGitHub section preview:');
console.log(githubSection?.substring(0, 500) + '...');

// Show a snippet of the Medium articles section
const mediumSection = prompt.split('## Medium Articles (Live)')[1]?.split('##')[0];
console.log('\nMedium section preview:');
console.log(mediumSection?.substring(0, 500) + '...');
