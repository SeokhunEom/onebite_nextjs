import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await res.revalidate("/");
    return res.json({ revalidate: true });
  } catch (error) {
    res.status(500).send("Revalidation failed");
  }
}

export default handler;
