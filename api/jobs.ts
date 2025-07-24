import { VercelRequest, VercelResponse } from '@vercel/node';

interface JobPost {
  id: number;
  title: string;
  department: string;
  type: string;
  description: string;
  location: string;
  deadline: string;
}

let jobPosts: JobPost[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // You can replace * with specific origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    const job = {
      ...req.body,
      id: Date.now(),
    } as JobPost;

    jobPosts.push(job);
    console.log('New job posted:', job);
    return res.status(201).json({ message: 'Job posted', job });
  }

  if (req.method === 'GET') {
    return res.status(200).json(jobPosts);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
