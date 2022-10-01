const db = require("../model");
const dotenv = require("dotenv");
const createError = require("http-errors");
const moment = require('moment')
const sequelize = db.sequelize;
const { v4: uuidv4 } = require("uuid");
const sharp = require('sharp');
const path = require('path')
const formidable = require('formidable');
const { Sequelize } = require("../model");
const Image = db.image;
dotenv.config();

// localhost: 3000 / api / v1 / images
// localhost: 3000 / api / v1 / images ? limit = 2 & pageNo=2 & fileName=03.jpg & startDate=2022 - 10 - 01 & endDate=2022 - 10 - 19
// localhost: 3000 / images / 03.jpg
exports.uploadImage = async (req, res, next) => {
    try {
        let form = new formidable.IncomingForm();
        form.parse(req, async function (error, fields, files) {
            if (error) {
                next(createError(400, "Error Occoured"));
            } else {
                await sharp(files.file.filepath).toFile("public/image/" + files.file.originalFilename)
                await sharp(files.file.filepath).resize(100, 100).toFile("public/thumbnil/" + files.file.originalFilename)
                await Image.create({
                    id: uuidv4(),
                    name: files.file.originalFilename,
                    uploadDate: moment().format("YYYY-MM-DD")
                })
                res.status(201).send({ status: true, message: "Successfully Uploaded" })
            }
        })
    } catch (error) {
        next(createError(500, error || "Error Occoured"));
    }

};



exports.getImage = async (req, res, next) => {
    let { limit, pageNo, startDate, endDate, fileName } = req.query;
    try {
        let result;
        if (fileName) {
            result = await Image.findOne({
                where: {
                    name: fileName
                }
            })
        }
        else if (limit && pageNo) {
            result = await Image.findAll({
                limit: parseInt(limit),
                offset:
                    (parseInt(pageNo) - 1) * parseInt(limit),
            })
        }
        else if (startDate && endDate) {
            result = await Image.findAll({
                where: {
                    uploadDate: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                },
            })
        }
        else if (startDate && endDate && limit && pageNo) {
            result = await Image.findAll({
                where: {
                    uploadDate: {
                        [Sequelize.Op.between]: [startDate, endDate]
                    }
                },
                limit: parseInt(limit),
                offset:
                    (parseInt(pageNo) - 1) * parseInt(limit),
            })
        }
        else {
            result = await Image.findAll({})
        }
        res.status(200).send({
            status: true,
            result: result
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};



exports.getFile = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, "../public/image", req.params.fileName))
    } catch (error) {
        next(createError(500, error.message));
    }
}

