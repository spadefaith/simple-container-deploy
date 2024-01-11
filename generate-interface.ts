const { convertFromDirectory } =  require('joi-to-typescript');



import Models from './db/models';

async function run(){
    await Models.sequelize.sync({ force: true });


    convertFromDirectory({
        schemaDirectory: './src/schemas',
        typeOutputDirectory: './src/interfaces',
        debug: true
    });
}

run();