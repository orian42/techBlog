const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const blogSeedData = require('./blogSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({force: true});

    const users = await User.bulkCreate(userSeedData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogSeedData) {
        const newBlog = await Blog.create ({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    };

    const comment = await Comment.bulkCreate(commentSeedData, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();