import mongo from "mongoose";

export interface IApartment extends mongo.Document {
    name: string;
    description: string;
    imageUrl: string,
    price: string,
    roomsNumber: string
};

const schema: mongo.SchemaDefinition = {
    name: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique:false
    },
    description: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique:false
    },
    imageUrl: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique:false
    },
    price: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique:false
    },
    roomsNumber: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique:false
    },
};
const apartmentSchema: mongo.Schema = new mongo.Schema(schema);
const Apartment = (conStr: mongo.Connection): mongo.Model<IApartment> => conStr.model("admDb", apartmentSchema,"apartments");
export default Apartment;

