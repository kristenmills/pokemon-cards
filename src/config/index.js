import nconf from 'nconf';
import database from './database';

nconf
  .argv()
  .env()
  .use('memory');

nconf.set('api:version', 'v1');
nconf.set('db', database);

nconf.set('pagination:perPage', 20);
nconf.set('limit:resource', 500);

nconf.defaults({
  NODE_ENV: 'development',
  PORT: 3000,
});

export default nconf;
