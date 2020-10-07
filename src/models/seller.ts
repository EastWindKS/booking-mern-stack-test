import mongo from "mongoose";

export interface ISeller extends mongo.Document {
    login: string;
    password: string;
};

const schema: mongo.SchemaDefinition = {
    login: {
        type: mongo.SchemaTypes.String,
        required: true
    },
    password: {
        type: mongo.SchemaTypes.String,
        required: false
    },
};
const sellerSchema: mongo.Schema = new mongo.Schema(schema);
const Seller = (conStr: mongo.Connection): mongo.Model<ISeller> => conStr.model("admDb", sellerSchema,"sellers");
export default Seller;

