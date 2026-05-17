const fs = require('node:fs');
const path = require('node:path');

const basepath = 'd:\\course\\programs\\Web Development\\tutorials\\Day 91 Exercise 15 Clear the clutter\\'

fs.readdir(basepath,(err,res)=>{
    if(err){
        console.log(err);
        return;
    }
    
    for (const file of res) {

        console.log('running for item: ',file);

        let extension = file.split('.')[file.split('.').length - 1];
        
        const oldpath = path.join(basepath,file);
        const newpath = path.join(basepath,extension,file);
        
        if (extension != 'js' && extension != 'json' && extension!='md' && file.split('.').length > 1){

            if (fs.existsSync(path.join(basepath,extension))){
                fs.rename(oldpath, newpath, (err)=>{
                    console.log(err);
                });
            }
            else{
                fs.mkdir(extension,(err)=>{
                    console.log(err);
                    
                });
                fs.rename(oldpath, newpath, (err)=>{
                    console.log(err);   
                });
            }
        }

    }
    
});


