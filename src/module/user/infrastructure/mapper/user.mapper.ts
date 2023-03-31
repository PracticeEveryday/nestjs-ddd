import { UserDomain } from '../../domain/user/user.domain';
import { UserEntity } from '../entity/user.entity';

export default class UserMapper {
    public static toOptionalDomain(userEntity: UserEntity | null): UserDomain | null {
        if (!userEntity) {
            return null;
        }

        const userDomain = new UserDomain(userEntity);

        return userDomain;
    }

    public static toRequiredDomain(userEntity: UserEntity): UserDomain {
        const userDomain = new UserDomain(userEntity);

        return userDomain;
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
