import {gql} from "apollo-server-micro";

export default gql`
    type Order{
        _id:ID!,
        name:String!
        userFirstName:String!,
        userLastName:String!,
        quantity:String!,
        email:String!,
        type:String!
    }
    type Seller {
        _id: ID!
        login: String!,
        password: String!
    }
    type Voucher{
        _id:ID!
        name:String!,
        description:String!,
        imageUrl:String!,
        variant: String!,
        price:String!,
        quantity:String!
    }
    type Apartment {
        _id:ID!
        name:String!,
        description:String!,
        imageUrl:String!,
        price: String!
        roomsNumber:String!
    }
    type Query {
        getSeller(login: String!, password: String!): Boolean
        getApartment(_id:ID!):Apartment
        getVoucher(_id:ID!): Voucher
        getAllApartments : [Apartment!]
        getAllVouchers:[Voucher!]
        getAllOrders:[Order!]
    }
    type Mutation{
        createOrder(name:String!, userFirstName:String!,userLastName:String!,quantity:String!, email:String!, type:String!):Order
        createSeller(login:String!,password:String!):Seller
        createApartment(name:String!,description:String!,imageUrl:String!,price: String!, roomsNumber:String!): Apartment
        createVoucher(name:String!,description:String!,imageUrl:String!,variant: String!,price:String!, quantity:String!): Voucher
        deleteVoucher(_id:ID!):Boolean
        deleteApartment(_id:ID!):Boolean
        
    }
`;