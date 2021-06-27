const{MongoClient} = require('mongodb')

async function main(){
    const uri = "mongodb+srv://flipr:Flipr@123@cluster0.a0kmy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    try{
        await client.connect();
        await listDatabases(client);

        await findOneListingByName(client, "Jashwanthi");

        creatingList(client ,{
            username:"Jashwanthi",
            email : "jashwanthik@gmail.com",
            password:"hello@123",
            repeatpassword:"hello@123"
        })
    }
    catch(e){
        console.error(e);
    }
    finally{
        await client.close();
    }
}

main().catch(console.error);

async function creatingList(client,newListing){
    const result = await client.db("Flipr").collection("RegisteredUsers").insertOne(newListing);
    console.log(`${result.insertedId}`);
}
async function findOneListingByName(client, nameOfListing) {
    const result = await client.db("Flipr").collection("RegisteredUsers").findOne({ username: nameOfListing });

    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}


async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databses : ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}