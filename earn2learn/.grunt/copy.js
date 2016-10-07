module.exports = {
  font: {
    files: [{
      expand: true,
      cwd: 'assets/fonts',
      src: [ '**/*.{<%= fonts.extensions %>}' ],
      dest: 'public/fonts/'
    }]
  },

  image: {
    files: [{
      expand: true,
      cwd: 'assets/images',
      src: [ '**/*.{<%= images.extensions %>}' ],
      dest: 'public/images/'
    }]
  },

  json: {
    files: [{
      expand: true,
      cwd: 'assets/json',
      src: ['**/*.json'],
      dest: 'public/json/'
    }]
  },
};
