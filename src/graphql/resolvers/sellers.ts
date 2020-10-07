import SellerModel, {ISeller} from "../../models/seller";
import ApartmentModel, {IApartment} from "../../models/apartment";
import {ApolloError} from "apollo-server-micro";
import mongo from "mongoose";
import VoucherModel, {IVoucher} from "../../models/voucher";
import OrderModel, {IOrder} from "../../models/order";

export default {
    Query: {
        getApartment: async (
            parent,
            {_id}: { _id: IApartment["_id"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<IApartment> => {
            const Apartment: mongo.Model<IApartment> = ApartmentModel(dbConn);
            try {
                let apartment = await Apartment.findById(_id).exec();
                return apartment;
            } catch (error) {
                console.error("> getApartment error: ", error);
                throw new ApolloError("Error retrieving");
            }
        },
        getVoucher: async (
            parent,
            {_id}: { _id: IVoucher["_id"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<IVoucher> => {
            const Voucher: mongo.Model<IVoucher> = VoucherModel(dbConn);
            try {
                let voucher = await Voucher.findById(_id).exec();
                return voucher;
            } catch (error) {
                console.error("> get voucher error: ", error);
                throw new ApolloError("Error retrieving voucher");
            }
        },
        getAllOrders: async (parent, args, {dbConn}: { dbConn: mongo.Connection }): Promise<IOrder[]> => {
            const Orders: mongo.Model<IOrder> = OrderModel(dbConn);
            let ordersList: IOrder[];
            try {
                ordersList = await Orders.find().exec();
            } catch (error) {
                console.log(error);
                throw new ApolloError("Error retrieving all orders");
            }
            return ordersList;
        },
        getAllApartments: async (parent, args, {dbConn}: { dbConn: mongo.Connection }): Promise<IApartment[]> => {
            const Apartments: mongo.Model<IApartment> = ApartmentModel(dbConn);
            let apartmentsList: IApartment[];
            try {
                apartmentsList = await Apartments.find().exec();
            } catch (error) {
                console.log(error);
                throw new ApolloError("Error retrieving all apartments");
            }
            return apartmentsList;
        },
        getAllVouchers: async (parent, args, {dbConn}: { dbConn: mongo.Connection }): Promise<IVoucher[]> => {
            let vouchersList: IVoucher[];
            const Vouchers: mongo.Model<IVoucher> = VoucherModel(dbConn);
            let list: IApartment[];
            try {
                vouchersList = await Vouchers.find().exec();
            } catch (error) {
                console.log(error);
                throw new ApolloError("Error retrieving all vouchers");
            }
            return vouchersList;
        },
        getSeller: async (
            parent,
            {login, password}: { login: ISeller["login"]; password: ISeller["password"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<boolean> => {
            const Note: mongo.Model<ISeller> = SellerModel(dbConn);
            try {
                let seller = await Note.findOne({login, password}).exec();
                return !!seller;
            } catch (error) {
                console.error("> getNote error: ", error);
                throw new ApolloError("Error get seller");
            }
        }
    },
    Mutation: {
        createOrder: async (
            parent,
            {name, userFirstName, userLastName, quantity, type, email}:
                { name: IOrder["name"]; userFirstName: IOrder["userFirstName"]; userLastName: IOrder["userLastName"]; quantity: IOrder["quantity"]; type: IOrder["type"]; email: IOrder["email"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<IOrder> => {
            const Order: mongo.Model<IOrder> = OrderModel(dbConn);
            try {
                const order = await Order.create({
                    name,
                    userFirstName,
                    userLastName,
                    quantity,
                    type,
                    email
                });
                return order;
            } catch (error) {
                console.error("> saveOrder error: ", error);
                throw new ApolloError("Error creating order");
            }
        },
        createSeller: async (
            parent,
            {login, password}: { login: ISeller["login"]; password: ISeller["password"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<ISeller> => {
            const Seller: mongo.Model<ISeller> = SellerModel(dbConn);
            try {
                const seller = await Seller.create({
                    login,
                    password,
                });
                return seller;
            } catch (error) {
                console.error("> saveSeller error: ", error);
                throw new ApolloError("Error creating seller");
            }
        },
        createApartment: async (
            parent,
            {name, description, imageUrl, price, roomsNumber}:
                { name: IApartment["name"], description: IApartment["description"], imageUrl: IApartment["imageUrl"], price: IApartment["price"], roomsNumber: IApartment["roomsNumber"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<IApartment> => {
            const Apartment: mongo.Model<IApartment> = ApartmentModel(dbConn);
            try {
                const apartment = await Apartment.create({
                    name,
                    description,
                    imageUrl,
                    price,
                    roomsNumber
                });
                return apartment;
            } catch (error) {
                console.error("> ap save error: ", error);
                throw new ApolloError("Error creating apartment");
            }
        },
        createVoucher: async (
            parent,
            {name, description, imageUrl, price, variant, quantity}:
                { name: IVoucher["name"], description: IVoucher["description"], imageUrl: IVoucher["imageUrl"], price: IVoucher["price"], variant: IVoucher["variant"], quantity: IVoucher["quantity"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<IVoucher> => {
            const Voucher: mongo.Model<IVoucher> = VoucherModel(dbConn);
            try {
                const voucher = await Voucher.create({
                    name,
                    description,
                    imageUrl,
                    price,
                    variant,
                    quantity
                });
                return voucher;
            } catch (error) {
                console.error("> ap save error: ", error);
                throw new ApolloError("Error creating voucher");
            }
        },
        deleteVoucher: async (
            parent,
            {_id}: { _id: IVoucher["_id"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<Boolean> => {
            const Voucher: mongo.Model<IVoucher> = VoucherModel(dbConn);
            try {
                await Voucher.findByIdAndDelete(_id);
                return true;
            } catch (error) {
                console.error("> ap save error: ", error);
                return false;
                throw new ApolloError("Error delete voucher");
            }
        },
        deleteApartment: async (
            parent,
            {_id}: { _id: IApartment["_id"] },
            {dbConn}: { dbConn: mongo.Connection }
        ): Promise<Boolean> => {
            const Apartment: mongo.Model<IApartment> = ApartmentModel(dbConn);
            try {
                await Apartment.findByIdAndDelete(_id);
                return true;
            } catch (error) {
                console.error("> ap save error: ", error);
                return false;
                throw new ApolloError("Error delete apartment");
            }
        }
    }
};