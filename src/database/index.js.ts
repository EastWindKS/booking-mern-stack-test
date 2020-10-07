import mongo from "mongoose";

const uri: string = process.env.SELLER_DB_URL;
let conStr: mongo.Connection = null;

export const getConnection= async (): Promise<mongo.Connection> => {
    if (conStr == null) {
        try {
            conStr = await mongo.createConnection(uri, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true
            });

        } catch (err) {
            console.error(err.message);
        }
    }
    return conStr;
};
