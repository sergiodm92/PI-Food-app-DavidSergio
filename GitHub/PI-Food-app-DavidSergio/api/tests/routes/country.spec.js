/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, conn } = require('../../src/db.js');

const agent = session(app);
const recipe = {
  title: 'Milanea a la napolitana',
  summary: 'milanesa + pizza',
  diet : [{title: "vegetarian"}, {title: 'recipeee'}]
};

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Recipe.sync({ force: true })
    .then(() => Recipe.create(recipe)));
  describe('GET /recipes', () => {
    it('should get 200', async () => {
      try {
        await agent.get('/recipes').expect(200);
      } catch (err) {
        console.log(err);
      }
    }).timeout(10000);

    it('If the name query is passed, the recipes should respond by that name', async () => {
      try {
        const res = await agent.get('/recipes?name=Chiken');
        expect(res.body[0].title).to.deep.include('Chiken');
      } catch (err) { }
    }).timeout(10000);
    it('If the query is passed with a valid name,respond with a 404', async () => {
      try {
        const res = await agent.get('/recipes?name=recetaquenoexiste');
        expect(res).res(404);
      } catch (err) { }
    }).timeout(10000);

    it('If an id parameter is passed it must return the recipe associated with that id', async () => {
      try {
        const res = await agent.get('/recipes/716426');
        expect(res.body[0].title).to.be.equal("Cauliflower, Brown Rice, and Vegetable Fried Rice");
      } catch (err) { }
    }).timeout(10000);
    it('If an id parameter is passed invalid,respond with a 404', async () => {
      try {
        const res = await agent.get('/recipes/44d45s26');
        expect(res).res(404);
      } catch (err) { }
    }).timeout(10000);

    it('If an diet type is passed it must return the recipe associated with that diet', async () => {
      try {
        const res = await agent.get('/recipes/diet/vegan');
        expect(res.body[0].diets).to.nested.include("vegan");
      } catch (err) { }
    }).timeout(10000);
    it('Must also return, if it was created, a new diet', async () => {
      try {
        const res = await agent.get('/recipes/diet/nuevareceta');
        expect(res.body[0].diets).to.nested.include("nuevareceta");
      } catch (err) { }
    }).timeout(10000);
    it('If an diet type is passed invalid,respond with a 404', async () => {
      try {
        const res = await agent.get('/recipes/diet/dietanocreada');
        expect(res).res(404);
      } catch (err) { }
    }).timeout(10000);

    it('Must return all types of diets', async () => {
      try {
        const res = await agent.get('/recipes/types');
        expect(res.body).to.nested.include({ title: "nuevareceta" });
      } catch (err) { }
    }).timeout(10000);

  });

  describe('POST /recipe', () => {
    it('responds with 200', async () => {
      try {
        await agent.post('/recipe').send({
          title: 'Ensalada',
          summary: "Tomate y lechuga",
          diet: [{ title: "vegetarian" },{title:"vegan"},{title:"ensaladas"}]
        }).expect(200);
      } catch (err) {
        console.log(err);
      }
    }).timeout(10000);
    it('If you dont pass summary,respond with a 404', async () => {
      try {
        await agent.post('/recipe').send({
          title: 'Ensalada',
          diet: [{ title: "vegetarian" },{title:"vegan"},{title:"ensaladas"}]
        }).expect(404);
      } catch (err) {
        console.log(err);
      }
    }).timeout(10000);
    it('if you dont pass on at least one diet ,respond with a 404', async () => {
      try {
        await agent.post('/recipe').send({
          title: 'Ensalada',
          summary: "Tomate y lechuga",
          diet: []
        }).expect(404);
      } catch (err) {
        console.log(err);
      }
    }).timeout(10000);
    it('If you dont pass title,respond with a 404', async () => {
      try {
        await agent.post('/recipe').send({
          summary: "Tomate y lechuga",
          diet: [{ title: "vegetarian" },{title:"vegan"},{title:"ensaladas"}]
        }).expect(404);
      } catch (err) {
        console.log(err);
      }
    }).timeout(10000);
  });
});
