import IBank from "@cub-types/IBank";

interface ICustomer {
    id: number,
    title: string,
    inn: string,
    kpp: string,
    bank_info: IBank,
    address: string,
    header_name: string,
    email: string,
    phone_number: string,
}

export default ICustomer;
