const Mess = require("../models/Mess");
exports.getAllMess = async()=>{
    try {
        return await Mess.find({}).lean();
    } catch (error) {
        throw new Error(error)
    }
}
