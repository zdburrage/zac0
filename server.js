const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const { join } = require('path');
const authConfig = require('./auth_config.json');

const app = express();

const port = process.env.PORT || 4200;

app.use(morgan('dev'));

app.use(
  helmet({
    contentSecurityPolicy: {
      // reportOnly: true,
      directives: {
        'default-src': ["'self'"],
        'connect-src': ["'self'", 'https://*.auth0.com', authConfig.apiUri],
        'frame-src': ["'self'", 'https://*.auth0.com'],
        'base-uri': ["'self'"],
        'block-all-mixed-content': [],
        'font-src': ["'self'", 'https:', 'data:'],
        'frame-ancestors': ["'self'"],
        'img-src': ["'self'", 'data:', '*.gravatar.com'],
        'style-src': ["'self'", 'https:', "'unsafe-inline'"],
      },
    },
  })
);

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(express.static('./dist/zac0'));

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/zac0/'}
);
});

app.listen(port, () => console.log(`App server listening on port ${port}`));
