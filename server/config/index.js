import nconf from 'nconf';

nconf
  .argv()
  .env()
  .use('memory');

nconf.set('api:version', 'v1');
nconf.set('db:db', 'pokedex');
nconf.set('db:host', process.env.DB_HOST || 'localhost');
nconf.set('db:port', process.env.DB_PORT || 28015);

nconf.set('pagination:perPage', 20);
nconf.set('limit:resource', 500);

nconf.defaults({
  NODE_ENV: 'development',
  PORT: 3000,
});

export default nconf;
