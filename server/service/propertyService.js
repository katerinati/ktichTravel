const PropertyModel = require("../models/propertyModel");
const {ObjectId} = require("mongodb");

class PropertyService {
    async getAllProperty() {
        const properties = await PropertyModel.find()
        return properties
    }

    async getPropertyById(req, propertyId) {
        if (req.user) {
            const property = await PropertyModel.findOne({propertyId})
            return property
        }

    }

}

module.exports = new PropertyService()