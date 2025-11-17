const PropertyModel = require("../models/propertyModel");
const {ObjectId} = require("mongodb");

class PropertyService {
    async getAllProperty() {
        const properties = await PropertyModel.find()
        return properties

    }
   async getPropertyById(propertyId) {
        // console.log(req.params.id)
       console.log(typeof propertyId)
       console.log(propertyId)
       const property =  await PropertyModel.findOne({propertyId})
       // console.log(property)
       return property
   }

}

module.exports = new PropertyService()