const moment = require('moment')
module.exports = (sequelize, Sequelize) => {
    try {
        const Image = sequelize.define("image", {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            uploadDate: {
                type: Sequelize.DATEONLY,
                get: function () {
                    return moment.utc(this.getDataValue('regDate')).format('YYYY-MM-DD');
                },
                allowNull: false
            },
        });

        return Image;
    } catch (error) {
        console.log(error.message);
    }
};
