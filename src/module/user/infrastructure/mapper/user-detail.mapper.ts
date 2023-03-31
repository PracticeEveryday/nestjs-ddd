import { UserDetailDomain } from '../../domain/user-detail/userDetail.domain';
import { UserDetailEntity } from '../entity/user-detail.entity';

export default class UserDetailMapper {
    public static toOptionalDomain(userDetailEntity: UserDetailEntity | null): UserDetailDomain | null {
        if (!userDetailEntity) {
            return null;
        }

        const userDetailDomain = new UserDetailDomain(userDetailEntity);

        return userDetailDomain;
    }

    public static toRequiredDomain(userDetailEntity: UserDetailEntity): UserDetailDomain {
        const userDetailDomain = new UserDetailDomain(userDetailEntity);

        return userDetailDomain;
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
