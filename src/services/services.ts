import {IApartment} from "../models/apartment";
import {ISeller} from "../models/seller";
import {createApolloFetch} from "apollo-fetch";
import {IVoucher} from "../models/voucher";
import {IOrder} from "../models/order";

const uri = "http://localhost:3000/api/graphql";
export const checkSellerAccount = (login: string, password: string): Promise<boolean> => {
    const query = `
  query {
  getSeller(login:"${login}",password:"${password}")
  }
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.getSeller).catch(e => console.log(e));
};
export const createOrder = (name: string, type: string, userFirstName: string, userLastName: string, quantity: string, email: string): Promise<IOrder> => {
    const query = `
  mutation {
  createSeller(name:"${name}",type:"${type}",userFirstName:"${userFirstName}","userLastName":"${userLastName}",quantity:"${quantity}",email:"${email}"){_id,type,name}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.createSeller).catch(e => console.log(e));
};
export const createSeller = (login: string, password: string): Promise<ISeller> => {
    const query = `
  mutation {
  createSeller(login:"${login}",password:"${password}"){login}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.createSeller).catch(e => console.log(e));
};

export const createApartment = (name: string, description: string, imageUrl: string, price: string, roomsNumber: string): Promise<IApartment> => {
    const query = `
  mutation {
  createApartment(name:"${name}",description:"${description}",imageUrl:"${imageUrl}",price:"${price}",roomsNumber:"${roomsNumber}"){_id,name}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.createApartment).catch(e => console.log(e));
};
export const createVoucher = (name: string, description: string, imageUrl: string, price: string, variant: string, quantity: string): Promise<IVoucher> => {
    const query = `
  mutation {
  createVoucher(name:"${name}",description:"${description}",imageUrl:"${imageUrl}",price:"${price}",variant:"${variant}",quantity:"${quantity}"){_id,name}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.createVoucher).catch(e => console.log(e));
};
export const getApartment = (id: any): Promise<IApartment> => {
    const query = `
  query {
  getApartment(id:"${id}"){_id,name}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.getApartment).catch(e => console.log(e));
};
export const getVoucher = (id: any): Promise<IVoucher> => {
    const query = `
  query {
  getVoucher(id:"${id}"){_id,name}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.getVoucher).catch(e => console.log(e));
};
export const getAllApartments = (): Promise<IApartment[]> => {
    const query = `
  query {
  getAllApartments{_id,name,description,imageUrl,roomsNumber,price}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.getAllApartments).catch(e => console.log(e));
};
export const getAllVouchers = (): Promise<IVoucher[]> => {
    const query = `
  query {
  getAllVouchers{_id,name,price,quantity,description,variant,imageUrl}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.getAllVouchers).catch(e => console.log(e));
};
export const getAllOrders = (): Promise<IOrder[]> => {
    const query = `
  query {
  getAllOrders{_id,name,userFirstName,quantity,userLastName,type,email}}
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data.getAllOrders).catch(e => console.log(e));
};
export const deleteVoucher = (_id:any): Promise<boolean> => {
    const query = `
  mutation {
  deleteVoucher(_id:"${_id}")
  }
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data).catch(e => console.log(e));
};
export const deleteApartment = (_id:any): Promise<boolean> => {
    const query = `
  mutation {
  deleteVoucher(_id:"${_id}")
  }
`;
    const apolloFetch = createApolloFetch({uri});
    return apolloFetch({query}).then(r => r.data).catch(e => console.log(e));
};