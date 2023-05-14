import { App } from './app';
import 'dotenv/config';
import seeders from './db/seeders';

const PORT = process.env.PORTAPI || 3001;

seeders();

new App().start(PORT);