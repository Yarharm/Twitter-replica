const request = require('supertest');
const should = require('should/as-function');
const mongoose = require('mongoose');
const app = require('../../src/main');
const Post = mongoose.model('Post');
const agent = request.agent(app);
const fixtures = require('../fixtures/index');

const dummyPost = new Post(fixtures.post.dummyPost);

describe('Post routes test', async () => {
  before(async () => {});

  after(async () => {});

  describe('GET /user/:usernamePrefix/posts/:postId', async () => {
    let activePost;
    before(async () => {
      activePost = await dummyPost.save();
    });

    after(async () => {
      await Post.deleteOne({ creatorId: activePost.creatorId });
    });

    it('Expect dummy post to exist', async () => {
      agent
        .get(
          `/api/user/${dummyPost.creatorUsernamePrefix}/posts/${activePost._id}`
        )
        .expect(200)
        .then((res) => {
          should(res).have.property('creatorId', `${dummyPost.creatorId}`);
        });
    });

    it('Expect post to not exist', async () => {
      agent
        .get(`/api/user/${dummyPost.creatorUsernamePrefix}/posts/9999`)
        .expect(500);
    });
  });

  describe('GET /user/:usernamePrefix/posts', async () => {
    const usernamePrefix = fixtures.post.multiplePosts[0].creatorUsernamePrefix;

    before(async () => {
      for (const post of fixtures.post.multiplePosts) {
        await new Post(post).save();
      }
    });

    after(async () => {
      for (const post of fixtures.post.multiplePosts) {
        await Post.deleteOne({ creatorId: post.creatorId });
      }
    });

    it('Expect 2 paginated posts', async () => {
      agent
        .get(`/api/user/${usernamePrefix}/posts?pageSize=2&currentPage=0`)
        .expect(200)
        .then((res) => {
          should(res.posts.length).be.exactly(2).and.be.a.Number();
        });
    });

    it('Expect all posts to be 3', async () => {
      agent
        .get(`/api/user/${usernamePrefix}/posts`)
        .expect(200)
        .then((res) => {
          should(res.posts.length).be.exactly(3).and.be.a.Number();
        });
    });

    it('Expect 0 posts for unknown user', async () => {
      agent
        .get(`/api/user/unknownUser/posts`)
        .expect(200)
        .then((res) => {
          should(res.totalPostsCount).be.exactly(3).and.be.a.Number();
        });
    });
  });
});
