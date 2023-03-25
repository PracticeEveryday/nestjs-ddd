import { UserEntity } from '../entity/user.entity';

import { UserDomain } from '../../domain/user.domain';
export default class UserMapper {
    public static toDomain(userEntity: UserEntity) {
        const product = new UserDomain(userEntity);

        return product;
    }

    // public static toDomains(productsEntity: ProductEntity[]): Product[] {
    //     const products = new Array<Product>();
    //     productsEntity.forEach((productEntity) => {
    //         const product = this.toDomain(productEntity);
    //         products.push(product.get());
    //     });
    //     return products;
    // }
}
