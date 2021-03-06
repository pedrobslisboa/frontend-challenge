import dotenv from 'dotenv';
import fetch from 'isomorphic-fetch';
import timeout from '../../utils/timeout-promise';

dotenv.config();

const url = 'http://www.omdbapi.com';

export default async (req, res) => {
  const { query } = req;
  try {
    const data = await timeout(
      5000,
      fetch(`${url}/?s=${query.titleToSearch}&type=movie&apikey=${process.env.OMDB_API_KEY}`)
    );
    const response = await data.json();
    const { Search, Response } = response;
    res.json({
      search: Search,
      response: Response
    });
  } catch (error) {
    res.send({
      error
    });
  }
};
