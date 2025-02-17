import { Request, Response } from 'express';
import CreateProductService from 'src/modules/products/services/CreateProductService';
import DeleteProductService from 'src/modules/products/services/DeleteProductService';
import ListProductService from 'src/modules/products/services/ListProductService';
import ShowProductService from 'src/modules/products/services/ShowProductService';
import UpdateProductService from 'src/modules/products/services/UpdateProductService';

export default class ProductsController{
  public async index(request: Request, response: Response): Promise<Response>{
    const listProducts = new ListProductService();

    const products = await listProducts.execute()

    return response.json(products);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const {name, price, quantity} = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity
    });
    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const {name, price, quantity} = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return response.json([]);

  }

}
