import config from './common/config';

import * as app from './app';

import { TryDBConnect } from '../src/helpers/db'

const {PORT} = config;

TryDBConnect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
