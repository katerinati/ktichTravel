const propertyService = require("../service/propertyService");


class PropertyController {
   async getAllProperties(req, res, next) {
        try {
            const properties = await propertyService.getAllProperty()

           return  res.json(properties)
        } catch (e) {
            next(`Ошибка при запросе ${e}`)
        }
    }
    async getPropertyById(req, res, next) {
       try {
           const propertyId = req.params.id


           const property = await propertyService.getPropertyById(req,parseInt(propertyId))

           return  res.json(property)
       } catch (e) {
           next(e)
       }
    }
}
module.exports = new PropertyController()