import { Request, Response } from 'express';
import ListCustomerService from '../services/ListCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';


export default class CustomersController{
  public async index(request: Request, response: Response): Promise<Response>{
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute()

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const showCustomers = new ShowCustomerService();
    const { id } = request.params;

    const customer = await showCustomers.execute({ id })

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const {name, email} = request.body;

    const createCustomer = new CreateCustomerService();

    const customer = await createCustomer.execute({
      name,
      email,
    });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {  id } = request.params;
    const { name, email } = request.body;

    const updateProfile = new UpdateCustomerService();

    const customer = await updateProfile.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const deleteCustomer = new DeleteCustomerService();
    const { id } = request.params;

     await deleteCustomer.execute({ id })

    return response.json([]);
  }

}
