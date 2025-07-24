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
