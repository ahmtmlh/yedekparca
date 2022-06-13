class BaseService {
    constructor(BaseModel) {
        this.BaseModel = BaseModel
    }
    count(where){
        return this.BaseModel.countDocuments(where || {})
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
    update(id, data) {
        return this.BaseModel.findByIdAndUpdate(id, data, { new: true })
    }
    updateWhere(where, data) {
        return this.BaseModel.findOneAndUpdate(where, data, { new: true })
    }
    updateQuery(query, filter){
        return this.BaseModel.updateOne(query, filter)
    }
    delete(id) {
        return this.BaseModel.findByIdAndDelete(id)
    }
}
  
module.exports = BaseService;