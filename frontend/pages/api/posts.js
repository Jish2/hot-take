import connect from '../../db/connect';
import Post from '../../db/models/Post';

export const config = {
  api: {
    externalResolver: true,
  },
};

async function getHotPosts(
  offset,
  limit,
  userId = 'c74a8536-9ab4-44ed-9f96-ffe116e5aba8'
) {
  const std = 0.4;
  const mean = 0.31;
  const engagementBonusCoef = 0.1;

  const engagementBonus = {
    $multiply: [
      engagementBonusCoef,
      {
        $ln: {
          $add: ['$interactions', 1],
        },
      },
    ],
  };

  const x = {
    $divide: [
      {
        $add: ['$votes', 1],
      },
      { $add: ['$interactions', 2] },
    ],
  };

  const results = await Post.aggregate([
    { $match: {} },
    {
      $match: {
        $nor: [
          { agree: { $elemMatch: { $eq: userId } } },
          { disagree: { $elemMatch: { $eq: userId } } },
        ],
      },
    },
    // 1/s *sqrt(2pi) * e^(-1/2 * x-m/s)^2
    {
      $addFields: {
        rating: {
          $add: [
            {
              $multiply: [
                1 / (std * Math.sqrt(2 * Math.PI)),
                {
                  $exp: {
                    $multiply: [
                      -0.5,
                      {
                        $pow: [
                          {
                            $divide: [{ $subtract: [x, mean] }, std],
                          },
                          2,
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            engagementBonus,
          ],
        },
      },
    },

    { $sort: { rating: -1 } },
    { $skip: parseInt(offset) },
    { $limit: parseInt(limit) },
  ]);

  return results;
}

export default async function handler(req, res) {
  const { method, query } = req;

  const limit = query.limit || 10; // default to 20
  const offset = query.offset || 0;
  const sort = req.query.sort;

  await connect();

  let postsLists = {};
  let results;

  switch (method) {
    case 'GET':
      try {
        // const pets = await Pet.find({}); /* find all the data in our database */
        // res.status(200).json({ success: true, data: pets });

        if (limit < 0 || offset < 0) {
          res.status(400).json({
            message:
              'stop trying to fuck with us you cs pussy dick es8 wanna be nerd pussy',
          });
          return;
        }

        switch (sort) {
          case 'hot':
            results = await getHotPosts(offset, limit);
            break;
          case 'new':
            postsLists = { date: -1 };
            results = await Post.find()
              .sort(postsLists)
              .skip(offset)
              .limit(limit);
            break;
          case 'popular':
            postsLists = { interactions: -1 };
            results = await Post.find()
              .sort(postsLists)
              .skip(offset)
              .limit(limit);
            break;
          case 'old':
            postsLists = { date: 1 };
            results = await Post.find()
              .sort(postsLists)
              .skip(offset)
              .limit(limit);
            break;
          case 'random':
            results = await Post.aggregate([{ $sample: { size: limit } }]);
            break;
          case 'disagreed':
            postsLists = { votes: 1 };
            results = await Post.find()
              .sort(postsLists)
              .skip(offset)
              .limit(limit);
            break;
          case 'agreed':
            postsLists = { votes: -1 };
            results = await Post.find()
              .sort(postsLists)
              .skip(offset)
              .limit(limit);
            break;
          case 'reported':
            postsLists = { reports: -1 };
            results = await Post.find()
              .sort(postsLists)
              .skip(offset)
              .limit(limit);
            break;
          default:
            // fallback to sorting by HOT
            postsLists = { date: -1 };
            results = await getHotPosts(offset, limit);
        }

        res.status(200).json(results);
      } catch (error) {
        console.error('error', error);
        res.status(400).json({ message: error, case: 'hm' });
        // res.status(400).json({ success: false });
      }
      break;
    default:
      // res.status(400).json({ success: false });
      res.status(400).json({ message: 'wack method' });

      break;
  }
}
