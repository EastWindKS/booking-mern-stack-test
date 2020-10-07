import mongo from "mongoose";

export interface IVoucher extends mongo.Document {
    name: string;
    description: string;
    imageUrl: string,
    price: string,
    variant: string,
    quantity: string
};

const schema: mongo.SchemaDefinition = {
    name: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique: false
    },
    description: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique: false
    },
    imageUrl: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique: false
    },
    price: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique: false
    },
    variant: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique: false
    },
    quantity: {
        type: mongo.SchemaTypes.String,
        required: true,
        unique: false
    }
};
const voucherSchema: mongo.Schema = new mongo.Schema(schema);
const Voucher = (conStr: mongo.Connection): mongo.Model<IVoucher> => conStr.model("admDb", voucherSchema, "vouchers");
export default Voucher;

