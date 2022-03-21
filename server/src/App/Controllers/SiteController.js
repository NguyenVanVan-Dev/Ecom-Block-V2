const newModle = require('../Models/New')

class SiteController {

    async index( req,res) {
        const newSave = new newModle({ name:"Con mèo Con" , email:"meo@gmail.com"});
        await newSave.save()
                .then((result)=>{
                    res.status(200).json({data:result});
                })
                .catch((err) =>{
                    console.log(err);
                    res.status(400).json({message: err});
                })
        
    }
}
module.exports = new SiteController;