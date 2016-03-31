import rethinkdb from 'rethinkdbdash';
import nconf from './index';

const db = nconf.get('db');

export default rethinkdb(db);


