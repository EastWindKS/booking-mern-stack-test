import mongo from "mongoose";

export interface IOrder extends mongo.Document {
    type: string;
    userFirstName: string;
    userLastName: string;
    quantity: string;
    email: string;
    name: string;

};

const schema: mongo.SchemaDefinition = {
    type: {
        type: mongo.SchemaTypes.String,
        required: true
    },
    userFirstName: {
        type: mongo.SchemaTypes.String,
        required: true
    },
    userLastName: {
        type: mongo.SchemaTypes.String,
        required: true
    },
    quantity: {
        type: mongo.SchemaTypes.String,
        required: false
    },
    email: {
        type: mongo.SchemaTypes.String,
        required: true
    },
    name: {
        type: mongo.SchemaTypes.String,
        required: true
    },
};
const sellerSchema: mongo.Schema = new mongo.Schema(schema);
const Order = (conStr: mongo.Connection): mongo.Model<IOrder> => conStr.model("admDb", sellerSchema, "orders");
export default Order;

