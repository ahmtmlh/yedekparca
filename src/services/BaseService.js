class BaseService {
    constructor(BaseModel) {
        this.BaseModel = BaseModel
    }
    list(where) {
        return this.BaseModel.find(where || {})
    }
    create(data) {
        return new this.BaseModel(data).save()
    }
    findById(id){
        return this.BaseModel.findById(id)
    }
    findOne(where) {
        return this.BaseModel.findOne(where)
    }
    updateQuery(query, filter){
        return this.BaseModel.updateOne(query, filter)
    }
    update(id, data) {
        return this.BaseModel.findByIdAndUpdate(id, data, { new: true })
    }
    updateWhere(where, data) {
        return this.BaseModel.findOneAndUpdate(where, data, { new: true })
    }
    delete(id) {
        return this.BaseModel.findByIdAndDelete(id)
    }
}
  
module.exports = BaseService;